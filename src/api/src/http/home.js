import packageJson from '../../package.json' assert { type: 'json' }

export default async ctx => {
  ctx.body = `${packageJson.name}, v${packageJson.version}`
}
