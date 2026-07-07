"use client";

import { motion } from "motion/react";
import WhatsappIcon from "./svg/whatsapp";

export default function WhatsappButton() {
  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="fixed z-20 bottom-8 right-8 bg-green-500 cursor-pointer text-white p-3 rounded-full flex items-center gap-3 overflow-hidden"
    >
      <WhatsappIcon
        className="text-white size-7 shrink-0"
        variants={{
          rest: { rotate: 0 },
          hover: { rotate: 360 },
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <motion.span
        variants={{
          rest: { width: 0, opacity: 0 },
          hover: { width: "auto", opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="font-semibold text-sm whitespace-nowrap"
      >
        Whatsapp
      </motion.span>
    </motion.button>
  );
}
