import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clearData() {
  try {
    console.log('🗑️  Menghapus semua data kecuali admin...')
    
    // Hapus semua activity logs
    console.log('📝 Menghapus activity logs...')
    await prisma.activity.deleteMany()
    
    // Hapus semua athletes
    console.log('👤 Menghapus athletes...')
    await prisma.athlete.deleteMany()
    
    // Hapus semua regions
    console.log('🗺️  Menghapus regions...')
    await prisma.region.deleteMany()
    
    // Hapus semua sessions (tapi keep accounts untuk admin)
    console.log('🔐 Menghapus sessions...')
    await prisma.session.deleteMany()
    
    // Hapus verification tokens
    console.log('🔑 Menghapus verification tokens...')
    await prisma.verificationToken.deleteMany()
    
    console.log('✅ Data berhasil dihapus!')
    console.log('📊 Status database:')
    
    // Cek jumlah data yang tersisa
    const adminCount = await prisma.user.count()
    const accountCount = await prisma.account.count()
    
    console.log(`👥 Admin: ${adminCount}`)
    console.log(`🔗 Accounts: ${accountCount}`)
    
  } catch (error) {
    console.error('❌ Error menghapus data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

clearData() 