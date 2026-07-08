import { BadgeCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export default function CertifiedBadge() {
  return (
    <Badge variant="secondary" className="gap-1">
      <BadgeCheck className="text-primary" />
      Bersertifikat BYD
    </Badge>
  );
}
