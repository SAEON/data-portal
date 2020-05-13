import React from 'react'
import { MapContext } from '../../../../provider-map'
import { FeedbackContext } from '../../../../provider-feedback'
import ResultCard from './_result-card'
import { Button } from '@material-ui/core'

// eslint-disable-next-line no-unused-vars
export default ({ height, width, data, currentPage, updateCurrentPage }) => {
  // eslint-disable-next-line no-unused-vars
  const { took, timed_out, hits: _hits } = data.results
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

              <Button
                style={{ margin: '10px 0 0' }}
                disableElevation
                color="secondary"
                size="small"
                onClick={() => updateCurrentPage(currentPage + 1)}
                fullWidth
                variant="contained"
              >
                Load next results
              </Button>
            </>
          )}
        </MapContext.Consumer>
      )}
    </FeedbackContext.Consumer>
  )
}
