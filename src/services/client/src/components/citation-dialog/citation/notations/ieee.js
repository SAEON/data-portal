export default function () {
  return `${this.author}, ${this.title}, ${this.publisherLocation}: ${this.publisher}, ${
    this.publicationYear
  }. [${this.resourceDescription}] ${
    this.DOI ? `doi: ${this.DOI}` : `Available: ${this.url}. [Accessed: ${this.dateViewed}]`
  }`
}
