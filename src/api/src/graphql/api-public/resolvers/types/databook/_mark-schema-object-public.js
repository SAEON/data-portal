import { POSTGIS_USERNAME_PUBLIC } from '../../../../../config.js'

/**
 * Marking an object as public involves
 *  1. Making sure that the public Postgres user can access the db
 *  2. Adding the public relation to the authentication.public list
 */
export default async (databook, { object }, ctx) => {
  const { query } = ctx.postgis
  const schema = databook._id.toString()
  const { Databooks } = await ctx.mongo.collections

  try {
    /**
     * Mark the object as public in the Mongo doc
     */
    await Databooks.findOneAndUpdate(
      {
        _id: databook._id,
      },
      {
        $addToSet: {
          'authentication.public': object,
        },
      },
      {
        upsert: false,
        returnDocument: 'after',
      }
    )

    /**
     * Create public user usage on schema
     */
    await query({
      text: `grant usage on schema "${schema}" to "${POSTGIS_USERNAME_PUBLIC}";`,
    })

    /**
     * Grant public read access on the specified table to this user
     */
    await query({
      text: `grant select on "${schema}"."${object}" to "${POSTGIS_USERNAME_PUBLIC}";`,
    })

    console.info(`Successfully marked "${schema}"."${object}" as public`)
    return true
  } catch (error) {
    console.error(`Unable to mark "${schema}"."${object}" object as public`, error)
    return false
  }
}
