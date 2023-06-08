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
        english_stop: {
          type: 'stop',
          stopwords: '_english_',
        },
        english_minimal_stemmer: {
          type: 'stemmer',
          language: 'minimal_english',
        },
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
        light_english_stemmer: {
          type: 'stemmer',
          language: 'light_english',
        },
      },
      analyzer: {
        saeon_text_fields: {
          type: 'custom',
          tokenizer: 'standard',
          filter: [
            'lowercase',
            'english_stop',
            'vocabulary_mapping',
            'english_minimal_stemmer',
            'light_english_stemmer',
          ],
        },
      },
    },
  },
}
