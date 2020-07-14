import { exec } from 'child_process'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { join } from 'path'

export const getCurrentDirectory = meta => dirname(fileURLToPath(meta.url))

const e = async cmd => {
  
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        return reject(error)
      }

      resolve({
        stdout,
        stderr,
      })
    })
  })
}

/**
 * Top level repository tooling
 */
let p = join(getCurrentDirectory(import.meta), '..')
let { stdout, stderr } = await e(`npm --prefix ${p} run ncu`)

console.log(stdout, stderr)
