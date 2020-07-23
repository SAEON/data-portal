export default function () {
  const {
    DOI,
    url,
    authors,
    keywords,
    language,
    title,
    publisher,
    publicationYear,
    copyright,
  } = this

  return `
@misc {https://doi.org/${DOI}${DOI},
  doi = {${DOI}},
  url = {${url}},
  author = {${authors}},
  keywords = {${keywords}},
  language = {${language}},
  title = {${title}},
  publisher = {${publisher}},
  year = {${publicationYear}},
  copyright = {${copyright}}
}`
}
