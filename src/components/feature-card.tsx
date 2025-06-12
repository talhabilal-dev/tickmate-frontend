"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all duration-300 h-full">
        <CardHeader className="pb-2">
          <div className="mb-3">{icon}</div>
          <h3 className="text-xl font-semibold text-zinc-100">{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-400">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
