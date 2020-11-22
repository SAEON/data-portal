export default async ({ _id: dashboardId }, args, ctx) => {
  const { findCharts } = ctx.mongo.dataFinders
  return await findCharts({ dashboardId })
}
