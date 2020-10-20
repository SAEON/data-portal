export default async (self, args, ctx) => {
  const { input: logs } = args
  const { insertLogs: logToMongo } = ctx.mongo.dataInserters

  logToMongo(
    ...logs.map(log => Object.assign({ clientSession: ctx.cookies.get('ClientSession') }, log))
  )
}
