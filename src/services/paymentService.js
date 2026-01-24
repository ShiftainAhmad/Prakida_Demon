import { tiqrClient } from "../lib/tiqrClient";
import { db } from "../lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

export const paymentService = {
  async initiatePayment(bookingData) {
    return await tiqrClient.createBooking(bookingData);
  },

  async verifyMockPayment(uid) {
    console.log("Attempting to confirm payment for UID:", uid);

    try {
        // 1. Check Registrations
        const qReg = query(collection(db, "registrations"), where("tiqr_booking_uid", "==", uid));
        const regSnap = await getDocs(qReg);

        if (!regSnap.empty) {
            const regDoc = regSnap.docs[0];
            await updateDoc(regDoc.ref, {
                payment_status: "confirmed",
                ticket_pdf_url: "https://example.com/mock-ticket.pdf",
                payment_amount: 100,
            });
            return { success: true, message: "Payment Successful" };
        }

        // 2. Check Tickets
        const qTicket = query(collection(db, "tickets"), where("tiqr_booking_uid", "==", uid));
        const ticketSnap = await getDocs(qTicket);
        
        if (!ticketSnap.empty) {
             const ticketDoc = ticketSnap.docs[0];
            await updateDoc(ticketDoc.ref, {
                payment_status: "confirmed",
                qr_code_url: "https://example.com/mock-qr-code.png",
            });
            return { success: true, message: "Payment Successful" };
        }

        return {
            success: false,
            message: "No matching record found for UID: " + uid,
        };

    } catch (error) {
        console.error("Payment Verification Error:", error);
        return { success: false, message: error.message };
    }
  },

  async healMissingUid(collectionName, id) {
    const mockUid = `mock_uid_healed_${Date.now()}`;
    try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, { tiqr_booking_uid: mockUid });
        return mockUid;
    } catch (error) {
        console.error("Heal UID error:", error);
        throw error;
    }
  },
};
