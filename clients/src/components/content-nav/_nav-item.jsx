import { memo } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Tooltip from '@mui/material/Tooltip'
import ButtonBase from '@mui/material/ButtonBase'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { alpha } from '@mui/material/styles'

export default memo(
  ({
    Component,
    primaryText,
    secondaryText,
    Icon,
    SecondaryIcon = undefined,
    disabled = false,
    style = {},
    tooltipTitle,
    setActiveIndex,
    i,
    activeIndex,
  }) => {
    const theme = useTheme()
    const xsAndDown = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const smAndUp = useMediaQuery(theme => theme.breakpoints.up('sm'))
    const mdAndUp = useMediaQuery(theme => theme.breakpoints.up('md'))

    if (Component) {
      return <Component style={style} />
    }

    return (
      <Tooltip
        PopperProps={{
          style: {
            zIndex: 500, // Keep it under AppBars and ToolBars
          },
        }}
        title={
          tooltipTitle || disabled
            ? 'This option is disabled'
            : secondaryText || 'Missing secondaryText'
        }
        placement="right"
      >
        <ButtonBase
          sx={theme => ({
            width: '100%',
            borderBottom: `1px solid ${theme.palette.divider}`,
            transition: theme.transitions.create(['all']),
            [theme.breakpoints.up('lg')]: {
              minHeight: theme.spacing(10),
            },
            ...(i === activeIndex
              ? {
                  backgroundColor: alpha(theme.palette.primary.main, 0.3),
                  [theme.breakpoints.up('lg')]: {
                    minHeight: theme.spacing(16),
                  },
                }
              : {}),
          })}
          disabled={disabled}
          onClick={() => setActiveIndex(i)}
        >
          <ListItem sx={{ justifyContent: 'center' }}>
            {(xsAndDown || mdAndUp) && (
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <Icon active={activeIndex === i} />
              </ListItemIcon>
            )}

            {smAndUp && (
              <ListItemText
                primaryTypographyProps={{
                  variant: 'overline',
                  display: 'block',
                }}
                sx={{
                  textAlign: mdAndUp ? 'left' : 'center',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                primary={primaryText || 'Missing primaryText'}
                secondary={mdAndUp && (secondaryText || 'Missing secondaryText')}
              />
            )}

            {(xsAndDown || mdAndUp) && SecondaryIcon && (
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <SecondaryIcon />
              </ListItemIcon>
            )}
          </ListItem>
        </ButtonBase>
      </Tooltip>
    )
  },
  (a, b) => {
    if (a.activeIndex !== b.activeIndex) return false
    if (a.disabled !== b.disabled) return false
    if (a.Icon !== b.Icon) return false
    if (a.SecondaryIcon !== b.SecondaryIcon) return false
    if (a.style !== b.style) return false
    return true
  }
)
