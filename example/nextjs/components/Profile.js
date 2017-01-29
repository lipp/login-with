import React from 'react'
import Link from 'next/link'

const Profile = ({profile}) => (
  <div className='card'>
    <div className='card-header'>
      <p className='card-header-title'>Your Profile</p>
    </div>
    <div className='card-image'>
      <figure className='image is-square'>
        <img src={profile.photo} />
      </figure>
    </div>
    <div className='card-content'>
      <div className='media'>
        <div className='media-left'>
          <span className='icon is-large'>
            <i className={`fa fa-${profile.provider}`} />
          </span>
        </div>
        <div className='media-content'>
          <p className='title'>{profile.name}</p>
          <p className='subtitle is-5'>{profile.username}</p>
        </div>
      </div>
      <div className='content'>
        <p>Your are logged in with {profile.provider}.</p>
        <div className='button'><Link href='/token'><a>View JSON Web-Token</a></Link></div>
      </div>
    </div>
  </div>
)

export default Profile
