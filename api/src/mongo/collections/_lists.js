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
      },
    },
  },
  indices: [
    {
      index: 'hashOfFilter',
      options: {
        unique: true,
        partialFilterExpression: { hashOfFilter: { $exists: true } },
      },
    },
  ],
}
