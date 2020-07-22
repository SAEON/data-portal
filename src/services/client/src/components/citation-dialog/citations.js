export default json => {
  const { publisher, publicationYear, resourceType, identifier, language } = json //singular objects/values
  // eslint-disable-next-line no-unused-vars
  const { creators, dates, titles, subjects, rightsList, descriptions } = json //arrays

  const today = new Date()
  const dateViewed = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

  const DOI = identifier.identifierType === 'DOI' ? identifier.identifier : undefined
  const url = 'some url'
  const author = publisher //might need to be split into first and last names
  //title could be titles[i].title OR linkedResources.resourceDescription OR immutableResource.resourceDescription.
  const title = titles[0].title
  const resourceDescription = resourceType.resourceTypeGeneral
  const publisherLocation = 'some publisher location' //creators[0].affiliations[0].affiliation
  const keywords = subjects.map(sub => sub.subject)
  const copyright = rightsList[0].rights
  const abstract = descriptions.map(desc =>
    desc.descriptionType === 'Abstract' ? desc.description : undefined
  )

  const bibtex = `@misc{https://doi.org/${DOI}${DOI},
  doi = {${DOI}},
  url = {${url}},
  author = {${author}},
  keywords = {${keywords}},
  language = {${language}},
  title = {${title}},
  publisher = {${publisher}},
  year = {${publicationYear}},
  copyright = {${copyright}}
}`

  const ris = `TY  - ${resourceDescription}
T1  - ${title}
AU  - ${author}
DO  - ${DOI}
UR  - ${url}
AB  - ${abstract}
${subjects
  .map(
    sub => `KW  - ${sub.subject.trim()}
`
  )
  .join('')}PY  - ${publicationYear}
PB  - ${publisher}
LA  - ${language}
ER  - `

  return {
    APA:
      `${author}. (${publicationYear}). ${title} [${resourceDescription}]. ` +
      (DOI ? `doi: ${DOI}` : `Retrieved from ${url}`), //https://guides.lib.umich.edu/c.php?g=439304&p=2993299 https://blog.apastyle.org/apastyle/2013/12/how-to-cite-a-data-set-in-apa-style.html
    BibTeX: bibtex,
    Chicago:
      `${author}. ${publicationYear}. ${title}. ${publisherLocation}: ${publisher}. ` +
      (DOI ? `${DOI}` : ` ${url}`), //WIP. Publisher location iffy https://libguides.murdoch.edu.au/Chicago/dataset
    Harvard:
      `${author} ${publicationYear}, ${title}, ${resourceDescription}, ${publisher}, ` +
      (DOI ? `doi: ${DOI}` : `viewed ${dateViewed}, <${url}>`), //https://libraryguides.vu.edu.au/c.php?g=386501&p=4347840
    IEEE:
      `${author}, ${title}, ${publisherLocation}: ${publisher}, ${publicationYear}. [${resourceDescription}] ` +
      (DOI ? `doi: ${DOI}` : `Available: ${url}. [Accessed: ${dateViewed}]`), //WIP. Publisher location iffy https://libguides.murdoch.edu.au/IEEE/dataset https://libraryguides.vu.edu.au/ieeereferencing/gettingstarted#s-lg-box-wrapper-10134708

    MLA:
      `${author}. ${title}. (${resourceDescription}) ${publisherLocation}, ${publisher}, ${publicationYear} ` +
      (DOI ? `doi: ${DOI}` : ` ${dateViewed}. ${url}`), //WIP. Not a clear cut citation
    RIS: ris,
    Vancouver:
      `${author}. ${title} [${resourceDescription}]. ${publisher}: ${publisherLocation}; ${publicationYear}. [cited ${dateViewed}]. ` +
      (DOI ? `doi: ${DOI}` : `Available from ${url}`), //WIP. Supplying Publisher location is iffy https://guides.library.ubc.ca/ld.php?content_id=26931563
  }
}
