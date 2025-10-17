import type { InFormSection } from "../../molecule/Form";

export type ButtonAction = { label: string; onClick: () => void; variant?: "primary" | "secondary" | "danger" | "outline"; }



export type FormTemplateProps = {
  title?: string;
  sections?: InFormSection[];
  className?: string;
  footerActions?: ButtonAction[];
}