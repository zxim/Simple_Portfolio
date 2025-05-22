import { motion } from "framer-motion";

const FONT_CLASS = "font-fredoka";

const letters = ["W", "E", "L", "C", "O", "M", "E", "!"];

const FallingShapes = () => {
  return (
    <div
      className={`
        absolute top-0 left-0 w-full h-full pointer-events-none
        bg-white dark:bg-black
      `}
    >
      {letters.map((char, idx) => (
        <motion.div
          key={idx}
          className={`
            absolute
            text-[48px] md:text-[110px]
            ${FONT_CLASS} font-bold
            text-blue-500 dark:text-sky-300
            drop-shadow-lg
          `}
          style={{
            left: `${10 + idx * 10}%`,
          }}
          initial={{ y: -120, opacity: 0, rotate: -90 }}
          animate={{ y: "58vh", opacity: 1, rotate: 0 }}
          transition={{ delay: idx * 0.13, duration: 1, type: "spring" }}
        >
          {char}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingShapes;