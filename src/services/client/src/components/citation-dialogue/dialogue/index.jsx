import { useState } from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import CitationIcon from '@material-ui/icons/FormatQuote'
import { gql } from '@apollo/client'
import Dialogue from './_content'
import WithGqlQuery from '../../../hooks/with-gql-query'

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
