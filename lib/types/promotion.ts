export interface Promotion {
  id: string;
  title: string;
  tagline: string;
  /** Headline offer, e.g. "DP mulai 10%" */
  discountLabel: string;
  description: string;
  /** Bullet points rendered inside the terms accordion */
  terms: string[];
  /** Display-ready date string, e.g. "31 Agustus 2026" */
  validUntil: string;
  /** e.g. ["Semua tipe BYD"] or specific model names */
  applicableModels: string[];
}
