import fetch from 'node-fetch'

export default async (_, args) => {
  const { doi, style = 'apa', language = 'en-US' } = args

  const result = await fetch(
    `https://citation.crosscite.org/format?doi=${doi}&style=${style.replace(
      /_/g,
      '-'
    )}&lang=${language.replace(/_/g, '-')}`
  ).then(res => res.text())

  return result
}
