import { packageJson } from '../config/index.js'

export default async ctx => {
  ctx.body = `${packageJson.name}, v${packageJson.version}`
}
