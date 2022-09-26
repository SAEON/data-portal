import fetch from 'make-fetch-happen'

/**
 * Immutable resource links to repository.saeon.ac.za seem to go
 * to a landing page. So /download needs to be appended
 *
 * There may be other ways that normalizing this is needed
 */
export default async uri => {
  // Normalize repository.saeon links to include /download path
  if (uri.toLowerCase().includes('repository.saeon.ac.za')) {
    const isHtmlPage = (
      await fetch(uri, { method: 'HEAD' }).then(res => res.headers.get('Content-Type'))
    )
      .toLowerCase()
      .includes('text/html;')

    if (isHtmlPage) {
      return `${uri}/download`
    }
  }

  // Otherwise just return the uri
  return uri
}
