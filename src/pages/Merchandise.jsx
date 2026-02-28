import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../context/AuthContext";
import { gsap } from "gsap";
import { X } from "lucide-react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../lib/firebase";

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = async () => {
  if (!auth) {
    console.error("Auth object is undefined in getAuthHeaders");
    return {};
  }
  const token = auth.currentUser ? await auth.currentUser.getIdToken() : "";
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const fetchJson = async (url, options = {}) => {
  try {
    const resp = await fetch(url, options);
    const contentType = resp.headers.get("content-type");
    let data = {};
    if (contentType && contentType.includes("application/json")) {
      data = await resp.json();
    } else {
      // If not JSON (e.g. 500 HTML error page), consume text to avoid dangling stream
      const text = await resp.text();
      data = { message: text || resp.statusText };
    }
    
    if (!resp.ok) {
        throw new Error(data.message || `Request failed with status ${resp.status}`);
    }
    return { resp, data };
  } catch (error) {
    throw error;
  }
};

const PRODUCTS = [
  {
    id: "2474", // Design 1
    title: "Prakrida T-Shirt (Design 1)",
    price: "549",
    color: "black",
    originalPrice: null,
    thumb: "https://i.ibb.co/Z68sfVvc/t12.jpg",
    images: [
      "https://i.ibb.co/p6YNF42K/t11.jpg",
      "https://i.ibb.co/Z68sfVvc/t12.jpg",
      "https://i.ibb.co/MxXFPgCJ/t13.jpg",
      "https://i.ibb.co/ks7P6hXT/t14.jpg",
    ],
  },
  {
    id: "2476", // Design 2
    title: "Prakrida T-Shirt (Design 2)",
    price: "549",
    color: "black",
    originalPrice: null,
    thumb: "https://i.ibb.co/8LY8DTzV/t32.jpg",
    images: [
      "https://i.ibb.co/YT1yS86V/t31.jpg",
      "https://i.ibb.co/8LY8DTzV/t32.jpg",
      "https://i.ibb.co/MxfG0cw0/t33.jpg",
      "https://i.ibb.co/5gc3ZTkw/t34.jpg",
    ],
  },
  {
    id: "2475", // Design 3
    title: "Prakrida T-Shirt (Design 3)",
    price: "549",
    color: "beige",
    originalPrice: null,
    thumb: "https://i.ibb.co/hRZLFdZS/t22.jpg",
    images: [
      "https://i.ibb.co/Psdzgwvk/t21.jpg",
      "https://i.ibb.co/hRZLFdZS/t22.jpg",
      "https://i.ibb.co/8Ld124P3/t23.jpg",
      "https://i.ibb.co/GffypC70/t24.jpg",
    ],
  },
];

const TYPE_MAP = {
  tee: { id: "2474", title: "Prakrida T-Shirt" },
  // These mapping keys might need to be adjusted based on what the backend actually returns or expects
  // But for now we treat them as individual items in the UI. 
  // When checking out, we will dynamically determine if we are sending 'combo', 'trio' or 'tee'.
  combo: { id: "2476", title: "Combo Pack" },
  trio: { id: "2475", title: "Trio Pack" },
};

export default function Merchandise() {
  const [modalProduct, setModalProduct] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);

  const { user } = useAuth();
  // const [orders, setOrders] = useState([]);
  // const [ordersModalOpen, setOrdersModalOpen] = useState(false);
  // const [loadingOrders, setLoadingOrders] = useState(false);
  
  // Cart State (disabled - orders via Google Form)
  // const [cartItems, setCartItems] = useState([]);
  // const [isCartOpen, setIsCartOpen] = useState(false);

  /* Cart & Add-to-cart disabled — orders now via Google Form
  const addToCart = (product) => { ... };
  const removeFromCart = (cartId) => { ... };
  const getCartTotals = () => { ... };
  const getBundlePrice = (qty) => { ... };
  */

  /* fetchOrders disabled — orders now via Google Form
  const fetchOrders = async () => {
    if (!user) return;
    setLoadingOrders(true);
    setOrders([]);
    try {
      const headers = await getAuthHeaders();
      const { data } = await fetchJson(`${BASE_API_URL}/merch/orders`, {
        headers,
      });

      if (data && Array.isArray(data.orders)) {
        const mappedOrders = data.orders.map((o) => {
          const qty = o.items?.length || 1;
          let title = "Prakrida Merch";
          if (qty === 2) title = "Combo (2 T-Shirts)";
          if (qty >= 3) title = "Trio (3 T-Shirts)";

          // if (o.item?.type === "tee") title = "Prakrida T-Shirt";
          // else if (o.item?.type === "combo") title = "Combo (2 T-Shirts)";
          // else if (o.item?.type === "trio") title = "Trio (3 T-Shirts)";
          // const t = TYPE_MAP[o.item?.type] ?? {};
          // const price = PRODUCTS.find((p) => p.id === t.id)?.price ?? 0;
          // let qty = 1;
          // if (o.item?.type === "combo") qty = 2;
          // else if (o.item?.type === "trio") qty = 3;
          
           const updatedAtMs = o.updatedAt
           ? (o.updatedAt._seconds || 0) * 1000 + (o.updatedAt._nanoseconds || 0) / 1000000: 0;

          return {
            id: o.id,
            title: title,
            status: o.paymentStatus,
            payment_url: o.paymentUrl,
            size: o.item?.[0]?.size,
            quantity: qty,
            // quantity: o.item?.quantity ?? 1,
             amount: getBundlePrice(qty), // Backend doesn't send amount in list, handled by UI defaults or logic
             updatedAt: updatedAtMs,
          };
        })
        .sort((a, b) => b.updatedAt - a.updatedAt);
        setOrders(mappedOrders);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  };
  */

  /* useEffect(() => {
    if (ordersModalOpen) {
      fetchOrders();
    }
  }, [ordersModalOpen, user]); */

  /* handleCheckout disabled — orders now via Google Form
  const handleCheckout = async (items) => {
    if (!user) {
      showNotice("Please login to purchase");
      return;
    }

    if (!items || items.length === 0) return;

    // Pre-open payment tab to avoid popup blockers; we'll close it if payment isn't needed.
    const paymentTab = window.open("about:blank", "_blank");
    const closePaymentTab = () => {
      if (paymentTab && !paymentTab.closed) paymentTab.close();
    };
    try {
      if (paymentTab) paymentTab.opener = null;
    } catch {
      // ignore
    }
    const willUseNewTab = Boolean(paymentTab);
    if (!willUseNewTab) {
      showNotice("Popup blocked. Redirecting in same tab...");
    }

    showNotice(`Booking ${items.length} item(s)...`);

    try {
      const headers = await getAuthHeaders();
      // Backend expects { name, phone, college, items: [{ color, size }] }

      // Fetch user profile for required fields
      const db = getFirestore();
      let profile = {};
      try {
        if (user.uid) {
          const snap = await getDoc(doc(db, "auth", user.uid));
          if (snap.exists()) profile = snap.data();
        }
      } catch (e) {
        console.warn("Failed to fetch profile for checkout", e);
      }

      const payload = {
        name: profile.name || user.displayName || "Technika User",
        phone: profile.phone || "0000000000",
        college: profile.college || "BIT Mesra",
        items: items.map(i => ({
          color: i.color,
          size: i.size
        })),
      };

      console.log("Sending checkout payload:", payload);

      const { resp, data } = await fetchJson(`${BASE_API_URL}/merch/order`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        closePaymentTab();
        showNotice(data?.message || "Booking creation failed");
        return;
      }

      if (data.paymentUrl || data.payment_url) {
        const url = data.paymentUrl || data.payment_url;
        console.log("Redirecting to payment:", url);
        if (willUseNewTab) {
          try {
            if (paymentTab && !paymentTab.closed) {
              paymentTab.location.href = url;
              // Ideally we would set some 'pending' state here like Alumni does
              showNotice("Payment initiated. Check new tab.");
              return;
            }
          } catch (e) {
            console.error("Tab redirection failed", e);
            closePaymentTab();
          }
        }

        // Fallback
        closePaymentTab();
        window.location.href = url;
      } else {
        console.log("No payment URL returned", data);
        closePaymentTab();
        showNotice(data.message || "Booking initiated successfully!");
        setOrdersModalOpen(true);
      }
    } catch (err) {
      closePaymentTab();
      console.error("Booking error:", err);
      showNotice("Something went wrong. Try again.");
    }
  };

  };
  */

  /* checkOrderStatus disabled — orders now via Google Form
  const checkOrderStatus = async (orderId) => { ... };
  */

  // Removed standard cart functions and useEffects

  useEffect(() => {
    if (modalProduct) setModalIndex(0);
  }, [modalProduct]);

  const modalRef = useRef(null);
  // const ordersModalRef = useRef(null); // removed — orders now via Google Form
  const [notice, setNotice] = useState(null);
  // const { isBitStudent } = useEntitlements();

  const showNotice = (text, ms = 2200) => {
    setNotice(text);
    window.setTimeout(() => setNotice(null), ms);
  };

  const closeModal = () => {
    if (!modalRef.current) {
      setModalProduct(null);
      return;
    }
    gsap.to(modalRef.current, {
      y: 20,
      opacity: 0,
      scale: 0.98,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => setModalProduct(null),
    });
  };

  useEffect(() => {
    if (modalProduct && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: 20, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" },
      );
    }
  }, [modalProduct]);

  // Removed redundant useEffect related to modalSize synchronization, simple state is enough

  // Prevent background scrolling while modal is open; allow scrolling inside modal.
  // Use fixed positioning to preserve scroll position and restore on close.
  useEffect(() => {
    if (!modalProduct) return;
    const body = document.body;
    const docEl = document.documentElement;
    const scrollY = window.scrollY || window.pageYOffset;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      scrollTop: scrollY,
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    // Also lock html element as a fallback
    const prevHtmlOverflow = docEl.style.overflow;
    docEl.style.overflow = "hidden";

    return () => {
      docEl.style.overflow = prevHtmlOverflow || "";
      body.style.overflow = prev.overflow || "";
      body.style.position = prev.position || "";
      body.style.top = prev.top || "";
      body.style.width = prev.width || "";
      window.scrollTo(0, prev.scrollTop || 0);
    };
  }, [modalProduct]);

  // Allow touch scrolling only inside modal on mobile: prevent touchmove outside modal
  useEffect(() => {
    if (!modalProduct) return;

    const activeRef = modalRef;

    const onTouchMove = (e) => {
      if (!activeRef.current) return;
      if (!activeRef.current.contains(e.target)) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, [modalProduct]);

  /* checkoutCart disabled — orders now via Google Form
  const checkoutCart = async () => { ... };
  */

  return (
    <>
      <div className="relative flex min-h-screen w-full items-start justify-center overflow-hidden bg-gradient-to-b from-black via-[#291302] to-black px-6 pb-12 pt-28 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-16 h-[420px] w-[420px] rounded-full bg-[#ff0030]/12 blur-[150px]" />
          <div className="absolute bottom-0 left-8 h-80 w-80 rounded-full bg-[#4100ff]/12 blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-6xl w-full">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold">Merchandise</h1>
            {/* Cart and My Orders buttons disabled — orders now via Google Form */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((p) => (
              <div
                key={p.id}
                className="relative overflow-hidden rounded-[28px] border border-white/30 hover:border-prakida-flame/40 transition duration-200 bg-black/55 p-4 flex flex-col md:flex-row gap-4 backdrop-blur-xl shadow-[2px_2px_6px_rgba(0,0,0,0.3)] "
              >
                <div className="flex-shrink-0 w-full md:w-44">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    onClick={() => setModalProduct(p)}
                    className={`rounded-md w-full h-36 object-cover cursor-pointer hover:opacity-90 transition-opacity`}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold leading-tight">
                      {p.title}
                    </h2>
                    <p className="text-white/70 mt-2 text-sm">
                      {p.id === "combo"
                        ? "Best value pack."
                        : "High quality merch."}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col gap-4">
                    <div>
                      {p.originalPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-white/40 line-through">
                            ₹{p.originalPrice}
                          </span>
                          <span className="text-lg font-semibold text-[#ffa74f]">
                            ₹{p.price}
                          </span>
                        </div>
                      ) : (
                        <div className="text-lg font-semibold">₹{p.price}</div>
                      )}


                    </div>

                    <div className="flex items-center gap-2 mt-auto">
                      {
                        <button
                          onClick={() => setModalProduct(p)}
                          aria-label={`View ${p.title}`}
                          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-transparent text-white/70 hover:bg-white/5"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7z"
                            />
                            <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
                          </svg>
                        </button>
                      }

                      <a
                        href="https://forms.gle/Br9XiUMFt9nCDsf59"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 text-sm rounded-full bg-gradient-to-r from-[#f95263] via-[#c55438] to-[#e4790d] text-white shadow-sm font-semibold hover:opacity-90 transition-opacity text-center"
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart removed as requested */}
        </div>
      </div>

      {/* Modal */}
      {modalProduct &&
        createPortal(
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]">
            <div
              ref={modalRef}
              className="w-[92%] max-w-4xl relative bg-black/55 border border-white/15 backdrop-blur-xl rounded-[32px] p-4 shadow-[0_60px_140px_rgba(255,0,48,0.18)] overflow-auto max-h-[90vh]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(240,133,19,0.16),_transparent_55%)]" />
              <div className="flex items-start justify-between mb-3 z-10 relative">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {modalProduct.title}
                  </h3>
                  <div className="text-sm text-white/70">
                    Price: ₹{modalProduct.price}
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <button
                    onClick={closeModal}
                    className="text-white/60 hover:text-white text-md"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 z-10 relative">
                <div className="md:col-span-7 flex items-start justify-center relative">
                  <button
                    aria-label="Previous image"
                    title="Previous"
                    onClick={() => setModalIndex((i) => Math.max(0, i - 1))}
                    className="hidden md:inline-flex absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-2 text-white/70 hover:bg-black/60"
                  >
                    ‹
                  </button>
                  <img
                    src={modalProduct.images[modalIndex]}
                    alt="main"
                    className="w-full md:max-w-[520px] max-h-[55vh] md:max-h-[70vh] object-contain rounded-2xl"
                  />
                  <button
                    aria-label="Next image"
                    title="Next"
                    onClick={() =>
                      setModalIndex((i) =>
                        Math.min(modalProduct.images.length - 1, i + 1),
                      )
                    }
                    className="hidden md:inline-flex absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-2 text-white/70 hover:bg-black/60"
                  >
                    ›
                  </button>
                </div>

                <div className="md:col-span-5">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 overflow-x-auto py-1">
                      {modalProduct.images.map((src, i) => (
                        <button
                          key={i}
                          onClick={() => setModalIndex(i)}
                          className={`flex-shrink-0 rounded-md overflow-hidden border ${i === modalIndex ? "border-[#ff7817]" : "border-white/10"}`}
                        >
                          <img
                            src={src}
                            alt={`thumb-${i}`}
                            className="w-24 h-24 object-cover block"
                          />
                        </button>
                      ))}
                    </div>

                    <div className="text-sm text-white/70">
                      Official event merchandise — images. Use corner actions to
                      add or buy.
                    </div>

                    <div className="mt-auto">
                      <a
                        href="https://forms.gle/Br9XiUMFt9nCDsf59"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 rounded-full bg-gradient-to-r from-[#f95263] via-[#c55438] to-[#e4790d] text-white font-semibold hover:opacity-90 transition-opacity text-center"
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* Orders Modal and Cart Drawer removed — orders now via Google Form */}
      {notice &&
        createPortal(
          <div className="fixed left-1/2 -translate-x-1/2 bottom-28 z-[120] bg-black sm:bg-white/5 border border-white/10 text-white px-4 py-2 rounded-md sm:backdrop-blur-sm">
            {notice}
          </div>,
          document.body,
        )}
    </>
  );
}
