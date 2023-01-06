export default {
  name: 'logs',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['clientSession', 'type', 'info', 'clientInfo', 'createdAt'],
      additionalProperties: true,
      properties: {
        clientSession: {
          bsonType: 'string',
          description: 'Browser session cookie',
        },
        type: {
          enum: ['download', 'appRender'],
          description: 'The type of event being logged',
        },
        info: {
          bsonType: 'object',
          description: 'Log information - specific to each type',
        },
        clientInfo: {
          bsonType: 'object',
          properties: {
            ipAddress: {
              bsonType: 'string',
              description: 'IP address of client user',
            },
          },
        },
        createdAt: {
          bsonType: 'date',
          description: 'Log creation timestamp',
        },

        // Not required
        clientVersion: { description: 'Version of the client defined in package.json' },
        userId: {
          description: 'ID of logged in user',
        },
      },
    },
  },
}
