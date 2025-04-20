"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface ProcessingAnimationProps {
  wishText: string
}

export default function ProcessingAnimation({ wishText }: ProcessingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = ["Analyzing your wish...", "Searching for similar threads...", "Generating AI insights..."]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 1000)

    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <div className="flex w-full max-w-2xl flex-col items-center rounded-lg border border-slate-200 bg-white p-8 shadow-lg">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-xl font-semibold text-slate-800">Processing your wish</h2>
        <p className="text-slate-600">"{wishText}"</p>
      </div>

      <div className="mb-8 flex w-full items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="relative flex h-24 w-24 items-center justify-center"
        >
          <div className="absolute h-full w-full rounded-full border-4 border-slate-100" />
          <motion.div
            animate={{
              background: [
                "linear-gradient(90deg, #10b981 0%, #0ea5e9 100%)",
                "linear-gradient(180deg, #10b981 0%, #8b5cf6 100%)",
                "linear-gradient(270deg, #0ea5e9 0%, #10b981 100%)",
                "linear-gradient(360deg, #8b5cf6 0%, #10b981 100%)",
              ],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            className="absolute h-full w-full rounded-full border-t-4 border-emerald-500"
          />
          <Sparkles className="h-8 w-8 text-amber-500" />
        </motion.div>
      </div>

      <div className="flex h-8 w-full max-w-md items-center justify-center">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: currentStep === index ? 1 : 0,
              y: currentStep === index ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
            className={`absolute text-center ${currentStep === index ? "block" : "hidden"}`}
          >
            <p className="text-slate-700">{step}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
