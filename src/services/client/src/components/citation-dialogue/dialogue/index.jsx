import { useState, Suspense, lazy } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

const CitationControls = lazy(() => import('./_citation-controls'))

const DEFAULT_CITATION_STYLE = 'apa'
const DEFAULT_CITATION_LANG = 'en_US'

export default ({ doi, open, setOpen }) => {
  const [citationParams, setCitationParams] = useState({
    style: DEFAULT_CITATION_STYLE,
    language: DEFAULT_CITATION_LANG,
    copied: false,
  })

  return (
    <Dialog
      onClose={() => {
        setOpen(false)
      }}
      open={open}
      maxWidth="sm"
      fullWidth={true}
    >
      {/* TITLE */}
      <DialogTitle>{doi}</DialogTitle>

      {/* CITATION */}
      <DialogContent>
        {open && (
          <Suspense fallback={null}>
            <CitationControls
              DEFAULT_CITATION_STYLE={DEFAULT_CITATION_STYLE}
              DEFAULT_CITATION_LANG={DEFAULT_CITATION_LANG}
              setCitationParams={setCitationParams}
              citationParams={citationParams}
              doi={doi}
            />
          </Suspense>
        )}
      </DialogContent>
    </Dialog>
  )
}
