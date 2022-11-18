import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import DialogActions from '@mui/material/DialogActions'
import { ContentCopy as AssignmentIcon } from '../../icons'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import LanguageSelector from './_language-selector'
import StyleSelector from './_style-selector'
import { Div, Pre } from '../../html-tags'
import useMediaQuery from '@mui/material/useMediaQuery'

export default ({
  doi,
  citationParams,
  setCitationParams,
  DEFAULT_CITATION_LANG,
  DEFAULT_CITATION_STYLE,
}) => {
  const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'))

  const { error, loading, data } = useQuery(
    gql`
      query ($dois: [String!], $style: CitationStyle, $language: CitationLocale) {
        catalogue {
          search(dois: $dois) {
            records {
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
      <Div sx={{ marginTop: theme => theme.spacing(3) }} />

      <LanguageSelector
        setCitationParams={setCitationParams}
        citationParams={citationParams}
        defaultLanguage={DEFAULT_CITATION_LANG}
      />

      <Div sx={{ marginTop: theme => theme.spacing(3) }} />

      <StyleSelector
        setCitationParams={setCitationParams}
        citationParams={citationParams}
        defaultStyle={DEFAULT_CITATION_STYLE}
      />

      <Div sx={{ marginTop: theme => theme.spacing(6) }} />

      <Pre>{data.catalogue.search.records[0].citation}</Pre>

      <Div sx={{ marginTop: theme => theme.spacing(3) }} />

      <DialogActions sx={{ paddingLeft: 0, paddingRight: 0 }}>
        {/* DISCLAIMER */}
        <Typography variant="caption" sx={{ marginRight: 'auto' }}>
          <Link target="_blank" rel="noopener noreferrer" href="https://citation.crosscite.org/">
            crosscite{mdUp ? '.org' : ''}
          </Link>{' '}
          |{' '}
          <Link target="_blank" rel="noopener noreferrer" href="https://datacite.org">
            datacite{mdUp ? '.org' : ''}
          </Link>
        </Typography>

        <Button
          aria-label="Copy citation"
          disabled={error || loading}
          onClick={() => {
            navigator.clipboard.writeText(data.catalogue.search.records[0].citation)
            setCitationParams(Object.assign({ ...citationParams }, { copied: true }))
          }}
          startIcon={<AssignmentIcon fontSize="small" />}
        >
          {citationParams.copied ? 'Copied!' : `Copy${mdUp ? ' to clipboard' : ''}`}
        </Button>
      </DialogActions>
    </>
  )
}
