"use client";
import React from "react";
import { motion } from "motion/react";

interface MotionDivProps {
  children: React.ReactNode;
  top: string;
  left: string;
}

const MotionDiv = ({ children, top, left }: MotionDivProps) => {
  return (
    <motion.div initial
      className="absolute"
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
