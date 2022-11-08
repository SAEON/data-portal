export default {
  properties: {
    creators: {
      type: 'nested',
      include_in_parent: true,
      properties: {
        name: {
          type: 'text',
          fields: {
            raw: {
              ignore_above: 256,
              type: 'keyword',
              normalizer: 'keyword_trimmed_lower',
            },
          },
        },
      },
    },
    linkedResources: {
      type: 'nested',
      include_in_parent: true,
      properties: {
        linkedResourceType: {
          type: 'text',
          fields: {
            raw: {
              ignore_above: 256,
              type: 'keyword',
              normalizer: 'keyword_trimmed_lower',
            },
          },
        },
      },
    },
    subjects: {
      type: 'nested',
      include_in_parent: true,
      properties: {
        subject: {
          type: 'text',
          fields: {
            raw: {
              ignore_above: 256,
              type: 'keyword',
              normalizer: 'keyword_trimmed_lower',
            },
          },
        },
        subjectScheme: {
          type: 'text',
          fields: {
            raw: {
              ignore_above: 256,
              type: 'keyword',
              normalizer: 'keyword_trimmed_lower',
            },
          },
        },
      },
    },
  },
  dynamic_templates: [
    {
      booleans: {
        mapping: {
          type: 'boolean',
        },
        match_mapping_type: 'boolean',
      },
    },
    {
      integers: {
        mapping: {
          type: 'long',
        },
        match_mapping_type: 'long',
      },
    },
    {
      doubles: {
        mapping: {
          type: 'double',
        },
        match_mapping_type: 'double',
      },
    },
    {
      dates: {
        mapping: {
          type: 'date',
          fields: {
            raw: {
              ignore_above: 256,
              type: 'keyword',
              normalizer: 'keyword_trimmed_lower',
            },
          },
        },
        match_mapping_type: 'string',
        match: 'gte|lte',
      },
    },
    {
      spatial: {
        mapping: {
          type: 'geo_shape',
          orientation: 'counterclockwise',
          ignore_malformed: true,
        },
        match_mapping_type: 'string',
        match: 'geoLocationBox*',
      },
    },
    {
      publicationYear: {
        mapping: {
          type: 'long',
        },
        match_mapping_type: 'string',
        match: 'publicationYear',
      },
    },
    {
      title: {
        mapping: {
          analyzer: 'saeon_text_fields',
          type: 'text',
          fields: {
            raw: {
              ignore_above: 512,
              type: 'keyword',
              normalizer: 'keyword_trimmed_lower',
            },
          },
        },
        match_mapping_type: 'string',
        match: 'title',
      },
    },
    {
      strings: {
        mapping: {
          analyzer: 'saeon_text_fields',
          type: 'text',
          fields: {
            raw: {
              ignore_above: 256,
              type: 'keyword',
              normalizer: 'keyword_trimmed_lower',
            },
          },
        },
        match_mapping_type: 'string',
        unmatch: 'publicationYear|gte|lte|subjects|title',
      },
    },
  ],
}
