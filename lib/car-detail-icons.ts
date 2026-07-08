import {
  Armchair,
  Battery,
  Camera,
  Car,
  Cpu,
  Gauge,
  LayoutGrid,
  type LucideIcon,
  MapPin,
  PlugZap,
  Ruler,
  Shield,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Sun,
  Volume2,
  Wifi,
  Wind,
  Zap,
} from "lucide-react";

const KEYWORD_ICON_MAP: Array<{ keywords: string[]; icon: LucideIcon }> = [
  { keywords: ["baterai", "battery", "kwh", "jarak tempuh", "range"], icon: Battery },
  { keywords: ["cas", "charging", "isi daya", "800v", "dc"], icon: PlugZap },
  { keywords: ["akselerasi", "0-100", "performance", "performa", "power", "hp"], icon: Zap },
  { keywords: ["handling", "presisi", "drivetrain", "awd", "rwd", "chassis", "ctb"], icon: Gauge },
  { keywords: ["aman", "airbag", "brak", "collision", "struktur", "rigid"], icon: Shield },
  { keywords: ["safety", "assist", "monitor", "cruise", "blind spot", "lane"], icon: ShieldCheck },
  { keywords: ["kabin", "jok", "seat", "interior", "ventilasi"], icon: Armchair },
  { keywords: ["layar", "screen", "display", "head-up", "hud"], icon: LayoutGrid },
  { keywords: ["audio", "speaker", "sound", "suara"], icon: Volume2 },
  { keywords: ["konektivitas", "smartphone", "nfc", "update", "ota", "digital"], icon: Cpu },
  { keywords: ["ac", "climate", "dua zona", "udara"], icon: Wind },
  { keywords: ["sunroof", "cahaya", "light", "led"], icon: Sun },
  { keywords: ["kamera", "camera", "around view"], icon: Camera },
  { keywords: ["wifi", "koneksi"], icon: Wifi },
  { keywords: ["dimensi", "panjang", "lebar", "tinggi", "wheelbase"], icon: Ruler },
  { keywords: ["lokasi", "map", "gps"], icon: MapPin },
  { keywords: ["ac digital", "dingin", "sejuk"], icon: Snowflake },
  { keywords: ["desain", "aero", "bodi", "eksterior"], icon: Car },
];

export function getFeatureIcon(label: string): LucideIcon {
  const normalized = label.toLowerCase();
  const match = KEYWORD_ICON_MAP.find(({ keywords }) =>
    keywords.some((keyword) => normalized.includes(keyword)),
  );
  return match?.icon ?? Sparkles;
}
