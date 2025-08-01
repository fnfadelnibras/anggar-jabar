import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const regions = [
  // Kota (Cities) - 9 Kota di Jawa Barat
  { name: 'Kota Bandung', code: 'BDG', description: 'Kota Bandung adalah ibu kota Provinsi Jawa Barat' },
  { name: 'Kota Bogor', code: 'BGR', description: 'Kota Bogor dikenal sebagai Kota Hujan' },
  { name: 'Kota Sukabumi', code: 'SKB', description: 'Kota Sukabumi terletak di bagian selatan Jawa Barat' },
  { name: 'Kota Cimahi', code: 'CMH', description: 'Kota Cimahi adalah kota otonom di Jawa Barat' },
  { name: 'Kota Cirebon', code: 'CRB', description: 'Kota Cirebon adalah kota pelabuhan di pesisir utara Jawa Barat' },
  { name: 'Kota Bekasi', code: 'BKS', description: 'Kota Bekasi adalah kota satelit Jakarta' },
  { name: 'Kota Depok', code: 'DPK', description: 'Kota Depok adalah kota satelit Jakarta' },
  { name: 'Kota Tasikmalaya', code: 'TSK', description: 'Kota Tasikmalaya terletak di bagian timur Jawa Barat' },
  { name: 'Kota Banjar', code: 'BJR', description: 'Kota Banjar adalah kota di bagian timur Jawa Barat' },
  
  // Kabupaten (Regencies) - 18 Kabupaten di Jawa Barat
  { name: 'Kabupaten Bogor', code: 'KBR', description: 'Kabupaten Bogor adalah kabupaten terbesar di Jawa Barat' },
  { name: 'Kabupaten Sukabumi', code: 'KSB', description: 'Kabupaten Sukabumi terletak di bagian selatan Jawa Barat' },
  { name: 'Kabupaten Cianjur', code: 'KCJ', description: 'Kabupaten Cianjur dikenal dengan beras Cianjur' },
  { name: 'Kabupaten Bandung', code: 'KBD', description: 'Kabupaten Bandung mengelilingi Kota Bandung' },
  { name: 'Kabupaten Garut', code: 'KGT', description: 'Kabupaten Garut dikenal dengan dodol Garut' },
  { name: 'Kabupaten Tasikmalaya', code: 'KTS', description: 'Kabupaten Tasikmalaya terletak di bagian timur Jawa Barat' },
  { name: 'Kabupaten Ciamis', code: 'KCS', description: 'Kabupaten Ciamis terletak di bagian timur Jawa Barat' },
  { name: 'Kabupaten Kuningan', code: 'KKN', description: 'Kabupaten Kuningan terletak di bagian timur Jawa Barat' },
  { name: 'Kabupaten Cirebon', code: 'KCR', description: 'Kabupaten Cirebon terletak di pesisir utara Jawa Barat' },
  { name: 'Kabupaten Majalengka', code: 'KMJ', description: 'Kabupaten Majalengka terletak di bagian utara Jawa Barat' },
  { name: 'Kabupaten Sumedang', code: 'KSM', description: 'Kabupaten Sumedang dikenal dengan tahu Sumedang' },
  { name: 'Kabupaten Indramayu', code: 'KID', description: 'Kabupaten Indramayu adalah penghasil beras utama' },
  { name: 'Kabupaten Subang', code: 'KSG', description: 'Kabupaten Subang terletak di bagian utara Jawa Barat' },
  { name: 'Kabupaten Purwakarta', code: 'KPW', description: 'Kabupaten Purwakarta terletak di bagian barat Jawa Barat' },
  { name: 'Kabupaten Karawang', code: 'KKW', description: 'Kabupaten Karawang adalah lumbung padi Jawa Barat' },
  { name: 'Kabupaten Bekasi', code: 'KBK', description: 'Kabupaten Bekasi adalah kabupaten satelit Jakarta' },
  { name: 'Kabupaten Bandung Barat', code: 'KBB', description: 'Kabupaten Bandung Barat terletak di bagian barat Bandung' },
  { name: 'Kabupaten Pangandaran', code: 'KPG', description: 'Kabupaten Pangandaran adalah kabupaten termuda di Jawa Barat' }
];

async function seedRegions() {
  try {
    console.log('🌱 Seeding regions...');
    
    // Clear existing regions
    await prisma.region.deleteMany({});
    console.log('✅ Cleared existing regions');
    
    // Insert new regions
    for (const region of regions) {
      await prisma.region.create({
        data: {
          name: region.name,
          code: region.code,
          description: region.description,
          image: null // Will be uploaded manually via site
        }
      });
      console.log(`✅ Added: ${region.name} (${region.code})`);
    }
    
    console.log(`🎉 Successfully seeded ${regions.length} regions!`);
    
  } catch (error) {
    console.error('❌ Error seeding regions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedRegions(); 