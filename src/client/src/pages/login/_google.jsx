import { CATALOGUE_API_ADDRESS } from '../../config'
import Tooltip from '@material-ui/core/Tooltip'
import FancyButton from '../../components/fancy-button'

export default ({ redirect }) => {
  return (
    <Tooltip
      title={"Login or signup. If you don't have an account you can create one"}
      placement="top"
    >
      <span>
        <div style={{ width: 250, height: 250 }}>
          <FancyButton
            title="Log in to the SAEON Open Data platform"
            href={`${CATALOGUE_API_ADDRESS}/login/google?redirect=${redirect}`}
          />
        </div>
      </span>
    </Tooltip>
  )
}
