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
            'garbage, rubbish',
            'trash, rubbish',
            'sea, ocean',
            'jan, january',
            'february, feb',
            'august, aug',
            'september, sep',
            'september, sept',
            'october, oct',
            'november, nov',
            'december, dec',
          ],
        },
        plural_stemmer: {
          type: 'stemmer',
          language: 'english',
        },
      },
      analyzer: {
        saeon_text_fields: {
          filter: ['vocabulary_mapping', 'plural_stemmer'],
          tokenizer: 'lowercase',
        },
      },
    },
  },
}
