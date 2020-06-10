// Make a POST request and parse the response as JSON
export default (url, params) =>
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: Object.keys(params)
      .map(key => key + '=' + params[key])
      .join('&'),
  })
    .then(res => res.text())
    .catch(error => {
      throw new Error('Authentication error', error)
    })
