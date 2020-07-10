import React, { useState, memo, useRef } from 'react'
import { gql } from '@apollo/client'
import { Grid } from '@material-ui/core'
import { GqlDataQuery } from '../../../../../components'
import useStyles from '../../../style'
import clsx from 'clsx'
import Header from './header'
import ResultsList from './item-list'
import { useEffect } from 'react'

const PAGE_SIZE = 20

export default memo(({ subjects }) => {
  const classes = useStyles()
  const [currentPage, setCurrentPage] = useState(0)
  const [cursors, setCursors] = useState({
    start: undefined,
    end: undefined,
    currentPage: 0,
  })

  return (
    <Grid
      className={clsx({
        [classes.grid]: true,
      })}
      item
      xs={12}
      md={8}
    >
      <GqlDataQuery
        query={gql`
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
        `}
        variables={{
          subjects: subjects || [],
          size: PAGE_SIZE,
          after: cursors.end,
          before: cursors.start,
        }}
      >
        {({ catalogue }) => {
          return (
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
                catalogue={catalogue}
                PAGE_SIZE={PAGE_SIZE}
              />

              {/* CONTENT */}
              <ResultsList
                results={
                  // TODO - I think that this is the OLD value of cursors.start prior to state update. Works but should reference the new value
                  cursors.start
                    ? catalogue.records.nodes.slice(0).reverse()
                    : catalogue.records.nodes
                }
              />
            </Grid>
          )
        }}
      </GqlDataQuery>
    </Grid>
  )
})
