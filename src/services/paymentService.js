import { tiqrClient } from "../lib/tiqrClient";
import { supabase } from "../lib/supabase";

export const paymentService = {
  async initiatePayment(bookingData) {
    return await tiqrClient.createBooking(bookingData);
  },

  async verifyMockPayment(uid) {
    console.log("Attempting to confirm payment for UID:", uid);

    let { data, error } = await supabase
      .from("registrations")
      .update({
        payment_status: "confirmed",
        ticket_pdf_url: "https://example.com/mock-ticket.pdf",
        payment_amount: 100,
      })
      .eq("tiqr_booking_uid", uid)
      .select();

    if (error) console.error("Registrations Update Error:", error);

    if (!error && (!data || data.length === 0)) {
      console.log("UID not found in registrations, checking tickets...");
      const ticketUpdate = await supabase
        .from("tickets")
        .update({
          payment_status: "confirmed",
          qr_code_url: "https://example.com/mock-qr-code.png",
        })
        .eq("tiqr_booking_uid", uid)
        .select();

      data = ticketUpdate.data;
      error = ticketUpdate.error;
    }

    if (error) {
      return { success: false, message: error.message };
    } else if (!data || data.length === 0) {
      return {
        success: false,
        message: "No matching record found for UID: " + uid,
      };
    } else {
      return { success: true, message: "Payment Successful" };
    }
  },

  async healMissingUid(table, id) {
    const mockUid = `mock_uid_healed_${Date.now()}`;
    const { error } = await supabase
      .from(table)
      .update({ tiqr_booking_uid: mockUid })
      .eq("id", id);

    if (error) throw error;
    return mockUid;
  },
};
