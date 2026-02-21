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
  const [selectedSizes, setSelectedSizes] = useState({}); // { jacket: 'M', tshirt: 'S', combo_jacket: 'M', combo_tshirt: 'M' }

  const SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [ordersModalOpen, setOrdersModalOpen] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  
  // Cart State
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
  const size = selectedSizes[product.id] || "M";
  const shirtCount = 1;

  setCartItems((prev) => {
    const totalItems =
      prev.reduce((acc, item) => acc + (item.shirtCount || 1), 0) +
      shirtCount;

    if (totalItems > 3) {
      showNotice("You can add up to 3 items per order. Please place another order for more.");
      return prev;
    }

    return [
      ...prev,
      {
        ...product,
        cartId: Date.now() + Math.random(),
        selectedSize: size,
        origPrice: parseFloat(product.price),
        shirtCount,
      },
    ];
  });

  showNotice("Added to cart!");
  if (modalProduct) closeModal();
};


  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const getCartTotals = () => {
    const totalShirts = cartItems.reduce((acc, item) => acc + (item.shirtCount || 1), 0);
    
    // Pricing tiers per SHIRT count
    // 1 shirt = 549
    // 2 shirts = 1000 (Combo) -> 500/ea
    // 3 shirts = 1449 (Trio) -> 483/ea
    
    const PRICE_1 = 549; 
    const PRICE_2 = 1000; 
    const PRICE_3 = 1449;
    
    let count = totalShirts;
    let finalTotal = 0;
    
    // Greedy calculation: max out bundles of 3, then 2, then 1
    const bundle3 = Math.floor(count / 3);
    finalTotal += bundle3 * PRICE_3;
    count %= 3;
    
    const bundle2 = Math.floor(count / 2);
    finalTotal += bundle2 * PRICE_2;
    count %= 2;
    
    finalTotal += count * PRICE_1;
    
    // "Original" price if bought individually
    // This assumes specific "originalPrice" logic, but simplified:
    // If we consider base price 549 * count
    const baseTotal = totalShirts * 549;
    
    return { 
      total: finalTotal, 
      baseTotal: baseTotal, 
      saved: baseTotal - finalTotal,
      count: totalShirts
    };
  };

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
          let title = "Technika Merch";
          if (o.item?.type === "tee") title = "Prakrida T-Shirt";
          else if (o.item?.type === "combo") title = "Combo (2 T-Shirts)";
          else if (o.item?.type === "trio") title = "Trio (3 T-Shirts)";
          const t = TYPE_MAP[o.item?.type] ?? {};
          const price = PRODUCTS.find((p) => p.id === t.id)?.price ?? 0;

          return {
            id: o.id,
            title: title,
            status: o.paymentStatus,
            payment_url: o.paymentUrl,
            size: o.item?.size,
            amount: price * (o.item?.quantity ?? 1), // Backend doesn't send amount in list, handled by UI defaults or logic
            quantity: o.item?.quantity ?? 1,
          };
        });
        setOrders(mappedOrders);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (ordersModalOpen) {
      fetchOrders();
    }
  }, [ordersModalOpen, user]);

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

  const checkOrderStatus = async (orderId) => {
    try {
      const headers = await getAuthHeaders();
      // Backend uses GET /merch/order/:id for specific order details
      const { data } = await fetchJson(
        `${BASE_API_URL}/merch/order/${orderId}`,
        { headers },
      );

      setOrders((prev) =>
        prev.map((o) => {
          if (o.id === orderId) {
            return {
              ...o,
              status: data.status, // Backend returns 'status'
              payment_url: data.paymentUrl, // Backend returns 'paymentUrl'
            };
          }
          return o;
        }),
      );

      if (data.status) showNotice(`Status: ${data.status}`);
    } catch (e) {
      showNotice("Failed to update status");
    }
  };

  // Removed standard cart functions and useEffects

  useEffect(() => {
    if (modalProduct) setModalIndex(0);
  }, [modalProduct]);

  const modalRef = useRef(null);
  const ordersModalRef = useRef(null);
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
    if (!modalProduct && !ordersModalOpen) return;
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
  }, [modalProduct, ordersModalOpen]);

  // Allow touch scrolling only inside modal on mobile: prevent touchmove outside modal
  useEffect(() => {
    if (!modalProduct && !ordersModalOpen) return;

    // Determine which modal is active
    const activeRef = ordersModalOpen ? ordersModalRef : modalRef;

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
  }, [modalProduct, ordersModalOpen]);

  const checkoutCart = async () => {
    if (!user) {
      showNotice("Please login to purchase");
      return;
    }
    
    if (cartItems.length === 0) return;

    // chunk items into groups of 3 (backend limit)
    const chunks = [];
    for (let i = 0; i < cartItems.length; i += 3) {
      chunks.push(cartItems.slice(i, i + 3));
    }

    setIsCartOpen(false);

    if (chunks.length > 1) {
      alert(`You can not add more than 3 items in a single batch. Remove an item first or get them in a different batch.`);
    }

    for (const chunk of chunks) {
      // transform chunk items to format handleCheckout expects
      const payloadItems = chunk.map(item => ({
        color: item.color,
        size: item.selectedSize
      }));

      await handleCheckout(payloadItems);
      
      // small delay to prevent race conditions
      if (chunks.length > 1) {
        await new Promise(r => setTimeout(r, 1500));
      }
    }
    
    setCartItems([]);
  };

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
            <div className="flex items-center gap-3">
              {cartItems.length > 0 && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative px-4 py-2 rounded-full bg-[#ff4f81] text-white text-sm font-semibold hover:bg-[#d43f68] transition-colors"
                >
                  Cart ({cartItems.reduce((acc, i) => acc + (i.shirtCount || 1), 0)})
                </button>
              )}
              {user && (
                <div className="flex flex-col items-end">
                  <button
                    onClick={() => setOrdersModalOpen(true)}
                    className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    My Orders
                  </button>
                  {/* Order Summary / Hint */}
                  {orders.length > 0 && (
                    <div className="mt-2 text-xs text-white/60">
                      {orders.length} active order{orders.length !== 1 ? "s" : ""}
                    </div>
                  )}
                </div>
              )}
            </div>
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

                      <div className="mt-3 space-y-2">
                        {
                          <div className="flex items-center gap-2">
                            <div className="flex flex-col w-full">
                              <label className="text-xs text-white/50 mb-1">
                                Size
                              </label>
                              <select
                                value={selectedSizes[p.id] || "M"}
                                onChange={(e) =>
                                  setSelectedSizes((s) => ({
                                    ...s,
                                    [p.id]: e.target.value,
                                  }))
                                }
                                className="bg-black/25 border border-white/10 rounded px-2 py-1 text-white text-sm w-full"
                              >
                                {SIZES.map((sz) => (
                                  <option key={sz} value={sz}>
                                    {sz}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        }
                      </div>
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

                      <button
                        onClick={() => addToCart(p)}
                        className="flex-1 px-3 py-2 text-sm rounded-full bg-gradient-to-r from-[#f95263] via-[#c55438] to-[#e4790d] text-white shadow-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        Add to Cart
                      </button>
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

                    <div className="mt-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col w-full">
                          <label className="text-xs text-white/50 mb-1">
                            Size
                          </label>
                          <select
                            value={selectedSizes[modalProduct.id] || "M"}
                            onChange={(e) =>
                              setSelectedSizes((s) => ({
                                ...s,
                                [modalProduct.id]: e.target.value,
                              }))
                            }
                            className="bg-black/25 border border-white/10 rounded px-3 py-2 text-white text-sm w-full"
                          >
                            {SIZES.map((sz) => (
                              <option key={sz} value={sz}>
                                {sz}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <button
                        onClick={() => addToCart(modalProduct)}
                        className="flex-1 px-4 py-2 rounded-full bg-gradient-to-r from-[#f95263] via-[#c55438] to-[#e4790d] text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* Orders Modal */}
      {ordersModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
            <div
              ref={ordersModalRef}
              className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">My Orders</h3>
                <button
                  onClick={() => setOrdersModalOpen(false)}
                  className="text-white/50 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div 
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-4 space-y-4">
                {loadingOrders ? (
                  <div className="text-center text-white/50 py-8">
                    Loading orders...
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center text-white/50 py-8">
                    No orders found.
                  </div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white/5 border border-white/10 rounded-xl p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="text-xs text-white/50 mb-1">
                            Order ID: {order.id}
                          </div>
                          <div
                            className={`inline-block px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                              order.status === "PAID" || order.status === "captured"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : ["PENDING", "pending_payment", "created"].includes(order.status)
                                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                                  : "bg-white/10 text-white/60 border border-white/10"
                            }`}
                          >
                            {(order.status || "UNKNOWN").replace("_", " ")}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-white">
                            ₹{order.amount || order.totalAmount || 0}
                          </div>
                          <button
                            onClick={() => checkOrderStatus(order.id)}
                            className="text-xs text-[#ffa74f] hover:text-[#ff4f81] hover:underline mt-1 transition-colors"
                          >
                            Check Status
                          </button>
                        </div>
                      </div>
                      <div className="text-white/80 border-t border-white/5 pt-2 text-sm">
                        {order.title}
                      </div>
                      {order.size && (
                        <div className="text-sm text-white/50">
                          Size: {order.size}
                        </div>
                      )}
                      <div className="text-sm text-white/50">
                        Quantity: {order.quantity}
                      </div>

                      {order.payment_url && order.status !== "PAID" && (
                        <div className="mt-3 pt-2 border-t border-white/10">
                          <a
                            href={order.payment_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center w-full py-2 bg-gradient-to-r from-[#ff4f81] to-[#c55438] hover:shadow-lg hover:shadow-[#ff4f81]/20 rounded-lg text-white font-medium text-sm transition-all"
                          >
                            Complete Payment
                          </a>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
      {/* Cart Drawer/Modal */}
      {isCartOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/80 flex justify-end z-[100]">
            {/* Close Cart Area (click outside to close) */}
            <div
              className="absolute inset-0"
              onClick={() => setIsCartOpen(false)}
            />

            <div
            data-lenis-prevent
            className="w-full max-w-md bg-[#181818] h-full flex flex-col border-l border-white/10 shadow-2xl relative z-10">
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center text-white/40 py-10">
                    Cart is empty
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.cartId}
                      className="flex gap-3 bg-white/5 p-3 rounded-xl border border-white/5 items-center"
                    >
                      <img
                        src={item.thumb}
                        alt={item.title}
                        className="w-16 h-16 rounded object-cover bg-black/50"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm text-white/90">
                          {item.title}
                        </div>
                        <div className="text-xs text-white/50 mt-1">
                          Size: {item.selectedSize}
                        </div>
                        {item.shirtCount > 1 && (
                          <div className="text-[10px] text-[#ffa74f] font-mono mt-1">
                            Counts as {item.shirtCount} items
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="p-2 text-white/30 hover:text-red-400 transition-colors"
                        title="Remove"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 bg-black/40 border-t border-white/10 space-y-3 backdrop-blur-md">
                  {/* Totals Calculation */}
                  {(() => {
                    const { total, baseTotal, saved, count } = getCartTotals();
                    return (
                      <>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between text-white/60">
                            <span>Subtotal ({count} items)</span>
                            <span>₹{baseTotal}</span>
                          </div>
                          {saved > 0 && (
                            <div className="flex justify-between text-emerald-400">
                              <span>Bundle Savings</span>
                              <span>- ₹{saved}</span>
                            </div>
                          )}
                        </div>
                        <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                          <div className="text-sm text-white/60">Total Amount</div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-[#ffa74f] to-[#ff4f81] bg-clip-text text-transparent">
                            ₹{total}
                          </div>
                        </div>
                      </>
                    );
                  })()}

                  <button
                    onClick={checkoutCart}
                    className="w-full py-3.5 mt-4 rounded-xl bg-gradient-to-r from-[#ff4f81] to-[#c55438] font-bold text-white shadow-lg hover:shadow-[#ff4f81]/30 transition-all active:scale-[0.98]"
                  >
                    Proceed to Pay
                  </button>
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
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
