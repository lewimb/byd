const SEAL_ANGLES = ["angle7", "angle4", "angle5"] as const;
type SealAngle = (typeof SEAL_ANGLES)[number];

const SEAL_ANGLE_LABELS: Record<SealAngle, string> = {
  angle4: "Tampak Depan",
  angle5: "Tampak Samping",
  angle7: "Tampak Menyudut",
};

/** Real pixel dimensions per angle (identical across colors — same base composition, just repainted). */
const SEAL_ANGLE_DIMENSIONS: Record<SealAngle, { width: number; height: number }> = {
  angle4: { width: 2378, height: 1775 },
  angle5: { width: 4365, height: 1497 },
  angle7: { width: 2949, height: 1743 },
};

const SEAL_COLOR_PHOTOS: Record<string, Record<SealAngle, string>> = {
  "Cosmos Black": {
    angle4: "/assets/cars/seal-colors/cosmos-black-angle4.png",
    angle5: "/assets/cars/seal-colors/cosmos-black-angle5.png",
    angle7: "/assets/cars/seal-colors/cosmos-black-angle7.png",
  },
  "Atlantis Grey": {
    angle4: "/assets/cars/seal-colors/atlantis-grey-angle4.png",
    angle5: "/assets/cars/seal-colors/atlantis-grey-angle5.png",
    angle7: "/assets/cars/seal-colors/atlantis-grey-angle7.png",
  },
  "Arctic Blue": {
    angle4: "/assets/cars/seal-colors/arctic-blue-angle4.png",
    angle5: "/assets/cars/seal-colors/arctic-blue-angle5.png",
    angle7: "/assets/cars/seal-colors/arctic-blue-angle7.png",
  },
  "Ski White": {
    angle4: "/assets/cars/seal-colors/ski-white-angle4.png",
    angle5: "/assets/cars/seal-colors/ski-white-angle5.png",
    angle7: "/assets/cars/seal-colors/ski-white-angle7.png",
  },
};

/** carId -> color name -> angle -> real product photo. Only populated for cars with real photography so far. */
const CAR_COLOR_PHOTOS: Record<string, Record<string, Record<SealAngle, string>>> = {
  "3": SEAL_COLOR_PHOTOS, // BYD Seal
};

export interface ColorPhoto {
  src: string;
  angleLabel: string;
  width: number;
  height: number;
}

/**
 * Real photo for a car's color variant, if one exists yet. `angleIndex` cycles
 * through the available angles (wraps with modulo) so repeated selection walks
 * around the car instead of always showing the same framing. Callers fall
 * back to the generic silhouette when this returns undefined.
 */
export function getColorPhoto(
  carId: string,
  colorName: string,
  angleIndex: number,
): ColorPhoto | undefined {
  const anglesForColor = CAR_COLOR_PHOTOS[carId]?.[colorName];
  if (!anglesForColor) return undefined;

  const angle = SEAL_ANGLES[angleIndex % SEAL_ANGLES.length];
  return {
    src: anglesForColor[angle],
    angleLabel: SEAL_ANGLE_LABELS[angle],
    ...SEAL_ANGLE_DIMENSIONS[angle],
  };
}
