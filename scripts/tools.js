import { readdirSync, lstatSync } from 'fs'
import { execSync, exec as e } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join, normalize } from 'path'

const NPM_NATIVE_SCRIPTS = ['install']

export const NPM_SCRIPTS = Object.freeze({
  install: 'install',
  ncu: 'ncu',
})

export const getDirname = url => dirname(fileURLToPath(url))

export const exec = (CMD, debug = false) =>
  debug ? console.log(CMD) : execSync(CMD, { stdio: [0, 1, 2] })

export const execWithOutput = CMD =>
  new Promise((resolve, reject) => {
    let data = ''
    let error = ''
    const p = e(CMD)
    p.stdout.on('data', chunk => (data += chunk.toString('utf8')))
    p.stdout.on('end', () => resolve(data))
    p.stderr.on('data', chunk => (error += chunk.toString('utf8')))
    p.stderr.on('end', () => reject(error))
  })

export const print = msg => console.log(`\n\n********** ${msg} **********\n\n`)

export const apply = ({ PATH, script, args = undefined, debug = false, ignore = [] }) =>
  readdirSync(PATH)
    .filter(name => !ignore.includes(name))
    .forEach(name => {
      const P = normalize(join(PATH, name))
      if (lstatSync(P).isFile()) return
      print(`${name} dependencies`)
      NPM_NATIVE_SCRIPTS.includes(script)
        ? exec(`npm --prefix ${P} ${script}`, debug)
        : exec(`npm --prefix ${P} run "${`${script} ${(args || []).join(' ')}`.trim()}"`, debug)
    })
