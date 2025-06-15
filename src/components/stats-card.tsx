"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: ReactNode
  color: string
  delay?: number
}

export default function StatsCard({ title, value, change, icon, color, delay = 0 }: StatsCardProps) {
  const isPositive = change.startsWith("+")

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-400">{title}</p>
              <p className="text-2xl font-bold text-white">{value}</p>
            </div>
            <div className={`p-2 rounded-lg bg-zinc-800 ${color}`}>{icon}</div>
          </div>
          <div className="flex items-center mt-4">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-emerald-400 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
            )}
            <span className={`text-sm font-medium ${isPositive ? "text-emerald-400" : "text-red-400"}`}>{change}</span>
            <span className="text-sm text-zinc-500 ml-1">from last 7 days</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
