import arg from 'arg'
import { exec } from './exe.js'

const ARGS = arg({
  '--semver': String,
  '--package': String,
  '-s': '--semver',
  '-p': '--package',
})

const SEMVER = ARGS['--semver']
const PACKAGE = ARGS['--package']

try {
  exec('git add .')
  exec(`git commit -m "Staging current changes. Bumping ${SEMVER} (${PACKAGE})" --no-verify`)
} catch {
  console.log(`TODO - Not sure why this happens`)
}

switch (SEMVER) {
  case 'patch':
    exec(`npm version patch -m "Increment package.json ${SEMVER} version (${PACKAGE})"`)
    break

  case 'minor':
    exec(`npm version minor -m "Increment package.json ${SEMVER} version (${PACKAGE})"`)
    break

  case 'major':
    exec(`npm version major -m "Increment package.json ${SEMVER} version (${PACKAGE})"`)
    break

  default:
    throw new Error('Incorrect SEMVER specified')
}

exec('git add .')
exec(`git commit -m "Bumped ${PACKAGE} ${SEMVER}" --no-verify`)

// Publish to NPM
exec('npm init --scope=@saeon')
exec('npm publish --access public')

console.log(`Complete! See your package at https://npmjs.com/package/${PACKAGE}`)
