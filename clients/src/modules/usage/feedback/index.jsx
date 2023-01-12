import { useEffect } from 'react'
import Provider from './context'
import Table from './table'
import { useSnackbar } from 'notistack'

export default () => {
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    enqueueSnackbar('Sort rows, reorder/resize columns by clicking on the header', {
      variant: 'default',
    })
  })
  return (
    <Provider>
      <Table />
    </Provider>
  )
}
