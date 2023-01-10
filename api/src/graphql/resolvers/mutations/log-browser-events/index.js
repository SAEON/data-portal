export default async (self, args, ctx) => {
  const { input, referrer = undefined } = args
  const { logToMongo, makeLog } = ctx.mongo

  const logs = await Promise.all(
    input.map(
      async log =>
        await makeLog(ctx, {
          referrer,
          ...log,
        })
    )
  )

  logToMongo(...logs)
}
