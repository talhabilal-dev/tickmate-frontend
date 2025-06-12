"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
              TicketMatch
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="/"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              asChild
              variant="ghost"
              className="text-zinc-300 hover:text-white hover:bg-zinc-800"
            >
              <Link href="/auth">Log In</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0"
            >
              <Link href="/auth">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-300"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-zinc-900 border-b border-zinc-800"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link
                href="/"
                className="block py-2 text-zinc-300 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/"
                className="block py-2 text-zinc-300 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/"
                className="block py-2 text-zinc-300 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/"
                className="block py-2 text-zinc-300 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 flex flex-col space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-zinc-700 text-zinc-800 hover:text-white hover:bg-zinc-800"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/auth">Log In</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/auth">Sign Up</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
