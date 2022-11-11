import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import Loading from '../../components/loading'
import FieldView from './field-view'
import Header from './header'
import CodeView from './code-view'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Span } from '../../components/html-tags'

export default () => {
  const id = useParams()['*']
  const [codeView, updateCodeView] = useState(false)
  const smDown = useMediaQuery(theme => theme.breakpoints.down('md'))

  const { error, loading, data } = useQuery(
    gql`
      query catalogue($identifiers: [String!], $size: Int) {
        catalogue {
          id
          search(identifiers: $identifiers, size: $size) {
            records {
              metadata
            }
          }
        }
      }
    `,
    {
      variables: { identifiers: [id], size: 1 },
      fetchPolicy: 'cache-first',
    }
  )

  if (loading) {
    return <Loading withHeight />
  }

  if (error) {
    throw new Error(
      `Error retrieving record ${id}\n\n${error}\n\nIt is likely that Elasticsearch has not been configured`
    )
  }

  if (!data?.catalogue?.search?.records?.[0]?.metadata?._source) {
    throw new Error(
      `Sorry, we cannot find record "${id}". If you think that we SHOULD be able to find this record, please forward this message onto us so that we can look into why it appears to be missing.`
    )
  }

  return (
    <>
      <Header
        codeView={codeView}
        toggleCodeView={() => updateCodeView(!codeView)}
        _source={{ ...data?.catalogue?.search?.records?.[0]?.metadata?._source }}
      />
      <Container
        disableGutters={smDown}
        sx={theme => ({
          [theme.breakpoints.up('md')]: {
            my: theme.spacing(2),
          },
        })}
      >
        <Fade key="code-view-in" in={codeView}>
          <Span sx={{ display: codeView ? 'inherit' : 'none' }}>
            <CodeView json={data?.catalogue?.search?.records?.[0]?.metadata?._source} />
          </Span>
        </Fade>
        <Fade key="field-view-in" in={!codeView}>
          <Span sx={{ display: codeView ? 'none' : 'inherit' }}>
            <FieldView {...data?.catalogue?.search?.records?.[0]?.metadata?._source} />
          </Span>
        </Fade>
      </Container>
    </>
  )
}
