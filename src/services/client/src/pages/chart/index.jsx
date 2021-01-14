import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import { setShareLink } from '../../hooks/use-share-link'
import RenderChart from '../../components/chartController'
import useStyles from './style'
import clsx from 'clsx'

export default ({ id }) => {
  const classes = useStyles()
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render/chart?id=${id}`,
    params: false,
  })

  return (
    <div
      className={clsx(classes.layout)}
      style={window.location.pathname.includes('/render') ? {} : { marginTop: 48 }}
    >
      <RenderChart id={id} />
    </div>
  )
}
