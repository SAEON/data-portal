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
          enum: ['download', 'appRender', 'authorization', 'authentication'],
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
  indices: [
    {
      index: 'info.doi',
      options: {
        name: 'downloadDOI',
        unique: false,
        partialFilterExpression: { hashOfFilter: { $exists: true } },
      },
    },
    {
      index: 'info.odpId',
      options: {
        name: 'downloadOdpID',
        unique: false,
        partialFilterExpression: { hashOfFilter: { $exists: true } },
      },
    },
    {
      index: 'type',
      options: {
        name: 'logType',
        unique: false,
      },
    },
  ],
}
