import React from 'react'
import { TextField, Chip, Grid, useMediaQuery, ListSubheader } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Autocomplete } from '@material-ui/lab'
import QuickForm from '@saeon/quick-form'
import { VariableSizeList } from 'react-window'
import { useTheme } from '@material-ui/core/styles'

const LISTBOX_PADDING = 8 // px

function renderRow(props) {
  const { data, index, style } = props
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  })
}

const OuterElementContext = React.createContext({})

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

function useResetCache(data) {
  const ref = React.useRef(null)
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])
  return ref
}

const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props
  const itemData = React.Children.toArray(children)
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true })
  const itemCount = itemData.length
  const itemSize = smUp ? 36 : 48

  const getChildSize = child =>
    React.isValidElement(child) && child.type === ListSubheader ? 48 : itemSize

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
  decodeURIComponent(window.location.search.replace('?search=', ''))
    .split(',')
    .filter(_ => _)

export default ({ options, classes }) => {
  const history = useHistory()
  const searchTerms = getSearchState()

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <Autocomplete
          onChange={(e, value) => {
            const selectedValues = value.map(v => v)
            history.push({
              pathname: window.location.pathname,
              search: `?search=${encodeURIComponent(selectedValues.join(','))}`,
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
          options={options}
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
      </Grid>
    </Grid>
  )
}
