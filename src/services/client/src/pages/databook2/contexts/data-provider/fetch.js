import { CATALOGUE_API_ADDRESS } from '../../../../config'

const EXE_SQL_URI = `${CATALOGUE_API_ADDRESS}/execute-sql`

export default async ({ sql, databookId, signal, setState, state }) => {
  try {
    const response = await fetch(EXE_SQL_URI, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({ databookId, sql }),
      headers: {
        'Content-type': 'application/json',
      },
      signal,
    })

    const reuslt = await response.text()

    if (reuslt.substring(0, 5) === 'ERROR') {
      setState(
        Object.assign(
          { ...state },
          {
            error: new Error(reuslt.substring(5, reuslt.length - 5)),
            loading: false,
            data: undefined,
          }
        )
      )
    } else {
      setState(
        Object.assign({ ...state }, { error: false, loading: false, data: JSON.parse(reuslt) })
      )
    }
  } catch (error) {
    setState(Object.assign({ ...state }, { error, data: undefined, loading: false }))
  }
}
