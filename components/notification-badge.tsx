"use client";

import { motion, AnimatePresence } from "framer-motion";

interface NotificationBadgeProps {
  count: number;
}

export function NotificationBadge({ count }: NotificationBadgeProps) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          key="notification-badge"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center shadow-sm"
        >
          <motion.span 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-[10px] font-medium text-primary-foreground"
          >
            {count > 99 ? '99+' : count}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}