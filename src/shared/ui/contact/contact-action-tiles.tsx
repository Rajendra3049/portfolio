"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ContactAction } from "@/content/contact/contact";
import {
  contactGridVariants,
  contactReducedVariants,
  contactTileVariants,
} from "@/shared/lib/motion/contact-variants";
import { ContactCard } from "@/shared/ui/contact/contact-card";

type ContactActionTilesProps = {
  actions: readonly ContactAction[];
};

export const ContactActionTiles = memo(({ actions }: ContactActionTilesProps) => {
  const shouldReduceMotion = useReducedMotion();
  const gridVariants = shouldReduceMotion ? contactReducedVariants : contactGridVariants;
  const tileVariants = shouldReduceMotion ? contactReducedVariants : contactTileVariants;

  if (shouldReduceMotion) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-9 sm:grid-cols-2 sm:gap-7 lg:gap-8">
        {actions.map((action, index) => (
          <div key={action.id} className="h-full min-w-0">
            <ContactCard action={action} index={index} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="mt-8 grid grid-cols-1 gap-6 sm:mt-9 sm:grid-cols-2 sm:gap-7 lg:gap-8"
      variants={gridVariants}
    >
      {actions.map((action, index) => (
        <motion.div key={action.id} variants={tileVariants} className="h-full min-w-0">
          <ContactCard action={action} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
});

ContactActionTiles.displayName = "ContactActionTiles";
