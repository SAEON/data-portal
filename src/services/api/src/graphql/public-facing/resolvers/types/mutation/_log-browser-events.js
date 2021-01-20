import { CATALOGUE_CLIENT_ID } from '../../../../../config.js'

export default async (self, args, ctx) => {
  const { input: logs } = args
  const { insertLogs: logToMongo } = ctx.mongo.dataInserters

  logToMongo(
    ...logs.map(log => Object.assign({ clientSession: ctx.cookies.get(CATALOGUE_CLIENT_ID) }, log))
  )
}
