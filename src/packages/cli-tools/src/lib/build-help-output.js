import packageJson from '../../package.json' assert { type: 'json' }

const getLongestKey = obj =>
  Object.keys(obj).reduce(
    (longestKey, currentKey) => (currentKey.length > longestKey ? currentKey.length : longestKey),
    0
  )

export default async (notice = '', config) => {
  const l = getLongestKey(config)
  const title = `CLI (${packageJson.name} v${packageJson.version}): ${config?.meta?.title || '??'}`
  const errorMsg = `ERROR: ${notice}`

  let cmdsText = ''
  for (const [command, obj] of Object.entries(config)) {
    const config = obj.constructor === Promise ? await obj : obj

    if (typeof config === 'function') {
      cmdsText += `\n ${command.padEnd(l + 2, ' ')}[Fn [${Object.entries(config.flags)
        .filter(([flag]) => {
          return !config.flags[config.flags[flag]]
        })
        .map(([flag]) => flag)
        .join(', ')}]]  ${config?.meta?.description || '??'}`
    } else {
      cmdsText += `\n ${command.padEnd(l + 2, ' ')}[Cmd]  ${config?.meta?.description || '??'}`
    }
  }

  return `${title}

${errorMsg}

Commands${cmdsText}
`
}
