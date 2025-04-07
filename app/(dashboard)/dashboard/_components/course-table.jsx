import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const courses = [
  {
    name: "Mastering Design System",
    lessons: "15/15",
    status: "complete",
    level: "Intermediate",
    category: "Design",
  },
  {
    name: "UI/UX Design",
    lessons: "12/15",
    status: "ongoing",
    level: "Beginner",
    category: "Design",
  },
  {
    name: "Learn Data Analyst",
    lessons: "8/20",
    status: "ongoing",
    level: "Expert",
    category: "Data",
  },
]

export function CourseTable() {
  return (
    <Table className="shadow-custom rounded-xl" >
      <TableHeader>
        <TableRow>
          <TableHead>Course Name</TableHead>
          <TableHead>Lessons</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course.name}>
            <TableCell className="font-medium">{course.name}</TableCell>
            <TableCell>{course.lessons}</TableCell>
            <TableCell>
              <Badge variant={course.status === "complete" ? "success" : "default"}>{course.status}</Badge>
            </TableCell>
            <TableCell>{course.level}</TableCell>
            <TableCell>{course.category}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

