import { useState } from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import { FormatQuote as CitationIcon } from '@material-ui/icons'
import { gql } from '@apollo/client'
import Dialogue from './dialogue'
import { WithGqlQuery } from '../../hooks'

export default ({ doi, children, ...props }) => {
  const [open, setOpen] = useState(false)

  return (
    <WithGqlQuery
      QUERY={gql`
        query {
          citationStyles: __type(name: "CitationStyle") {
            enumValues {
              name
            }
          }

          citationLocales: __type(name: "CitationLocale") {
            enumValues {
              name
            }
          }
        }
      `}
      fetchPolicy="cache-first"
    >
      {({ error, loading, data }) => {
        return (
          <>
            {typeof children === 'function' ? (
              children({
                disabled: error || loading,
                onClick: e => {
                  e.stopPropagation()
                  setOpen(true)
                },
              })
            ) : (
              <Button
                disabled={error || loading}
                variant="contained"
                disableElevation
                startIcon={<CitationIcon />}
                color="primary"
                onClick={e => {
                  e.stopPropagation()
                  setOpen(true)
                }}
                {...props}
              >
                {error || loading ? <CircularProgress size={24} /> : 'Cite'}
              </Button>
            )}
            {open ? (
              <Dialogue
                doi={doi}
                open={open}
                setOpen={setOpen}
                citationStyles={data?.citationStyles}
                citationLocales={data?.citationLocales}
              />
            ) : null}
          </>
        )
      }}
    </WithGqlQuery>
  )
}