import React from 'react'

export default function Error() {
  return (
    <div style={{ textAlign: 'center', padding: '60px' }}>
    <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>404 - Page Not Found</h1>
    <p style={{ fontSize: '18px' }}>Sorry, the page you are looking for does not exist.</p>
    <Link to="/" style={{ marginTop: '20px', display: 'inline-block', color: '#007bff' }}>
      Go back to Home
    </Link>
  </div>
  )
}
