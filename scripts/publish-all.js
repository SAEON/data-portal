import arg from 'arg'
import { normalize, join } from 'path'
import { getDirname, apply, exec, print } from './tools.js'

const __dirname = getDirname(import.meta.url)

const TIMEOUT = 30000

const ARGS = arg({
  '--semver': String,
  '-s': '--semver',
})

const SEMVER = ARGS['--semver']

// Validate args
if (!SEMVER) {
  throw new Error('Missing semver flag, please specify this option (-s, --semver)')
}

// Packages
const PACKAGES_PATH = normalize(join(__dirname, '../src/packages'))
apply({
  PATH: PACKAGES_PATH,
  script: `publish:${SEMVER}`,
  ignore: [],
})
