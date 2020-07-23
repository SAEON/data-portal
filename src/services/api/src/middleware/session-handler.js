import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import cookie from 'cookie'

export default async (ctx, next) => {
  const { method, headers } = ctx.req
  const { origin, cookie } = headers
  //cookie test
  //bcrypt hashing: https://coderrocketfuel.com/article/using-bcrypt-to-hash-and-check-passwords-in-node-js
  //get cookies https://stackoverflow.com/questions/51812422/node-js-how-can-i-get-cookie-value-by-cookie-name-from-request/51812642
  //cookies https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
  //jwb https://www.sohamkamani.com/blog/javascript/2019-03-29-node-jwt-authentication/

  //getting cookies from headers. use cookie-parser package instead?
  res.setHeader(
    'set-cookie',
    [
      proxyRes.headers?.['set-cookie']?.map(c => c), // TODO - repack CouchDB cookie with sameSite, etc.
      cookie.serialize(
        'ClientSession',
        cookie.parse(req.headers.cookie || '').ClientSession ||
          Buffer.from(
            JSON.stringify({
              date: new Date(),
              id: nanoid(),
            })
          ).toString('base64'),
        {
          httpOnly: true,
          secure: NODE_ENV === 'development' ? false : true,
          sameSite: NODE_ENV === 'development' ? 'lax' : 'none',
        }
      ),
    ]
      .flat()
      .filter(_ => _)
  )

  var cookies = {}
  cookie &&
    cookie.split(';').forEach(function (ck) {
      var parts = ck.match(/(.*?)=(.*)$/)
      cookies[parts[1].trim()] = (parts[2] || '').trim()
    })
  console.log('cookies', cookies)

  if (!cookies.CatalogueSession) {
    //create session
    var catalogueSessionId
    const password = 'mypass123'
    const saltRounds = 10

    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        throw err
      } else {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            throw err
          } else {
            console.log('hash', hash)
            catalogueSessionId = hash
            console.log('catalogueSessionId', catalogueSessionId)

            //create jwt
            jwt.sign()
            const token = jwt.sign({ username: 'user1', exp: 1547974082 }, 'jwt.Secret?', {
              algorithm: 'HS256',
              expiresIn: 300,
            })
            console.log('token', token)
            ctx.req.headers.cookie('CatalogueSession', token)
          }
        })
      }
    })
  }
  console.log('hello world!')
  const password = 'mypass123'
  const saltRounds = 10

  await next()
}
