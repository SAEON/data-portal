export default function () {
  return `
@misc {https://doi.org/${this.DOI}${this.DOI},
  doi = {${this.DOI}},
  url = {${this.url}},
  author = {${this.author}},
  keywords = {${this.keywords}},
  language = {${this.language}},
  title = {${this.title}},
  publisher = {${this.publisher}},
  year = {${this.publicationYear}},
  copyright = {${this.copyright}}
}`
}
