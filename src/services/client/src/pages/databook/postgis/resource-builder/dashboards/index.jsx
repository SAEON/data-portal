import { useContext, forwardRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { context as databookContext } from '../../../context'
import { WithGqlQuery } from '../../../../../hooks'
import { gql } from '@apollo/client'
import Loading from '../../../../../components/loading'
import TabHeaders from './_tab-headers'
import Dashboard from './dashboard'

export default forwardRef((props, ref) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const { databook } = useContext(databookContext)
  const databookId = databook.doc._id

  return (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          databook(id: $id) {
            id
            dashboards {
              id
            }
          }
        }
      `}
      variables={{ id: databookId }}
    >
      {({ error, loading, data }) => {
        if (error) {
          throw error
        }

        if (loading) {
          return <Loading />
        }

        const dashboards = data.databook.dashboards

        return (
          <div>
            {createPortal(
              <TabHeaders
                activeTabIndex={activeTabIndex}
                setActiveTabIndex={setActiveTabIndex}
                dashboards={dashboards}
              />,
              ref.current
            )}
            {dashboards.map(({ id }, i) => {
              return (
                <div key={id} role="tabpanel" hidden={activeTabIndex !== i}>
                  {activeTabIndex === i && <Dashboard id={id} />}
                </div>
              )
            })}
          </div>
        )
      }}
    </WithGqlQuery>
  )
})
