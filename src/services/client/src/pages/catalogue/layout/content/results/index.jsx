import React, { useState, memo } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Grid } from '@material-ui/core'
import useStyles from '../../../style'
import clsx from 'clsx'
import Header from './header'
import ResultsList from './item-list'

export default memo(({ subjects }) => {
  const classes = useStyles()
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [cursors, setCursors] = useState({
    start: undefined,
    end: undefined,
    currentPage: 0,
  })

  const { error, loading, data } = useQuery(
    gql`
      query catalogue($subjects: [String!], $size: Int, $before: ID, $after: ID) {
        catalogue {
          records(subjects: $subjects, size: $size, before: $before, after: $after) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            totalCount
            nodes {
              target
            }
          }
        }
      }
    `,
    {
      variables: {
        subjects: subjects || [],
        size: pageSize,
        after: cursors.end,
        before: cursors.start,
      },
    }
  )

  return (
    <Grid
      className={clsx({
        [classes.grid]: true,
      })}
      item
      xs={12}
      md={8}
    >
      <Grid
        container
        spacing={2}
        className={clsx({
          [classes.grid]: true,
        })}
      >
        {/* HEADER */}
        <Header
          cursors={cursors}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setCursors={setCursors}
          setPageSize={setPageSize}
          pageSize={pageSize}
          error={error}
          loading={loading}
          catalogue={data?.catalogue}
        />

        {/* CONTENT */}
        <ResultsList
          error={error}
          loading={loading}
          results={
            // TODO - I think that this is the OLD value of cursors.start prior to state update. Works but should reference the new value
            data?.cursors?.start
              ? data?.catalogue.records.nodes.slice(0).reverse()
              : data?.catalogue.records.nodes
          }
        />
      </Grid>
    </Grid>
  )
})
