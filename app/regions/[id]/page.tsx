import { notFound } from "next/navigation"
import { RegionDetailPageClient } from "@/components/region-detail-page" // Sesuaikan path jika perlu

// Definisikan tipe props untuk halaman ini - params sekarang adalah Promise
interface RegionDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Fungsi ini akan berjalan di server untuk mengambil data
async function getRegionData(id: number) {
  // Di sini Anda bisa mengambil data dari database atau API
  // Untuk sekarang, kita gunakan data statis yang sama
  const regions = [
    {
      id: 1,
      name: "Jakarta",
      image: "/placeholder.svg?height=400&width=800&text=Jakarta",
      coverImage: "/placeholder.svg?height=400&width=1200&text=Jakarta+Fencing",
      athletes: 120,
      clubsCount: 8,
      description: "The capital city with the highest concentration of fencing clubs and athletes in Indonesia. Jakarta has been a powerhouse in national competitions, consistently producing top-tier athletes who represent Indonesia in international events. The region benefits from excellent facilities and experienced coaches.",
      contactInfo: { email: "jakarta@fencing-id.org", phone: "+62 21 5551234", website: "jakarta-fencing.id", address: "Jakarta International Sports Complex, Jl. Gatot Subroto No. 123, Jakarta" },
      topAthletes: [
        { id: 1, name: "Andi Wijaya", image: "/placeholder.svg?height=100&width=100&text=AW", category: "Men's Épée", achievements: "Gold Medalist - National Championship 2023" },
        { id: 2, name: "Siti Nurhaliza", image: "/placeholder.svg?height=100&width=100&text=SN", category: "Women's Foil", achievements: "Silver Medalist - SEA Games 2023" },
      ],
      clubs: [
        { id: 1, name: "Jakarta Fencing Club", location: "Central Jakarta", members: 45, established: 2005, achievements: "Club Champion 2022, 2023" },
      ],
    },
    {
      id: 2,
      name: "Bali",
      image: "/placeholder.svg?height=400&width=800&text=Bali",
      coverImage: "/placeholder.svg?height=400&width=1200&text=Bali+Fencing",
      athletes: 85,
      clubsCount: 5,
      description: "A growing fencing community with strong international connections and tourism support.",
      contactInfo: { email: "bali@fencing-id.org", phone: "+62 361 4567890", website: "bali-fencing.id", address: "Bali Sports Center, Jl. Sunset Road No. 88, Kuta, Bali" },
      topAthletes: [
        { id: 5, name: "Made Wirawan", image: "/placeholder.svg?height=100&width=100&text=MW", category: "Men's Foil", achievements: "Gold Medalist - Bali Invitational 2023" },
      ],
      clubs: [
        { id: 4, name: "Bali Fencing Academy", location: "Kuta", members: 35, established: 2008, achievements: "Best Facilities Award 2023" },
      ],
    },
  ];

  return regions.find((r) => r.id === id);
}

// Ini adalah Server Component utama
export default async function RegionDetailPage({ params }: RegionDetailPageProps) {
  // Await params karena sekarang ini adalah Promise
  const resolvedParams = await params;
  const regionId = Number.parseInt(resolvedParams.id);
  const region = await getRegionData(regionId);

  if (!region) {
    notFound();
  }

  // Server Component me-render Client Component dan mengirim 'region' sebagai props
  return <RegionDetailPageClient region={region} />;
}