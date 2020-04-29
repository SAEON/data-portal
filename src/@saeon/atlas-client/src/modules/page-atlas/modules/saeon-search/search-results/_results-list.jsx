import React from 'react'
import { MapContext } from '../../../../provider-map'
import { FeedbackContext } from '../../../../provider-feedback'
import ResultCard from './_result-card'

// eslint-disable-next-line no-unused-vars
export default ({ height, width, data }) => {
  // eslint-disable-next-line no-unused-vars
  const { took, timed_out, hits: _hits } = data
  // eslint-disable-next-line no-unused-vars
  const { total, hits } = _hits

  return (
    <FeedbackContext.Consumer>
      {({ setInfo }) => (
        <MapContext.Consumer>
          {({ proxy }) => (
            <>
              {hits.map(({ _source }, i) => (
                <ResultCard key={i} setInfo={setInfo} _source={_source} proxy={proxy} />
              ))}
            </>
          )}
        </MapContext.Consumer>
      )}
    </FeedbackContext.Consumer>
  )
}
