import { useContext, useState } from 'react'
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fade,
  TextField,
} from '@material-ui/core'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import MessageDialogue from '../../../../../../components/message-dialogue'
import Loading from '../../../../../../components/loading'
import Autocomplete from '../../../../../../components/autocomplete'
import { context as databookContext } from '../../../../context'
import { gql, useApolloClient } from '@apollo/client'
import WithGqlQuery from '../../../../../../hooks/with-gql-query'
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
const FIELD_SPACING = 32
export default ({ dashboard }) => {
  const client = useApolloClient()
  const { databook } = useContext(databookContext)
  const { _id: databookId } = databook.doc

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
        return (
          <WithGqlQuery
            QUERY={gql`
              query($id: ID!) {
                dashboard(id: $id) {
                  id
                  title
                  subtitle
                  description
                }
              }
            `}
            variables={{ id: dashboardId }}
          >
            {({ error, loading, data }) => {
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
            }}
          </WithGqlQuery>
        )
      }}
    </MessageDialogue>
  )
}
