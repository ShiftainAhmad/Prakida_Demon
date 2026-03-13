import React from "react";

const logos = [
  "/BSRDC_logo.jpeg",
  "/BRPNNL.jpeg",
  "/Central bank.png",
  "/Dainik_Jagran_logo.png",
  "/Prohibition_department.jpeg",
  "/Live Dainik logo.png",
  "/Patna press logo.jpeg",
  "/IDBI logo.jpg",
  "/max protein.jpg",
  "/sudha logo.png",
  "/axis bank logo.png",
  // "/pepsi logo.png",
  "/tiqr logo.png",
  "/beltron logo.png",
  // "/comfed logo.jpg",
  "/icici bank logo.png",
  "/bank of india logo.png",
];
const Sponsors_names = [
  '"Connecting places... connecting lives"',
  "BIHAR RAJYA PUL NIRMAN NIGAM LTD.",
  "CENTRAL BANK OF INDIA",
  "DAINIK JAGRAN",
  "PROHIBITION AND EXCISE DEPARTMENT",
  "LIVE DAINIK",
  "PATNA PRESS",
  "IDBI BANK",
  "RiteBite Max Protein",
  "Sudha",
  "Axis Bank",
  // "Pepsi",
  "TiQr",
  "Bihar State Electronics Development Corporation Limited",
  // "Comfed",
  "ICICI Bank",
  "Bank of India",
];

const Clients = () => {
  return (
    <section className="py-16 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#050505] text-white py-16 font-sans relative ">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none opacity-40"
            style={{
              background:
                "radial-gradient(circle at center top, #69371c 0%, transparent 30%)",
            }}
          />
          <div className="container mx-auto px-6 text-center mt-6">
            <p className="text-gray-500 text-[10px] tracking-[0.5em] font-bold uppercase mb-4">
              Collaborating with the best
            </p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase">
              Prakrida <span className="text-orange-400">2K26</span>
            </h1>
            <h3 className="text-white/40 text-[10px] font-bold tracking-[0.5em] uppercase mb-6">
              — Powered By —
            </h3>
            <div className="flex overflow-visible mt-16">
              <div className="flex w-max gap-10 animate-marquee hover:[animation-play-state:paused] overflow-visible">
                {[...logos, ...logos].map((logo, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center
                                min-w-[290px] h-[200px] max-md:min-w-[240px] max-md:h-[150px]
                                bg-white/5 border border-white/10
                                rounded-xl p-5
                                transition-all duration-300
                                hover:-translate-y-2 hover:scale-110
                                hover:z-20"
                  >
                    <img
                      src={logo}
                      alt="client"
                      className="max-h-[100px] object-contain max-md:h-[80px] bg-white/10 rounded-md p-1"
                    />

                    <div
                      className={`mt-2 text-center ${
                        index % Sponsors_names.length === 0
                          ? "text-lg font-normal"
                          : "text-sm font-bold"
                      }`}
                      style={{
                        fontFamily:
                          index % Sponsors_names.length === 0
                            ? "Mistral"
                            : "inherit",
                      }}
                    >
                      {Sponsors_names[index % Sponsors_names.length]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
