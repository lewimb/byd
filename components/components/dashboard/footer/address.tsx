import { FOOTER } from "@/lib/footer";
import { cn } from "@/lib/utils";
import { MapPin, Phone, Mail } from "lucide-react";
import { FooterProps } from "@/components/sections/footer";

export default function FooterAddress({
  pinStyling,
  iconStyling,
}: FooterProps) {
  return (
    <>
      <div className="lg:pl-2 space-y-4 text-ink-muted">
        <div className="space-y-1">
          <div className={cn(pinStyling, "items-start")}>
            <MapPin className={iconStyling} />
            <p>
              {FOOTER.contact.address.city}
              {FOOTER.contact.address.street}
            </p>
          </div>
        </div>
        <div className={pinStyling}>
          <Phone className={iconStyling} />
          <p>{FOOTER.contact.phone}</p>
        </div>
        <div className={pinStyling}>
          <Mail className={iconStyling} />
          <p>{FOOTER.contact.email}</p>
        </div>
      </div>
    </>
  );
}
