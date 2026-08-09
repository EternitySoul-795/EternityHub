"use client";

import { motion } from "framer-motion";

export function FooterDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="hairline-x origin-left"
    />
  );
}
