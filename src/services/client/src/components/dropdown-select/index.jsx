import { useState } from 'react'
import { TextField, IconButton, Grid } from '@material-ui/core'
import CloseIcon from 'mdi-react/CloseIcon'
import AutoComplete from '../autocomplete'
import useStyles from './style.js'
import clsx from 'clsx'
import SearchIcon from '@material-ui/icons/Search'
/**
 * TO-DO:
 * Ellipsis overflow needs work
 * bug: textfield label perpetually sits above underline if options are selected
 * textfield/icon grid layout sizing values can be cleaned up
 */
export default ({ options, selectedOptions, setOption, label }) => {
  const classes = useStyles()
  return (
    <>
      {/* Search / TextField */}
      <Grid
        container
        spacing={1}
        alignItems="flex-end"
        style={{ paddingLeft: '5px', paddingRight: '5px' }}
      >
        <Grid item xs={12} sm={1}>
          <SearchIcon />
        </Grid>
        <Grid item xs={12} sm={11}>
          <AutoComplete
            multiple
            options={options}
            selectedOptions={selectedOptions}
            setOption={setOption}
            label={label}
            className={clsx(classes.autoComplete)} //applies to input TextField
            limitTags={false}
          />
        </Grid>
      </Grid>

      {/* Selected Items List */}
      <ul className={clsx(classes.list)}>
        {selectedOptions.map((value, i) => {
          return (
            <li
              key={i}
              className={clsx(classes.listItem)}
              onClick={() => {
                let arrayCopy = [...selectedOptions]
                arrayCopy.splice(i, 1)
                setOption(arrayCopy)
              }}
            >
              <span className={clsx(classes.listItemText)}>{value}</span>
              <span className={clsx(classes.listItemClose)}>
                <CloseIcon size={20} />
              </span>
            </li>
          )
        })}
      </ul>
    </>
  )
}
