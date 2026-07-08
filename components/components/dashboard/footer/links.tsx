import { FOOTER } from "@/lib/footer";
import Link from "next/link";
export default function FooterLinks() {
  return (
    <>
      <p className="font-semibold">Links</p>
      <div className="space-y-2">
        {FOOTER.links.map((link) => (
          <div
            className="text-ink-muted hover:text-accent-glow hover:underline duration-300 transition-all cursor-pointer"
            key={link.label}
          >
            <Link href={link.href}>{link.label}</Link>
          </div>
        ))}
      </div>
    </>
  );
}
