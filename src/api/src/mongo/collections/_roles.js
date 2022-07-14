export default {
  name: 'roles',
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
      description: 'Role document',
      required: ['name'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'The name of the role',
        },
      },
    },
  },
}
