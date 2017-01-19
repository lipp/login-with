const express = require('express')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const url = require('url')
const tokenSecret = process.env.LW_TOKEN_SECRET

if (!tokenSecret) {
  console.error('no LW_TOKEN_SECRET env variable specified')
  process.exit(1)
}

const app = express()
app.use(cookieParser())
app.get('/', (req, res) => {
  try {
    const token = req.cookies.token
    if (req.headers.referer) {
      const {protocol, hostname} = url.parse(req.headers.referer)
      const origin = `${protocol}//${hostname}`
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Credentials', 'true')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    }
    if (!token) {
      return res.json({error: 'no token cookie'})
    }
    try {
      const decrypted = jwt.verify(token, tokenSecret)
      return res.json({token, decrypted})
    } catch (error) {
      res.json({error})
    }
  } catch (error) {
    res.json({error})
  }
})

app.listen(3000)
