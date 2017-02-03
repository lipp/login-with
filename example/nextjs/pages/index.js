import React from 'react'
import withProfile from '../with-profile'
import withLayout from '../with-layout'
import LoggedInNotification from '../components/LoggedInNotification'
import Link from 'next/link'

const Item = ({name}) => (
  <div className='column'>
    <li className='tag is-large'>
      <span className='icon'>
        <i className={`fa fa-${name.toLowerCase()}`} />
      </span>
      <strong>{name}</strong>
    </li>
    <style jsx>{`
      .tag {
        border: 2px solid rgb(199, 199, 199);
      }
      .icon {
        margin-right: 0.5em;
      }
    `}</style>
  </div>
)

const Index = ({profile, origin}) => (
  <div className='section'>
    <div className='container has-text-centered'>
      <h1 className='title is-2'>Login-With<br />🔑</h1>
      <h2 className='subtitle is-4'>
        Stateless authentication microservice for
        <ul className='columns'>
          {['Twitter', 'Facebook', 'GitHub', 'Reddit'].map(name => <Item name={name} key={name} />)}
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
      ul.columns {
        margin-top: 2em;
        margin-bottom: 8vh;
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
