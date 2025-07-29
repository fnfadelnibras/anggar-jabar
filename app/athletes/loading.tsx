import { PublicLayout } from "@/components/public-layout"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function AthletesLoading() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-accent/90 text-white py-20">
        <div className="container">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <div className="h-12 w-[300px] bg-white/20 rounded mx-auto mb-4"></div>
            <div className="h-6 w-[500px] bg-white/20 rounded mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
