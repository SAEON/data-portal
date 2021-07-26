export default {
  UserRoles: {
    name: 'userRoles',
    indices: [
      {
        index: 'name',
        options: {
          unique: true,
        },
      },
    ],
  },
  Users: {
    name: 'users',
    indices: [
      {
        index: 'username',
        options: {
          unique: true,
        },
      },
    ],
  },
  Atlases: { name: 'atlases' },
  Logs: {
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
  },
  Lists: {
    name: 'lists',
    indices: [
      {
        index: 'hashedSearch',
        options: {
          unique: true,
        },
      },
    ],
  },
  Databooks: { name: 'databooks' },
  Dashboards: { name: 'dashboards' },
  Charts: { name: 'charts' },
  Filters: { name: 'filters' },
}
