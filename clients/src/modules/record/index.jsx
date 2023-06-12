import { useState, useContext } from 'react'
import { context as clientContext } from '../../contexts/client-info'
import { gql, useQuery } from '@apollo/client'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Loading from '../../components/loading'
import FieldView from './field-view'
import Header from './header'
import CodeView from './code-view'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import useMediaQuery from '@mui/material/useMediaQuery'
import { CLIENTS_PUBLIC_ADDRESS } from '../../config'
import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { Span, Main } from '../../components/html-tags'
import SkipLink from '../../components/skip-link'

export default () => {
  const id = useParams()['*']
  const [codeView, updateCodeView] = useState(false)
  const { renderedPage } = useContext(clientContext)
  const { search } = useLocation()
  const smDown = useMediaQuery(theme => theme.breakpoints.down('md'))

  const { error, loading, data } = useQuery(
    gql`
      query catalogue($identifiers: [String!], $size: Int) {
        catalogue {
          id
          search(identifiers: $identifiers, size: $size) {
            records {
              downloadCount
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
      <SkipLink href="#metadata-record" text="Skip to metadata record" />
      <Main id="metadata-record">
        <Header
          codeView={codeView}
          toggleCodeView={() => updateCodeView(!codeView)}
          downloadCount={data?.catalogue?.search?.records?.[0]?.downloadCount}
          _source={{ ...data?.catalogue?.search?.records?.[0]?.metadata?._source }}
        />
        {renderedPage === 'list' && (
          <Tooltip title="Navigate back to the collection" placement="top-start">
            <Typography
              component={Link}
              href={`${CLIENTS_PUBLIC_ADDRESS}/list/records${search}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="body2"
              sx={theme => ({
                background: theme => theme.palette.common.white,
                display: 'flex',
                flexDirection: 'row-reverse',
                py: theme => theme.spacing(0.5),
                px: theme => theme.spacing(1),
                [theme.breakpoints.up('md')]: {
                  mx: theme => theme.spacing(3),
                  mt: theme => theme.spacing(2),
                  display: 'inline-block',
                  flexDirection: 'unset',
                  float: 'right',
                },
                [theme.breakpoints.up('lg')]: {
                  m: 0,
                },
              })}
            >
              View collection
            </Typography>
          </Tooltip>
        )}
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
      </Main>
    </>
  )
}
