import AddChartIcon from 'mdi-react/ChartBoxPlusOutlineIcon'
import MessageDialogue from '../../../../../../../components/message-dialogue'
import Form from './_form'
import WithCharts from './_with-charts'

export default ({ id: dashboardId }) => (
  <MessageDialogue
    tooltipProps={{
      title: 'Add chart to current dashboard',
      placement: 'bottom-start',
    }}
    title="Add chart"
    iconProps={{ size: 'small' }}
    icon={<AddChartIcon size={20} />}
  >
    {closeDialogueFn => {
      return (
        <WithCharts>
          {charts => (
            <Form closeDialogueFn={closeDialogueFn} dashboardId={dashboardId} charts={charts} />
          )}
        </WithCharts>
      )
    }}
  </MessageDialogue>
)
