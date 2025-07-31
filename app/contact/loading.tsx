import { PublicLayout } from "@/components/public-layout"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ContactLoading() {
  return (
    <PublicLayout>
      <section className="flex flex-col items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </section>
    </PublicLayout>
  )
} 