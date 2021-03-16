import AddFilterIcon from 'mdi-react/FilterPlusOutlineIcon'
import MessageDialogue from '../../../../../../../../components/message-dialogue'
import WithFilters from './_with-filters'
import Form from './_form'

export default ({ id: dashboardId }) => (
  <MessageDialogue
    tooltipProps={{
      title: 'Add filter to current dashboard',
      placement: 'bottom-start',
    }}
    title="Add filter"
    iconProps={{ size: 'small' }}
    icon={<AddFilterIcon size={20} />}
  >
    {closeDialogueFn => {
      return (
        <WithFilters>
          {filters => (
            <Form closeDialogueFn={closeDialogueFn} dashboardId={dashboardId} filters={filters} />
          )}
        </WithFilters>
      )
    }}
  </MessageDialogue>
)
