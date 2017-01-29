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
            <a className='nav-item'><strong>Login-With 🔑</strong></a>
          </Link>
        </div>
        {profile
          ? <div className='nav-center'>
              <div className='nav-item is-hidden-touch'>
                <span>
                  Logged in as 
                </span>
              </div>
              <div className='nav-item'>
                <Link href='/token'>
                  <a><strong> {profile.displayName}</strong></a>
                </Link>
              </div>
              {profile.photo && 
                <div className='nav-item' style={{marginLeft: '-1em'}}>
                  <Link href='/token'>
                    <figure className='image is-24x24'>
                      <img src={profile.photo} />
                    </figure>
                  </Link>
                </div>
              }
            </div>
          : <div className='nav-right'>
              <Link href='/login'><a className='nav-item is-pulled-right'>Login</a></Link>
            </div>
        }
      </div>
      <style jsx>{`
        .nav-center .nav-item {
          margin-left: -1em;
        }
      `}</style>
    </nav>
  )
}
