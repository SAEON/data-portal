export default function () {
  return `${this.author}. ${this.title} [${this.resourceDescription}]. ${this.publisher}: ${
    this.publisherLocation
  }; ${this.publicationYear}. [cited ${this.dateViewed}]. ${
    this.DOI ? `doi: ${this.DOI}` : `Available from ${this.url}`
  }`
}
