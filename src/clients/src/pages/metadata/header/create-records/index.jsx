import Dialog from '../../../../components/dialog'
import Toggle from './dialog-toggle'
import Title from './dialog-title'
import Content from './dialog-content'
import Actions from './dialog-actions'
import Provider from './context'

export default () => {
  return (
    <Provider>
      <Dialog Toggle={Toggle} Title={Title} Content={Content} Actions={Actions} />
    </Provider>
  )
}
