import { forwardRef } from 'react'
import Header from '../../../components/toolbar-header'
import Divider from '@mui/material/Divider'
import { Div } from '../../../components/html-tags'

export default forwardRef((props, ref) => {
  return (
    <>
      <Header sx={{ display: 'flex' }}>
        <Div sx={{ marginLeft: 'auto' }} />
        <Divider flexItem orientation="vertical" sx={{ mr: theme => theme.spacing(1) }} />
        <Div ref={ref} />
        <Div sx={{ mr: theme => theme.spacing(1) }} />
      </Header>
    </>
  )
})
