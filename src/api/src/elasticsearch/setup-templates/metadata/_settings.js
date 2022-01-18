export default {
  index: {
    mapping: {
      ignore_malformed: true,
    },
    analysis: {
      normalizer: {
        keyword_trimmed_lower: {
          type: 'custom',
          char_filter: [],
          filter: ['lowercase', 'asciifolding', 'trim'],
        },
      },
      analyzer: {
        saeon_text_fields: {
          tokenizer: 'lowercase',
        },
      },
    },
  },
}
