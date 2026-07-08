import { FOOTER } from "@/lib/footer";
import Link from "next/link";

export default function FooterSocialMedia() {
  return (
    <>
      <p className="font-semibold">Social Media</p>
      <div className="space-y-4">
        {FOOTER.socials.map((social, idx) => (
          <Link
            className="flex gap-2 items-center group"
            key={idx}
            href={social.url}
          >
            <social.icon className="size-5 shrink-0" />
            <p className="text-ink-muted group-hover:text-accent-glow duration-300">
              {social.username}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
