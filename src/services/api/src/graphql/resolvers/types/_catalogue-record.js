import fetch from 'node-fetch'

export default {
  id: async self => self._id,
  metadata: async self => self,
  data: async self => 'To be implemented',
  citation: async (self, args) => {
    const { doi } = self._source
    const { style = 'apa', language = 'en-US' } = args
    return await fetch(
      `https://citation.crosscite.org/format?doi=${doi}&style=${style.replace(
        /_/g,
        '-'
      )}&lang=${language.replace(/_/g, '-')}`
    ).then(res => res.text())
  },
}
