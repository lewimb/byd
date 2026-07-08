import { BadgeCheck, CalendarDays, PhoneCall } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { formatJoinDate } from "@/lib/sales-consultants";
import type { SalesConsultant } from "@/lib/types/sales-consultant";
import { cn } from "@/lib/utils";
import CertifiedBadge from "./certified-badge";

const AVATAR_THEMES = [
  "from-primary/25 via-accent/20 to-secondary",
  "from-accent/30 via-primary/15 to-muted",
  "from-secondary via-accent/25 to-primary/20",
  "from-muted via-secondary to-accent/25",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

interface ConsultantCardProps {
  consultant: SalesConsultant;
  index: number;
}

export default function ConsultantCard({ consultant, index }: ConsultantCardProps) {
  const firstName = consultant.name.split(" ")[0];
  const avatarTheme = AVATAR_THEMES[index % AVATAR_THEMES.length];

  return (
    <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-border p-6 text-center transition-colors hover:border-primary/40">
      <div className="relative">
        <div
          className={cn(
            "flex size-20 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold text-foreground",
            avatarTheme,
          )}
        >
          {getInitials(consultant.name)}
        </div>
        {consultant.certified && (
          <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-primary ring-2 ring-background">
            <BadgeCheck className="size-3.5 text-primary-foreground" />
          </span>
        )}
      </div>

      <div className="space-y-1">
        <p className="font-semibold">{consultant.name}</p>
        <p className="text-sm text-muted-foreground">{consultant.title}</p>
      </div>

      {consultant.certified && <CertifiedBadge />}

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <CalendarDays className="size-3.5 shrink-0" />
        <span>Bergabung sejak {formatJoinDate(consultant.joinMonth, consultant.joinYear)}</span>
      </div>

      <Link
        href={consultant.whatsapp}
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-auto w-full")}
      >
        <PhoneCall />
        Konsultasi dengan {firstName}
      </Link>
    </div>
  );
}
