import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionTypes } from "@/lib/types/accordion";
import { cn } from "@/lib/utils";

interface AccordionProps {
  className?: string;
  items: AccordionTypes[];
}

export default function AccordionComponent({
  className,
  items,
}: AccordionProps) {
  return (
    <Accordion
      className={cn("max-w-2xl space-y-3 rounded-lg border", className)}
    >
      {items.map((item) => (
        <AccordionItem
          className="border-b px-4 last:border-b-0"
          key={item.value}
          value={item.value}
        >
          <AccordionTrigger className="cursor-pointer  ">
            {item.title}
          </AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
