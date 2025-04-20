"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, ThumbsUp, Users, Sparkles, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ThreadViewProps {
  wishText: string
  matchType: "new" | "existing"
}

export default function ThreadView({ wishText, matchType }: ThreadViewProps) {
  const [commentText, setCommentText] = useState("")

  // Generate sample data based on the wish
  const threadTitle = wishText.charAt(0).toUpperCase() + wishText.slice(1)

  const getRelatedThreads = () => {
    if (wishText.includes("vacuum")) {
      return [
        "A vacuum that doesn't wake up the whole house",
        "Vacuum cleaners with better pet hair removal",
        "More affordable high-end vacuum cleaners",
      ]
    } else if (wishText.includes("app")) {
      return [
        "An app that translates baby cries",
        "Better calendar apps for families",
        "Apps that work offline more reliably",
      ]
    } else {
      return [
        "A better way to organize digital photos",
        "More sustainable packaging options",
        "Smart home devices that actually work together",
      ]
    }
  }

  const getAiSummary = () => {
    if (wishText.includes("vacuum")) {
      return "Users are frustrated with the noise level of current vacuum cleaners. Many mention that they can't clean when others are sleeping or working from home. Cost is also a concern, with users wanting quieter options without premium pricing."
    } else if (wishText.includes("app")) {
      return "There's a desire for more intuitive and specialized apps that solve specific problems. Users mention frustrations with current options being too complex or lacking key features. Privacy concerns are also frequently mentioned."
    } else {
      return "This thread highlights a common pain point that could be addressed through innovative design or technology. Users are looking for solutions that are both practical and affordable."
    }
  }

  const getAiSuggestions = () => {
    if (wishText.includes("vacuum")) {
      return [
        "What about noise-canceling technology adapted for vacuum motors?",
        "Could vacuum cleaners use different materials to dampen sound?",
        "Would users pay more for significantly quieter operation?",
      ]
    } else if (wishText.includes("app")) {
      return [
        "What specific features would make this app stand out?",
        "Are there existing APIs that could be leveraged for this?",
        "Would this work better as a standalone app or integrated into existing platforms?",
      ]
    } else {
      return [
        "What's the biggest obstacle to solving this problem today?",
        "Are there any partial solutions already on the market?",
        "Would this be more valuable to consumers or businesses?",
      ]
    }
  }

  const relatedThreads = getRelatedThreads()
  const aiSummary = getAiSummary()
  const aiSuggestions = getAiSuggestions()

  const comments = [
    {
      id: 1,
      author: "Alex",
      avatar: "/placeholder.svg?height=40&width=40",
      content: `I've been thinking about this too! ${wishText.includes("vacuum") ? "The noise is my biggest issue when working from home." : "It would save me so much time."}`,
      likes: 12,
      time: "2 hours ago",
    },
    {
      id: 2,
      author: "Jordan",
      avatar: "/placeholder.svg?height=40&width=40",
      content: `${wishText.includes("vacuum") ? "I found one that's quieter but it cost almost $600! There has to be a more affordable option." : "I tried building something like this as a side project but got stuck on the technical implementation."}`,
      likes: 8,
      time: "1 hour ago",
    },
    {
      id: 3,
      author: "Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      content: `${wishText.includes("vacuum") ? "What if vacuum companies focused on sound insulation like car manufacturers do?" : "I'd definitely pay for this if someone built it right."}`,
      likes: 5,
      time: "45 minutes ago",
    },
  ]

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would add the comment to the thread
    setCommentText("")
  }

  return (
    <motion.div className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{threadTitle}</h2>
          <div className="mt-1 flex items-center gap-2">
            <Badge
              variant={matchType === "new" ? "default" : "secondary"}
              className={matchType === "new" ? "bg-emerald-500" : ""}
            >
              {matchType === "new" ? "New Thread" : "Matched Thread"}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <Users size={14} />
              <span>24 participants</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <MessageSquare size={14} />
              <span>{comments.length} comments</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="border-b bg-slate-50 pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Discussion</h3>
                <Button variant="outline" size="sm">
                  Follow Thread
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={comment.avatar} alt={comment.author} />
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{comment.author}</div>
                        <div className="text-xs text-slate-500">{comment.time}</div>
                      </div>
                    </div>
                    <p className="mb-2 text-slate-700">{comment.content}</p>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 gap-1 text-slate-500">
                        <ThumbsUp size={14} />
                        <span>{comment.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-1 text-slate-500">
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <form onSubmit={handleSubmitComment} className="flex w-full gap-2">
                <Input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add your thoughts..."
                  className="flex-1"
                />
                <Button type="submit" disabled={!commentText.trim()}>
                  <Send size={16} className="mr-2" />
                  Comment
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b bg-slate-50 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500" />
                <h3 className="text-lg font-medium">AI Insights</h3>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <Tabs defaultValue="summary">
                <TabsList className="mb-4 grid w-full grid-cols-2">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="mt-0">
                  <p className="text-sm text-slate-700">{aiSummary}</p>
                </TabsContent>
                <TabsContent value="suggestions" className="mt-0">
                  <ul className="space-y-2 text-sm text-slate-700">
                    {aiSuggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-0.5 text-emerald-500">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b bg-slate-50 pb-3">
              <h3 className="text-lg font-medium">Related Threads</h3>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {relatedThreads.map((thread, index) => (
                  <div key={index} className="flex items-center gap-3 p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                      <MessageSquare size={14} />
                    </div>
                    <div className="text-sm text-slate-700 hover:text-emerald-600 hover:underline">{thread}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
