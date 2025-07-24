import { Skeleton } from "@/components/ui/skeleton"
import { PublicLayout } from "@/components/public-layout"

export default function Loading() {
  return (
    <PublicLayout>
      {/* Hero Section Skeleton */}
      <div className="relative h-[300px] w-full bg-muted">
        <div className="container absolute inset-0 flex flex-col items-center justify-center">
          <Skeleton className="h-12 w-[300px] mb-4" />
          <Skeleton className="h-6 w-[500px]" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Skeleton className="h-8 w-[150px]" />
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>

        <div className="mb-6">
          <Skeleton className="h-10 w-[200px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-6">
                <Skeleton className="h-6 w-[150px] mb-4" />
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section Skeleton */}
      <div className="bg-muted py-12">
        <div className="container">
          <Skeleton className="h-8 w-[200px] mb-6" />
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      </div>
    </PublicLayout>
  )
}
