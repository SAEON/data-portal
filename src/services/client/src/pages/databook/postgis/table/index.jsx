import { useContext } from 'react'
import { context as databooksContext } from '../../context'
import { Typography, Fade } from '@material-ui/core'
import VirtualTable from '../../../../components/virtual-table'
import Loading from '../../../../components/loading'
import Header from './header'
import useStyles from '../../style'
import clsx from 'clsx'

export default () => {
  const classes = useStyles()
  const { data, error, loading } = useContext(databooksContext)

  if (loading) {
    return (
      <div className={clsx(classes.layout, classes.bg)}>
        <Header />
        <Fade in={Boolean(loading)}>
          <Loading />
        </Fade>
      </div>
    )
  }

  if (error) {
    return (
      <div className={clsx(classes.layout, classes.bg)}>
        <Header />
        <Fade in={Boolean(error)}>
          <span>
            {error.name === 'AbortError' ? (
              <Typography className={clsx(classes.msgBox)}>Cancelled</Typography>
            ) : (
              <Typography className={clsx(classes.msgBox)}>{error.message}</Typography>
            )}
          </span>
        </Fade>
      </div>
    )
  }

  if (!data.rows?.length) {
    return (
      <div className={clsx(classes.layout, classes.bg)}>
        <Header />
        <Fade in={Boolean(data)}>
          <span>
            <Typography className={clsx(classes.msgBox)}>[ no results ]</Typography>
          </span>
        </Fade>
      </div>
    )
  }

  return (
    <div className={clsx(classes.layout, classes.bg)}>
      <Header />
      <Fade in={Boolean(data)}>
        <div className={clsx(classes.content)}>
          <div className={clsx(classes.layout)}>
            <VirtualTable data={data.rows} />
          </div>
        </div>
      </Fade>
    </div>
  )
}
