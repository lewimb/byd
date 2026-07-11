const SEAL_COLOR_PHOTOS: Record<string, string> = {
  "Cosmos Black": "/assets/cars/seal-colors/cosmos-black.png",
  "Atlantis Grey": "/assets/cars/seal-colors/atlantis-grey.png",
  "Arctic Blue": "/assets/cars/seal-colors/arctic-blue.png",
  "Ski White": "/assets/cars/seal-colors/ski-white.png",
};

/** carId -> color name -> real product photo. Only populated for cars with real photography so far. */
const CAR_COLOR_PHOTOS: Record<string, Record<string, string>> = {
  "3": SEAL_COLOR_PHOTOS, // BYD Seal
};

/** Real photo for a car's color variant, if one exists yet. Callers fall back to the generic silhouette when this returns undefined. */
export function getColorPhoto(carId: string, colorName: string): string | undefined {
  return CAR_COLOR_PHOTOS[carId]?.[colorName];
}
