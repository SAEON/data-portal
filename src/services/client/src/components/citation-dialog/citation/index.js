import BibTeX from './notations/bibtex'
import RIS from './notations/ris'
import APA from './notations/apa'
import Chicago from './notations/chicago'
import Harvard from './notations/harvard'
import IEEE from './notations/ieee'
import MLA from './notations/mla'
import Vancouver from './notations/vancouver'

export default function Citation({
  DOI,
  url,
  authors,
  keywords,
  language,
  title,
  publisher,
  publicationYear,
  copyright,
  resourceDescription,
  abstract,
  subjects,
  publisherLocation,
  dateViewed,
}) {
  this.DOI = DOI
  this.url = url
  this.authors = authors.join(', ')
  this.keywords = keywords
  this.language = language
  this.title = title
  this.publisher = publisher
  this.publicationYear = publicationYear
  this.copyright = copyright
  this.resourceDescription = resourceDescription
  this.abstract = abstract
  this.subjects = subjects
  this.publisherLocation = publisherLocation
  this.dateViewed = dateViewed

  Object.defineProperties(this, {
    APA: { get: () => APA.call(this) },
    Chicago: { get: () => Chicago.call(this) },
    Harvard: { get: () => Harvard.call(this) },
    IEEE: { get: () => IEEE.call(this) },
    MLA: { get: () => MLA.call(this) },
    Vancouver: { get: () => Vancouver.call(this) },
    BibTeX: { get: () => BibTeX.call(this) },
    RIS: { get: () => RIS.call(this) },
  })
}
