import { OlReact, MapProxy } from '../../../../../../packages/ol-react'
import { terrestrisBaseMap } from '../../../../../../lib/ol'
import Controls from './_controls'

export default () => {
  return (
    <OlReact
      viewOptions={{
        center: [26, -25],
        zoom: 4,
      }}
      layers={[terrestrisBaseMap()]}
      style={{ height: '300px' }}
    >
      {({ map }) => {
        return <MapProxy map={map}>{({ proxy }) => <Controls proxy={proxy} />}</MapProxy>
      }}
    </OlReact>
  )
}
