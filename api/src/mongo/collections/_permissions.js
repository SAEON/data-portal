export default {
  name: 'permissions',
  indices: [
    {
      index: 'name',
      options: {
        unique: true,
      },
    },
  ],
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      description: 'Permission document',
      required: ['name'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'The name of the permission',
        },
      },
    },
  },
}
