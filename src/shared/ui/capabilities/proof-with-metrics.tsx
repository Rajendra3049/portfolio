"use client";

import { memo, useMemo } from "react";
import { AnimatedCounter } from "@/shared/ui/animated-counter";

type ProofPart =
  | { type: "text"; value: string }
  | { type: "metric"; prefix: string; value: number; suffix: string };

const METRIC_PATTERN = /(~?)(\d+)(K\+|%|\+)?/g;

const parseProof = (proof: string): ProofPart[] => {
  const parts: ProofPart[] = [];
  let lastIndex = 0;

  for (const match of proof.matchAll(METRIC_PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push({ type: "text", value: proof.slice(lastIndex, index) });
    }
    parts.push({
      type: "metric",
      prefix: match[1] ?? "",
      value: Number.parseInt(match[2] ?? "0", 10),
      suffix: match[3] ?? "",
    });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < proof.length) {
    parts.push({ type: "text", value: proof.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: "text", value: proof }];
};

type ProofWithMetricsProps = {
  proof: string;
};

export const ProofWithMetrics = memo(({ proof }: ProofWithMetricsProps) => {
  const parts = useMemo(() => parseProof(proof), [proof]);

  return (
    <>
      {parts.map((part, index) => {
        if (part.type === "text") {
          return <span key={`text-${index}`}>{part.value}</span>;
        }

        return (
          <span key={`metric-${index}`} className="font-medium text-emerald-300/90">
            {part.prefix}
            <AnimatedCounter value={part.value} durationMs={900} />
            {part.suffix}
          </span>
        );
      })}
    </>
  );
});

ProofWithMetrics.displayName = "ProofWithMetrics";
