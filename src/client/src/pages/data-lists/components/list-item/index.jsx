import Grid from '@material-ui/core/Grid'
import Header from './header'
import Search from './search'
import Details from './details'
import Share from './share'
import ListItemContextProvider from './_context'
import QuickForm from '@saeon/quick-form'

export default props => {
  const { search, createdBy, title, description, type } = props
  return (
    <QuickForm
      search={search}
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

              {/* SEARCH */}
              <Grid item xs={12}>
                <Search />
              </Grid>
            </Grid>
          </ListItemContextProvider>
        )
      }}
    </QuickForm>
  )
}
