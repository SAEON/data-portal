export default {
  name: 'logs',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['clientSession', 'type', 'info', 'clientInfo'],
      properties: {
        clientSession: {
          bsonType: 'string',
          description: 'Browser session cookie',
        },
        type: {
          enum: ['query', 'click', 'mousemove', 'download'],
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
      },
    },
  },
}