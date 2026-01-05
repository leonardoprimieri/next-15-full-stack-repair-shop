"use client";

import { ButtonHTMLAttributes, ComponentProps } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  className?: string;
  variant?: ComponentProps<typeof Button>["variant"];
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function BackButton({ title, className, variant, ...props }: Props) {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      className={className}
      onClick={router.back}
      title={title}
      {...props}
    >
      {title}
    </Button>
  );
}
