import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../utils";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const footerVariants = cva(
  "w-full border-t py-6 px-4 md:px-8 flex flex-col gap-6",
  {
    variants: {
      variant: {
        light: "bg-secondary text-white border-white",
        dark: "bg-primary text-white border-white",
      },
      align: {
        left: "items-start text-left",
        center: "items-center text-center",
        right: "items-end text-right",
      },
    },
    defaultVariants: {
      variant: "light",
      align: "center",
    },
  }
);

export interface FooterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {
  brand?: React.ReactNode;
  links?: { label: string; href: string }[];
  socials?: { type: "facebook" | "twitter" | "instagram" | "youtube"; href: string }[];
  copyright?: string;
}

 const Footer: React.FC<FooterProps> = ({
  brand,
  links,
  socials,
  copyright,
  variant,
  align,
  className,
  ...props
}) => {
  return (
    <footer
      className={cn(footerVariants({ variant, align }), className)}
      {...props}
    >
      {/* Branding */}
      {brand && <div className="text-lg font-semibold">{brand}</div>}

      {/* Navigation */}
      {links && (
        <nav className="flex flex-wrap justify-center gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm hover:text-gray-50 dark:hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

      {/* Social icons */}
      {socials && (
        <div className="flex gap-4">
          {socials.map((s) => {
            const Icon =
              s.type === "facebook"
                ? Facebook
                : s.type === "twitter"
                ? Twitter
                : s.type === "instagram"
                ? Instagram
                : Youtube;
            return (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-white transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      )}

      {/* Copyright */}
      {copyright && (
        <div className="text-xs text-white dark:text-gray-50 mt-2">
          {copyright}
        </div>
      )}
    </footer>
  );
};

export default Footer;