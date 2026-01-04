import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  icon: LucideIcon;
  label: string;
  href?: string;
};

export function NavButton({ icon: Icon, ...props }: Props) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={props.label}
      title={props.label}
      className="rounded-full"
      asChild
    >
      {!!props.href ? (
        <Link href={props.href}>
          <Icon />
        </Link>
      ) : (
        <Icon />
      )}
    </Button>
  );
}
