export default function () {
  return `${this.author}. ${this.publicationYear}. ${this.title}. ${this.publisherLocation}: ${
    this.publisher
  }. ${this.DOI ? `${this.DOI}` : ` ${this.url}`}`
}
