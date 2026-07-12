export interface ColorPhoto {
  src: string;
  width: number;
  height: number;
}

export interface AngleOption {
  key: string;
  label: string;
}

interface CarPhotoConfig {
  /** Display order for the angle picker buttons. */
  angleOrder: string[];
  angleLabels: Record<string, string>;
  /** colorName -> angleKey -> photo. A color may have some angles missing. */
  colors: Record<string, Partial<Record<string, ColorPhoto>>>;
}

const SEAL_PHOTOS: CarPhotoConfig = {
  angleOrder: ["angle7", "angle4", "angle5"],
  angleLabels: {
    angle4: "Tampak Depan",
    angle5: "Tampak Samping",
    angle7: "Tampak Menyudut",
  },
  colors: {
    "Cosmos Black": {
      angle4: { src: "/assets/cars/seal-colors/cosmos-black-angle4.png", width: 2378, height: 1775 },
      angle5: { src: "/assets/cars/seal-colors/cosmos-black-angle5.png", width: 4365, height: 1497 },
      angle7: { src: "/assets/cars/seal-colors/cosmos-black-angle7.png", width: 2949, height: 1743 },
    },
    "Atlantis Grey": {
      angle4: { src: "/assets/cars/seal-colors/atlantis-grey-angle4.png", width: 2378, height: 1775 },
      angle5: { src: "/assets/cars/seal-colors/atlantis-grey-angle5.png", width: 4365, height: 1497 },
      angle7: { src: "/assets/cars/seal-colors/atlantis-grey-angle7.png", width: 2949, height: 1743 },
    },
    "Arctic Blue": {
      angle4: { src: "/assets/cars/seal-colors/arctic-blue-angle4.png", width: 2378, height: 1775 },
      angle5: { src: "/assets/cars/seal-colors/arctic-blue-angle5.png", width: 4365, height: 1497 },
      angle7: { src: "/assets/cars/seal-colors/arctic-blue-angle7.png", width: 2949, height: 1743 },
    },
    "Ski White": {
      angle4: { src: "/assets/cars/seal-colors/ski-white-angle4.png", width: 2378, height: 1775 },
      angle5: { src: "/assets/cars/seal-colors/ski-white-angle5.png", width: 4365, height: 1497 },
      angle7: { src: "/assets/cars/seal-colors/ski-white-angle7.png", width: 2949, height: 1743 },
    },
    // Coral Pink has no real photo yet — falls back to the silhouette automatically.
  },
};

const ATTO3_PHOTOS: CarPhotoConfig = {
  angleOrder: ["hero"],
  angleLabels: {
    hero: "Tampak Menyudut",
  },
  colors: {
    "Cosmos Black": {
      hero: { src: "/assets/cars/atto3-colors/cosmos-black-hero.png", width: 2528, height: 1515 },
    },
    "Atlantis Grey": {
      hero: { src: "/assets/cars/atto3-colors/atlantis-grey-hero.png", width: 1949, height: 1134 },
    },
    "Ski White": {
      hero: { src: "/assets/cars/atto3-colors/ski-white-hero.png", width: 2527, height: 1515 },
    },
    "Boston Blue": {
      hero: { src: "/assets/cars/atto3-colors/boston-blue-hero.png", width: 2527, height: 1515 },
    },
    // Shark Grey and Parkour Red have no real photo yet — fall back to the silhouette.
  },
};

/** carId -> photo config. Only populated for cars with real photography so far. */
const CAR_PHOTO_CONFIGS: Record<string, CarPhotoConfig> = {
  "2": ATTO3_PHOTOS, // BYD Atto 3
  "3": SEAL_PHOTOS, // BYD Seal
};

/**
 * Real photo for a car's color + angle, if one exists yet. Callers fall back
 * to the generic silhouette when this returns undefined (covers both cars
 * with no photography at all, and specific colors/angles within a
 * photographed car that haven't been shot yet).
 */
export function getColorPhoto(
  carId: string,
  colorName: string,
  angleKey: string,
): ColorPhoto | undefined {
  return CAR_PHOTO_CONFIGS[carId]?.colors[colorName]?.[angleKey];
}

/** Which angles have real photography for this car, in display order. Undefined means no angle picker should render. */
export function getAvailableAngles(carId: string): AngleOption[] | undefined {
  const config = CAR_PHOTO_CONFIGS[carId];
  if (!config) return undefined;

  return config.angleOrder.map((key) => ({ key, label: config.angleLabels[key] }));
}
