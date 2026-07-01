"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Code2, FileText, Mail } from "lucide-react";
import type { ContactActionId } from "@/content/contact/contact";
import { cn } from "@/shared/lib/utils";

type ContactAnimatedIconProps = {
  id: ContactActionId;
  className?: string;
  isHovered?: boolean;
};

const iconMap = {
  email: Mail,
  linkedin: Briefcase,
  resume: FileText,
  github: Code2,
} as const;

const getHoverMotion = (id: ContactActionId, isHovered: boolean) => {
  if (!isHovered) {
    return { scale: 1, y: 0, rotate: 0, rotateY: 0, rotateX: 0 };
  }

  switch (id) {
    case "email":
      return {
        scale: [1, 1.08, 1],
        transition: { duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" as const },
      };
    case "linkedin":
      return {
        y: -3,
        transition: { type: "spring" as const, stiffness: 360, damping: 22 },
      };
    case "resume":
      return {
        rotateY: 12,
        rotateX: -6,
        transition: { type: "spring" as const, stiffness: 320, damping: 20 },
      };
    case "github":
      return {
        rotate: 8,
        transition: { type: "spring" as const, stiffness: 340, damping: 22 },
      };
    default:
      return { scale: 1 };
  }
};

export const ContactAnimatedIcon = memo(
  ({ id, className, isHovered = false }: ContactAnimatedIconProps) => {
    const shouldReduceMotion = useReducedMotion();
    const Icon = iconMap[id];

    if (shouldReduceMotion) {
      return <Icon className={cn("size-5", className)} aria-hidden />;
    }

    return (
      <motion.span
        className="inline-flex"
        style={{ transformPerspective: 600 }}
        animate={getHoverMotion(id, isHovered)}
      >
        <Icon className={cn("size-5", className)} aria-hidden />
      </motion.span>
    );
  },
);

ContactAnimatedIcon.displayName = "ContactAnimatedIcon";
