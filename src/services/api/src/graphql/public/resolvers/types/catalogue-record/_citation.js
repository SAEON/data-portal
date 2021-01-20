import fetch from 'node-fetch'

export default ({ _source }, { style = 'apa', language = 'en-US' }) =>
  fetch(
    `https://citation.crosscite.org/format?doi=${_source.doi}&style=${style.replace(
      /_/g,
      '-'
    )}&lang=${language.replace(/_/g, '-')}`
  ).then(res => res.text())
