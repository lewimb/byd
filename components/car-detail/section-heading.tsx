import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-2xl space-y-2",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p
        className={cn(
          "text-xs sm:text-sm font-semibold tracking-widest uppercase",
          isDark ? "text-accent-glow" : "text-primary",
        )}
      >
        {eyebrow}
      </p>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{title}</h2>
      {description && (
        <p
          className={cn(
            "text-sm sm:text-base leading-relaxed",
            isDark ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
