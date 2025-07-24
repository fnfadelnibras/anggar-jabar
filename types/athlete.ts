export interface Athlete {
  id: number;
  name: string;
  region: string;
  category: string;
  birthDate: string;
  gender: string;
  status: "Aktif" | "Tidak Aktif";
} 