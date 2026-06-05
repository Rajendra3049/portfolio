"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";

type CopyEmailButtonProps = {
  email: string;
};

export const CopyEmailButton = ({ email }: CopyEmailButtonProps) => {
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
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      {copied ? "Copied" : "Copy email"}
    </Button>
  );
};
