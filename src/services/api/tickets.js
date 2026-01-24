import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

export const ticketService = {
  async createTicket(ticketData) {
    try {
      const docRef = await addDoc(collection(db, "tickets"), {
        ...ticketData,
        created_at: new Date().toISOString(),
      });
      return { id: docRef.id, ...ticketData };
    } catch (error) {
       console.error("Error creating ticket:", error);
       throw error;
    }
  },

  async updateBookingUid(ticketId, bookingUid) {
    try {
      const ticketRef = doc(db, "tickets", ticketId);
      await updateDoc(ticketRef, { tiqr_booking_uid: bookingUid });
    } catch (error) {
      console.error("Error updating ticket UID:", error);
      throw error;
    }
  },

  async getUserTickets(userId) {
    try {
      const q = query(
        collection(db, "tickets"),
        where("user_id", "==", userId),
        orderBy("created_at", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching user tickets:", error);
      // Fallback for indexes not ready yet
      if (error.code === 'failed-precondition') {
          console.warn("Firestore index missing. Returning unordered results.");
           const q2 = query(collection(db, "tickets"), where("user_id", "==", userId));
           const querySnapshot2 = await getDocs(q2);
           return querySnapshot2.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      }
      throw error;
    }
  },

  async getAllTickets() {
    try {
      const q = query(collection(db, "tickets"), orderBy("created_at", "desc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching all tickets:", error);
        // Fallback
       if (error.code === 'failed-precondition') {
           const querySnapshot2 = await getDocs(collection(db, "tickets"));
           return querySnapshot2.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
       }
      throw error;
    }
  },

  async updatePaymentStatus(id, status) {
     try {
      const ticketRef = doc(db, "tickets", id);
      await updateDoc(ticketRef, { payment_status: status });
    } catch (error) {
      console.error("Error updating ticket payment status:", error);
      throw error;
    }
  },
};
