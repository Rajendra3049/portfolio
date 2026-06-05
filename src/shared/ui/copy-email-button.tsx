"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

type CopyEmailButtonProps = {
  email: string;
  className?: string;
};

export const CopyEmailButton = ({ email, className }: CopyEmailButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className={cn(className)}
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      {copied ? "Copied" : "Copy email"}
    </Button>
  );
};
