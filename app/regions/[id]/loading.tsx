import { Skeleton } from "@/components/ui/skeleton"
import { PublicLayout } from "@/components/public-layout"

export default function RegionDetailLoading() {
  return (
    <PublicLayout>
      {/* Hero Section Skeleton */}
      <div className="relative h-[400px] w-full bg-muted">
        <div className="container absolute bottom-0 pb-8">
          <Skeleton className="h-4 w-[100px] mb-2" />
          <Skeleton className="h-12 w-[300px] mb-2" />
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-5 w-[120px]" />
            <Skeleton className="h-5 w-[100px]" />
            <Skeleton className="h-5 w-[140px]" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container py-8">
        <Skeleton className="h-10 w-[400px] mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="border rounded-lg p-6">
              <Skeleton className="h-8 w-[200px] mb-4" />
              <div className="space-y-2 mb-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <Skeleton className="h-6 w-[180px] mb-4" />
              <div className="flex gap-4 mb-6">
                <Skeleton className="h-20 w-full rounded-lg" />
                <Skeleton className="h-20 w-full rounded-lg" />
                <Skeleton className="h-20 w-full rounded-lg" />
              </div>

              <div className="h-[1px] w-full bg-border my-6" />

              <Skeleton className="h-6 w-[180px] mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>

            <div className="mt-6">
              <Skeleton className="h-8 w-[200px] mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg overflow-hidden">
                  <Skeleton className="h-40 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <Skeleton className="h-40 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="border rounded-lg p-6">
              <Skeleton className="h-6 w-[120px] mb-4" />
              <Skeleton className="h-[300px] w-full rounded-md" />
            </div>

            <div className="border rounded-lg p-6 mt-6">
              <Skeleton className="h-6 w-[120px] mb-4" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-3/4 mb-1" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-4 w-8" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-9 w-full mt-4" />
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
