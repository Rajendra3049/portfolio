"use client";

import { memo, useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type ContactCopyFieldProps = {
  displayValue: string;
  copyValue: string;
  className?: string;
};

const CopyIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2" />
  </svg>
);

export const ContactCopyField = memo(
  ({ displayValue, copyValue, className }: ContactCopyFieldProps) => {
    const shouldReduceMotion = useReducedMotion();
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(
      async (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        try {
          await navigator.clipboard.writeText(copyValue);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2200);
        } catch {
          setCopied(false);
        }
      },
      [copyValue],
    );

    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border border-zinc-800/90 bg-zinc-950/70 px-3 py-2",
          className,
        )}
      >
        <p className="min-w-0 flex-1 truncate text-xs font-medium text-zinc-300" title={displayValue}>
          {displayValue}
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-zinc-800 text-zinc-400",
            "transition-[color,background-color,border-color] duration-200",
            "hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50",
            copied && "border-emerald-500/30 text-emerald-400",
          )}
          aria-label={copied ? "Copied to clipboard" : `Copy ${displayValue}`}
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <CopyIcon className="size-3.5" />
          )}
        </button>
        {!shouldReduceMotion && copied && (
          <motion.span
            className="sr-only"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            role="status"
            aria-live="polite"
          >
            Copied
          </motion.span>
        )}
      </div>
    );
  },
);

ContactCopyField.displayName = "ContactCopyField";
