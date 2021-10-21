import Button from '@mui/material/IconButton'
import Add from 'mdi-react/AddCircleIcon'
import ArrowUpward from 'mdi-react/ArrowUpCircleIcon'
import ArrowDownward from 'mdi-react/ArrowDownCircleIcon'
import Remove from 'mdi-react/RemoveCircleIcon'

const mappings = {
  remove: Remove,
  plus: Add,
  'arrow-up': ArrowUpward,
  'arrow-down': ArrowDownward,
}

export default props => {
  const { icon, className, iconProps, ...otherProps } = props
  const IconComp = mappings[icon]

  return (
    <Button {...otherProps} color="primary" size="small">
      <IconComp size={18} />
    </Button>
  )
}
