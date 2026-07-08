export interface CarVariant {
  name: string;
  battery: string;
  drivetrain: string;
}

export interface CarHighlight {
  title: string;
  description: string;
}

export interface CarColorPalette {
  premiumExtendedRange: string[];
  dynamicStandardRange: string[];
}

export interface CarDimensions {
  length: number;
  width: number;
  height: number;
  wheelbase: number;
}

export interface CarImages {
  hero: string;
  exterior: string[];
  interior: string[];
}

export interface CarBrochure {
  pdf: string;
}

export interface CarDetail {
  id: string;
  name: string;
  tagline: string;
  category: string;

  variants: CarVariant[];
  highlights: CarHighlight[];

  exteriorFeatures: string[];
  interiorFeatures: string[];
  safetyFeatures: string[];
  technology: string[];

  colors: CarColorPalette;
  dimensions: CarDimensions;
  images: CarImages;
  brochure: CarBrochure;
}
