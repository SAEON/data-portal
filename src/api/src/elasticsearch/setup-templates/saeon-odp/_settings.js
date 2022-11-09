export default {
  index: {
    analysis: {
      normalizer: {
        keyword_trimmed_lower: {
          type: 'custom',
          char_filter: [],
          filter: ['lowercase', 'asciifolding', 'trim'],
        },
      },
      filter: {
        vocabulary_mapping: {
          type: 'synonym',
          synonyms: [
            'examplesynonymforrainfall, rainfall',
            'examplesynonym2forrainfall, rainfall',
            'garbage, rubbish',
            'trash, rubbish',
            'sea, ocean',
            'ocean, sea'
          ],
        },
      },
      analyzer: {
        saeon_text_fields: {
          filter: ['vocabulary_mapping'],
          tokenizer: 'lowercase',
        },
      },
    },
  },
}
