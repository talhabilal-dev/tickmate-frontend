import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: string; // Tailwind class like "text-yellow-400"
  description?: string; // e.g. "Active tickets"
  change?: string; // "+15.2%" or "-2%"
  delay?: number;
  variant?: "user" | "admin";
}

export default function StatsCard({
  title,
  value,
  icon,
  color = "text-white",
  description,
  change,
  delay = 0,
  variant = "user",
}: StatsCardProps) {
  const isPositive = change?.startsWith("+");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-400">
            {title}
          </CardTitle>
          {icon}
        </CardHeader>

        <CardContent>
          <div className={`text-2xl font-bold ${color}`}>{value}</div>

          {description && (
            <p className="text-xs text-zinc-500 mt-1">{description}</p>
          )}

          {variant === "user" && change && (
            <div className="flex items-center mt-3">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-emerald-400 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
              )}
              <span
                className={`text-sm font-medium ${
                  isPositive ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {change}
              </span>
              <span className="text-sm text-zinc-500 ml-1">
                from last 7 days
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
