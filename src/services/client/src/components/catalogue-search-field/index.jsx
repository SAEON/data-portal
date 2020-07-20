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
import { gql, useQuery } from '@apollo/client'
import { TextField, Chip, Grid, useMediaQuery, ListSubheader, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Autocomplete } from '@material-ui/lab'
import QuickForm from '@saeon/quick-form'
import { VariableSizeList } from 'react-window'
import { useTheme } from '@material-ui/core/styles'
import { useUriState } from '../../modules/uri-state'

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

const SUBJECTS = [
  'metadata_json.publicationYear',
  'metadata_json.publisher.raw',
  'metadata_json.subjects.subject.raw',
]
const TERM_LIMIT = 10000

export default ({ classes, ...props }) => {
  const { pushState } = useUriState(useHistory())
  const terms = getSearchState()
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
            pushState({
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
                    className={classes.textField} // TODO remove external usage of classes prop
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
