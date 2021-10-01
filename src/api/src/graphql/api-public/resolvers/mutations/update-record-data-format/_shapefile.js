import { update } from '../../../../../elasticsearch/index.js'

export default async id => {
  const result = await update({
    id,
    body: {
      doc: {
        immutableResource: {
          _archive: true,
          _fileFormat: 'SHAPEFILE',
        },
      },
    },
  })

  console.info('Finished updating data format for record', id, '.', result)
}
