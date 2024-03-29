import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Provider from './context'
import Table from './table'
import { useSnackbar } from 'notistack'
import Download from './download'

export default ({ contentRef, headerRef }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    const snackbarId = enqueueSnackbar(
      'Sort rows, reorder/resize columns by clicking on the header',
      {
        variant: 'default',
      }
    )

    return () => closeSnackbar(snackbarId)
  })
  return (
    <Provider>
      {createPortal(<Download />, headerRef.current)}
      <Table contentRef={contentRef} />
    </Provider>
  )
}
