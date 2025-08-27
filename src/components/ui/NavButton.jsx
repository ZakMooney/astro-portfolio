import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useInitialAnimation } from "@/hooks/useInitialAnimation";

export default function NavButton(props) {
  const { href, exact = false, children, className = "", index = 0 } = props;
  const [isActive, setIsActive] = useState(false);

  const shouldAnimate = useInitialAnimation(href);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setIsActive(exact ? currentPath === href : currentPath.startsWith(href));
  }, [href, exact]);

  const parentDelay = 0.3;

  return (
    <motion.div
      className="inline-block"
      initial={
        shouldAnimate
          ? {
              y: -20,
            }
          : false
      }
      animate={
        shouldAnimate
          ? {
              y: 0,
            }
          : false
      }
      transition={
        shouldAnimate
          ? {
              duration: 0.6,
              ease: "easeOut",
              delay: index * 0.1 + parentDelay,
            }
          : false
      }
    >
      <motion.a
        initial={
          shouldAnimate
            ? {
                opacity: 0,
              }
            : false
        }
        animate={
          shouldAnimate
            ? {
                opacity: [0, 0.3, 0, 0.6, 0.1, 0.8, 0.4, 1],
              }
            : false
        }
        transition={
          shouldAnimate
            ? {
                duration: 0.8,
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 1],
                ease: "easeOut",
                delay: index * 0.1 + parentDelay,
              }
            : false
        }
        href={href}
        className={`
        py-2 px-4 transition-all duration-200
        text-md bold md:text-xl uppercase rounded-xs font-heading font-medium
        hover:text-white hover:bg-[#38bdf8ff]/50 hover:drop-shadow-glow
        ${
          isActive
            ? `
          bg-[#38bdf8ff]/30 text-[#ceeffdff] multi-flicker drop-shadow-glow border-[#38bdf8ff] border-t-1 border-b-1
        `.trim()
            : `text-[#38bdf8ff]`
        }
        ${className}
      `.trim()}
      >
        {children}
      </motion.a>
    </motion.div>
  );
}
