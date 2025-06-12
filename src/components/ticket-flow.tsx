"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, FileText, User, Zap } from "lucide-react"

export default function TicketFlow() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 5)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      icon: <User className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "User Creates Ticket",
      description: "User submits a support ticket describing their issue",
      color: "text-emerald-400",
    },
    {
      icon: <Zap className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "AI Processes Ticket",
      description: "Gemini AI analyzes the ticket to extract key information",
      color: "text-violet-400",
    },
    {
      icon: <FileText className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Metadata Generated",
      description: "AI creates metadata and tags for skill matching",
      color: "text-amber-400",
    },
    {
      icon: <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Status Updated",
      description: "Ticket status changes to 'In Progress'",
      color: "text-teal-400",
    },
    {
      icon: <User className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Assigned to Expert",
      description: "Ticket is assigned to team member with matching skills",
      color: "text-rose-400",
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 overflow-hidden h-52">
      <div className="relative">
        {/* Progress bar - contained within parent */}
        <div className="absolute top-4 sm:top-6 left-0 right-0 h-1 bg-zinc-800">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
            animate={{ width: `${(step + 1) * 20}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Steps - responsive layout */}
        <div className="flex justify-between relative">
          {steps.map((s, i) => (
            <div key={i} className="relative flex w-full flex-col items-center">
              <motion.div
                className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-10 ${
                  i <= step ? "bg-zinc-900 border-2 border-emerald-500" : "bg-zinc-800 border-2 border-zinc-700"
                }`}
                animate={{
                  borderColor: i === step ? "#10b981" : i < step ? "#10b981" : "#3f3f46",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{
                    color: i <= step ? (i === step ? "#10b981" : "#10b981") : "#71717a",
                  }}
                  transition={{ duration: 0.3 }}
                  className={i <= step ? s.color : "text-zinc-500"}
                >
                  {s.icon}
                </motion.div>
              </motion.div>

              {/* Text content - hidden on mobile, visible from sm breakpoint */}
              <motion.div
                className="absolute top-10 sm:top-16 w-16 sm:w-32 md:w-48 text-center mt-4"
                animate={{
                  opacity: i === step ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
              >
                <h4 className={`text-xs sm:text-sm md:font-medium mb-1 ${i === step ? "text-white" : "text-zinc-400"}`}>
                  {s.title}
                </h4>
                <p className="text-xs text-zinc-500 hidden md:block">{s.description}</p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Mobile-only active step description */}
        <motion.div
          className="mt-24 text-center block sm:hidden"
          animate={{
            opacity: 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="font-medium text-white mb-1">{steps[step].title}</h4>
          <p className="text-sm text-zinc-500">{steps[step].description}</p>
        </motion.div>
      </div>
    </div>
  )
}
