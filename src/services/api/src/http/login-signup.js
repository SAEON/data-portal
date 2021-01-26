import { hash } from 'bcrypt'
const SALT_ROUNDS = 10

export default async ctx => {
  const { username, password, redirect } = ctx.request.body

  if (!username || !password) {
    ctx.throw(400)
  }

  const { Users } = await ctx.mongo.collections

  try {
    await Users.insertOne({
      username,
      email: username,
      passwordHash: await new Promise((resolve, reject) =>
        hash(password, SALT_ROUNDS, (error, h) => (error ? reject(error) : resolve(h)))
      ),
      verified: false,
      modifiedAt: new Date(),
      userRoles: [],
    })

    ctx.redirect(
      `${redirect}?success=${encodeURIComponent('User created - please login to continue')}`
    )
  } catch (error) {
    ctx.redirect(
      `${redirect}?error=${encodeURIComponent(
        'User already exists - please login with your existing credentials'
      )}`
    )
  }
}
