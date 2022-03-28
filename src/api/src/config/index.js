import { readFileSync } from 'fs'
export const packageJson = JSON.parse(readFileSync('../../package.json'))

export * from './_deployment.js'
export * from './_app.js'
export * from './_mongo.js'
export * from './_postgis.js'
export * from './_elasticsearch.js'
export * from './_odp.js'
