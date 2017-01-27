import React from 'react'
import withProfile from '../with-profile'
import withLayout from '../with-layout'
import Profile from '../components/Profile'
import LoggedInNotification from '../components/LoggedInNotification'
import Link from 'next/link'

const Index = ({profile, origin}) => (
  <div className='section'>
    <div className='container has-text-centered'>
      <h1 className='title is-2'>Login-With<br/>🔑</h1>
      <h2 className='subtitle is-4'>
        Stateless authentication microservice for login with
        <ul>
          <li>Twitter</li>
          <li>GitHub</li>
          <li>Reddit</li>
        </ul>
      </h2>
      { profile 
          ? <LoggedInNotification profile={profile} redirect={encodeURIComponent(origin + '/')} />
          : <Link href='/login'>
              <a className='button is-large is-primary'>Try it!</a>
            </Link>
      }
    </div>
    <style jsx>{`
      ul {
        margin: 2em 0;
      }
      li {
        padding-left: 1em;
        text-indent: -1em;
      }
      li:before {
        content: '*';
        font-size: 120%;
        color: #e40dbc;
        margin-right: 0.5em;
        position: relative;
        top: 5px;
      }
      .notification {
        font-family: monospace;
        font-size: 1.1em;
      }
    `}</style>
  </div>
)

export default withProfile({Component: withLayout(Index)})
