import React from 'react'
import Link from 'next/link'

export default ({profile = false, origin}) => {
  const redirect = encodeURIComponent(origin + '/')
  const logoutLink = `https://login.now.sh/logout?successRedirect=${redirect}`
  return (
    <header>
      {profile
        ? <div>
          <span>{profile.displayName}</span>
          <a href={logoutLink}>Logout</a>
        </div>
        : <Link href='/login'><a>Login</a></Link>
      }
    </header>
  )
}
