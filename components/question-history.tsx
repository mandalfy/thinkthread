"use client"

import { motion } from "framer-motion"

interface QuestionHistoryProps {
  initialWish: string
  history: Array<{ question: string; answer: string }>
}

export default function QuestionHistory({ initialWish, history }: QuestionHistoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="w-full max-w-2xl mx-auto mb-6 overflow-hidden"
    >
      <div className="space-y-3">
        {/* Initial wish */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm backdrop-blur-sm"
        >
          <div className="text-sm text-slate-500">I wish there was...</div>
          <div className="font-medium text-slate-700">{initialWish}</div>
        </motion.div>

        {/* Question history */}
        {history.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1 - (history.length - index) * 0.15,
              y: 0,
              scale: 1 - (history.length - index) * 0.03,
            }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm backdrop-blur-sm"
            style={{
              filter: `blur(${(history.length - index) * 0.5}px)`,
              transform: `translateY(${(history.length - index) * -5}px) scale(${1 - (history.length - index) * 0.03})`,
            }}
          >
            <div className="text-sm text-slate-500">{item.question}</div>
            <div className="font-medium text-slate-700">{item.answer}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
