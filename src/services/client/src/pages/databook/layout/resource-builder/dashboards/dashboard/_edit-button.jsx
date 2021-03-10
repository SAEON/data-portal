import { useContext } from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Fade from '@material-ui/core/Fade'
import TextField from '@material-ui/core/TextField'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import MessageDialogue from '../../../../../../components/message-dialogue'
import Loading from '../../../../../../components/loading'
import { context as databookContext } from '../../../../contexts/databook-provider'
import { gql, useApolloClient, useQuery } from '@apollo/client'
import QuickForm from '@saeon/quick-form'

const DASHBOARDS_QUERY = gql`
  query($databookId: ID!) {
    dashboards(databookId: $databookId) {
      id
      title
      subtitle
      description
      layout
      filters
    }
  }
`

const CloseButton = ({ id }) => {
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
      variables: {
        id,
      },
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    console.error(error)
    throw error
  }

  return (
    <QuickForm
      title={data.dashboard.title}
      subtitle={data.dashboard.subtitle}
      description={data.dashboard.description}
    >
      {(update, { title, subtitle, description }) => {
        return (
          <>
            <DialogContent>
              {/* TITLE */}
              <TextField
                id="title"
                fullWidth
                style={{ marginBottom: FIELD_SPACING }}
                label="Title"
                value={title || ''}
                onChange={e => {
                  let newValue = e.target.value === '' ? null : e.target.value
                  update({
                    title: newValue,
                  })
                }}
              />

              {/* SUBTITLE */}
              <TextField
                id="subtitle"
                fullWidth
                style={{ marginBottom: FIELD_SPACING }}
                label="Subtitle"
                value={subtitle || ''}
                onChange={e => {
                  let newValue = e.target.value === '' ? null : e.target.value
                  update({
                    subtitle: newValue,
                  })
                }}
              />
              {/* DESCRIPTION */}
              <TextField
                id="description"
                fullWidth
                style={{ marginBottom: FIELD_SPACING }}
                label="Description"
                value={description || ''}
                onChange={e => {
                  let newValue = e.target.value === '' ? null : e.target.value
                  update({
                    description: newValue,
                  })
                }}
              />

              <div style={{ marginBottom: FIELD_SPACING }} />
            </DialogContent>
            <DialogActions>
              <QuickForm loading={false}>
                {(updateButton, { loading }) => {
                  if (loading) {
                    return (
                      <Fade in={loading} key={'show-loading'}>
                        <div style={{ margin: '0 16px 8px 0' }}>
                          <CircularProgress thickness={2} size={18} />
                        </div>
                      </Fade>
                    )
                  }

                  return (
                    <Fade in={!loading} key={'show-button'}>
                      <Button
                        size="small"
                        color="primary"
                        disableElevation
                        variant="contained"
                        onClick={async () => {
                          updateButton({ loading: true })
                          await client
                            .mutate({
                              mutation: gql`
                                mutation(
                                  $dashboardId: ID!
                                  $title: String
                                  $subtitle: String
                                  $description: String
                                ) {
                                  updateDashboard(
                                    id: $dashboardId
                                    title: $title
                                    subtitle: $subtitle
                                    description: $description
                                  ) {
                                    id
                                    title
                                    subtitle
                                    description
                                  }
                                }
                              `,
                              variables: {
                                dashboardId,
                                title,
                                subtitle,
                                description,
                              },
                              update: (cache, { data }) => {
                                const { dashboards } = cache.read({
                                  query: DASHBOARDS_QUERY,
                                  variables: {
                                    databookId,
                                  },
                                })

                                const updatedDashboard = data.updateDashboard //confirm this is right prop
                                cache.writeQuery({
                                  query: DASHBOARDS_QUERY,
                                  data: {
                                    dashboards: [
                                      ...dashboards.map(dashboard => {
                                        return Object.assign(
                                          {},
                                          { ...dashboard },
                                          {
                                            title: updatedDashboard.title,
                                            subtitle: updatedDashboard.subtitle,
                                            description: updatedDashboard.description,
                                          }
                                        )
                                      }),
                                    ],
                                  },
                                })
                              },
                            })
                            .then(() => {
                              closeDialogue()
                            })
                            .catch(error => {
                              console.error(error)
                              update({
                                error: error.message,
                              })
                            })
                            .finally(() => {
                              updateButton({ loading: false })
                            })
                        }}
                      >
                        Save Changes
                      </Button>
                    </Fade>
                  )
                }}
              </QuickForm>
            </DialogActions>
          </>
        )
      }}
    </QuickForm>
  )
}

const FIELD_SPACING = 32
export default ({ dashboard }) => {
  const client = useApolloClient()
  const { id: databookId } = useContext(databookContext)
  const { id: dashboardId } = dashboard

  return (
    <MessageDialogue
      tooltipProps={{
        title: 'Edit dashboard',
        placement: 'bottom-start',
      }}
      title="Edit dashboard"
      iconProps={{ size: 'small' }}
      icon={<EditOutlinedIcon size={20} />}
    >
      {closeDialogue => {
        return <CloseButton id={dashboardId} />
      }}
    </MessageDialogue>
  )
}
