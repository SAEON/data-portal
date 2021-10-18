import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import DialogActions from '@mui/material/DialogActions'
import AssignmentIcon from 'mdi-react/ContentCopyIcon'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import LanguageSelector from './_language-selector'
import StyleSelector from './_style-selector'
import { useTheme } from '@mui/material/styles'

export default ({
  doi,
  citationParams,
  setCitationParams,
  DEFAULT_CITATION_LANG,
  DEFAULT_CITATION_STYLE,
}) => {
  const theme = useTheme()

  const { error, loading, data } = useQuery(
    gql`
      query ($dois: [String!], $style: CitationStyle, $language: CitationLocale) {
        catalogue {
          records(dois: $dois) {
            nodes {
              citation(style: $style, language: $language)
            }
          }
        }
      }
    `,
    {
      variables: {
        dois: [doi],
        style: citationParams.style,
        language: citationParams.language,
      },
      fetchPolicy: 'no-cache',
    }
  )

  if (loading) {
    return <CircularProgress />
  }
  if (error) {
    return <samp>{error.message}</samp>
  }

  return (
    <>
      <div style={{ marginTop: theme.spacing(3) }} />

      <LanguageSelector
        setCitationParams={setCitationParams}
        citationParams={citationParams}
        defaultLanguage={DEFAULT_CITATION_LANG}
      />

      <div style={{ marginTop: theme.spacing(3) }} />

      <StyleSelector
        setCitationParams={setCitationParams}
        citationParams={citationParams}
        defaultStyle={DEFAULT_CITATION_STYLE}
      />

      <div style={{ marginTop: theme.spacing(6) }} />

      <pre style={theme.pre}>{data.catalogue.records.nodes[0].citation}</pre>

      <div style={{ marginTop: theme.spacing(3) }} />

      <DialogActions style={{ paddingLeft: 0, paddingRight: 0 }}>
        {/* DISCLAIMER */}
        <Typography variant="caption" style={{ marginRight: 'auto' }}>
          <Link target="_blank" rel="noopener noreferrer" href="https://citation.crosscite.org/">
            crosscite.org
          </Link>{' '}
          |{' '}
          <Link target="_blank" rel="noopener noreferrer" href="https://datacite.org">
            datacite.org
          </Link>
        </Typography>

        <Button
          aria-label="Copy citation"
          disabled={error || loading}
          onClick={() => {
            navigator.clipboard.writeText(data.catalogue.records.nodes[0].citation)
            setCitationParams(Object.assign({ ...citationParams }, { copied: true }))
          }}
          startIcon={<AssignmentIcon />}
        >
          {citationParams.copied ? 'Copied!' : 'Copy to clipboard'}
        </Button>
      </DialogActions>
    </>
  )
}
