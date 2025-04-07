import Image from "next/image"
import { Card } from "@/components/ui/card"


export function CourseCard({ category, title, lessons, hours, price, thumbnail }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          alt={title}
          className="aspect-video object-cover"
          height={200}
          src={thumbnail || "/download.svg"}
          width={400}
        />
        <div className="absolute bottom-4 right-4 rounded-full bg-white px-3 py-1 text-sm font-medium">{price}</div>
      </div>
      <div className="p-4">
        <div className="mb-2 text-sm font-medium text-primary">{category}</div>
        <h3 className="mb-4 font-semibold">{title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{lessons} Lessons</span>
          <span>•</span>
          <span>{hours}  Credits</span>
        </div>
      </div>
    </Card>
  )
}

