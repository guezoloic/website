import React, { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Window ({ open, onClose, children }: SectionProps) {
   useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-10 bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3
          }}
        >
          <div className="h-full overflow-y-auto text-white">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-24 py-20 md:py-32"
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};