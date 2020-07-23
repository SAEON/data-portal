export default function () {
  const {
    authors,
    title,
    resourceDescription,
    publisher,
    publisherLocation,
    publicationYear,
    dateViewed,
    DOI,
    url,
  } = this

  return `${authors}. ${title} [${resourceDescription}]. ${publisher}: ${publisherLocation}; ${publicationYear}. [cited ${dateViewed}]. ${
    DOI ? `doi: ${DOI}` : `Available from ${url}`
  }`
}
