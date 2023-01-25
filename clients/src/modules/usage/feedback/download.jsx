import { useContext } from 'react'
import { context as dataContext } from './context'
import Download from '../components/download'
import { CLIENTS_PUBLIC_ADDRESS } from '../../../config'

export default () => {
  const { data } = useContext(dataContext)

  return (
    <Download
      title="Download user feedback"
      description={'Download report in CSV format'}
      defaultFilename="sdp_user-feedback.csv"
      data={data}
      fields={[
        'Form',
        'createdAt',
        'Record',
        'Email address',
        'Organization',
        'isStudent',
        'Live/work location',
        'Age group',
        'Race',
        'Gender',
        'allowContact',
        'Comments',
      ]}
      transforms={[
        ({
          _id: Form,
          createdAt,
          recordId,
          emailAddress,
          organization: Organization,
          student: isStudent,
          location,
          ageGroup,
          race: Race,
          gender: Gender,
          allowContact,
          comments: Comments,
        }) => ({
          Form,
          createdAt: new Date(createdAt).toISOString(),
          Record: `${CLIENTS_PUBLIC_ADDRESS}/records/${recordId}`,
          'Email address': emailAddress,
          Organization,
          isStudent,
          'Live/work location': location,
          'Age group': ageGroup,
          Race,
          Gender,
          allowContact,
          Comments,
        }),
      ]}
    />
  )
}
