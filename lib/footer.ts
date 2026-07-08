import InstagramIcon from "@/components/components/shared/svg/instagram";
import YoutubeIcon from "@/components/components/shared/svg/youtube";
import TikTokIcon from "@/components/components/shared/svg/tiktok";
import FacebookIcon from "@/components/components/shared/svg/facebook";

export const FOOTER = {
  company: {
    name: "BYD Arista Tangerang",
    logo: "/images/logo/arista.svg",
    tagline: "Terbaik dan Terpercaya",
  },

  contact: {
    address: {
      street: "Jl. Raya Kalimalang No. 19",
      city: "Duren Sawit, Jakarta Timur 13440",
    },
    phone: "021-86601111",
    email: "info@arista-group.co.id",
  },

  workingHours: [
    {
      location: "Head Office",
      days: "Senin – Jumat",
      hours: "08:00 – 17:00",
    },
    {
      location: "Cabang",
      days: "Senin – Minggu",
      hours: "08:00 – 18:30",
    },
  ],

  links: [
    {
      label: "Beranda",
      href: "/",
    },
    {
      label: "Produk",
      href: "/produk",
    },
    {
      label: "Promo",
      href: "/promo",
    },
    {
      label: "Konsultasi Pembelian",
      href: "/konsultasi",
    },
    {
      label: "Servis",
      href: "/servis",
    },
    {
      label: "Tentang Kami",
      href: "/tentang-kami",
    },
  ],

  socials: [
    {
      platform: "Instagram",
      icon: InstagramIcon,
      username: "aristagroup.id",
      url: "https://instagram.com/aristagroup.id",
    },
    {
      platform: "Facebook",
      icon: FacebookIcon,
      username: "Arista Group",
      url: "https://facebook.com/AristaGroup",
    },
    {
      platform: "YouTube",
      icon: YoutubeIcon,
      username: "Arista Group",
      url: "https://youtube.com/@AristaGroup",
    },
    {
      platform: "TikTok",
      icon: TikTokIcon,
      username: "@aristagroup.id",
      url: "https://tiktok.com/@aristagroup.id",
    },
  ],

  copyright: {
    text: "© 2026 BYD Arista Tangerang. All Rights Reserved.",
    subtitle: "Dealer Resmi BYD Indonesia",
  },
};
