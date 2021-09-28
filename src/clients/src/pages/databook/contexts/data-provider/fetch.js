import { API_PUBLIC_ADDRESS } from '../../../../config'

const EXE_SQL_URI = `${API_PUBLIC_ADDRESS}/sql`

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
