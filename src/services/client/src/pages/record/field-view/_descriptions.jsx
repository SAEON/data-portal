import Row from '../_row'
import { Typography } from '@material-ui/core'

export default ({ descriptions }) => {
  return (
    <>
      {[...descriptions]
        .sort(({ descriptionType: a }) => {
          if (a.toUpperCase().trim() === 'ABSTRACT') {
            return -1
          } else {
            return 0
          }
        })
        .map(({ description, descriptionType }, i) => {
          if (descriptionType.toUpperCase().trim() === 'ABSTRACT') {
            return (
              <Row key={i} title={'Abstract'}>
                <Typography variant="body2">{description}</Typography>
              </Row>
            )
          }

          if (descriptionType.toUpperCase().trim() === 'METHODS') {
            return (
              <Row key={i} title={'Methods'}>
                <Typography variant="body2">{description}</Typography>
              </Row>
            )
          }

          return null
        })}
    </>
  )
}
