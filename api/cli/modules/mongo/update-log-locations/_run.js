import updateLogLocations from '../../../../src/mongo/scripts/update-log-locations/index.js'

export default async () => {
  await updateLogLocations()
}