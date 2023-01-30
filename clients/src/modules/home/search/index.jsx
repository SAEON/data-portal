import { useContext, useCallback } from 'react'
import { context as configContext } from '../../../config'
import { context as searchContext } from '../../../contexts/search'
import { useNavigate, useLocation } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import { Magnify as SearchIcon } from '../../../components/icons'
import IconButton from '@mui/material/IconButton'
import TextField from './_text-field'
import QuickForm from '../../../components/quick-form'
import debounce from '../../../lib/fns/debounce'

export default () => {
  const { setGlobal } = useContext(searchContext)
  const { contentBase } = useContext(configContext)
  const navigate = useNavigate()
  const { search } = useLocation()

  const go = useCallback(() => navigate(`${contentBase}/records${search}`.replace('//', '/')), [])

  return (
    <Grid item xs={7} md={5} lg={4}>
      <QuickForm text="" effects={[debounce(({ text }) => setGlobal({ text }, true))]}>
        {(update, { text }) => {
          return (
            <TextField
              margin="normal"
              autoFocus
              value={text}
              onChange={({ target: { value: text } }) => update({ text })}
              onKeyDown={({ key }) => key === 'Enter' && go()}
              InputProps={{
                sx: {
                  color: theme => theme.palette.common.white,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Search catalogue for matches with text input"
                      onClick={() => go()}
                      onKeyDown={({ key }) => key === 'Enter' && go()}
                      edge="end"
                    >
                      <SearchIcon sx={{ color: 'white' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              size="small"
              placeholder={`Search metadata catalogue`}
              autoComplete="off"
              fullWidth
            />
          )
        }}
      </QuickForm>
    </Grid>
  )
}
