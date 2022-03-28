export default elasticsearchResponse =>
  elasticsearchResponse.body.hits.hits.map(({ _source }) => {
    const {
      id,
      doi,
      sid,
      institution,
      collection,
      schema,
      validated,
      errors,
      state,
      ...metadata
    } = _source

    return {
      id,
      doi,
      sid,
      institution,
      collection,
      schema,
      validated,
      errors,
      state,
      metadata: { ...metadata }
    }
  })
