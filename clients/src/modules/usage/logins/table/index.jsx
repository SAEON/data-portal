import { useContext } from 'react'
import { context as dataContext } from '../context'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

export default () => {
  const data = useContext(dataContext)

  return (
    <Card>
      <CardContent>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </CardContent>
    </Card>
  )
}
