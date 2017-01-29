/* globals fetch */
import 'isomorphic-fetch'

const fetchJson = async (url, headers) => {
  const res = await fetch(url, headers)
  return res.json()
}

const fetchWithCookies = async (url, req) => {
  const opts = {
    credentials: 'include',
    headers: {
      cookie: req ? req.headers.cookie : null
    }
  }
  return await fetchJson(url, opts)
}

export default fetchWithCookies

