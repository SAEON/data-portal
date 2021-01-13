import { useContext } from 'react'
import { context as databooksContext } from '../../context'
import { Typography, Fade } from '@material-ui/core'
import VirtualTable from '../../../../components/virtual-table'
import Loading from '../../../../components/loading'
import WithFetch from '../../../../hooks/with-fetch'
import Header from './header'
import useStyles from '../../style'
import clsx from 'clsx'

export default () => {
  const classes = useStyles()
  const { sql, databook } = useContext(databooksContext)

  return (
    <WithFetch
      uri={'http://localhost:3000/execute-sql'}
      method="POST"
      headers={{
        'Content-type': 'application/json',
      }}
      body={{
        databookId: databook.doc._id,
        sql,
      }}
    >
      {({ error, loading, data }) => {
        if (loading) {
          return (
            <div className={clsx(classes.layout, classes.bg)}>
              <Loading />
              <Header />
            </div>
          )
        }

        if (error) {
          return (
            <div className={clsx(classes.layout, classes.bg)}>
              <Fade in={Boolean(error)}>
                <Typography>{error.message}</Typography>
              </Fade>
            </div>
          )
        }

        const postgisData = data.rows

        return (
          <div className={clsx(classes.layout, classes.bg)}>
            <Header data={postgisData} />

            <Fade in={Boolean(data)}>
              <div className={clsx(classes.content)}>
                <div className={clsx(classes.layout)}>
                  <VirtualTable data={postgisData} />
                </div>
              </div>
            </Fade>
          </div>
        )
      }}
    </WithFetch>
  )
}
