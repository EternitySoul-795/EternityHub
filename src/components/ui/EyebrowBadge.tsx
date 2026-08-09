import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EyebrowBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400 backdrop-blur-md",
        className
      )}
    >
      {children}
    </span>
  );
}
