import type { CarDetail } from "@/lib/types/car-detail";

const PLACEHOLDER_BG = "241f47";
const PLACEHOLDER_FG = "f5f1e6";

function placeholder(width: number, height: number, label: string) {
  const text = encodeURIComponent(label);
  return `https://placehold.co/${width}x${height}/${PLACEHOLDER_BG}/${PLACEHOLDER_FG}?text=${text}`;
}

export const carDetails: CarDetail[] = [
  {
    id: "4",
    name: "BYD Sealion 7",
    tagline: "SUV elektrik AWD untuk mobilitas kelas atas yang senyap dan bertenaga.",
    category: "SUV Elektrik",
    variants: [
      {
        name: "Premium",
        battery: "82.5 kWh Blade Battery",
        drivetrain: "RWD · 313 hp",
        price: { includeHomeCharging: 629000000, includeHomeChargingWithKwhMeter: 635500000 },
      },
      {
        name: "Performance AWD",
        battery: "82.5 kWh Blade Battery",
        drivetrain: "AWD · 523 hp",
        price: { includeHomeCharging: 719000000, includeHomeChargingWithKwhMeter: 725500000 },
      },
    ],
    highlights: [
      {
        title: "Jarak Tempuh hingga 482 km",
        description: "Blade Battery berkapasitas besar untuk perjalanan jauh tanpa cemas kehabisan daya.",
      },
      {
        title: "Pengisian Cepat 30 Menit",
        description: "Fast charging DC mengisi baterai dari 30% ke 80% hanya dalam setengah jam.",
      },
      {
        title: "Akselerasi 0-100 km/j 4.5 Detik",
        description: "Dual motor AWD menghasilkan tenaga instan dan pengendalian presisi di semua kondisi jalan.",
      },
      {
        title: "Struktur Bodi Ultra Aman",
        description: "Rangka Blade Battery terintegrasi meningkatkan rigiditas bodi dan proteksi benturan.",
      },
      {
        title: "Kabin Lapang Serba Digital",
        description: "Layar putar 15.6 inci dan head-up display menghadirkan pengalaman berkendara futuristik.",
      },
      {
        title: "Desain Aerodinamis",
        description: "Koefisien drag rendah untuk efisiensi energi dan pengalaman berkendara yang senyap.",
      },
    ],
    exteriorFeatures: [
      "Velg alloy 20 inci",
      "Lampu LED matrix adaptif",
      "Panoramic sunroof kaca lebar",
      "Flush door handle elektrik",
      "Roof rail integrasi aerodinamis",
      "Kaca privasi UV protection",
    ],
    interiorFeatures: [
      "Jok kulit vegan berventilasi",
      "Kursi pengemudi elektrik 8-way",
      "Ambient lighting 64 warna",
      "Wireless charging ganda",
      "Sistem audio premium 12 speaker",
      "AC digital dua zona",
    ],
    safetyFeatures: [
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "360° Around View Monitor",
      "Blind Spot Detection",
      "Automatic Emergency Braking",
      "8 Airbag",
    ],
    technology: [
      "Layar sentuh putar 15.6 inci",
      "DiPilot Advanced Driving Assist",
      "Head-Up Display",
      "NFC & Face ID Key",
      "Over-the-Air Update",
      "Konektivitas Smartphone Penuh",
    ],
    colors: {
      premiumExtendedRange: ["Atlantis Grey", "Cosmos Black", "Aurora White"],
      dynamicStandardRange: ["Coral Pink", "Ski White", "Skye Blue"],
    },
    dimensions: {
      length: 4830,
      width: 1925,
      height: 1620,
      wheelbase: 2930,
    },
    images: {
      hero: placeholder(1920, 1080, "BYD Sealion 7"),
      exterior: [
        placeholder(1200, 900, "Sealion 7 Depan"),
        placeholder(1200, 900, "Sealion 7 Samping"),
        placeholder(1200, 900, "Sealion 7 Belakang"),
        placeholder(1200, 900, "Sealion 7 Velg"),
      ],
      interior: [
        placeholder(1200, 900, "Sealion 7 Dashboard"),
        placeholder(1200, 900, "Sealion 7 Kabin"),
        placeholder(1200, 900, "Sealion 7 Jok"),
      ],
    },
    brochure: {
      pdf: "",
    },
  },
  {
    id: "3",
    name: "BYD Seal",
    tagline: "Sedan sport listrik dengan performa tinggi dan akselerasi luar biasa.",
    category: "Sedan Elektrik",
    variants: [
      {
        name: "Dynamic",
        battery: "61.4 kWh Blade Battery",
        drivetrain: "RWD · 313 hp",
      },
      {
        name: "Performance AWD",
        battery: "82.5 kWh Blade Battery",
        drivetrain: "AWD · 530 hp",
        price: { includeHomeCharging: 750000000, includeHomeChargingWithKwhMeter: 756500000 },
      },
    ],
    highlights: [
      {
        title: "Jarak Tempuh hingga 570 km",
        description: "Efisiensi tinggi berkat platform e-Platform 3.0 dan desain aerodinamis rendah hambatan.",
      },
      {
        title: "Akselerasi 0-100 km/j 3.8 Detik",
        description: "Performa sekelas sport car dengan respons motor listrik yang instan.",
      },
      {
        title: "Pengisian Cepat DC",
        description: "Isi daya dari 30% ke 80% dalam waktu singkat berkat arsitektur 800V.",
      },
      {
        title: "Handling CTB Presisi",
        description: "Teknologi Cell-to-Body meningkatkan rigiditas dan keseimbangan berkendara 50:50.",
      },
      {
        title: "Kabin Premium Senyap",
        description: "Insulasi akustik menyeluruh untuk pengalaman berkendara setenang kabin eksekutif.",
      },
      {
        title: "Desain Ikonik Ocean Aesthetics",
        description: "Siluet sedan sport dengan garis bodi terinspirasi dari gelombang laut.",
      },
    ],
    exteriorFeatures: [
      "Velg alloy 19 inci",
      "Lampu LED signature menyatu",
      "Panoramic glass roof",
      "Flush door handle elektrik",
      "Spoiler belakang aktif",
      "Kaca privasi UV protection",
    ],
    interiorFeatures: [
      "Jok kulit Nappa berventilasi",
      "Kursi depan elektrik dengan memori",
      "Ambient lighting dinamis",
      "Wireless charging ganda",
      "Sistem audio premium 12 speaker",
      "Panel kayu & aluminium premium",
    ],
    safetyFeatures: [
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "360° Around View Monitor",
      "Blind Spot Detection",
      "Automatic Emergency Braking",
      "8 Airbag",
    ],
    technology: [
      "Layar sentuh putar 15.6 inci",
      "DiPilot Advanced Driving Assist",
      "Head-Up Display",
      "NFC & Face ID Key",
      "Over-the-Air Update",
      "Sistem Audio Premium Dirac",
    ],
    colors: {
      premiumExtendedRange: ["Cosmos Black", "Atlantis Grey", "Arctic Blue"],
      dynamicStandardRange: ["Ski White", "Coral Pink"],
    },
    dimensions: {
      length: 4800,
      width: 1875,
      height: 1460,
      wheelbase: 2920,
    },
    images: {
      hero: placeholder(1920, 1080, "BYD Seal"),
      exterior: [
        placeholder(1200, 900, "Seal Depan"),
        placeholder(1200, 900, "Seal Samping"),
        placeholder(1200, 900, "Seal Belakang"),
        placeholder(1200, 900, "Seal Velg"),
      ],
      interior: [
        placeholder(1200, 900, "Seal Dashboard"),
        placeholder(1200, 900, "Seal Kabin"),
        placeholder(1200, 900, "Seal Jok"),
      ],
    },
    brochure: {
      pdf: "",
    },
  },
  {
    id: "1",
    name: "BYD Dolphin",
    tagline: "Hatchback stylish dengan kabin luas dan fitur canggih untuk anak muda dan keluarga muda.",
    category: "Hatchback Elektrik",
    variants: [
      {
        name: "Dynamic",
        battery: "44.9 kWh Blade Battery",
        drivetrain: "RWD · 95 hp",
      },
      {
        name: "Premium",
        battery: "60.5 kWh Blade Battery",
        drivetrain: "RWD · 174 hp",
        price: { excludeHomeCharging: 420500000, includeHomeCharging: 429000000 },
      },
    ],
    highlights: [
      {
        title: "Jarak Tempuh hingga 427 km",
        description: "Efisiensi baterai tinggi untuk mobilitas harian di dalam maupun luar kota.",
      },
      {
        title: "Pengisian Cepat DC",
        description: "Isi daya dari 30% ke 80% dalam waktu singkat lewat fast charging DC.",
      },
      {
        title: "Kabin Lapang untuk Keluarga Muda",
        description: "Ruang kaki dan kepala luas berkat platform e-Platform 3.0 tanpa terowongan tengah.",
      },
      {
        title: "Desain Ocean Aesthetics",
        description: "Siluet hatchback playful dengan garis bodi terinspirasi gelombang laut.",
      },
      {
        title: "Struktur Bodi Ultra Aman",
        description: "Rangka Blade Battery terintegrasi meningkatkan rigiditas bodi dan proteksi benturan.",
      },
      {
        title: "Layar Sentuh Serba Digital",
        description: "Panel instrumen dan head unit digital penuh untuk pengalaman berkendara modern.",
      },
    ],
    exteriorFeatures: [
      "Velg alloy 17 inci",
      "Lampu LED signature menyatu",
      "Panoramic sunroof",
      "Flush door handle elektrik",
      "Body kit sporty two-tone",
      "Kaca privasi UV protection",
    ],
    interiorFeatures: [
      "Jok fabric premium berpola",
      "Kursi pengemudi elektrik",
      "Ambient lighting dinamis",
      "Wireless charging",
      "Sistem audio 8 speaker",
      "AC digital otomatis",
    ],
    safetyFeatures: [
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Rear View Camera",
      "Blind Spot Detection",
      "Automatic Emergency Braking",
      "6 Airbag",
    ],
    technology: [
      "Layar sentuh putar 12.8 inci",
      "DiPilot Driving Assist",
      "NFC & Face ID Key",
      "Over-the-Air Update",
      "Konektivitas Smartphone Penuh",
      "Panel Instrumen Digital",
    ],
    colors: {
      premiumExtendedRange: ["Cosmos Black", "Atlantis Grey"],
      dynamicStandardRange: ["Coral Pink", "Ski White", "Surf Blue", "Racing Grey"],
    },
    dimensions: {
      length: 4290,
      width: 1770,
      height: 1570,
      wheelbase: 2700,
    },
    images: {
      hero: placeholder(1920, 1080, "BYD Dolphin"),
      exterior: [
        placeholder(1200, 900, "Dolphin Depan"),
        placeholder(1200, 900, "Dolphin Samping"),
        placeholder(1200, 900, "Dolphin Belakang"),
        placeholder(1200, 900, "Dolphin Velg"),
      ],
      interior: [
        placeholder(1200, 900, "Dolphin Dashboard"),
        placeholder(1200, 900, "Dolphin Kabin"),
        placeholder(1200, 900, "Dolphin Jok"),
      ],
    },
    brochure: {
      pdf: "",
    },
  },
  {
    id: "2",
    name: "BYD Atto 3",
    tagline: "SUV elektrik dengan desain futuristik, cocok untuk Anda yang mengutamakan kenyamanan dan performa.",
    category: "SUV Elektrik",
    variants: [
      {
        name: "Dynamic",
        battery: "49.9 kWh Blade Battery",
        drivetrain: "FWD · 174 hp",
      },
      {
        name: "Premium",
        battery: "60.5 kWh Blade Battery",
        drivetrain: "FWD · 201 hp",
        price: { excludeHomeCharging: 415000000, includeHomeCharging: 423500000 },
      },
    ],
    highlights: [
      {
        title: "Jarak Tempuh hingga 480 km",
        description: "Blade Battery efisien untuk perjalanan jauh dengan konsumsi daya rendah.",
      },
      {
        title: "Pengisian Cepat DC",
        description: "Isi daya dari 30% ke 80% dalam waktu singkat lewat fast charging DC.",
      },
      {
        title: "Kabin Futuristik Bertema",
        description: "Desain interior terinspirasi gym & musik dengan detail material premium.",
      },
      {
        title: "Struktur Bodi Ultra Aman",
        description: "Rangka Blade Battery terintegrasi meningkatkan rigiditas bodi dan proteksi benturan.",
      },
      {
        title: "Handling Nyaman Sehari-hari",
        description: "Suspensi diatur khusus untuk kenyamanan berkendara di perkotaan.",
      },
      {
        title: "Desain SUV Ekspresif",
        description: "Siluet SUV modern dengan lampu LED signature dan proporsi tegas.",
      },
    ],
    exteriorFeatures: [
      "Velg alloy 18 inci",
      "Lampu LED matrix",
      "Panoramic sunroof",
      "Flush door handle elektrik",
      "Roof rail",
      "Kaca privasi UV protection",
    ],
    interiorFeatures: [
      "Jok kulit vegan berventilasi",
      "Kursi pengemudi elektrik 6-way",
      "Ambient lighting bertema gym",
      "Wireless charging",
      "Sistem audio premium 12 speaker",
      "AC digital dua zona",
    ],
    safetyFeatures: [
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "360° Around View Monitor",
      "Blind Spot Detection",
      "Automatic Emergency Braking",
      "7 Airbag",
    ],
    technology: [
      "Layar sentuh putar 12.8 inci",
      "DiPilot Driving Assist",
      "NFC & Face ID Key",
      "Over-the-Air Update",
      "Konektivitas Smartphone Penuh",
      "Panel Instrumen Digital",
    ],
    colors: {
      premiumExtendedRange: ["Cosmos Black", "Atlantis Grey", "Shark Grey"],
      dynamicStandardRange: ["Ski White", "Boston Blue", "Parkour Red"],
    },
    dimensions: {
      length: 4455,
      width: 1875,
      height: 1615,
      wheelbase: 2720,
    },
    images: {
      hero: placeholder(1920, 1080, "BYD Atto 3"),
      exterior: [
        placeholder(1200, 900, "Atto 3 Depan"),
        placeholder(1200, 900, "Atto 3 Samping"),
        placeholder(1200, 900, "Atto 3 Belakang"),
        placeholder(1200, 900, "Atto 3 Velg"),
      ],
      interior: [
        placeholder(1200, 900, "Atto 3 Dashboard"),
        placeholder(1200, 900, "Atto 3 Kabin"),
        placeholder(1200, 900, "Atto 3 Jok"),
      ],
    },
    brochure: {
      pdf: "",
    },
  },
  {
    id: "5",
    name: "BYD M6 & Denza D9",
    tagline: "MPV mewah untuk keluarga besar atau kebutuhan korporasi dengan kenyamanan superior.",
    category: "MPV Elektrik",
    variants: [
      {
        name: "M6 Superior",
        battery: "55.4 kWh Blade Battery",
        drivetrain: "FWD · 190 hp",
        price: { excludeHomeCharging: 423000000, includeHomeCharging: 437500000 },
      },
      {
        name: "Denza D9 Flagship AWD",
        battery: "108.2 kWh Blade Battery",
        drivetrain: "AWD · 435 hp",
        price: { includeHomeCharging: 950000000 },
      },
    ],
    highlights: [
      {
        title: "Jarak Tempuh hingga 520 km",
        description: "Blade Battery berkapasitas besar untuk perjalanan jauh sekeluarga tanpa cemas.",
      },
      {
        title: "Pengisian Cepat DC",
        description: "Isi daya dari 30% ke 80% dalam waktu singkat lewat fast charging DC.",
      },
      {
        title: "Kabin Captain Seat Mewah",
        description: "Konfigurasi kursi captain seat dengan ruang legroom kelas eksekutif.",
      },
      {
        title: "Struktur Bodi Ultra Aman",
        description: "Rangka Blade Battery terintegrasi meningkatkan rigiditas bodi dan proteksi benturan.",
      },
      {
        title: "Handling Senyap & Stabil",
        description: "Insulasi akustik menyeluruh untuk kenyamanan penumpang di perjalanan panjang.",
      },
      {
        title: "Desain Elegan Korporat",
        description: "Siluet MPV premium yang cocok untuk kebutuhan keluarga besar maupun korporasi.",
      },
    ],
    exteriorFeatures: [
      "Velg alloy 19 inci",
      "Lampu LED matrix adaptif",
      "Power sliding door elektrik",
      "Panoramic sunroof kaca lebar",
      "Roof rail integrasi aerodinamis",
      "Kaca privasi UV protection",
    ],
    interiorFeatures: [
      "Captain seat kulit Nappa berventilasi",
      "Kursi baris kedua elektrik dengan pijat",
      "Ambient lighting 64 warna",
      "Wireless charging ganda",
      "Sistem audio premium 12 speaker",
      "AC digital tiga zona",
    ],
    safetyFeatures: [
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "360° Around View Monitor",
      "Blind Spot Detection",
      "Automatic Emergency Braking",
      "10 Airbag",
    ],
    technology: [
      "Layar sentuh putar 15.6 inci",
      "DiPilot Advanced Driving Assist",
      "Head-Up Display",
      "NFC & Face ID Key",
      "Over-the-Air Update",
      "Sistem Audio Premium Dirac",
    ],
    colors: {
      premiumExtendedRange: ["Cosmos Black", "Atlantis Grey", "Aurora White"],
      dynamicStandardRange: ["Ski White"],
    },
    dimensions: {
      length: 5250,
      width: 1990,
      height: 1780,
      wheelbase: 3110,
    },
    images: {
      hero: placeholder(1920, 1080, "BYD M6 Denza D9"),
      exterior: [
        placeholder(1200, 900, "M6 Denza D9 Depan"),
        placeholder(1200, 900, "M6 Denza D9 Samping"),
        placeholder(1200, 900, "M6 Denza D9 Belakang"),
        placeholder(1200, 900, "M6 Denza D9 Velg"),
      ],
      interior: [
        placeholder(1200, 900, "M6 Denza D9 Dashboard"),
        placeholder(1200, 900, "M6 Denza D9 Kabin"),
        placeholder(1200, 900, "M6 Denza D9 Jok"),
      ],
    },
    brochure: {
      pdf: "",
    },
  },
  {
    id: "6",
    name: "BYD Atto 1",
    tagline: "Compact SUV elektrik yang lincah dan efisien untuk mobilitas perkotaan.",
    category: "Compact SUV Elektrik",
    variants: [
      {
        name: "Standard 2026",
        battery: "30.0 kWh Blade Battery · Jarak 300 km",
        drivetrain: "FWD · 95 hp",
        price: { excludeHomeCharging: 199000000, includeHomeCharging: 207500000 },
      },
      {
        name: "Dynamic 2026",
        battery: "30.0 kWh Blade Battery · Jarak 300 km",
        drivetrain: "FWD · 95 hp",
        price: { excludeHomeCharging: 205000000, includeHomeCharging: 213500000 },
      },
      {
        name: "Premium 2026",
        battery: "38.8 kWh Blade Battery · Jarak 380 km",
        drivetrain: "FWD · 95 hp",
        price: { excludeHomeCharging: 245000000, includeHomeCharging: 253500000 },
      },
    ],
    highlights: [
      {
        title: "Jarak Tempuh hingga 380 km",
        description: "Varian Premium dengan baterai 38.8 kWh untuk mobilitas harian tanpa cemas kehabisan daya.",
      },
      {
        title: "Titik Masuk Termudah ke Mobil Listrik",
        description: "Harga paling terjangkau di jajaran BYD, cocok untuk yang baru pertama beralih ke EV.",
      },
      {
        title: "Efisiensi Baterai Kelas Compact",
        description: "Blade Battery ringkas namun hemat energi, ideal untuk pemakaian perkotaan sehari-hari.",
      },
      {
        title: "Struktur Bodi Ultra Aman",
        description: "Rangka Blade Battery terintegrasi meningkatkan rigiditas bodi dan proteksi benturan.",
      },
      {
        title: "Kabin Compact yang Lapang",
        description: "Desain interior efisien memaksimalkan ruang kabin meski berdimensi ringkas.",
      },
      {
        title: "Desain Playful Ocean Aesthetics",
        description: "Siluet compact SUV dengan garis bodi khas BYD yang segar dan ekspresif.",
      },
    ],
    exteriorFeatures: [
      "Velg alloy 16 inci",
      "Lampu LED signature menyatu",
      "Flush door handle elektrik",
      "Kaca privasi UV protection",
      "Body kit compact sporty",
      "Roof rail aksen",
    ],
    interiorFeatures: [
      "Jok fabric premium",
      "Kursi pengemudi manual",
      "Ambient lighting",
      "Wireless charging",
      "Sistem audio 6 speaker",
      "AC digital otomatis",
    ],
    safetyFeatures: [
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Rear View Camera",
      "Blind Spot Detection",
      "Automatic Emergency Braking",
      "4 Airbag",
    ],
    technology: [
      "Layar sentuh 10.1 inci",
      "DiPilot Driving Assist",
      "NFC & Face ID Key",
      "Over-the-Air Update",
      "Konektivitas Smartphone Penuh",
      "Panel Instrumen Digital",
    ],
    colors: {
      premiumExtendedRange: ["Cosmos Black", "Aurora White"],
      dynamicStandardRange: ["Coral Pink", "Ski White"],
    },
    dimensions: {
      length: 4020,
      width: 1720,
      height: 1590,
      wheelbase: 2500,
    },
    images: {
      hero: placeholder(1920, 1080, "BYD Atto 1"),
      exterior: [
        placeholder(1200, 900, "Atto 1 Depan"),
        placeholder(1200, 900, "Atto 1 Samping"),
        placeholder(1200, 900, "Atto 1 Belakang"),
        placeholder(1200, 900, "Atto 1 Velg"),
      ],
      interior: [
        placeholder(1200, 900, "Atto 1 Dashboard"),
        placeholder(1200, 900, "Atto 1 Kabin"),
        placeholder(1200, 900, "Atto 1 Jok"),
      ],
    },
    brochure: {
      pdf: "",
    },
  },
];

export function getCarDetailById(id: string): CarDetail | undefined {
  return carDetails.find((car) => car.id === id);
}
