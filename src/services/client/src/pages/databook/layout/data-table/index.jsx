import { useContext } from 'react'
import Loading from '../../../../components/loading'
import { context as dataContext } from '../../contexts/data-provider'
import Header from './header'
import clsx from 'clsx'
import useStyles from '../../style'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import VirtualTable from '../../../../components/virtual-table'
import Timer from '../../../../components/timer'

const Content = ({ error, loading, data }) => {
  const classes = useStyles()

  if (loading) {
    return (
      <Fade key="loading" in={Boolean(loading)}>
        <span>
          <Loading />
          <Typography className={clsx(classes.msgBox)}>
            <Timer />
          </Typography>
        </span>
      </Fade>
    )
  }

  if (error) {
    return (
      <Fade key="error" in={Boolean(error)}>
        <span>
          {error.name === 'AbortError' ? (
            <Typography className={clsx(classes.msgBox)}>Cancelled</Typography>
          ) : (
            <Typography className={clsx(classes.msgBox)}>{error.message}</Typography>
          )}
        </span>
      </Fade>
    )
  }

  if (!data) {
    return (
      <Fade key="no-data" in={Boolean(!data)}>
        <span>
          <Typography className={clsx(classes.msgBox)}>[ no results ]</Typography>
        </span>
      </Fade>
    )
  }

  if (!data.length) {
    return (
      <Fade key="empty-data" in={Boolean(data)}>
        <span>
          <Typography className={clsx(classes.msgBox)}>[ no results ]</Typography>
        </span>
      </Fade>
    )
  }

  return (
    <Fade key="data" in={Boolean(data)}>
      <div className={clsx(classes.content)}>
        <div className={clsx(classes.layout)}>
          <VirtualTable data={data} />
        </div>
      </div>
    </Fade>
  )
}

export default () => {
  const classes = useStyles()
  const ctx = useContext(dataContext)

  return (
    <div className={clsx(classes.layout)}>
      <Header />
      <Content {...ctx} />
    </div>
  )
}
