import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const jabarRegions = [
  'Kota Bandung', 'Kota Banjar', 'Kota Bekasi', 'Kota Bogor', 'Kota Cimahi',
  'Kota Cirebon', 'Kota Depok', 'Kota Sukabumi', 'Kota Tasikmalaya',
  'Kabupaten Bandung', 'Kabupaten Bandung Barat', 'Kabupaten Bekasi', 'Kabupaten Bogor',
  'Kabupaten Ciamis', 'Kabupaten Cianjur', 'Kabupaten Cirebon', 'Kabupaten Garut',
  'Kabupaten Indramayu', 'Kabupaten Karawang', 'Kabupaten Kuningan',
  'Kabupaten Majalengka', 'Kabupaten Pangandaran', 'Kabupaten Purwakarta',
  'Kabupaten Subang', 'Kabupaten Sukabumi', 'Kabupaten Sumedang', 'Kabupaten Tasikmalaya'
]

const usedCodes = new Set()
function generateCode(name) {
  const base = name.replace('Kota ', '').replace('Kabupaten ', '').toUpperCase().replace(/\s+/g, '')
  let code = base.slice(0, 3)
  let i = 3
  while (usedCodes.has(code)) {
    code = (base.slice(0, 2) + base[i % base.length]).slice(0, 3)
    i++
  }
  usedCodes.add(code)
  return code
}

const genders = ['Pria', 'Wanita']
const categories = ['EPEE', 'SABRE', 'FOIL']
const statuses = ['ACTIVE', 'INACTIVE']
const fakeNames = ['Agus', 'Dewi', 'Fadhlan', 'Rina', 'Tono', 'Siska', 'Bayu', 'Nia', 'Dika', 'Laras', 'Indra', 'Putri']

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomDate(startYear = 2005, endYear = 2012) {
  const start = new Date(`${startYear}-01-01`)
  const end = new Date(`${endYear}-12-31`)
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

async function main() {
  console.log('🌱 Seeding regions...')
  const regionRecords = {}

  for (const name of jabarRegions) {
    const code = generateCode(name)
    const region = await prisma.region.upsert({
      where: { code },
      update: {},
      create: { name, code },
    })
    regionRecords[name] = region.id
  }

  console.log('👤 Seeding 50 athletes...')
  for (let i = 0; i < 50; i++) {
    const regionName = randomFrom(jabarRegions)
    await prisma.athlete.create({
      data: {
        name: `${randomFrom(fakeNames)} ${randomFrom(fakeNames)}`,
        gender: randomFrom(genders),
        category: randomFrom(categories),
        status: randomFrom(statuses),
        birthDate: randomDate(),
        regionId: regionRecords[regionName],
      },
    })
  }

  console.log('✅ Seeding berhasil!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding gagal:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
