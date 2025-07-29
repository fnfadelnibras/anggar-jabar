import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function testLogin() {
  try {
    const email = 'admin@anggar-jabar.com'
    const password = 'admin123'

    console.log('Testing login with:', { email, password })

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.log('❌ User not found')
      return
    }

    console.log('✅ User found:', {
      id: user.id,
      name: user.name,
      email: user.email,
      hasPassword: !!user.password
    })

    if (!user.password) {
      console.log('❌ User has no password')
      return
    }

    // Test password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (isPasswordValid) {
      console.log('✅ Password is valid!')
    } else {
      console.log('❌ Password is invalid')
      
      // Let's see what the hash looks like
      console.log('Password hash:', user.password)
      
      // Test with different password
      const testHash = await bcrypt.hash('admin123', 12)
      console.log('Test hash for admin123:', testHash)
      console.log('Hash comparison:', await bcrypt.compare('admin123', testHash))
    }

  } catch (error) {
    console.error('Error testing login:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testLogin() 