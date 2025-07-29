// Using built-in fetch

async function testSettingsAPI() {
  const baseURL = 'http://localhost:3000'
  
  console.log('Testing Settings API...')
  
  try {
    // Test GET /api/admin/profile (should fail without auth)
    console.log('\n1. Testing GET /api/admin/profile (without auth)...')
    const getResponse = await fetch(`${baseURL}/api/admin/profile`)
    console.log('Status:', getResponse.status)
    console.log('Response:', await getResponse.text())
    
    // Test PUT /api/admin/profile (should fail without auth)
    console.log('\n2. Testing PUT /api/admin/profile (without auth)...')
    const putResponse = await fetch(`${baseURL}/api/admin/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com'
      })
    })
    console.log('Status:', putResponse.status)
    console.log('Response:', await putResponse.text())
    
    // Test POST /api/admin/profile/avatar (should fail without auth)
    console.log('\n3. Testing POST /api/admin/profile/avatar (without auth)...')
    const avatarResponse = await fetch(`${baseURL}/api/admin/profile/avatar`, {
      method: 'POST'
    })
    console.log('Status:', avatarResponse.status)
    console.log('Response:', await avatarResponse.text())
    
    // Test PUT /api/admin/profile/password (should fail without auth)
    console.log('\n4. Testing PUT /api/admin/profile/password (without auth)...')
    const passwordResponse = await fetch(`${baseURL}/api/admin/profile/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword: 'test',
        newPassword: 'newpassword',
        confirmPassword: 'newpassword'
      })
    })
    console.log('Status:', passwordResponse.status)
    console.log('Response:', await passwordResponse.text())
    
  } catch (error) {
    console.error('Error testing API:', error)
  }
}

testSettingsAPI() 