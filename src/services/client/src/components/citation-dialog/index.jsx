import React, { useState } from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import { FormatQuote as CitationIcon } from '@material-ui/icons'
import { useQuery, gql } from '@apollo/client'
import Dialogue from './dialogue'

export default ({ record, children, ...props }) => {
  const [open, setOpen] = useState(false)

  const { error, loading, data } = useQuery(
    gql`
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
    `,
    {
      fetchPolicy: 'cache-first',
    }
  )

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
          record={record}
          open={open}
          setOpen={setOpen}
          citationStyles={data?.citationStyles}
          citationLocales={data?.citationLocales}
        />
      ) : null}
    </>
  )
}
