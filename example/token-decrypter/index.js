const express = require('express')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const tokenSecret = process.env.LW_TOKEN_SECRET

if (!tokenSecret) {
  console.error('no LW_TOKEN_SECRET env variable specified')
  process.exit(1)
}

const app = express()
app.use(cookieParser())
app.get('/', (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({error: 'no token cookie'})
  }
  try {
    const decoded = jwt.verify(token, tokenSecret)
    return res.json(decoded)
  } catch (error) {
    res.json({error})
  }
})

app.listen(3000)
