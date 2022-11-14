import { join, normalize, dirname, sep } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const _script = process.argv[2]

/**
 * Import the requested script
 */
const scriptPath = normalize(join(__dirname, `.${sep}scripts${sep}${_script}${sep}index.js`))
const script = await import(scriptPath)
  .then(({ default: fn }) => fn)
  .catch(error => {
    console.error(
      `
Unable to import module from ${scriptPath}. Make sure there is a file
./scripts/name-of-you-script/index.js that has a default export, and use
the script by running:

===
npm start name-of-your-script
===\n\n`,
      error.message
    )
    process.exit(1)
  })

/**
 * Execute the script
 */
console.info('=== Running script', _script)
Promise.resolve(script()).catch(error => {
  console.error('Error executing script', error.message)
  process.exit(1)
})
