import AccordionComponent from "../components/shared/accordion";
import { AccordionFAQ } from "@/lib/accordion-items";

export default function FAQ() {
  return (
    <section className="p-8 flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">FAQ</h2>
      <AccordionComponent className="cursor-pointer" items={AccordionFAQ} />
    </section>
  );
}
