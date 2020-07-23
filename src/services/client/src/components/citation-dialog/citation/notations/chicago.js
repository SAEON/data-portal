export default function () {
  const { authors, publicationYear, title, publisherLocation, publisher, DOI, url } = this

  return `${authors}. "${title}." ${
    publisherLocation ? `${publisherLocation}:` : ''
  } ${publisher}, ${publicationYear}. ${DOI ? `${DOI}` : ` ${url}`}`
}
