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
        width: 140px;
        border: 2px solid rgb(199, 199, 199);
        border-radius: 6px;
      }
      .icon {
        margin-right: 0.5em;
      }
      .column {
        flex-basis: initial;
        flex-shrink: 0;
        flex-grow: 0;
      }
    `}</style>
  </div>
)

const Index = ({profile, origin}) => (
  <div className='section'>
    <div className='container has-text-centered'>
      <h1 className='title is-2'>Login-With<br />🔑</h1>
      <script async defer src='https://buttons.github.io/buttons.js' />
      <a className='github-button' href='https://github.com/lipp/login-with' data-icon='octicon-star' data-size='large' data-show-count='true' aria-label='Star lipp/login-with on GitHub'>Star</a>
      <h2 className='subtitle is-4'>
        Stateless authentication microservice for
        <ul>
          {['Twitter', 'Facebook', 'Google', 'GitHub', 'Reddit', 'LinkedIn', 'Instagram'].map(name => <Item name={name} key={name} />)}
        </ul>
      </h2>
      { profile
          ? <LoggedInNotification profile={profile} redirect={encodeURIComponent(origin + '/')} />
          : <Link href='/login'>
            <a className='button is-large is-primary'>
              <span>Try it</span>
              <span className='icon'><i className='fa fa-user' /></span>
            </a>
          </Link>
      }
      <br />
    </div>
    <div className='deploy has-text-centered'>
      <h1 className='title is2'>Deploy your own</h1>
      <div className='notification now'><strong>now</strong> lipp/login-with</div>
      <div className='notification docker'><strong>docker</strong> pull lipp/login-with</div>
    </div>
    <style jsx global>{`
      .fa-linkedin {
        position: relative;
        top: -1px;
      }
    `}</style>
    <style jsx>{`
      ul {
        display: flex;
        flex-wrap: wrap;
        margin-top: 2em;
        margin-bottom: 7vh;
        width: 100%;
        justify-content: center;
      }
      .notification {
        font-size: 1.1em;
      }
      .deploy {
        margin: 4em 0;
      }
      .deploy .notification {
        font-size: 1.3em;
        font-family: monospace;
      }
      .deploy strong {
        color: white;
      }
      .now {
        background-color: #333;
        color: white;
      }
      .docker {
        background: rgba(20,136,198,1);
        color: white;
      }
      .subtitle {
        padding-top: 1em;
        width: 100%;
      }
      .button.is-primary {
        margin-bottom: 3em;
        background-color: #da54c3;
        text-transform: uppercase;
      }
      .button.is-primary:hover {
        background-color: #c558b3;
      }
      .github-button {
        color: white;
        display: block;
        margin: 20px;
      }
    `}</style>
  </div>
)

export default withProfile({Component: withLayout(Index)})
