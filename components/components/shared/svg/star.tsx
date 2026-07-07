import { Props } from "./svg-props";
import { motion } from "motion/react";

interface StarProps extends Props {
  filled?: boolean;
}

export default function StarIcon({
  className,
  filled = false,
  ...motionProps
}: StarProps) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...motionProps}
    >
      <motion.path
        d="M12 2L14.9 8.63L22 9.27L16.5 14.14L18.18 21.02L12 17.27L5.82 21.02L7.5 14.14L2 9.27L9.1 8.63L12 2Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}
