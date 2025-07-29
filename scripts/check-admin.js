import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function checkAndCreateAdmin() {
  try {
    console.log('Checking for admin user...')
    
    // Check if admin user exists
    const adminUser = await prisma.user.findUnique({
      where: {
        email: 'admin@indonesiafencing.com'
      }
    })

    if (adminUser) {
      console.log('Admin user already exists:')
      console.log('- ID:', adminUser.id)
      console.log('- Name:', adminUser.name)
      console.log('- Email:', adminUser.email)
      console.log('- Role:', adminUser.role)
      console.log('- Phone:', adminUser.phone)
      console.log('- Location:', adminUser.location)
      console.log('- Bio:', adminUser.bio)
      console.log('- Permissions:', adminUser.permissions)
      console.log('- Last Login:', adminUser.lastLogin)
      console.log('- Created At:', adminUser.createdAt)
      console.log('- Updated At:', adminUser.updatedAt)
    } else {
      console.log('Admin user not found. Creating new admin user...')
      
      const hashedPassword = await bcrypt.hash('admin123', 12)
      
      const newAdmin = await prisma.user.create({
        data: {
          name: 'Admin User',
          email: 'admin@indonesiafencing.com',
          password: hashedPassword,
          phone: '+62 812-3456-7890',
          role: 'Super Admin',
          avatar: '/placeholder-user.jpg',
          bio: 'Administrator untuk sistem Indonesia Fencing dengan pengalaman 5 tahun dalam manajemen atlet dan turnamen.',
          location: 'Jakarta, Indonesia',
          permissions: ['manage_athletes', 'manage_regions', 'manage_users', 'view_reports', 'system_settings'],
          lastLogin: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
      
      console.log('Admin user created successfully:')
      console.log('- ID:', newAdmin.id)
      console.log('- Name:', newAdmin.name)
      console.log('- Email:', newAdmin.email)
      console.log('- Role:', newAdmin.role)
      console.log('Login credentials:')
      console.log('- Email: admin@indonesiafencing.com')
      console.log('- Password: admin123')
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAndCreateAdmin() 