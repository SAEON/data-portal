import fetch from 'node-fetch'

export default {
  id: async self => self._id,
  target: async self => self,
  citation: async (self, args) => {
    const { identifier } = self._source
    const doi = identifier.identifierType === 'DOI' ? identifier.identifier : 'INVALID_DOI'
    const { style = 'apa', language = 'en-US' } = args
    return await fetch(
      `https://citation.crosscite.org/format?doi=${doi}&style=${style.replace(
        /_/g,
        '-'
      )}&lang=${language.replace(/_/g, '-')}`
    ).then(res => res.text())
  },
}
