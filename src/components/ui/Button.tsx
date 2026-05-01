import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-[#13a538] text-white shadow-[0_14px_30px_rgba(19,165,56,0.24)] hover:bg-[#0f8f31]",
  dark: "bg-[#101513] text-white hover:bg-black",
  light: "border border-[#dfe8df] bg-white text-[#101513] hover:border-[#13a538]",
  ghost: "text-[#101513] hover:bg-[#eef8ef]",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
};

export function ButtonLink({
  className,
  variant = "primary",
  children,
  href,
  ...props
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition",
    variants[variant],
    className,
  );

  if (href.startsWith("http") || href.startsWith("tel:")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
