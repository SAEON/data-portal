import Grid from '@mui/material/Grid'
import Header from './header'
import Filter from './filter'
import Details from './details'
import Share from './share'
import ListItemContextProvider from './_context'
import QuickForm from '../../../../packages/quick-form'

export default props => {
  const { filter, createdBy, title, description, type } = props
  return (
    <QuickForm
      filter={filter}
      createdBy={createdBy || ''}
      title={title || ''}
      description={description || ''}
      preventSave={false}
      type={type}
    >
      {(update, fields) => {
        return (
          <ListItemContextProvider update={update} id={props.id} {...fields}>
            <Grid container spacing={2}>
              {/* HEADER */}
              <Grid item xs={12}>
                <Header {...props} />
              </Grid>

              {/* DETAILS */}
              <Grid item xs={12}>
                <Details />
              </Grid>

              {/* SHARE */}
              <Grid item xs={12}>
                <Share {...props} />
              </Grid>

              {/* FILTER */}
              <Grid item xs={12}>
                <Filter />
              </Grid>
            </Grid>
          </ListItemContextProvider>
        )
      }}
    </QuickForm>
  )
}
