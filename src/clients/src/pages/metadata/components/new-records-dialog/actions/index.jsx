import { useContext } from 'react'
import { context as newMetadataFormContext } from '../_context'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

export default () => {
  const { formRef } = useContext(newMetadataFormContext)

  return (
    <DialogActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={() => console.log('form', formRef)} size="small" variant="text">
        Create records
      </Button>
    </DialogActions>
  )
}
