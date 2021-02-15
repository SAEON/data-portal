import { createContext, forwardRef } from 'react'
import QuickForm from '@saeon/quick-form'
import getUriState from '../lib/fns/get-uri-state'
import Button from '@material-ui/core/Button'
import useTheme from '@material-ui/core/styles/useTheme'
import Loading from '../components/loading'
import { gql } from '@apollo/client'
import WithGqlQuery from '../hooks/with-gql-query'
import CookieConsent from 'react-cookie-consent'
import Typography from '@material-ui/core/Typography'

export const context = createContext()

const FromSavedSearch = ({ id, children }) =>
  id ? (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          searchState(id: $id)
        }
      `}
      variables={{ id }}
    >
      {({ error, loading, data }) => {
        if (loading) {
          return <Loading />
        }

        if (error) {
          throw new Error('Unable to load saved search.' + error.message)
        }

        return children(data?.searchState.search)
      }}
    </WithGqlQuery>
  ) : (
    children()
  )

export default ({ children }) => {
  const theme = useTheme()
  const { search, text = undefined, referrer = undefined } = getUriState()

  return (
    <>
      <CookieConsent
        overlay={true}
        overlayStyle={{ zIndex: 2000 }}
        style={{ background: theme.palette.primary.dark }}
        ButtonComponent={forwardRef((props, ref) => {
          return (
            <Button
              {...Object.fromEntries(Object.entries(props).filter(([k]) => k !== 'style'))}
              color="secondary"
              variant="outlined"
              style={{ marginRight: theme.spacing(1) }}
              ref={ref}
            >
              Okay
            </Button>
          )
        })}
        location="bottom"
      >
        <Typography>This website uses cookies to enhance the user experience.</Typography>
      </CookieConsent>

      <FromSavedSearch id={search}>
        {search => (
          <QuickForm
            referrer={referrer || undefined}
            text={text || search?.text || undefined}
            extent={search?.extent || undefined}
            terms={search?.terms || []}
            ids={search?.ids || []}
            dois={search?.dois || []}
            selectedIds={search?.selectedIds || []}
          >
            {(setGlobal, global) => {
              return (
                <context.Provider
                  value={{
                    global,
                    setGlobal: (obj, clearHistory = false, cb) => {
                      setGlobal(
                        Object.assign(
                          clearHistory
                            ? {
                                layers: [],
                                text: undefined,
                                extent: undefined,
                                terms: [],
                              }
                            : {},
                          obj
                        )
                      )
                      if (cb) cb()
                    },
                  }}
                >
                  {children}
                </context.Provider>
              )
            }}
          </QuickForm>
        )}
      </FromSavedSearch>
    </>
  )
}
