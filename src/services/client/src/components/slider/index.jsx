import React from 'react'
import { Typography, Slider } from '@material-ui/core'
import QuickForm from '@saeon/quick-form'
import { debounce } from '../../lib/fns'

export default ({ defaultValue, updateValue, title }) => {
  return (
    <QuickForm effects={[debounce(updateValue)]} value={defaultValue}>
      {(update, { value }) => (
        <div>
          <Typography variant="inherit">{title}</Typography>
          <Slider
            style={{ padding: 0 }}
            value={value}
            onChange={(e, v) => update({ value: v })}
            step={0.00001}
            marks={false}
            min={1}
            max={100}
            valueLabelDisplay="off"
          />
        </div>
      )}
    </QuickForm>
  )
}
