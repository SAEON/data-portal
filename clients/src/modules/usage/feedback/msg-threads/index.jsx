import { useContext } from 'react'
import { context as dataContext } from '../context'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Pre } from '../../../../components/html-tags'

export default () => {
  const { userFormSubmissions } = useContext(dataContext)

  return userFormSubmissions.map(submission => (
    <Card key={submission._id} sx={{ mb: 1 }} variant="outlined">
      <CardContent>
        <Pre>{JSON.stringify(submission, null, 2)}</Pre>
      </CardContent>
    </Card>
  ))
}
