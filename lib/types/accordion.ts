import type { ReactNode } from "react";

export interface AccordionTypes {
  title: string;
  content: string | ReactNode;
  value: string;
}
