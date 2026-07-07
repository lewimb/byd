import { motion } from "motion/react";

export default function HeroTitle() {
  return (
    <motion.h1
      initial={{
        opacity: 0,
        translateY: 20,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
        transition: { duration: 2 },
      }}
      className="font-bold text-5xl"
    >
      <p>Build Your Dreams,</p>
      <p>mulai dari Tangerang.</p>
    </motion.h1>
  );
}
