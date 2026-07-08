import { SalesConsultant } from "./types/sales-consultant";

export const SALES_CONSULTANTS: SalesConsultant[] = [
  {
    id: 1,
    name: "Dimas Prakoso",
    title: "Senior Sales Consultant",
    certified: true,
    joinMonth: 3,
    joinYear: 2022,
    whatsapp: "#",
  },
  {
    id: 2,
    name: "Anisa Rahmawati",
    title: "Sales Consultant",
    certified: true,
    joinMonth: 11,
    joinYear: 2022,
    whatsapp: "#",
  },
  {
    id: 3,
    name: "Farrel Ardiansyah",
    title: "Sales Consultant",
    certified: true,
    joinMonth: 6,
    joinYear: 2023,
    whatsapp: "#",
  },
  {
    id: 4,
    name: "Clara Yohana",
    title: "EV Product Specialist",
    certified: true,
    joinMonth: 1,
    joinYear: 2024,
    whatsapp: "#",
  },
];

const MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function formatJoinDate(month: number, year: number) {
  const label = MONTHS_ID[month - 1] ?? "";
  return `${label} ${year}`;
}
