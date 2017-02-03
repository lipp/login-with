import React from 'react'
import withProfile from '../with-profile'
import withLayout from '../with-layout'
import LoggedInNotification from '../components/LoggedInNotification'
import Link from 'next/link'

const Index = ({profile, origin}) => (
  <div className='section'>
    <div className='container has-text-centered'>
      <h1 className='title is-2'>Login-With<br />🔑</h1>
      <h2 className='subtitle is-4'>
        Stateless authentication microservice for
        <ul>
          <li>Twitter</li>
          <li>Facebook</li>
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
        text-indent: -2em;
        font-weight: bolder;
      }
      li:before {
        content: '*';
        font-size: 180%;
        color: #e40dbc;
        margin-right: 0.3em;
        position: relative;
        top: 0.35em;
        line-height: 0.5em;
      }
      .notification {
        font-size: 1.1em;
      }
      .subtitle {
        padding-top: 1em;
      }
    `}</style>
  </div>
)

export default withProfile({Component: withLayout(Index)})
