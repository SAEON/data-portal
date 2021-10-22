import IconButton from '../IconButton/IconButton'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

export default props => {
  return (
    <Grid container style={{ padding: 0 }} alignItems="center">
      <Grid item xs style={{ overflow: 'auto' }}>
        <Box paddingLeft={2} paddingBottom={2}>
          {props.children}
        </Box>
      </Grid>

      {props.hasToolbar && (
        <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
          <IconButton
            icon="arrow-up"
            className="array-item-move-up"
            tabIndex={-1}
            iconProps={{ fontSize: 'small' }}
            disabled={props.disabled || props.readonly || !props.hasMoveUp}
            onClick={props.onReorderClick(props.index, props.index - 1)}
          />

          <IconButton
            icon="arrow-down"
            tabIndex={-1}
            iconProps={{ fontSize: 'small' }}
            disabled={props.disabled || props.readonly || !props.hasMoveDown}
            onClick={props.onReorderClick(props.index, props.index + 1)}
          />

          {props.hasRemove && (
            <IconButton
              icon="remove"
              tabIndex={-1}
              iconProps={{ fontSize: 'small' }}
              disabled={props.disabled || props.readonly}
              onClick={props.onDropIndexClick(props.index)}
            />
          )}
        </Grid>
      )}
    </Grid>
  )
}
