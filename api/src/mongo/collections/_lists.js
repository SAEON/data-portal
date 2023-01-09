export default {
  name: 'lists',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      properties: {
        type: {
          enum: ['curated', 'public'],
          description: 'A curated list is a list defined on the /data-lists UI',
        },
        disableSEO: {
          enum: [true, false],
          description:
            'Allow for explicitly omitting lists from sitemap.xml (SEO). This only applies to lists with a title and description field (lists without both are omitted from the sitemap.xml file anyway)',
        },
        title: {
          bsonType: 'string',
          description: 'List title',
        },
        description: {
          bsonType: 'string',
          description: 'List description',
        },
        createdBy: {
          bsonType: 'string',
          description: 'The person or application that created the list',
        },
        userId: {
          description:
            'ID of logged in user who requested the list be created (if user is logged in)',
        },
        clientSession: {
          bsonType: 'string',
          description: 'ID of the browser session if it exists',
        },
      },
    },
  },
  indices: [
    {
      index: 'hashOfFilter',
      options: {
        name: 'hashOfFilter',
        unique: true,
        partialFilterExpression: { hashOfFilter: { $exists: true } },
      },
    },
    {
      _type: 'text',
      createdBy: 'text',
      description: 'text',
      title: 'text',
      type: 'text',
      options: {
        name: 'text',
      },
    },
  ],
}
