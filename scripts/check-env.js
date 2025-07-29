import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

console.log('Environment Variables Check:')
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Not set')
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL ? '✅ Set' : '❌ Not set')
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Not set')

if (process.env.NEXTAUTH_SECRET) {
  console.log('NEXTAUTH_SECRET length:', process.env.NEXTAUTH_SECRET.length)
  console.log('NEXTAUTH_SECRET starts with:', process.env.NEXTAUTH_SECRET.substring(0, 10) + '...')
}

console.log('\nNEXTAUTH_URL value:', process.env.NEXTAUTH_URL) 