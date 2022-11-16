export const getData = async ({ ctx, page }) => {
  const fn = await import(`./${page}/index.js`)
    .then(({ default: fn }) => fn)
    .catch(() => () => undefined)
  return await fn(ctx)
}

export const replace = function (match) {
  return this[match] || match
}
