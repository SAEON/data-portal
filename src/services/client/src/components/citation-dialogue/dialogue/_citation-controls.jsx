import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import DialogActions from '@material-ui/core/DialogActions'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import LanguageSelector from './_language-selector'
import StyleSelector from './_style-selector'
import useTheme from '@material-ui/core/styles/useTheme'

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
      query($dois: [String!], $style: CitationStyle, $language: CitationLocale) {
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
          Powerd by{' '}
          <Link target="_blank" rel="noopener noreferrer" href="https://citation.crosscite.org/">
            crosscite.org
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
