import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView, animate } from "framer-motion";

export const easing = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export function Reveal({ children, delay = 0, className, as: Tag = motion.div, ...rest }) {
  const reduce = useReducedMotion();
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: easing, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Parallax({ children, className, offset = 40 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { y: offset }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

export function Marquee({ children, className }) {
  return (
    <div className="overflow-hidden border-y-2 border-border bg-card py-4" aria-hidden>
      <div className={`marquee gap-10 ${className || ""}`}>
        <div className="flex items-center gap-10 shrink-0">{children}</div>
        <div className="flex items-center gap-10 shrink-0">{children}</div>
      </div>
    </div>
  );
}

export function MotionCard({ children, className, delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`editorial-card p-6 md:p-8 ${className || ""}`}
      initial={reduce ? false : { opacity: 0, y: 24, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={reduce ? undefined : { y: -6, rotate: -0.5, transition: { type: "spring", stiffness: 300, damping: 22 } }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.6, ease: easing, delay }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ value, duration = 1.4, className }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(reduce || target === null ? value : 0);

  useEffect(() => {
    if (!inView || reduce || target === null) return undefined;
    const controls = animate(0, target, {
      duration,
      ease: easing,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, target, duration]);

  return (
    <span ref={ref} className={className}>
      {target === null ? value : `${display}${suffix}`}
    </span>
  );
}

export function Floaty({ children, className, delay = 0 }) {
  return (
    <motion.span
      className={`inline-block ${className || ""}`}
      animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.span>
  );
}
