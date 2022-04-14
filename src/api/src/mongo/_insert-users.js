import collections from './collections/index.js'

export default async (db, emailAddresses, roleName) => {
  const role = await db.collection(collections.Roles.name).findOne({ name: roleName })
  const { _id: roleId } = role

  await Promise.all(
    emailAddresses.map(emailAddress =>
      db.collection(collections.Users.name).findOneAndUpdate(
        {
          emailAddress,
        },
        {
          $setOnInsert: { emailAddress },
          $addToSet: {
            roles: roleId,
          },
        },
        { upsert: true }
      )
    )
  )
}
