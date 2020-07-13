import React, {
  Children,
  useContext,
  createContext,
  cloneElement,
  forwardRef,
  useRef,
  useEffect,
  isValidElement,
} from 'react'
import { gql } from '@apollo/client'
import { TextField, Chip, Grid, useMediaQuery, ListSubheader } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Autocomplete } from '@material-ui/lab'
import QuickForm from '@saeon/quick-form'
import { VariableSizeList } from 'react-window'
import { useTheme } from '@material-ui/core/styles'
import { GqlDataQuery } from '../'

const LISTBOX_PADDING = 8 // px

function renderRow(props) {
  const { data, index, style } = props
  return cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  })
}

const OuterElementContext = createContext({})

const OuterElementType = forwardRef((props, ref) => {
  const outerProps = useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

function useResetCache(data) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])
  return ref
}

const ListboxComponent = forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props
  const itemData = Children.toArray(children)
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true })
  const itemCount = itemData.length
  const itemSize = smUp ? 36 : 48

  const getChildSize = child =>
    isValidElement(child) && child.type === ListSubheader ? 48 : itemSize

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
  }

  const gridRef = useResetCache(itemCount)

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={index => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  )
})

const getSearchState = () =>
  decodeURIComponent(window.location.search.replace('?terms=', ''))
    .split(',')
    .filter(_ => _)

const SUBJECT = 'metadata_json.subjects.subject.raw'
const TERM_LIMIT = 10000

export default ({ classes }) => {
  const history = useHistory()
  const searchTerms = getSearchState()

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <GqlDataQuery
          query={gql`
            query catalogue($fields: [String!], $limit: Int) {
              catalogue {
                id
                summary(fields: $fields, limit: $limit)
              }
            }
          `}
          variables={{ fields: [SUBJECT], limit: TERM_LIMIT }}
        >
          {({ catalogue }) => {
            return (
              <Autocomplete
                onChange={(e, value) => {
                  const selectedValues = value.map(v => v)
                  history.push({
                    pathname: window.location.pathname,
                    search: `?terms=${encodeURIComponent(selectedValues.join(','))}`,
                  })
                }}
                value={searchTerms || []}
                multiple
                fullWidth
                limitTags={8}
                disableListWrap
                ListboxComponent={ListboxComponent}
                freeSolo
                size="small"
                id="catalog-search-tagged-search"
                options={catalogue.summary[0][SUBJECT].map(({ key }) => key).filter(_ => _)}
                getOptionLabel={option => option}
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
                          className={classes.textField}
                          id="saeon-data-search"
                          style={{ padding: 0 }}
                          size="medium"
                          margin="none"
                          onChange={inputValue => updateForm({ inputValue })}
                          value={inputValue}
                          label="Term search"
                          variant="outlined"
                          autoFocus
                        />
                      )
                    }}
                  </QuickForm>
                )}
              />
            )
          }}
        </GqlDataQuery>
      </Grid>
    </Grid>
  )
}
