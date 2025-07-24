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
        <Skeleton className="h-10 w-[400px] mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex items-start">
                    <Skeleton className="h-10 w-10 mr-4" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-[100px] mb-2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Skeleton className="h-[400px] w-full rounded-lg" />
            <div className="border rounded-lg p-6">
              <Skeleton className="h-6 w-[150px] mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-start">
                    <Skeleton className="h-5 w-5 mr-2" />
                    <Skeleton className="h-5 flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
