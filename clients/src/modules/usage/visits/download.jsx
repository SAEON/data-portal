import { gql, useQuery } from '@apollo/client'
import Download from '../components/download'
import { Download as DownloadIcon } from '../../../components/icons'
import LoadingButton from '@mui/lab/LoadingButton'

const DataComponent = ({ children }) => {
  const { error, loading, data } = useQuery(
    gql`
      query ($type: LogType, $limit: Int) {
        logs(type: $type, limit: $limit) {
          _id
          createdAt
          doi
          userId
          referrer
          clientUserAgent
          clientSession
          clientIpAddress
          clientIpAs
          clientIpAsname
          clientIpCity
          clientIpContinent
          clientIpContinentCode
          clientIpCountry
          clientIpCountryCode
          clientIpCurrency
          clientIpDistrict
          clientIpHosting
          clientIpIsp
          clientIpLocation
          clientIpMobile
          clientIpOrg
          clientIpProxy
          clientIpRegion
          clientIpRegionName
          clientIpTimezone
          clientIpZip
          clientPathname
        }
      }
    `,
    {
      fetchPolicy: 'cache-first',
      variables: {
        limit: 10000,
        type: 'appRender',
      },
    }
  )

  if (loading) {
    return (
      <LoadingButton
        loading
        loadingPosition="start"
        variant="contained"
        disableElevation
        size="small"
        startIcon={<DownloadIcon fontSize="small" />}
      >
        Loading data
      </LoadingButton>
    )
  }

  if (error) {
    throw error
  }

  return children({ data: data.logs })
}

export default () => {
  return (
    <Download
      title="Download render logs"
      description={'Download raw data used to draw the charts below, in CSV format'}
      defaultFilename="sdp_renders.csv"
      DataComponent={DataComponent}
      fields={[
        'logId',
        'User ID',
        'Created at',
        'DOI',
        'Referrer',
        'User agent',
        'Client session',
        'IP address',
        'As',
        'Asname',
        'City',
        'Continent',
        'ContinentCode',
        'Country',
        'CountryCode',
        'Currency',
        'District',
        'Hosting',
        'Isp',
        'Location',
        'Mobile',
        'Org',
        'Proxy',
        'Region',
        'RegionName',
        'Timezone',
        'Zip',
        'Pathname',
      ]}
      transforms={[
        ({
          _id: logId,
          userId,
          createdAt,
          doi: DOI,
          referrer: Referrer,
          clientUserAgent,
          clientSession,
          clientIpAddress: ipAddress,
          clientIpAs: ipAs,
          clientIpAsname: ipAsname,
          clientIpCity: ipCity,
          clientIpContinent: ipContinent,
          clientIpContinentCode: ipContinentCode,
          clientIpCountry: ipCountry,
          clientIpCountryCode: ipCountryCode,
          clientIpCurrency: ipCurrency,
          clientIpDistrict: ipDistrict,
          clientIpHosting: ipHosting,
          clientIpIsp: ipIsp,
          clientIpLocation: ipLocation,
          clientIpMobile: ipMobile,
          clientIpOrg: ipOrg,
          clientIpProxy: ipProxy,
          clientIpRegion: ipRegion,
          clientIpRegionName: ipRegionName,
          clientIpTimezone: ipTimezone,
          clientIpZip: ipZip,
          clientPathname: Pathname,
        }) => {
          return {
            logId,
            'User ID': userId,
            'Created at': createdAt,
            DOI,
            Referrer,
            'User agent': clientUserAgent,
            'Client session': clientSession,
            'IP address': ipAddress,
            As: ipAs,
            Asname: ipAsname,
            City: ipCity,
            Continent: ipContinent,
            ContinentCode: ipContinentCode,
            Country: ipCountry,
            CountryCode: ipCountryCode,
            Currency: ipCurrency,
            District: ipDistrict,
            Hosting: ipHosting,
            Isp: ipIsp,
            Location: ipLocation,
            Mobile: ipMobile,
            Org: ipOrg,
            Proxy: ipProxy,
            Region: ipRegion,
            RegionName: ipRegionName,
            Timezone: ipTimezone,
            Zip: ipZip,
            Pathname,
          }
        },
      ]}
    />
  )
}
