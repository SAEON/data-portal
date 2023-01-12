import { useState, useContext } from 'react'
import { context as authContext } from '../../../../../contexts/authorization'
import Grid from '@mui/material/Grid'
import Paper_ from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import { Div } from '../../../../../components/html-tags'
import Tools from './tools'
import clsx from 'clsx'

export const Paper = styled(props => <Paper_ variant="outlined" {...props} />)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  p: 0,
}))

export default ({ children, downloadCount, ..._source }) => {
  const [active, setActive] = useState(false)
  const { hasPermission } = useContext(authContext)
  const canViewDownloadCount = hasPermission('record:view-downloadCount')

  return (
    <Grid
      className={clsx({ active })}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      component={Paper}
      item
      xs={12}
      sx={theme => ({
        display: 'flex',
        position: 'relative',
        mb: 0,
        pr: theme.spacing(1),
        pb: theme.spacing(1),
        pl: theme.spacing(1),
        overflow: 'hidden',
        ':last-child': {
          mb: 0,
        },
        [theme.breakpoints.up('md')]: {
          mb: theme.spacing(0.75),
          mx: 0,
          mt: 0,
          pr: 0,
          pl: 0,
        },
        transition: theme.transitions.create(['background-color']),
        '&.active': {
          backgroundColor: theme.palette.common.white,
        },
      })}
    >
      <Div
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
        }}
      >
        {children}
      </Div>
      <Div
        className={clsx('record-tools', { active })}
        sx={theme => ({
          position: 'absolute',
          transition: theme.transitions.create([
            'right',
            'background-color',
            'outline',
            'boxShadow',
          ]),
          boxShadow: 'none',
          outline: `1px solid transparent`,
          top: 0,
          right: -108,
          [theme.breakpoints.up('sm')]: {
            right: -144,
          },
          '&.active': {
            backgroundColor: theme.palette.common.white,
            right: 0,
            outline: theme => `1px solid ${theme.palette.divider}`,
            boxShadow: theme => theme.shadows[2],
          },
        })}
      >
        <Tools
          onClose={() => setActive(false)}
          {..._source}
          downloadCount={downloadCount}
          canViewDownloadCount={canViewDownloadCount}
        />
      </Div>
    </Grid>
  )
}
