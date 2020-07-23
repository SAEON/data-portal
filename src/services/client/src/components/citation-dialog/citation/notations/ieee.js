export default function () {
  const {
    authors,
    title,
    publisherLocation,
    publisher,
    publicationYear,
    resourceDescription,
    DOI,
    url,
    dateViewed,
  } = this

  return `${authors}, ${title}, ${publisherLocation}: ${publisher}, ${publicationYear}. [${resourceDescription}] ${
    DOI ? `doi: ${DOI}` : `Available: ${url}. [Accessed: ${dateViewed}]`
  }`
}
