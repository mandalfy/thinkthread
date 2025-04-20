import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: number
    name: string
    description: string
    price: number
    image: string
    rating: number
    reviews: number
  }
  featured?: boolean
  expanded?: boolean
}

export default function ProductCard({ product, featured = false, expanded = false }: ProductCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg border bg-white transition-all duration-300",
        featured ? "border-emerald-200 shadow-lg" : "border-slate-200",
        expanded ? "w-96" : "w-64",
      )}
    >
      {featured && <Badge className="absolute top-3 right-3 bg-emerald-500">Best Match</Badge>}

      <div className="p-4">
        <div className="aspect-square overflow-hidden rounded-md bg-slate-50 mb-4">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-slate-900 line-clamp-2">{product.name}</h3>

          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200",
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-slate-500">({product.reviews})</span>
          </div>

          <p className={cn("text-sm text-slate-500", expanded ? "" : "line-clamp-2")}>{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">${product.price.toFixed(2)}</span>
            <Button size="sm" className={cn(featured ? "bg-emerald-600 hover:bg-emerald-700" : "")}>
              View
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
