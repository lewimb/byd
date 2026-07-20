import FooterAddress from "../components/dashboard/footer/address";
import FooterSchedule from "../components/dashboard/footer/schedule";
import FooterLinks from "../components/dashboard/footer/links";
import FooterSocialMedia from "../components/dashboard/footer/social-media";
import { cn } from "@/lib/utils";
import { BydLogo } from "../components/shared/svg/byd-logo";

export interface FooterProps {
  pinStyling: string;
  iconStyling: string;
}

const WRAPPER =
  "min-w-0 space-y-6 text-sm border-b border-white/10 pb-8 last:border-b-0 last:pb-0 lg:border-b-0 lg:border-r lg:pb-0";
const PIN_WRAPPER = "flex gap-2 items-center";
const ICON_STYLING = "text-accent-glow size-4 shrink-0";

export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-ink space-y-8">
      <div className="shell space-y-8">
        <BydLogo className={cn("w-30 h-fit text-ink-foreground object-cover")} />
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-ink-foreground gap-4 gap-y-8 sm:gap-y-6">
          <div className={WRAPPER}>
            <FooterAddress pinStyling={PIN_WRAPPER} iconStyling={ICON_STYLING} />
          </div>
          <div className={WRAPPER}>
            <FooterSchedule />
          </div>
          {/* Link */}
          <div className={WRAPPER}>
            <FooterLinks />
          </div>
          {/* Social media */}
          <div className={WRAPPER}>
            <FooterSocialMedia />
          </div>
        </section>
      </div>
    </footer>
  );
}
