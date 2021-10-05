export default {
  name: 'dataDownloadFormSubmissions',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      description: 'Form submission document',
      required: ['type', 'logId'],
      properties: {
        recordId: {
          bsonType: 'string',
          description:
            'DOI (or ID if no DOI) of the metadataRecord related to the downloaded dataset',
        },
        emailAddress: {
          bsonType: 'string',
          description: 'The email address of a respondent',
        },
        organization: {
          bsonType: 'string',
          description: 'The organization of a respondent',
        },
        allowContact: {
          bsonType: 'bool',
          description: 'Permission from the respondent to follow up with them',
        },
      },
    },
  },
}
