import arg from 'arg'

export default flags => {
  if (typeof flags !== 'object') {
    throw new Error('CLI functions must accept a single object as an argument')
  }

  const defs = Object.fromEntries(
    Object.entries(flags).map(([flag, type]) => {
      if (typeof flags[flag] === 'function') {
        return [`--${flag}`, type]
      } else {
        return [`-${flag}`, `--${flags[flag]}`]
      }
    })
  )

  const parse = argv => {
    const parsedArgs = arg(defs, {
      argv
    })

    return Object.fromEntries(
      Object.entries(flags)
        .filter(([, typeDef]) => (typeof typeDef === 'string' ? false : true))
        .map(([arg]) => [arg, parsedArgs[`--${arg}`] || false])
    )
  }

  return args => parse(args)
}
