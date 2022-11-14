import Typography from '@mui/material/Typography'
import QuickForm from '../../packages/quick-form'
import debounce from '../../lib/fns/debounce'

/**
 * The material-ui slider doesn't seem to work very well
 */
export default ({ defaultValue, updateValue, title }) => {
  return (
    <QuickForm effects={[debounce(updateValue)]} value={defaultValue}>
      {(update, { value }) => {
        return (
          <div>
            <Typography variant="overline">{title}</Typography>
            <input
              style={{ display: 'block', width: '100%', margin: 0 }}
              onChange={e => update({ value: e.target.value })}
              value={value}
              type="range"
            />
          </div>
        )
      }}
    </QuickForm>
  )
}
