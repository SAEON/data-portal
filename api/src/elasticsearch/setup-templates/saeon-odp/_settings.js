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
            'ocean, sea',
            'jan', 'january',
            'february', 'feb',
            'feb', 'february',
            'august', 'aug',
            'aug', 'august',
            'september', 'sep',
            'sep', 'september',
            'september', 'sept',
            'sept', 'september',
            'october', 'oct',
            'oct', 'october',
            'november', 'nov',
            'nov', 'november',
            'december', 'dec',
            'dec', 'december',
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
