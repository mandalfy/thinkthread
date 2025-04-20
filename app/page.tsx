"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MessageSquare, ChevronRight, ChevronLeft, Users } from "lucide-react"
import ProductCard from "@/components/product-card"
import QuestionHistory from "@/components/question-history"
import ProductCounter from "@/components/product-counter"
import ThreadCreation from "@/components/thread-creation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock data for demonstration
const mockProducts = [
  {
    id: 1,
    name: "Noise-Cancelling Headphones Pro",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 1243,
  },
  {
    id: 2,
    name: "SoundCore Ultra Headphones",
    description: "Over-ear headphones with memory foam cushions and balanced sound profile",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 856,
  },
  {
    id: 3,
    name: "AudioMax Comfort Plus",
    description: "Lightweight headphones with ambient sound mode and quick charging",
    price: 249.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.3,
    reviews: 672,
  },
  {
    id: 4,
    name: "BassBoost Studio Headphones",
    description: "Studio-quality headphones with enhanced bass response and foldable design",
    price: 179.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.2,
    reviews: 512,
  },
  {
    id: 5,
    name: "EchoSense Wireless Headset",
    description: "Bluetooth headphones with voice assistant integration and water resistance",
    price: 159.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.0,
    reviews: 389,
  },
]

// Add this comment for future LLM integration
// TODO: Replace with actual LLM API call to generate dynamic questions based on user input
const mockQuestions = [
  "What's your budget range?",
  "Do you prefer over-ear or in-ear headphones?",
  "Is noise cancellation important to you?",
  "Do you need wireless connectivity?",
  "How important is battery life?",
]

