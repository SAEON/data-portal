import React, { useState } from 'react'
import {
  Button,
  Dialog,
  CircularProgress,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { useQuery, gql } from '@apollo/client'
import Autocomplete from '../../components/autocomplete/autocomplete'
import { DATA_CURATOR_CONTACT } from '../../config'

const DEFAULT_CITATION_STYLE = 'apa'
const DEFAULT_CITATION_LANG = 'en_US'

export default ({ record, open, setOpen, citationStyles, citationLocales }) => {
  const { identifier, id } = record
  const DOI = identifier.identifierType === 'DOI' ? identifier.identifier : 'INVALID_DOI'

  if (!id)
    throw new Error(
      `This metadata record has no identifier. Please contact ${DATA_CURATOR_CONTACT} with a screenshot of this page, or a copy of the current URL`
    )

  const [citationParams, setCitationParams] = useState({
    style: DEFAULT_CITATION_STYLE,
    language: DEFAULT_CITATION_LANG,
    copied: false,
  })

  const { error, loading, data } = useQuery(
    gql`
      query($id: ID, $style: CitationStyle, $language: CitationLocale) {
        catalogue {
          records(id: $id) {
            nodes {
              citation(style: $style, language: $language)
            }
          }
        }
      }
    `,
    {
      variables: {
        id: id,
        style: citationParams.style,
        language: citationParams.language,
      },
    }
  )

  return (
    <>
      {/* Dialogue */}
      <Dialog
        onClose={() => {
          setOpen(false)
        }}
        open={open}
        maxWidth="sm"
        fullWidth={true}
      >
        {/* TITLE */}
        <DialogTitle>{DOI}</DialogTitle>

        {/* TITLE */}
        <DialogContent>
          {/* SELECT STYLE */}
          <Autocomplete
            label="Style"
            variant="outlined"
            setOption={value =>
              setCitationParams(
                Object.assign(
                  { ...citationParams },
                  {
                    copied: false,
                    style: value?.replace(/-/g, '_') || DEFAULT_CITATION_STYLE.replace(/_/g, '-'),
                  }
                )
              )
            }
            selectedOption={citationParams.style.replace(/_/g, '-')}
            options={citationStyles?.enumValues?.map(v => v.name.replace(/_/g, '-'))}
          />

          <div style={{ marginTop: 12 }} />

          {/* SELECT LANGUAGE */}
          <Autocomplete
            label="Language"
            variant="outlined"
            setOption={value =>
              setCitationParams(
                Object.assign(
                  { ...citationParams },
                  {
                    copied: false,
                    language: value?.replace(/-/g, '_') || DEFAULT_CITATION_LANG.replace(/_/g, '-'),
                  }
                )
              )
            }
            selectedOption={citationParams.language.replace(/_/g, '-')}
            options={citationLocales?.enumValues?.map(v => v.name.replace(/_/g, '-'))}
          />

          <div style={{ marginTop: 24 }} />

          {/* CITATION TEXT */}
          {error ? (
            'Error'
          ) : loading ? (
            <CircularProgress />
          ) : (
            <samp>{data.catalogue.records.nodes[0].citation}</samp>
          )}
        </DialogContent>

        {/* COPY Button */}
        <DialogActions>
          <Button
            disabled={error || loading}
            onClick={() => {
              navigator.clipboard.writeText(data.catalogue.records.nodes[0].citation)
              setCitationParams(Object.assign({ ...citationParams }, { copied: true }))
            }}
            startIcon={<AssignmentIcon />}
          >
            {citationParams.copied ? 'Copied!' : 'Copy to cliboard'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
