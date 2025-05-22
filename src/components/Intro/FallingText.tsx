"use client";
import { motion } from "framer-motion";

const letters = "WELCOME!".split("");

const FallingText = () => {
  return (
    <div className="flex gap-4 z-30 absolute bottom-32 left-1/2 -translate-x-1/2">
      {letters.map((char, i) => {
        const delay = 0.45 + i * 0.15;
        const rotate = (Math.random() - 0.5) * 40;
        return (
          <motion.div
            key={i}
            initial={{
              y: -300,
              opacity: 0,
              rotate,
              scale: 1.3,
            }}
            animate={{
              y: 0,
              opacity: 1,
              rotate: 0,
              scale: 1,
              filter: "drop-shadow(0 5px 8px rgba(0,0,0,0.3))",
            }}
            transition={{
              delay,
              duration: 1,
              type: "spring",
              stiffness: 600,
              damping: 14,
            }}
            className="text-[96px] font-black text-blue-500 z-30"
            style={{
              fontFamily: "'Anton', sans-serif",
            }}
          >
            {char}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FallingText;