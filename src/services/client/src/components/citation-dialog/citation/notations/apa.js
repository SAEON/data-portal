export default function () {
  return `${this.author}. (${this.publicationYear}). ${this.title} [${this.resourceDescription}]. ${
    this.DOI ? `doi: ${this.DOI}` : `Retrieved from ${this.url}`
  }`
}
