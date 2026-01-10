import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  type: "success" | "error";
  content: ReactNode;
};

export function MessageBox({ type, content }: Props) {
  return (
    <div
      className={cn("bg-accent px-4 py-2 my-2 rounded-lg", {
        "text-red-500": type === "error",
      })}
    >
      {type === "success" ? "🎉" : "🚨"} {content}
    </div>
  );
}
