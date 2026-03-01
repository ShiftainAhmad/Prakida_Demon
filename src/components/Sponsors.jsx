import React from "react";

const Sponsors = () => {
  return (
    <div className="bg-[#050505] text-white py-16 font-sans relative overflow-hidden">
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle at center top, #69371c 0%, transparent 30%)' }}
      />
      <div className="container mx-auto px-6 text-center">
                  <p className="text-gray-500 text-[10px] tracking-[0.5em] font-bold uppercase mb-4">Collaborating with the best</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase">Prakrida <span className="text-orange-400">2K26</span></h1>
          <h3 className="text-white/40 text-[10px] font-bold tracking-[0.5em] uppercase mb-6">— Powered By —</h3>
        <div className="flex flex-wrap justify-center items-center gap-12">
          <div className="flex flex-col items-center">
            <img
              src="BRPNNL.jpeg"
              alt="Bihar Rajya Pul Nirman Nigam LTD."
              className="object-contain py-5 w-48 h-48 rounded-r-lg"
            />
            <p className="text-white text-l font-black tracking-tight uppercase text-center mt-2">Bihar Rajya Pul Nirman Nigam LTD.</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="Prohibition_department.jpeg"
              alt="Prohibition and Excise Department"
              className="object-contain py-5 w-48 h-48 rounded-r-lg"
            />
            <p className="text-white text-l font-black tracking-tight uppercase text-center mt-2">Prohibition and Excise Department</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="BSRDC_logo.jpeg"
              alt="BSRDC"
              className="object-contain py-5 w-48 h-48 rounded-r-lg"
            />
            {/* <p className="text-white text-l font-black tracking-tight uppercase text-center mt-2">BSRDC</p> */}
            <p className="text-white text-2xl tracking-tight normal-case text-center mt-1 mistral-font">"Connecting places... connecting lives"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sponsors;