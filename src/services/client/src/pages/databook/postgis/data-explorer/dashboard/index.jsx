import { useContext } from 'react'
import { context as databookContext } from '../../../context'

export default () => {
  const { databook } = useContext(databookContext)
  return JSON.stringify(databook)
}
