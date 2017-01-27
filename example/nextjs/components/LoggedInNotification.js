import React from 'react'

export default ({profile, redirect}) => (
  <div className='notification'>
    You are <strong>already logged
    </strong> in with {profile.provider}.
    Click <a href={`https://login.now.sh/logout?success=${redirect}`}> here </a> 
    to logout.
  </div>
)
