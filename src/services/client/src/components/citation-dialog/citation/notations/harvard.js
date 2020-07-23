export default function () {
  const {
    authors,
    publicationYear,
    title,
    resourceDescription,
    publisher,
    DOI,
    dateViewed,
    url,
  } = this

  return `${authors} ${publicationYear}, ${title}, ${resourceDescription}, ${publisher}, ${
    DOI ? `doi: ${DOI}` : `viewed ${dateViewed}, <${url}>`
  }`
}
