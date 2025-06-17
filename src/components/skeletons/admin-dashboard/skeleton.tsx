import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const StatCardSkeleton = () => (
  <Card className="bg-zinc-900 border-zinc-800">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-20 bg-zinc-800" />
      <Skeleton className="h-4 w-4 bg-zinc-800" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-12 bg-zinc-800 mb-1" />
      <Skeleton className="h-3 w-24 bg-zinc-800" />
    </CardContent>
  </Card>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="rounded-md border border-zinc-800 overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow className="border-zinc-800">
          {Array.from({ length: 8 }).map((_, i) => (
            <TableHead key={i}>
              <Skeleton className="h-4 w-20 bg-zinc-800" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, i) => (
          <TableRow key={i} className="border-zinc-800">
            {Array.from({ length: 8 }).map((_, j) => (
              <TableCell key={j}>
                <Skeleton className="h-4 w-full bg-zinc-800" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export const FiltersSkeleton = () => (
  <div className="flex flex-col sm:flex-row gap-4">
    <div className="relative flex-1">
      <Skeleton className="h-10 w-full bg-zinc-800" />
    </div>
    <Skeleton className="h-10 w-full sm:w-[180px] bg-zinc-800" />
    <Skeleton className="h-10 w-full sm:w-[180px] bg-zinc-800" />
  </div>
);
