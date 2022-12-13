export default ({ _source }, { style = 'apa', language = 'en-US' }) => {
  let url
  if (style === 'ris') {
    url = `https://api.datacite.org/dois/application/x-research-info-systems/${_source.doi}`
  } else if (style === 'bibtex') {
    /**
     * The bibtex returned by api.datacite is
     * a little nicer than from crosscite
     */
    url = `https://api.datacite.org/dois/application/x-bibtex/${_source.doi}`
  } else {
    url = `https://citation.crosscite.org/format?doi=${_source.doi}&style=${style.replace(
      /_/g,
      '-'
    )}&lang=${language.replace(/_/g, '-')}`
  }

  return fetch(url).then(res => res.text())
}
