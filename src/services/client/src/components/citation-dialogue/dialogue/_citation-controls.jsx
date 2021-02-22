import { gql } from '@apollo/client'
import DialogActions from '@material-ui/core/DialogActions'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import LanguageSelector from './_language-selector'
import WithGqlQuery from '../../../hooks/with-gql-query'
import StyleSelector from './_style-selector'

export default ({
  doi,
  citationParams,
  setCitationParams,
  DEFAULT_CITATION_LANG,
  DEFAULT_CITATION_STYLE,
}) => (
  <WithGqlQuery
    QUERY={gql`
      query($dois: [String!], $style: CitationStyle, $language: CitationLocale) {
        catalogue {
          id
          records(dois: $dois) {
            nodes {
              citation(style: $style, language: $language)
            }
          }
        }
      }
    `}
    variables={{
      dois: [doi],
      style: citationParams.style,
      language: citationParams.language,
    }}
  >
    {({ error, loading, data }) => {
      if (loading) {
        return <CircularProgress />
      }
      if (error) {
        return <samp>{error.message}</samp>
      }

      return (
        <>
          <LanguageSelector
            setCitationParams={setCitationParams}
            citationParams={citationParams}
            defaultLanguage={DEFAULT_CITATION_LANG}
          />

          <div style={{ marginTop: 12 }} />

          <StyleSelector
            setCitationParams={setCitationParams}
            citationParams={citationParams}
            defaultStyle={DEFAULT_CITATION_STYLE}
          />

          <div style={{ marginTop: 24 }} />

          <samp>{data.catalogue.records.nodes[0].citation}</samp>
          <DialogActions>
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
    }}
  </WithGqlQuery>
)
