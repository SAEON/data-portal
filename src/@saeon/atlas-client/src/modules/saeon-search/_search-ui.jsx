import React from 'react'
import { TextField, InputAdornment, Chip } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { Search as SearchIcon } from '@material-ui/icons'

export default ({ data, updateForm, ...fields }) => (
  <>
    {/* Free search */}
    <TextField
      size="small"
      id="catalog-search-free-text"
      placeholder="e.g. atmospheric, water, etc."
      label="Text search"
      autoComplete="off"
      value={fields.textSearch}
      fullWidth
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      onChange={({ target }) => updateForm({ textSearch: target.value })}
    />

    {/* Tagged, constrained terms */}
    <Autocomplete
      getOptionSelected={(a, b) => a.key === b.key}
      onChange={(e, value) => updateForm({ selectedTerms: value.map((v) => v.key) })}
      multiple
      autoHighlight
      size="small"
      style={{ width: '100%', marginTop: 10 }}
      id="catalog-search-tagged-search"
      options={data.aggregations.subjects.buckets.map(({ key, doc_count }) => ({
        key: key.trim(),
        doc_count,
      }))}
      getOptionLabel={(option) => option.key}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={index}
            size="small"
            color="secondary"
            label={option.key}
            {...getTagProps({ index })}
            disabled={false}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Term search"
          variant="outlined"
          placeholder="start typing..."
        />
      )}
    />
  </>
)
