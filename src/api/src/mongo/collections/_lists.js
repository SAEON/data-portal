export default {
  name: 'lists',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      properties: {
        type: {
          enum: ['curated', 'public'],
          description: 'A curated list is a list defined on the /data-lists UI'
        }
      }
    }
  },
  indices: [
    {
      index: 'hashedSearch',
      options: {
        unique: true,
        partialFilterExpression: { hashedSearch: { $exists: true } }
      }
    }
  ]
}
