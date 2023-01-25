import { useContext } from 'react'
import { context as dataContext } from './context'
import Download from '../components/download'

export default () => {
  const { data } = useContext(dataContext)

  return (
    <Download
      title="Download login history"
      description={'Download report in CSV format'}
      defaultFilename="sdp_user-logins.csv"
      data={data}
      fields={['logId', 'userId', 'emailAddress', 'name', 'ipLocation', 'createdAt', 'expires']}
      transforms={[
        ({
          createdAt,
          clientIpLocation: ipLocation,
          clientIpLat: ipLat,
          clientIpLon: ipLon,
          userId,
        }) => ({
          userId,
          createdAt: new Date(createdAt).toISOString(),
          ipLocation,
          ipLat,
          ipLon,
        }),
      ]}
    />
  )
}
