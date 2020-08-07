import React, { useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import { TextField, Chip, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import QuickForm from '@saeon/quick-form'
import { UriStateContext } from '../../modules/provider-uri-state'
import ListboxComponent from '../autocomplete/list-box-component'

const SUBJECTS = [
  'metadata_json.publicationYear',
  'metadata_json.publisher.raw',
  'metadata_json.subjects.subject.raw',
]
const TERM_LIMIT = 10000

export default ({ ...props }) => {
  const { getUriState, setUriState } = useContext(UriStateContext)
  const { terms } = getUriState(true)

  const { error, loading, data } = useQuery(
    gql`
      query catalogue($fields: [String!], $limit: Int) {
        catalogue {
          id
          summary(fields: $fields, limit: $limit)
        }
      }
    `,
    {
      variables: { fields: SUBJECTS, limit: TERM_LIMIT },
    }
  )

  const waitMsg = error ? error.message : loading ? 'Loading' : null
  return waitMsg ? (
    <Typography color="textPrimary" variant="overline" style={{ margin: 20 }}>
      {waitMsg}
    </Typography>
  ) : (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <Autocomplete
          onChange={(e, value) =>
            setUriState({
              terms: value.map(v => v),
            })
          }
          value={terms || []}
          multiple
          fullWidth
          limitTags={8}
          disableListWrap
          ListboxComponent={ListboxComponent}
          freeSolo
          size="small"
          id="catalog-search-tagged-search"
          options={data.catalogue.summary
            .map(summary =>
              Object.entries(summary)
                .map(([, values]) => values.map(({ key }) => key))
                .flat()
            )
            .flat()
            .filter(_ => _)}
          getOptionLabel={option => `${option}`}
          renderTags={(value, getTagProps) => {
            return value.map((option, index) => (
              <Chip
                key={index}
                size="small"
                color="secondary"
                label={option}
                {...getTagProps({ index })}
                disabled={false}
              />
            ))
          }}
          renderInput={params => (
            <QuickForm inputValue="">
              {({ updateForm, inputValue }) => {
                return (
                  <TextField
                    {...params}
                    id="saeon-data-search"
                    size="medium"
                    onChange={inputValue => updateForm({ inputValue })}
                    value={inputValue}
                    placeholder="Select tags"
                    variant="outlined"
                    autoFocus
                    {...props}
                  />
                )
              }}
            </QuickForm>
          )}
        />
      </Grid>
    </Grid>
  )
}
