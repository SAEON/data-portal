export default json => {
  const { publisher, publicationYear, resourceType, identifier } = json //singular objects/values
  // eslint-disable-next-line no-unused-vars
  const { creators, dates, titles } = json //arrays

  const today = new Date()
  const dateViewed = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

  const DOI = identifier.identifierType === 'DOI' ? identifier.identifier : undefined
  const url = 'some url'
  const author = publisher
  //title could be titles[i].title OR linkedResources.resourceDescription OR immutableResource.resourceDescription.
  const title = titles[0].title
  const resourceDescription = resourceType.resourceTypeGeneral

  return {
    APA:
      `${author}. (${publicationYear}). ${title} [${resourceDescription}]. ` +
      (DOI ? `doi: ${DOI}` : `Retrieved from ${url}`), //https://guides.lib.umich.edu/c.php?g=439304&p=2993299 https://blog.apastyle.org/apastyle/2013/12/how-to-cite-a-data-set-in-apa-style.html
    Harvard:
      `${author} ${publicationYear}, ${title}, ${resourceDescription}, ${publisher}, ` +
      (DOI ? `doi: ${DOI}` : `viewed ${dateViewed}, <${url}>`), //https://libraryguides.vu.edu.au/c.php?g=386501&p=4347840
    MLA: `MLA citation in development`,
    Vancouver: `Vancouver citation in development`,
    Chicago: `Chicago citation in development`,
    IEEE: `IEEE citation in development`,
    BibTeX: `BibTeX citation in development`,
    RIS: `RIS citation in development`,
  }
}
