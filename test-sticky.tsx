import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Card({ i, progress, range, targetScale }) {
  const scale = useTransform(progress, range, [1, targetScale]);
  return (
    <div className="sticky top-0 h-screen flex items-center justify-center">
      <motion.div style={{ scale }} className="w-[80vw] h-[80vh] bg-blue-500 rounded-3xl" />
    </div>
  )
}
