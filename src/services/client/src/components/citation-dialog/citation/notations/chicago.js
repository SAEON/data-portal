export default function () {
  const { authors, publicationYear, title, publisherLocation, publisher, DOI, url } = this

  return `${authors}. ${publicationYear}. ${title}. ${publisherLocation}: ${publisher}. ${
    DOI ? `${DOI}` : ` ${url}`
  }`
}
