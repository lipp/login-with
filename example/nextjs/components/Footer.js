import React from 'react'

const Footer = () => (
  <footer className='footer'>
    <div className='container has-text-centered'>
      <div className='columns'>
        <div className='column is-full'>
          <div className='jwt tag is-large'>
            <a href='https://jwt.io'>
              Secured with
              <figure className='pic-logo icon'>
                <img src='https://jwt.io/img/pic_logo.svg' />
              </figure>
              <figure className='text-icon icon'>
                <img src='https://jwt.io/img/logo.svg' />
              </figure>
            </a>
          </div>
        </div>
      </div>
      <div className='columns'>
        <div className='column is-one-third'>
          <a href='https://github.com/lipp/login-with'>
            Source Code
          </a> on GitHub
        </div>
        <div className='column is-one-third'>
          Created by <a href='https://github.com/lipp'>lipp</a>
        </div>
        <div className='column is-one-third'>
          Licensed with <a href='http://opensource.org/licenses/mit-license.php'>MIT</a>
        </div>
      </div>
    </div>
    <style jsx>{`
      .jwt.tag {
        width: 240px;
        color: white;
        margin-bottom: 1em;
        background: #333;
      }
      .jwt.tag:after {
        content: '';
        display: block;
      }
      .jwt.tag a {
        font-size: 1.1rem;
        color: white;
      }
      .jwt .icon.pic-logo {
        position: relative;
        top: 1px;
        margin-left: 0.5em;
        margin-right: 0.2em;
      }
      .jwt .icon.text-icon {
        width: 38px;
      }
    `}</style>
  </footer>
)

export default Footer
