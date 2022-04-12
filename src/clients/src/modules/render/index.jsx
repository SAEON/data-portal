import { Redirect } from 'react-router-dom'

export default ({ location: { pathname } }) => {
  return <Redirect to={pathname.replace('/render', '')} />
}