// Add this comment for future recommendation engine integration
// TODO: Replace with actual recommendation engine using PKL format
// The recommendation engine will filter products based on user responses
const simulateRecommendationEngine = (products, userResponses) => {
  // This is a placeholder for the actual recommendation engine
  // In the real implementation, this would use a PKL model to filter products
  const reduceFactor = Math.random() * 0.5 + 0.3
  return products.slice(0, Math.max(Math.floor(products.length * reduceFactor), 0))
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<"initial" | "questioning" | "results" | "thread">("initial")
  const [initialWish, setInitialWish] = useState("")
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [questionIndex, setQuestionIndex] = useState(0)
  const [questionHistory, setQuestionHistory] = useState<Array<{ question: string; answer: string }>>([])
  const [filteredProducts, setFilteredProducts] = useState<typeof mockProducts>([])
  const [productCount, setProductCount] = useState<number[]>([])
  const [noProductsFound, setNoProductsFound] = useState(false)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)

  // Handle initial wish submission
  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!initialWish.trim()) return

    // Start with all products
    setFilteredProducts(mockProducts)
    setProductCount([mockProducts.length])
    setCurrentStep("questioning")

    // TODO: In the real implementation, this would call the LLM API to generate the first question
    // const firstQuestion = await fetchQuestionFromLLM(initialWish);
    // setCurrentQuestion(firstQuestion);
  }

  // Handle answer submission
  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentAnswer.trim()) return

    // Add current Q&A to history
    setQuestionHistory([...questionHistory, { question: mockQuestions[questionIndex], answer: currentAnswer }])

    // Simulate filtering products based on answer
    const newFilteredProducts = simulateFiltering(filteredProducts, currentAnswer)
    setFilteredProducts(newFilteredProducts)

    // Update product count history
    setProductCount([...productCount, newFilteredProducts.length])

    // Clear current answer
    setCurrentAnswer("")

    // Move to next question or show results
    if (questionIndex < mockQuestions.length - 1 && newFilteredProducts.length > 3) {
      setQuestionIndex(questionIndex + 1)

      // TODO: In the real implementation, this would call the LLM API to generate the next question
      // const nextQuestion = await fetchQuestionFromLLM(initialWish, questionHistory, currentAnswer);
      // setCurrentQuestion(nextQuestion);
    } else {
      if (newFilteredProducts.length === 0) {
        setNoProductsFound(true)
        setCurrentStep("thread")
      } else {
        setCurrentStep("results")
        setCurrentProductIndex(Math.floor(newFilteredProducts.length / 2))
      }
    }
  }

  // Simulate filtering products based on user answer
  const simulateFiltering = (products: typeof mockProducts, answer: string) => {
    // This is just a mock implementation
    // TODO: In a real app, this would use the recommendation engine with PKL format

    // Simulate reducing the number of products with each question
    const reduceFactor = Math.random() * 0.5 + 0.3 // Reduce by 30-80%
    const newCount = Math.max(Math.floor(products.length * reduceFactor), 0)

    // If answer contains "don't exist" or similar phrases, simulate no products found
    if (
      answer.toLowerCase().includes("don't exist") ||
      answer.toLowerCase().includes("not available") ||
      answer.toLowerCase().includes("can't find")
    ) {
      return []
    }

    return products.slice(0, newCount)
  }

  // Handle carousel navigation
  const handlePrevProduct = () => {
    if (currentProductIndex > 0) {
      setCurrentProductIndex(currentProductIndex - 1)
    }
  }

  const handleNextProduct = () => {
    if (currentProductIndex < filteredProducts.length - 1) {
      setCurrentProductIndex(currentProductIndex + 1)
    }
  }

  // Reset the flow
  const resetFlow = () => {
    setInitialWish("")
    setCurrentAnswer("")
    setQuestionIndex(0)
    setQuestionHistory([])
    setFilteredProducts([])
    setProductCount([])
    setNoProductsFound(false)
    setCurrentProductIndex(0)
    setCurrentStep("initial")
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm">
        <div className="mb-8 flex w-full justify-center">
          <h1 className="text-4xl font-bold text-slate-800">
            <span className="text-emerald-600">Think</span>Thread
          </h1>
        </div>

        {/* Question History */}
        <AnimatePresence>
          {questionHistory.length > 0 && <QuestionHistory initialWish={initialWish} history={questionHistory} />}
        </AnimatePresence>

        {/* Initial Wish Input */}
        {currentStep === "initial" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto"
          >
            <form
              onSubmit={handleWishSubmit}
              className="relative flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-lg"
            >
              <h2 className="mb-2 text-xl font-semibold text-slate-800">I wish there was...</h2>
              <div className="flex flex-col gap-4 md:flex-row">
                <Input
                  value={initialWish}
                  onChange={(e) => setInitialWish(e.target.value)}
                  placeholder="noise-cancelling headphones that don't hurt my ears"
                  className="flex-1 text-lg"
                  autoFocus
                />
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={!initialWish.trim()}>
                  <Search className="mr-2 h-4 w-4" />
                  Find It
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MessageSquare className="h-3 w-3" />
                <span>We'll ask questions to find the perfect product for you</span>
              </div>
            </form>
          </motion.div>
        )}

        {/* Questioning Step */}
        {currentStep === "questioning" && (
          <motion.div
            key="questioning"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto"
          >
            <div className="relative flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-xl font-semibold text-slate-800">{mockQuestions[questionIndex]}</h2>
              <form onSubmit={handleAnswerSubmit} className="flex flex-col gap-4 md:flex-row">
                <Input
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="flex-1 text-lg"
                  autoFocus
                />
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={!currentAnswer.trim()}>
                  Next
                </Button>
              </form>

              {/* Product Counter */}
              <ProductCounter counts={productCount} />

              {/* Preview of Products */}
              {filteredProducts.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-slate-500 mb-3">Narrowing down products...</h3>
                  <div className="relative overflow-hidden">
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                      {filteredProducts.map((product, index) => (
                        <div
                          key={product.id}
                          className="snap-center shrink-0"
                          style={{
                            opacity: index === Math.floor(filteredProducts.length / 2) ? 1 : 0.6,
                            transform: `scale(${index === Math.floor(filteredProducts.length / 2) ? 1 : 0.9})`,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <ProductCard product={product} featured={index === Math.floor(filteredProducts.length / 2)} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Results Step */}
        {currentStep === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">We found these products for you</h2>
                <p className="text-slate-600">Based on your wish: "{initialWish}"</p>
              </div>

              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md"
                  onClick={handlePrevProduct}
                  disabled={currentProductIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex justify-center items-center py-8 px-10">
                  {filteredProducts.length > 0 && (
                    <div className="transition-all duration-300 ease-in-out">
                      <ProductCard product={filteredProducts[currentProductIndex]} featured={true} expanded={true} />
                    </div>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md"
                  onClick={handleNextProduct}
                  disabled={currentProductIndex === filteredProducts.length - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-6 flex justify-center">
                <Button onClick={resetFlow} variant="outline">
                  Start a new search
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Thread Creation Step */}
        {currentStep === "thread" && (
          <ThreadCreation initialWish={initialWish} questionHistory={questionHistory} onReset={resetFlow} />
        )}
      </div>

      <div className="fixed bottom-4 left-4 flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-xs text-white">
        <Users size={14} className="text-yellow-400" />
        <span>Powered by Generative AI</span>
      </div>
    </main>
  )
}
