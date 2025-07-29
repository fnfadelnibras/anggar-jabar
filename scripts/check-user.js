import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkUser() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'admin@anggar-jabar.com' }
    })

    if (user) {
      console.log('User found:', {
        id: user.id,
        name: user.name,
        email: user.email,
        hasPassword: !!user.password,
        passwordLength: user.password ? user.password.length : 0
      })
    } else {
      console.log('User not found')
    }

    // Check all users
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: true
      }
    })

    console.log('\nAll users:', allUsers.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      hasPassword: !!user.password,
      passwordLength: user.password ? user.password.length : 0
    })))
  } catch (error) {
    console.error('Error checking user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUser() 