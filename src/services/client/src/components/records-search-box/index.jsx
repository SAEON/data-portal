import React, { useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import { TextField, Chip, Grid, Typography, CircularProgress } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import QuickForm from '@saeon/quick-form'
import { GlobalContext } from '../../modules/provider-global'
import ListboxComponent from '../autocomplete/list-box-component'

const FIELDS = ['publicationYear', 'publisher.raw', 'subjects.subject.raw', 'creators.name.raw']
const TERM_LIMIT = 10000

export default ({ ...props }) => {
  const { global, setGlobal } = useContext(GlobalContext)
  const { terms } = global

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
      variables: { fields: FIELDS, limit: TERM_LIMIT },
    }
  )

  return error ? (
    <Typography color="textPrimary" variant="overline" style={{ margin: 20 }}>
      {error.message}
    </Typography>
  ) : loading ? (
    <CircularProgress />
  ) : (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <Autocomplete
          onChange={(e, values) =>
            setGlobal({
              terms: values.map(value => FIELDS.map(field => ({ field, value }))).flat(),
            })
          }
          value={[...new Set(terms.map(({ value }) => value))].filter(_ => _) || []}
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
              {(update, { inputValue }) => {
                return (
                  <TextField
                    {...params}
                    id="saeon-data-search"
                    size="medium"
                    onChange={inputValue => update({ inputValue })}
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
