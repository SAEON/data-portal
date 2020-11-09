import { query } from '../../../../../../../postgis/index.js'

export default async name =>
  query({
    text: `create database "${name}";`,
  }).catch(error => {
    console.error(error)
    throw error
  })
