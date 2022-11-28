import integrationWithSaeonOdp from '../../../../src/integrations/saeon-odp/index.js'

export default async ({ ...args }) => {
  await integrationWithSaeonOdp({ ...args })
}
