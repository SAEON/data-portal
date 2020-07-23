export default function () {
  const { authors, publicationYear, title, resourceDescription, DOI, url } = this

  return `${authors}. (${publicationYear}). ${title} [${resourceDescription}]. ${
    DOI ? `doi: ${DOI}` : `Retrieved from ${url}`
  }`
}
