import { useState, Suspense, lazy } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

const CitationControls = lazy(() => import('./_citation-controls'))

const DEFAULT_CITATION_STYLE = 'apa'
const DEFAULT_CITATION_LANG = 'en_US'

export default ({ doi, open, setOpen, onClose = undefined }) => {
  const [citationParams, setCitationParams] = useState({
    style: DEFAULT_CITATION_STYLE,
    language: DEFAULT_CITATION_LANG,
    copied: false,
  })

  return (
    <Dialog
      onClose={() => {
        setOpen(false)
        onClose && onClose()
      }}
      disableScrollLock
      open={open}
      maxWidth="sm"
      scroll="paper"
      fullWidth={true}
    >
      {/* TITLE */}
      <DialogTitle>{doi}</DialogTitle>

      {/* CITATION */}
      <DialogContent dividers>
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
