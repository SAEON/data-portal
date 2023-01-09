export default {
  name: 'permissions',
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
  indices: [
    {
      index: 'name',
      options: {
        name: 'name',
        unique: true,
      },
    },
  ],
}
