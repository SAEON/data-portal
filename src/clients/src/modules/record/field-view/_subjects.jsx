import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import { context as configContext } from '../../../config'
import { context as globalContext } from '../../../contexts/global'
import Row from '../_row'
import Tooltip from '@mui/material/Tooltip'

/**
 * filter = {
 *   // Ether filter away all subjects of a particular subjectScheme
 *   ['subjectScheme value to filter on']: 'ALL',
 *
 *   // Or filter away selected values
 *   ['subjectScheme value to filter on']: ['value1', 'value2', 'etc']
 * }
 */
const filter = {
  ['SANS1878 Vertical Extent: minimumValue']: 'ALL',
  ['SANS1878 Vertical Extent: maximumValue']: 'ALL',
  ['SANS1878 Vertical Extent: unitOfMeasure']: 'ALL',
  ['SANS1878 Vertical Extent: verticalDatum']: 'ALL',
  ['SANS1878 Reference System']: 'ALL',
}

export default ({ subjects }) => {
  const { setGlobal } = useContext(globalContext)
  const { contentBase } = useContext(configContext)
  const navigate = useNavigate()

  return (
    <Row title="Keywords">
      <Grid container spacing={1} justifyContent="flex-start">
        {subjects
          .slice(0)
          .sort((a, b) => (a.subject >= b.subject ? 1 : -1))
          .filter(({ subjectScheme = '', subject = '' } = {}) => {
            const exclude = filter[subjectScheme]
            if (exclude === 'ALL') {
              return false
            } else {
              return !Boolean(exclude?.includes(subject))
            }

            return true
          })
          .map(subject => (
            <Grid item key={subject.subject} sx={{ overflow: 'hidden', maxWidth: '100%' }}>
              <Tooltip title={subject.subject}>
                <Chip
                  aria-label="Click to search for records with this keyword"
                  size="small"
                  color="primary"
                  clickable
                  onClick={() => {
                    setGlobal(
                      {
                        terms: [
                          {
                            field: 'subjects.subject.raw',
                            value: subject.subject.toLowerCase().trim(),
                            filterId: 'keywords-filter',
                          },
                        ],
                      },
                      true
                    )
                    navigate(`${contentBase}/records`.replace('//', '/'))
                  }}
                  label={subject.subject.toUpperCase().truncate(30)}
                />
              </Tooltip>
            </Grid>
          ))}
      </Grid>
    </Row>
  )
}
