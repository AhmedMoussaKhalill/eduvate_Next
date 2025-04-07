import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CircularProgress } from "./circular-progress"
import Image from "next/image"


export function ContinueLearningCard({ title, category, lessons, progress }) {
  return (
    <Card className="p-4">
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-4">
        <div className="size-14 rounded-lg bg-primary/10">
        <Image src="/downloadd.svg" alt={title} height={200} width={400} className="object-cover rounded-lg" />
        </div>
        <div>
          <div className="text-sm font-medium text-primary">{category}</div>
          <h3 className="font-medium">{title}</h3>
          <div className="text-sm text-gray-500">{lessons} Lessons</div>
        </div>
        </div>
        <CircularProgress progress={progress} size={60} className="shrink-0" />
      </div>
      {/* <Progress value={progress} /> */}
    </Card>
  )
}

