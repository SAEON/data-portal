import Dialog from '../../components/dialog'
import Toggle from './_toggle'
import Title from './_title'
import Content from './content'
import Actions from './actions'
import Provider from './_context'

export default () => {
  return (
    <Provider>
      <Dialog Toggle={Toggle} Title={Title} Content={Content} Actions={Actions} />
    </Provider>
  )
}
