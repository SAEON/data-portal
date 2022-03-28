import { google } from 'googleapis'
import authorize from './auth.js'

const getSheets = () =>
  new Promise((resolve, reject) => {
    try {
      authorize(auth => resolve(google.sheets({ version: 'v4', auth })))
    } catch (error) {
      reject(error)
    }
  })

export const getValues = (spreadsheetId, range) =>
  new Promise(async (resolve, reject) => {
    try {
      const sheets = await getSheets()
      sheets.spreadsheets.values.get(
        {
          spreadsheetId,
          range
        },
        (err, res) => (err ? reject(err) : resolve(res))
      )
    } catch (error) {
      reject(error)
    }
  })
