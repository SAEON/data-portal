import DownloadIcon from 'mdi-react/DownloadMultipleIcon'
import MessageDialogue from '../../../components/message-dialogue'

export default () => {
  return (
    <MessageDialogue
      buttonType="button"
      buttonProps={{
        children: 'Download lists',
        size: 'small',
        variant: 'text',
        startIcon: <DownloadIcon size={18} />,
      }}
      title="Download list details"
      text={`Not implemented yet - this will be implemented if requested (${'https://github.com/SAEON/catalogue/issues/18'})`}
      tooltipProps={{
        title: 'Download lists in .xlsx format',
      }}
    />
  )
}
