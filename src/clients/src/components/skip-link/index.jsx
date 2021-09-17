import useStyles from './style'
import clsx from 'clsx'

export default ({ href, text }) => {
  const classes = useStyles()
  return (
    <a className={clsx(classes.skipLink)} href={href}>
      {text}
    </a>
  )
}
