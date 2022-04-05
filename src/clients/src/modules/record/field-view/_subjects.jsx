import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import { context as configContext } from '../../../config'
import { context as globalContext } from '../../../contexts/global'
import Row from '../_row'

export default ({ subjects }) => {
  const { setGlobal } = useContext(globalContext)
  const { contentBase } = useContext(configContext)
  const history = useHistory()

  return (
    <Row title="Keywords">
      <Grid container spacing={1} justifyContent="flex-start">
        {subjects
          .slice(0)
          .sort((a, b) => (a.subject >= b.subject ? 1 : -1))
          .map(subject => (
            <Grid item key={subject.subject}>
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
                          value: subject.subject.toLowerCase().trim()
                        }
                      ]
                    },
                    true
                  )
                  history.push(`${contentBase}/records`.replace('//', '/'))
                }}
                label={subject.subject.toUpperCase()}
              />
            </Grid>
          ))}
      </Grid>
    </Row>
  )
}
