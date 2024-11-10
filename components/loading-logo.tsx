"use client";

import { motion } from "framer-motion";
import { Logo } from "./logo";

export function LoadingLogo() {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ 
          scale: [0.8, 1.1, 0.9, 1],
          rotate: [0, 0, 0, 0]
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <Logo size="xlarge" animated={true} />
      </motion.div>
      <motion.div
        className="mt-8 flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="h-1.5 w-48 bg-primary/10 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ 
              width: "100%",
              transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          />
        </motion.div>
        <motion.p
          className="mt-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}