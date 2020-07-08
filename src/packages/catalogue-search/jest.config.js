import getCurrentDirectory from './src/lib/get-current-directory.js'
import { join } from 'path'

export default {
  verbose: true,
  setupFiles: [join(getCurrentDirectory(import.meta), 'tests/config/jest/jest-fetch-config.js')],
  testMatch: ['**/tests/**/*test.js?(x)'],
}
