import { motion } from "framer-motion";

const letters = "WELCOME!".split("");

export default function FallingText() {
  return (
    <div
      style={{
        display: "flex",
        gap: "32px",
        position: "absolute",
        bottom: "60px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 30,
      }}
    >
      {letters.map((char, i) => {
        const delay = 0.4 + i * 0.12;
        const tilt = (Math.random() - 0.5) * 38;
        return (
          <motion.div
            key={i}
            initial={{
              y: -600,
              rotate: tilt,
              scale: 1.22,
              opacity: 0,
            }}
            animate={{
              y: [ -600, 0, -180, 0, -60, 0 ],
              rotate: [ tilt, tilt, 0, 0, 0, 0 ],
              opacity: 1,
              scale: [1.22, 1, 1.09, 1, 1.01, 1],
            }}
            transition={{
              delay,
              duration: 1.8,
              times: [0, 0.5, 0.7, 0.85, 0.94, 1],
              type: "spring",
              bounce: 0.75,
              stiffness: 1050,
              damping: 16,
            }}
          >
            {char}
          </motion.div>
        );
      })}
    </div>
  );
}