import React from 'react'
import Link from 'next/link'

export default ({profile = false, origin}) => {
  const redirect = encodeURIComponent(origin + '/')
  const logoutLink = `https://login.now.sh/logout?success=${redirect}`
  return (
    <nav className='nav has-shadow'>
      <div className='container'>
        <div className='nav-left'>
          <Link href='/'>
            <a className='nav-item'>Login-Example</a>
          </Link>
        </div>
        {profile
          ? <div className='nav-right'>
              <div className='nav-item is-hidden-touch'>
                <span>Logged in as <strong>{profile.displayName}</strong></span>
              </div>
              <div className='nav-item'>
                <a className='button' href={logoutLink}>
                  <span className='icon is-small'><i className='fa fa-sign-out' /></span>
                </a>
              </div>
            </div>
          : <div className='nav-right'>
              <Link href='/login'><a className='nav-item'>Login</a></Link>
            </div>
        }
      </div>
    </nav>
  )
}
