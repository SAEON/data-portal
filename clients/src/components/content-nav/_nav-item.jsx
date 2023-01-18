import { memo } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Tooltip from '@mui/material/Tooltip'
import ButtonBase from '@mui/material/ButtonBase'
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
            <ListItemIcon
              sx={theme => ({
                justifyContent: 'center',
                [theme.breakpoints.up('sm')]: {
                  display: 'none',
                  [theme.breakpoints.up('md')]: {
                    display: 'unset',
                  },
                },
              })}
            >
              <Icon active={activeIndex === i} />
            </ListItemIcon>

            <ListItemText
              primaryTypographyProps={{
                variant: 'overline',
                display: 'block',
              }}
              sx={theme => ({
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'none',
                '& .MuiListItemText-secondary': {
                  display: 'none',
                  [theme.breakpoints.up('md')]: {
                    display: 'unset',
                  },
                },
                [theme.breakpoints.up('sm')]: {
                  display: 'unset',
                  [theme.breakpoints.up('md')]: {
                    textAlign: 'left',
                  },
                },
              })}
              primary={primaryText || 'Missing primaryText'}
              secondary={secondaryText || 'Missing secondaryText'}
            />

            {SecondaryIcon && (
              <ListItemIcon
                sx={theme => ({
                  justifyContent: 'center',
                  [theme.breakpoints.up('sm')]: {
                    display: 'none',
                    [theme.breakpoints.up('md')]: {
                      display: 'unset',
                    },
                  },
                })}
              >
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
