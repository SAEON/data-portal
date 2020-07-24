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

const DEFAULT_CITATION_STYLE = 'apa'
const DEFAULT_CITATION_LANG = 'en_US'

export default ({ id, json, ...props }) => {
  const { identifier } = json

  const [open, setOpen] = useState(false)

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
      variables: {
        id,
        style: citationParams.style,
        language: citationParams.language,
      },
    }
  )

  return (
    <>
      {/* Toggle Dialogue */}
      <Button
        variant="contained"
        disableElevation
        color="primary"
        onClick={() => {
          setOpen(true)
        }}
        {...props}
      >
        “ Cite
      </Button>

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
        <DialogTitle>
          {identifier.identifierType === 'DOI' ? identifier.identifier : 'INVALID_DOI'}
        </DialogTitle>

        {/* MARGIN */}
        <DialogContent />

        {/* SELECTION BOXES */}
        <DialogContent>
          <Autocomplete
            label="Style"
            variant="outlined"
            setOption={value =>
              setCitationParams(
                Object.assign(
                  { ...citationParams },
                  { copied: false, style: value?.replace(/-/g, '_') || DEFAULT_CITATION_STYLE }
                )
              )
            }
            selectedOption={citationParams.style.replace(/_/g, '-')}
            options={
              data?.citationStyles?.enumValues?.map(v => v.name.replace(/_/g, '-')) || [
                'Loading ...',
              ]
            }
          />
        </DialogContent>
        <DialogContent>
          <Autocomplete
            label="Language"
            variant="outlined"
            setOption={value =>
              setCitationParams(
                Object.assign(
                  { ...citationParams },
                  { copied: false, language: value?.replace(/-/g, '_') || DEFAULT_CITATION_LANG }
                )
              )
            }
            selectedOption={citationParams.language.replace(/_/g, '-')}
            options={
              data?.citationLocales?.enumValues?.map(v => v.name.replace(/_/g, '-')) || [
                'Loading ...',
              ]
            }
          />
        </DialogContent>

        {/* MARGIN */}
        <DialogContent />

        {/* CITATION TEXT */}
        <DialogContent>
          {error ? (
            'Error'
          ) : loading ? (
            <CircularProgress />
          ) : (
            <samp>{data.catalogue.records.nodes[0].citation}</samp>
          )}
        </DialogContent>

        {/* MARGIN */}
        <DialogContent />

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
