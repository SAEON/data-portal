import { gql, useQuery } from '@apollo/client'
import EditIcon from 'mdi-react/EditOutlineIcon'
import MessageDialogue from '../../../../../../../../components/message-dialogue'
import Loading from '../../../../../../../../components/loading'
import Form from './_form'

export default ({ id }) => {
  const { error, loading, data } = useQuery(
    gql`
      query($id: ID!) {
        dashboard(id: $id) {
          id
          title
          subtitle
          description
        }
      }
    `,
    {
      variables: { id },
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  return (
    <MessageDialogue
      tooltipProps={{
        title: 'Edit dashboard',
        placement: 'left-start',
      }}
      title="Edit dashboard"
      iconProps={{ size: 'small' }}
      icon={<EditIcon size={20} />}
    >
      {closeDialogue => <Form {...data.dashboard} closeDialogue={closeDialogue} />}
    </MessageDialogue>
  )
}
