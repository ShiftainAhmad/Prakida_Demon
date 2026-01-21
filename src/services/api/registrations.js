import { supabase } from "../../lib/supabase";

export const registrationService = {
  async checkDuplicates(emails, sport, category) {
    const { data, error } = await supabase.rpc("check_duplicates", {
      _emails: emails,
      _sport: sport,
      _category: category,
    });

    if (error) throw error;
    return data;
  },

  async createRegistration(registrationData) {
    const { data, error } = await supabase
      .from("registrations")
      .insert(registrationData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async addTeamMembers(membersData) {
    const { error } = await supabase.from("team_members").insert(membersData);

    if (error) throw error;
  },

  async updateBookingUid(registrationId, bookingUid) {
    const { error } = await supabase
      .from("registrations")
      .update({ tiqr_booking_uid: bookingUid })
      .eq("id", registrationId);

    if (error) throw error;
  },

  async getUserRegistrations(user) {
    if (!user?.email) return [];

    const { data: memberData, error: memberError } = await supabase
      .from("team_members")
      .select(
        `
                id,
                role,
                registrations (
                    id,
                    team_name,
                    sport,
                    category,
                    team_unique_id,
                    payment_status,
                    ticket_pdf_url,
                    tiqr_booking_uid,
                    created_at
                )
            `,
      )
      .ilike("email", user.email);

    if (memberError) console.error("Member fetch error:", memberError);

    const { data: creatorData, error: creatorError } = await supabase
      .from("registrations")
      .select(
        `
                id,
                team_name,
                sport,
                category,
                team_unique_id,
                payment_status,
                ticket_pdf_url,
                tiqr_booking_uid,
                created_at
            `,
      )
      .eq("user_id", user.id);

    if (creatorError) console.error("Creator fetch error:", creatorError);

    const formattedMemberData = (memberData || [])
      .map((m) => ({
        id: m.id,
        member_record_id: m.id,
        role: m.role,
        ...m.registrations,
      }))
      .filter((item) => item.id);

    const formattedCreatorData = (creatorData || []).map((r) => ({
      id: r.id,
      role: "Captain",
      ...r,
    }));

    const combined = new Map();

    formattedMemberData.forEach((item) => {
      if (item.team_unique_id) combined.set(item.team_unique_id, item);
    });

    formattedCreatorData.forEach((item) => {
      if (item.team_unique_id && !combined.has(item.team_unique_id)) {
        combined.set(item.team_unique_id, item);
      }
    });

    return Array.from(combined.values());
  },

  async getAllRegistrations() {
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updatePaymentStatus(id, status, amount) {
    const { error } = await supabase
      .from("registrations")
      .update({
        payment_status: status,
        payment_amount: amount,
      })
      .eq("id", id);

    if (error) throw error;
  },
};
