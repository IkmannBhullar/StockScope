import { motion } from "framer-motion";

const LampSectionHeader = ({ text }) => {
  return (
    <div className="relative w-full text-center py-12">
      {/* Glow behind text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 flex justify-center items-center"
      >
        <div className="h-32 w-32 bg-indigo-500 rounded-full blur-3xl opacity-60 animate-pulse" />
      </motion.div>

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-4xl font-bold text-white"
      >
        {text}
      </motion.h2>
    </div>
  );
};

export default LampSectionHeader;