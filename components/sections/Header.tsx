"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ToggleMenu from "@/components/ToggleMenu";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = ["About", "Skills", "Projects", "Contact"];

export function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b theme-transition"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="text-xl font-bold gradient-text">
          Portfolio
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((item, index) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex border-primary text-primary hover:bg-primary/10"
              onClick={() =>
                window.open(`${process.env.NEXT_PUBLIC_RESUME_URL}`, "_blank")
              }
            >
              Resume
            </Button>
          </motion.div>
          <div className="md:hidden">
            <ToggleMenu />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
