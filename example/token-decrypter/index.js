const jwt = require('jsonwebtoken')
const {send} = require('micro')
const tokenSecret = process.env.LW_TOKEN_SECRET
const cookie = require('cookie')
const url = require('url')

if (!tokenSecret) {
  console.error('no LW_TOKEN_SECRET env variable specified')
  process.exit(1)
}

module.exports = async (req, res) => {
  const {token} = cookie.parse(req.headers.cookie)
  if (req.headers.referer) {
    const {protocol, hostname} = url.parse(req.headers.referer)
    const origin = `${protocol}//${hostname}`
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  }
  send(res, 200, {token, decrypted: jwt.verify(token, tokenSecret)})
}
