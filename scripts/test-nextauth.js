import { authOptions } from '../lib/auth.js'

async function testNextAuth() {
  try {
    console.log('Testing NextAuth configuration...')
    
    // Test the authorize function
    const credentials = {
      email: 'admin@anggar-jabar.com',
      password: 'admin123'
    }

    console.log('Testing with credentials:', credentials)

    // Get the credentials provider
    const credentialsProvider = authOptions.providers.find(p => p.id === 'credentials')
    
    if (!credentialsProvider) {
      console.log('❌ Credentials provider not found')
      return
    }

    console.log('✅ Credentials provider found')

    // Test the authorize function
    const result = await credentialsProvider.authorize(credentials, null)
    
    if (result) {
      console.log('✅ NextAuth authorize successful:', {
        id: result.id,
        email: result.email,
        name: result.name
      })
    } else {
      console.log('❌ NextAuth authorize failed')
    }

  } catch (error) {
    console.error('Error testing NextAuth:', error)
  }
}

testNextAuth() 