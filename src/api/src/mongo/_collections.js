export default {
  Roles: {
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
          emailAddress: {
            bsonType: 'string',
            description: 'The name of the role',
          },
        },
      },
    },
  },
  Permissions: {
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
          emailAddress: {
            bsonType: 'string',
            description: 'The name of the permission',
          },
        },
      },
    },
  },
  Users: {
    name: 'users',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        description: 'User document',
        required: ['emailAddress'],
        properties: {
          emailAddress: {
            bsonType: 'string',
            description: "User's email address (used as a primary key)",
          },
        },
      },
    },
    indices: [
      {
        index: 'emailAddress',
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
