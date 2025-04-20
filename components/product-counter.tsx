"use client"

import { motion } from "framer-motion"

interface ProductCounterProps {
  counts: number[]
}

export default function ProductCounter({ counts }: ProductCounterProps) {
  const maxCount = Math.max(...counts)

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-slate-500">Products remaining</span>
        <span className="text-xs font-medium text-slate-700">{counts[counts.length - 1]}</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-emerald-500 rounded-full"
          initial={{ width: "100%" }}
          animate={{ width: `${(counts[counts.length - 1] / maxCount) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-slate-400">
        <span>Narrowing down</span>
        <span>Starting with {counts[0]}</span>
      </div>
    </div>
  )
}
