export default function () {
  return `${this.author} ${this.publicationYear}, ${this.title}, ${this.resourceDescription}, ${
    this.publisher
  }, ${this.DOI ? `doi: ${this.DOI}` : `viewed ${this.dateViewed}, <${this.url}>`}`
}
