"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Code,
  Ticket,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import TicketFlow from "@/components/ticket-flow";
import FeatureCard from "@/components/feature-card";
import Navbar from "@/components/navbar";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen  bg-zinc-950 text-zinc-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden md:pt-40 lg:p-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Smart Ticket Assignment
            </motion.h1>

            <motion.p
              className="text-xl text-zinc-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              AI-powered platform that matches support tickets with the perfect
              team member based on skills and expertise
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r  from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0"
              >
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-zinc-700 text-zinc-800 hover:text-zinc-100 hover:bg-zinc-800"
              >
                <Link href="/auth">Log In</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ticket Flow Animation */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-16">
              How It Works
            </h2>
            <TicketFlow />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Our platform combines AI intelligence with human expertise to
              deliver the best support experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="h-6 w-6 text-emerald-400" />}
              title="Skill Matching"
              description="Our AI analyzes ticket content and matches it with team members who have the right skills"
              delay={0.1}
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-violet-400" />}
              title="AI-Powered Analysis"
              description="Gemini AI extracts key information and metadata from tickets to improve assignment accuracy"
              delay={0.3}
            />
            <FeatureCard
              icon={<Ticket className="h-6 w-6 text-rose-400" />}
              title="Smart Ticketing"
              description="Create, track, and manage support tickets with an intuitive interface"
              delay={0.5}
            />
            <FeatureCard
              icon={<Code className="h-6 w-6 text-amber-400" />}
              title="Skill Database"
              description="Build your team's skill inventory to ensure the right person handles each request"
              delay={0.7}
            />
            <FeatureCard
              icon={<CheckCircle className="h-6 w-6 text-teal-400" />}
              title="Automated Workflow"
              description="Tickets automatically move through stages from creation to resolution"
              delay={0.9}
            />
            <FeatureCard
              icon={<ArrowRight className="h-6 w-6 text-emerald-400" />}
              title="Continuous Learning"
              description="Our system improves over time by learning from successful resolutions"
              delay={1.1}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-zinc-900 to-zinc-950">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to transform your support workflow?
            </h2>
            <p className="text-zinc-400 mb-8">
              Join thousands of teams using our AI-powered ticket assignment
              system to deliver faster, more accurate support.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0"
            >
              <Link href="/signup">Get Started Today</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">TicketMatch</h3>
              <p className="text-zinc-500 mt-2">
                © 2025 TicketMatch. All rights reserved.
              </p>
            </div>
            <div className="flex gap-8">
              <Link
                href="/about"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/features"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
