export default function () {
  const {
    authors,
    title,
    resourceDescription,
    publisherLocation,
    publisher,
    publicationYear,
    DOI,
    dateViewed,
    url,
  } = this

  return `${authors}. ${title}. (${resourceDescription}) ${publisherLocation}, ${publisher}, ${publicationYear} ${
    DOI ? `doi: ${DOI}` : ` ${dateViewed}. ${url}`
  }`
}
