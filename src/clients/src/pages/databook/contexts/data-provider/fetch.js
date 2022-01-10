import { PUBLIC_HTTP_ADDRESS } from '../../../../config'

const EXE_SQL_URI = `${PUBLIC_HTTP_ADDRESS}/sql`

export default ({ sql, databookId, signal }) => {
  return fetch(EXE_SQL_URI, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ databookId, sql }),
    headers: {
      'Content-type': 'application/json',
    },
    signal,
  }).then(res => res.text())
}
