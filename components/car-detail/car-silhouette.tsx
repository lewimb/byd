interface CarSilhouetteProps {
  color: string;
  className?: string;
}

/** Generic side-profile EV silhouette used as a stand-in until real per-color renders exist. */
export default function CarSilhouette({ color, className }: CarSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 420 160"
      fill="none"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <ellipse cx="210" cy="146" rx="150" ry="10" fill="black" opacity="0.18" />
      <path
        d="M40 108
           C40 88 56 82 78 78
           L108 44
           C122 30 142 22 168 22
           L252 22
           C276 22 296 30 312 44
           L338 78
           C362 82 380 90 386 108
           L392 118
           C392 128 384 134 372 134
           L358 134
           C358 116 344 102 326 102
           C308 102 294 116 294 134
           L128 134
           C128 116 114 102 96 102
           C78 102 64 116 64 134
           L52 134
           C42 134 34 128 34 118
           Z"
        fill={color}
      />
      <path
        d="M120 78 L142 46 C150 36 162 32 176 32 L246 32 C258 32 270 36 278 46 L298 78 Z"
        fill="black"
        opacity="0.16"
      />
      <line x1="208" y1="32" x2="208" y2="78" stroke="black" strokeOpacity="0.16" strokeWidth="2" />
      <circle cx="96" cy="134" r="26" fill="#1b1c1f" />
      <circle cx="96" cy="134" r="12" fill="#3a3c40" />
      <circle cx="326" cy="134" r="26" fill="#1b1c1f" />
      <circle cx="326" cy="134" r="12" fill="#3a3c40" />
    </svg>
  );
}
