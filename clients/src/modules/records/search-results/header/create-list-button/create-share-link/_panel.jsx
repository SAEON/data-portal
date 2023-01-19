import Fade from '@mui/material/Fade'
import { Div } from '../../../../../../components/html-tags'

export default props => {
  const { children, value, index, ...other } = props

  return (
    <Fade in={value === index}>
      <Div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && children}
      </Div>
    </Fade>
  )
}
