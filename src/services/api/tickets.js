import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";

const parseCreatedAtMs = (value) => {
  if (!value) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const ms = Date.parse(value);
    return Number.isFinite(ms) ? ms : 0;
  }
  if (value?.seconds) return value.seconds * 1000;
  return 0;
};

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
      const q = query(collection(db, "tickets"), where("user_id", "==", userId));
      const querySnapshot = await getDocs(q);
      const rows = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return rows.sort(
        (a, b) => parseCreatedAtMs(b.created_at) - parseCreatedAtMs(a.created_at),
      );
    } catch (error) {
      console.error("Error fetching user tickets:", error);
      throw error;
    }
  },

  async getAllTickets() {
    try {
      const querySnapshot = await getDocs(collection(db, "tickets"));
      const rows = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return rows.sort(
        (a, b) => parseCreatedAtMs(b.created_at) - parseCreatedAtMs(a.created_at),
      );
    } catch (error) {
      console.error("Error fetching all tickets:", error);
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
