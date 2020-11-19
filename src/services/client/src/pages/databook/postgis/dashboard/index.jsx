import { useContext } from 'react'
import { context as databookContext } from '../../context'
import useStyles from './style'
import clsx from 'clsx'

export default () => {
  const classes = useStyles()
  const { databook } = useContext(databookContext)
  return <div className={clsx(classes.dashboard)}>{JSON.stringify(databook)}</div>
}
