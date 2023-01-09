import { useContext } from 'react'
import { context as dataContext } from '../context'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Pre } from '../../../../components/html-tags'

export default () => {
  const logs = useContext(dataContext)

  return (
    <Card variant="outlined">
      <CardContent>
        <Pre>{JSON.stringify(logs, null, 2)}</Pre>
      </CardContent>
    </Card>
  )
}
