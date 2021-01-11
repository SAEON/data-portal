import mongo from 'mongodb'
const { ObjectID } = mongo

export default async (_, args, ctx) => {
  console.log('!!!!!! I AM HERE !!!!!!')
  const { id, selectedValues } = args
  console.log('args', args)
  const { Filters } = await ctx.mongo.collections
  console.log('Filters', Filters)
  const test = await Filters.findOneAndUpdate(
    { _id: ObjectID(id) },
    {
      $set: {
        selectedValues,
      },
    },
    {
      returnNewDocument: true, //When true, returns the updated document instead of the original document.
      //   upsert: false, //defaults to false. if true: either updates the document, or returns null after inserting the new document(if returNewDocument is false)
    }
  )
  console.log('test value', test)
  const { value } = test
  return value
}
