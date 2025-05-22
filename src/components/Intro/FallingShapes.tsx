import { motion } from "framer-motion";

const letters = ["W", "E", "L", "C", "O", "M", "E", "!"];

const FallingShapes = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {letters.map((char, idx) => (
        <motion.div
          key={idx}
          className="absolute text-4xl font-bold text-blue-500"
          style={{
            left: `${12 + idx * 10}%`, // 조금씩 옆으로 퍼지게
          }}
          initial={{ y: -100, opacity: 0, rotate: -90 }}
          animate={{ y: "60vh", opacity: 1, rotate: 0 }}
          transition={{ delay: idx * 0.15, duration: 1, type: "spring" }}
        >
          {char}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingShapes;
