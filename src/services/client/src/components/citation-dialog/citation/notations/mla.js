export default function () {
  return `${this.author}. ${this.title}. (${this.resourceDescription}) ${this.publisherLocation}, ${
    this.publisher
  }, ${this.publicationYear} ${this.DOI ? `doi: ${this.DOI}` : ` ${this.dateViewed}. ${this.url}`}`
}
