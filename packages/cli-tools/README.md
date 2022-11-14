# @saeon/cli-tools

```sh
npm i @saeon/cli-tools
```
 
# Usage

```js
import { buildCli, describe, withFlags } from '@saeon/cli-tools'

/**
 * Specify a function that takes a single object
 * as a parameter. You can assume the keys of
 * this object parameter if you use the 'withFlags'
 * function (see below)
 */
const fn = async ({ argA, argB }) => {
  await new Promise(res => setTimeout(res, 2000))
  return { argA, argB }
}

/**
 * Specify what flags that function should be passed
 *
 * keys with values that are other keys are treated as
 * aliases (aliases can ONLY be single letters)
 */
const fnWithFlags = withFlags(
  fn,
  {
    argA: String,
    argB: Number,
    a: 'argA',
    b: 'argB'
  }
)

/**
 * Describe the function
 *
 * This is used to output helpful
 * CLI documentation
 */
const describedFn = describe(
  fnWithFlags,
  {
    title: 'Some title',
    description: 'Some description'
  }
)

// Build the CLI
const cli = describe({
  fn: describedFn, // <cli> fn -a something -b 42

  // Sub-commands
  subcommand: describe({
    cmd: describe(withFlags(({flag}) => ({ cmd }), { flag: String, f: 'flag' }), { ... }) // <cli> cmd --flag Hello!
  },
  {
    title: 'Some sub-command',
    description: 'Some description'
  })
}, {
  title: 'Some title',
  description: 'Some description'
})
```
