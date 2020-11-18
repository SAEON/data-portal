import { createInterface } from 'readline'
import { start as startspinner, stop as stopSpinner } from './lib/spinner.js'

export const prompt = query => {
  stopSpinner()

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise(resolve =>
    rl.question(query, ans => {
      rl.close()
      resolve(ans)
      startspinner()
    })
  )
}

export const buildCli = (cli, args) =>
  import('./lib/parse-input.js')
    .then(({ default: parse }) => parse(cli, args))
    .then(result => {
      console.log(result)
      process.exit(0)
    })
    .catch(error => {
      console.error(error)
      process.exit(1)
    })

export const describe = (obj, description) =>
  Object.defineProperties(obj, {
    meta: {
      writable: false,
      enumerable: false,
      value: description,
    },
  })

export const withFlags = (fn, flags) =>
  Object.assign(fn, {
    flags: Object.defineProperties(
      {},
      Object.fromEntries(
        Object.entries(flags).map(([key, def]) =>
          typeof def === 'function'
            ? [key, { value: def, enumerable: true, writable: false }]
            : [
                key,
                {
                  get: () => def,
                  enumerable: true,
                },
              ]
        )
      )
    ),
  })
