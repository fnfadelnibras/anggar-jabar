import { notFound } from "next/navigation"
import { RegionDetailPageClient } from "@/components/region-detail-page" // Sesuaikan path jika perlu

// Definisikan tipe props untuk halaman ini
interface RegionDetailPageProps {
  params: {
    id: string;
  };
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
      medals: { gold: 15, silver: 12, bronze: 18 },
      description: "The capital city with the highest concentration of fencing clubs and athletes in Indonesia. Jakarta has been a powerhouse in national competitions, consistently producing top-tier athletes who represent Indonesia in international events. The region benefits from excellent facilities and experienced coaches.",
      contactInfo: { email: "jakarta@fencing-id.org", phone: "+62 21 5551234", website: "jakarta-fencing.id", address: "Jakarta International Sports Complex, Jl. Gatot Subroto No. 123, Jakarta" },
      upcomingEvents: [
        { id: 1, name: "Jakarta Open 2024", date: "May 18, 2024", location: "Jakarta Convention Center", image: "/placeholder.svg?height=200&width=400&text=Jakarta+Open+2024" },
        { id: 3, name: "National Championship 2024", date: "September 15, 2024", location: "Jakarta Sports Arena", image: "/placeholder.svg?height=200&width=400&text=National+Championship+2024" },
      ],
      pastEvents: [
        { id: 5, name: "Jakarta Open 2023", date: "May 15, 2023", location: "Jakarta Convention Center", image: "/placeholder.svg?height=200&width=400&text=Jakarta+Open+2023", results: "15 Gold, 12 Silver, 18 Bronze" },
        { id: 7, name: "National Championship 2023", date: "September 10, 2023", location: "Jakarta Sports Arena", image: "/placeholder.svg?height=200&width=400&text=National+Championship+2023", results: "8 Gold, 10 Silver, 12 Bronze" },
      ],
      topAthletes: [
        { id: 1, name: "Andi Wijaya", image: "/placeholder.svg?height=100&width=100&text=AW", category: "Men's Épée", achievements: "Gold Medalist - National Championship 2023", medals: { gold: 5, silver: 3, bronze: 2 } },
        { id: 2, name: "Siti Nurhaliza", image: "/placeholder.svg?height=100&width=100&text=SN", category: "Women's Foil", achievements: "Silver Medalist - SEA Games 2023", medals: { gold: 3, silver: 4, bronze: 1 } },
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
      medals: { gold: 10, silver: 14, bronze: 9 },
      description: "A growing fencing community with strong international connections and tourism support.",
      contactInfo: { email: "bali@fencing-id.org", phone: "+62 361 4567890", website: "bali-fencing.id", address: "Bali Sports Center, Jl. Sunset Road No. 88, Kuta, Bali" },
      upcomingEvents: [
        { id: 2, name: "Bali Invitational 2024", date: "July 22, 2024", location: "Bali International Convention Center", image: "/placeholder.svg?height=200&width=400&text=Bali+Invitational+2024" },
      ],
      pastEvents: [
        { id: 6, name: "Bali Invitational 2023", date: "July 22, 2023", location: "Bali International Convention Center", image: "/placeholder.svg?height=200&width=400&text=Bali+Invitational+2023", results: "10 Gold, 14 Silver, 9 Bronze" },
      ],
      topAthletes: [
        { id: 5, name: "Made Wirawan", image: "/placeholder.svg?height=100&width=100&text=MW", category: "Men's Foil", achievements: "Gold Medalist - Bali Invitational 2023", medals: { gold: 4, silver: 2, bronze: 1 } },
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
  const regionId = Number.parseInt(params.id);
  const region = await getRegionData(regionId);

  if (!region) {
    notFound();
  }

  // Server Component me-render Client Component dan mengirim 'region' sebagai props
  return <RegionDetailPageClient region={region} />;
}