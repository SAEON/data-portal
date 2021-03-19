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

// Quick pause, allow npm registry to reflext
console.log('Give NPM registry a chance to reflect updates')
await new Promise(res => setTimeout(res, TIMEOUT))

// Update all packages with new versions
const REPOSITORY_PATH = normalize(join(__dirname, '../'))
print('Updating repository dependencies after package publish')
exec(`npm --prefix ${REPOSITORY_PATH} run update-dependencies`)
