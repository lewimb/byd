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
            <MapPin className={cn(iconStyling, "mt-0.5")} />
            <p className="min-w-0 wrap-break-word">
              {FOOTER.contact.address.street}, {FOOTER.contact.address.city}
            </p>
          </div>
        </div>
        <div className={pinStyling}>
          <Phone className={iconStyling} />
          <p className="min-w-0 wrap-break-word">{FOOTER.contact.phone}</p>
        </div>
        <div className={pinStyling}>
          <Mail className={iconStyling} />
          <p className="min-w-0 wrap-break-word">{FOOTER.contact.email}</p>
        </div>
      </div>
    </>
  );
}
