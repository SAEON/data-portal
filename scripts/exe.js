import { readdirSync, lstatSync, existsSync } from 'fs'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join, normalize } from 'path'

export const getDirname = url => dirname(fileURLToPath(url))

export const exec = (CMD, debug = false) =>
  debug ? console.info(CMD) : execSync(CMD, { stdio: [0, 1, 2] })

export const print = msg => console.info(`\n\n********** ${msg} **********\n\n`)

export const apply = ({ PATH, script, args = [], debug = false, ignore = [] }) => {
  readdirSync(PATH).forEach(name => {
    const p = normalize(join(PATH, name))
    if (ignore.includes(name)) return
    if (lstatSync(p).isFile()) return
    if (!existsSync(join(p, 'package.json'))) return

    const _script = `chomp -c ${p}/chompfile.toml "${`${script} ${args.join(' ')}`.trim()}"`
    print(`${name} dependencies`)
    console.info('script', _script)

    exec(_script, debug)
  })
}
