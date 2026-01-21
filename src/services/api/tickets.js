import { supabase } from "../../lib/supabase";

export const ticketService = {
  async createTicket(ticketData) {
    const { data, error } = await supabase
      .from("tickets")
      .insert(ticketData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateBookingUid(ticketId, bookingUid) {
    const { error } = await supabase
      .from("tickets")
      .update({ tiqr_booking_uid: bookingUid })
      .eq("id", ticketId);

    if (error) throw error;
  },

  async getUserTickets(userId) {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getAllTickets() {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updatePaymentStatus(id, status) {
    const { error } = await supabase
      .from("tickets")
      .update({ payment_status: status })
      .eq("id", id);

    if (error) throw error;
  },
};
