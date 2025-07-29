import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdminUser() {
  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@anggar-jabar.com' }
    })

    if (existingAdmin) {
      console.log('Admin user already exists')
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12)

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        name: 'Administrator',
        email: 'admin@anggar-jabar.com',
        password: hashedPassword,
      }
    })

    console.log('Admin user created successfully:', {
      id: adminUser.id,
      name: adminUser.name,
      email: adminUser.email
    })
  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser() 