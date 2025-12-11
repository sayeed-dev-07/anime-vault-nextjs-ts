"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  text: string;
  maxChars?: number;
}
export default function ReadMoreText({ text, maxChars = 300 }: Props) {
  const [expanded, setExpanded] = useState(false);

  const isLong = text.length > maxChars;
  const shortText = text.slice(0, maxChars);
  const remainingText = text.slice(maxChars);

  return (
    <div className="space-y-2">
      <div>
        <div className="leading-relaxed text-lg whitespace-pre-line">
          {shortText}
          {!expanded && isLong && "..."}
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="leading-relaxed text-lg whitespace-pre-line">
                {remainingText}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isLong && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="text-blue-600 dark:text-blue-400 cursor-pointer font-semibold text-sm hover:underline transition-all"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}