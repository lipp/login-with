import React from 'react'
import Link from 'next/link'

export default ({profile, redirect}) => (
  <div className='notification'>
    Welcome back <strong>{profile.name.givenName || profile.name.familyName}</strong>!
    You can check your <Link href='/token'><a>profile</a></Link> or
    <a href={`https://login.now.sh/logout?success=${redirect}`}> logout </a>.
  </div>
)
