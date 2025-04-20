"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Users, ThumbsUp, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ThreadCreationProps {
  initialWish: string
  questionHistory: Array<{ question: string; answer: string }>
  onReset: () => void
}

export default function ThreadCreation({ initialWish, questionHistory, onReset }: ThreadCreationProps) {
  const [comment, setComment] = useState("")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-lg">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-slate-800">New Product Thread</h2>
            <Button variant="outline" size="sm" className="gap-1">
              <Users className="h-4 w-4" />
              <span>Follow</span>
            </Button>
          </div>
          <p className="text-slate-600">
            We couldn't find a product that matches your description. Let's create a thread to discuss it!
          </p>
        </div>

        <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-2">Product Wish</h3>
          <p className="text-slate-700 mb-4">"{initialWish}"</p>

          <h4 className="font-medium text-slate-700 mb-2">Additional Details</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            {questionHistory.map((item, index) => (
              <li key={index}>
                <span className="font-medium">{item.question}</span> {item.answer}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-slate-800 mb-3">Discussion</h3>

          <div className="space-y-4">
            <div className="flex gap-3">
              <Avatar>
                <AvatarFallback>TT</AvatarFallback>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
              </Avatar>
              <div className="flex-1">
                <div className="bg-slate-50 rounded-lg p-3 mb-2">
                  <div className="font-medium text-slate-800 mb-1">ThinkThread</div>
                  <p className="text-slate-600">
                    This thread has been created because we couldn't find an existing product that matches your
                    description. Others looking for similar products will be directed here.
                  </p>
                </div>
                <div className="flex gap-2 text-xs text-slate-500">
                  <button className="flex items-center gap-1 hover:text-slate-700">
                    <ThumbsUp className="h-3 w-3" />
                    <span>Like</span>
                  </button>
                  <span>Just now</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Avatar>
                <AvatarFallback>AI</AvatarFallback>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
              </Avatar>
              <div className="flex-1">
                <div className="bg-emerald-50 rounded-lg p-3 mb-2 border border-emerald-100">
                  <div className="font-medium text-slate-800 mb-1">AI Assistant</div>
                  <p className="text-slate-600">
                    Based on your description, it seems you're looking for a product that doesn't exist yet. This could
                    be a great opportunity for innovation! Would you like to share more details about what features
                    would make this product ideal for you?
                  </p>
                </div>
                <div className="flex gap-2 text-xs text-slate-500">
                  <button className="flex items-center gap-1 hover:text-slate-700">
                    <ThumbsUp className="h-3 w-3" />
                    <span>Like</span>
                  </button>
                  <span>Just now</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-slate-800 mb-3">Join the conversation</h3>
          <div className="flex gap-3">
            <Avatar>
              <AvatarFallback>U</AvatarFallback>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
            </Avatar>
            <div className="flex-1">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts or ideas about this product..."
                className="mb-2 resize-none"
                rows={3}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onReset}>
                  Start New Search
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Send className="mr-2 h-4 w-4" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>1 follower</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>2 comments</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
