export default data =>
  data.map(
    ({
      id,
      sid,
      doi,
      institution_key: institution,
      collection_key: collection,
      schema_key: schema,
      metadata,
      published,
    }) => {
      return {
        id,
        doi,
        institution,
        collection,
        schema,
        published,
        sid,
        ...metadata,
      }
    }
  )
