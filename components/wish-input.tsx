"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles } from "lucide-react"

interface WishInputProps {
  onSubmit: (wish: string) => void
}

export default function WishInput({ onSubmit }: WishInputProps) {
  const [wishText, setWishText] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (wishText.trim()) {
      onSubmit(wishText.trim())
    }
  }

  return (
    <motion.div
      className="w-full max-w-2xl"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative mb-2">
        <motion.div
          className="absolute -inset-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-70 blur-lg"
          animate={{
            opacity: isFocused ? 0.7 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-lg"
        >
          <h2 className="mb-2 text-xl font-semibold text-slate-800">I wish there was...</h2>
          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="a quieter vacuum cleaner"
              className="flex-1 text-lg"
              autoFocus
            />
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={!wishText.trim()}>
              Submit
            </Button>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles size={12} className="text-amber-500" />
            <span>AI will match your wish with similar ideas or create a new thread</span>
          </div>
        </form>
      </div>
      <div className="mt-6 text-center text-sm text-slate-500">
        <p>No login required. Just share your wish and join the conversation.</p>
      </div>
    </motion.div>
  )
}
