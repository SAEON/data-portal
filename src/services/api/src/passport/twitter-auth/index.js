import passport from 'koa-passport'
import { collections } from '../../mongo/index.js'
import { Strategy as TwitterStrategy } from 'passport-twitter'
import base64url from 'base64url'
import {
  CATALOGUE_API_TWITTER_CLIENT_SECRET,
  CATALOGUE_API_TWITTER_CLIENT_ID,
  CATALOGUE_API_TWITTER_OAUTH_REDIRECT_ADDRESS,
  CATALOGUE_API_ADDRESS,
} from '../../config.js'

export default () => {
  if (CATALOGUE_API_TWITTER_CLIENT_ID && CATALOGUE_API_TWITTER_CLIENT_SECRET) {
    passport.use(
      new TwitterStrategy(
        {
          consumerKey: CATALOGUE_API_TWITTER_CLIENT_ID,
          consumerSecret: CATALOGUE_API_TWITTER_CLIENT_SECRET,
          callbackURL: CATALOGUE_API_TWITTER_OAUTH_REDIRECT_ADDRESS,
        },
        async (token, tokenSecret, profile, cb) => {
          const { Users } = await collections

          const { id: twitterId, _json: twitterProfile } = profile

          if (!twitterProfile.email_verified) {
            cb(new Error('Twitter email has not been verified', null))
          } else {
            try {
              cb(
                null,
                (
                  await Users.findAndModify(
                    {
                      email: twitterProfile.email,
                    },
                    null,
                    {
                      $setOnInsert: {
                        email: twitterProfile.email,
                        userRoles: [],
                      },
                      $set: {
                        twitter: Object.assign(
                          { twitterId, modifiedAt: new Date() },
                          twitterProfile
                        ),
                      },
                    },
                    {
                      new: true,
                      upsert: true,
                    }
                  )
                ).value
              )
            } catch (error) {
              cb(error, null)
            }
          }
        }
      )
    )

    passport.serializeUser((user, cb) => {
      cb(null, user)
    })

    passport.deserializeUser((user, cb) => {
      cb(null, user)
    })

    return {
      authenticate: passport.authenticate('twitter'),
      login: async (ctx, next) =>
        passport.authenticate('twitter', {
          scope: ['email'],
          state: base64url(
            JSON.stringify({ redirect: ctx.request.query.redirect || CATALOGUE_API_ADDRESS })
          ),
        })(ctx, next),
    }
  } else {
    console.info('Twitter API OAUTH credentials not provided. Skipping setup')
    return {
      authenticate: ctx => ctx.throw(401),
      login: ctx => ctx.throw(401),
    }
  }
}
