import { supabase } from "./supabase";

class TiQRClient {
  constructor() {
    this.baseUrl =
      import.meta.env.VITE_TIQR_API_BASE_URL || "https://api.tiqr.events";
    this.sessionId = import.meta.env.VITE_TIQR_SESSION_ID;

    this.isMockMode =
      import.meta.env.VITE_TIQR_MOCK_MODE === "true" || !this.sessionId;

    if (this.isMockMode) {
      console.warn("⚠️ TiQRClient initialized in MOCK MODE");
    }
  }

  async getAccessToken() {
    if (this.isMockMode) return "mock_access_token_" + Date.now();

    const cached = localStorage.getItem("tiqr_token");
    const expiry = localStorage.getItem("tiqr_token_expiry");
    if (cached && expiry && Date.now() < parseInt(expiry)) {
      return cached;
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/participant/booking/custom-token/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: this.sessionId }),
        },
      );

      if (!response.ok) throw new Error("Failed to generate TiQR token");

      const data = await response.json();
      const token = data.access_token;

      localStorage.setItem("tiqr_token", token);
      localStorage.setItem(
        "tiqr_token_expiry",
        Date.now() + 29 * 24 * 60 * 60 * 1000,
      );

      return token;
    } catch (error) {
      console.error("TiQR Auth Error:", error);
      throw error;
    }
  }

  async createBooking(bookingData) {
    if (this.isMockMode) {
      const mockUid = `mock_uid_${Date.now()}`;
      console.log("Creating Mock Booking with data:", bookingData);
      await new Promise((r) => setTimeout(r, 1500));

      return {
        booking_uid: mockUid,
        payment_url: `${window.location.origin}/dashboard?mock_payment_success=true&uid=${mockUid}`,
        status: "pending",
      };
    }

    const token = await this.getAccessToken();

    const callbackUrl =
      import.meta.env.VITE_TIQR_WEBHOOK_URL ||
      "https://YOUR_PROJECT_REF.supabase.co/functions/v1/tiqr-webhook";

    const payload = {
      ...bookingData,
      callback_url: callbackUrl,
    };

    const response = await fetch(`${this.baseUrl}/participant/booking/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "TiQR Booking Failed");
    }

    return await response.json();
  }
}

export const tiqrClient = new TiQRClient();
