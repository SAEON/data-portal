import { gql, useQuery } from '@apollo/client'
import { useTheme, alpha } from '@mui/material/styles'

export default ({ map }) => {
  const theme = useTheme()
  const { error, loading, data } = useQuery(
    gql`
      query {
        catalogue {
          indexStats {
            domains
          }
        }
      }
    `
  )

  if (loading) {
    return
  }

  if (error) {
    console.error(error)
    return
  }

  const geoJson = data.catalogue.indexStats?.domains

  map.on('load', () => {
    if (!geoJson) return

    map.addSource('domains', {
      type: 'geojson',
      data: geoJson,
    })

    map.addLayer({
      id: 'domains',
      type: 'fill',
      source: 'domains',
      paint: {
        'fill-color': theme.palette.primary.main,
        'fill-opacity': 0.075,
        'fill-outline-color': theme.palette.common.white,
      },
    })
  })
  return null
}
