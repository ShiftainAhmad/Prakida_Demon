import { useRef, useCallback } from "react";
import gsap from "gsap";

const CoreTeamCard = ({ member, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        opacity: 1,
        duration: 0.3,
      });
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0.7, duration: 0.4 });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
    if (imageRef.current) {
      gsap.to(imageRef.current, { scale: 1, duration: 0.5 });
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0.4, duration: 0.4 });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    }
  }, []);

  const handleClick = useCallback(() => {
    const url = member.socials?.[0]?.url;
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }, [member.socials]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer w-25"
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Glow follower */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute w-48 h-48 rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, hsl(38 90% 55% / 0.25), transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          filter: "blur(30px)",
        }}
      />

      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden">
        <img
          ref={imageRef}
          src={member.photo}
          alt={member.name}
          className="h-full w-full object-cover transition-none"
          loading="lazy"
        />
      </div>

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(to top, hsl(220 20% 4% / 0.95) 0%, hsl(220 20% 4% / 0.3) 50%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute bottom-0 left-0 right-0 p-2 z-10 bg-black/80 backdrop-blur-3xl"
        style={{ transform: "translateY(20px)", opacity: 0.8 }}
      >
        <span className="inline-block mb-2 text-[13px] font-bold tracking-[0.17em] uppercase text-[#f19317]">
          {member.role}
        </span>
        {member.batch && (
          <span className="inline-block ml-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-[rgb(173,177,190)]">
            ({member.batch})
          </span>
        )}
        <h3 className="font-display text-xl font-semibold text-[rgb(239,236,231)] mb-1">
          {member.name}
        </h3>
        <p className="text-sm text-[rgb(129,136,152)] leading-relaxed mb-3 duration-300">
          {member.bio}
        </p>
        <div className="flex gap-3duration-500 delay-100 pb-4">
          {member.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              className="text-[12px] font-medium tracking-wider mr-3"
              style={{
                color: s.color,
              }}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border border-[rgb(43,48,59)] group-hover:border-[#F48C06]/80 transition-colors duration-300 pointer-events-none" />
    </div>
  );
};

export default CoreTeamCard;
