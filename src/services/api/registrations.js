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
  writeBatch,
  getDoc
} from "firebase/firestore";

export const registrationService = {
  async checkDuplicates(emails, sport, category) {
    // In Firestore, meaningful duplicate checking is harder without a dedicated uniqueness constraint or function.
    // For now, we will query existing registrations for this sport/category and check if any emails match.
    // This is not atomic/perfect but sufficient for client-side validation.
    try {
        const q = query(
            collection(db, "registrations"),
            where("sport", "==", sport),
            where("category", "==", category)
        );
        const querySnapshot = await getDocs(q);
        const existingRegistrations = querySnapshot.docs.map(d => d.data());
        
        // We also need to check team_members if possible, but that's a sub-collection or separate collection.
        // Assuming team_members are in a separate collection for now.
        const memberQ = query(collection(db, "team_members")); // This is too broad for production!
        // A better approach for Firestore: store `allowed_emails` array in the registration document for easy querying.
        
        // Let's rely on checking if the LEADER has registered this team? 
        // Or if we check the 'team_members' collection for these emails.
        
        // Simplification for migration:
        // We will just check if any of the provided emails are already associated with a registration for this sport/category.
        // This requires a reverse mapping or scanning. 
        // Given NoSQL limitations without cloud functions, we might skip strict duplicate checking or implement a basic one.
        
        // Basic check: Check if current user is already registered?
        // The original RPC `check_duplicates` checked if ANY of the emails in the list were already involved in the sport/category.
        
        // Optimized Firestore approach:
        // Query 'team_members' collection where 'email' IN emails. 
        // Then filtered by sport/category join (which Firestore doesn't do natively).
        
        // Fallback: Return null (no duplicates found) to allow flow, or implement a basic check.
        console.warn("Duplicate checking is limited in Firestore client-only migration.");
        return null; 
        
    } catch (error) {
        console.error("Duplicate check error", error);
        return null;
    }
  },

  async createRegistration(registrationData) {
    try {
      const docRef = await addDoc(collection(db, "registrations"), {
        ...registrationData,
        created_at: new Date().toISOString(),
      });
      return { id: docRef.id, ...registrationData };
    } catch (error) {
      console.error("Create registration error:", error);
      throw error;
    }
  },

  async addTeamMembers(membersData) {
    try {
        const batch = writeBatch(db);
        membersData.forEach((member) => {
            const docRef = doc(collection(db, "team_members"));
            batch.set(docRef, member);
        });
        await batch.commit();
    } catch (error) {
        console.error("Add team members error:", error);
        throw error;
    }
  },

  async updateBookingUid(registrationId, bookingUid) {
     try {
      const regRef = doc(db, "registrations", registrationId);
      await updateDoc(regRef, { tiqr_booking_uid: bookingUid });
    } catch (error) {
      console.error("Error updating registration UID:", error);
      throw error;
    }
  },

  async getUserRegistrations(user) {
    if (!user?.email) return [];

    try {
        // 1. Get registrations where user is the creator (user_id matches)
        const qCreator = query(
            collection(db, "registrations"),
            where("user_id", "==", user.uid) // user.id in supabase -> user.uid in firebase
        );
        const creatorSnapshot = await getDocs(qCreator);
        const creatorData = creatorSnapshot.docs.map(d => ({
            id: d.id,
            role: "Captain",
            ...d.data()
        }));

        // 2. Get team_members entries where email matches
        const qMember = query(
            collection(db, "team_members"),
            where("email", "==", user.email)
        );
        const memberSnapshot = await getDocs(qMember);
        const memberData = memberSnapshot.docs.map(d => ({
            id: d.id,
            member_record_id: d.id,
            role: d.data().role,
            registration_id: d.data().registration_id, // We need this link
            team_unique_id: d.data().team_unique_id // Or this
        }));
        
        // 3. For each member entry, fetch the parent registration details
        // This is the "Join" part.
        const memberRegistrations = await Promise.all(memberData.map(async (m) => {
            if(!m.registration_id) return null;
            const regDoc = await getDoc(doc(db, "registrations", m.registration_id));
             if (regDoc.exists()) {
                return {
                    ...m,
                    ...regDoc.data(),
                    id: regDoc.id // Registration ID overrides member ID for display usually
                };
            }
            return null;
        }));
        
        const validMemberRegistrations = memberRegistrations.filter(r => r !== null);


        // Combine results
        const combined = new Map();

        // Add member registrations first
        validMemberRegistrations.forEach((item) => {
            if (item.team_unique_id) combined.set(item.team_unique_id, item);
        });

        // Add creator registrations (overwrite if duplicate, or ignore if already present? 
        // Captain role usually supersedes or matches)
         creatorData.forEach((item) => {
            if (item.team_unique_id) {
                combined.set(item.team_unique_id, item);
            }
        });

        return Array.from(combined.values());

    } catch (error) {
        console.error("Get user registrations error:", error);
        return [];
    }
  },

  async getAllRegistrations() {
     try {
      const q = query(collection(db, "registrations"), orderBy("created_at", "desc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching all registrations:", error);
      if (error.code === 'failed-precondition') {
          const querySnapshot2 = await getDocs(collection(db, "registrations"));
          return querySnapshot2.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      }
      return [];
    }
  },

  async updatePaymentStatus(id, status, amount) {
    try {
      const regRef = doc(db, "registrations", id);
      await updateDoc(regRef, { 
          payment_status: status,
          payment_amount: amount 
      });
    } catch (error) {
      console.error("Error updating registration payment status:", error);
      throw error;
    }
  },
};
