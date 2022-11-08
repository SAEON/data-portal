import SvgIcon from '@mui/material/SvgIcon'
import { styled } from '@mui/material/styles'

import SearchIcon_ from 'mdi-react/SearchIcon'
import LoginIcon_ from 'mdi-react/LoginVariantIcon'
import {
  mdiChevronRight,
  mdiChevronLeft,
  mdiContentCopy,
  mdiInformationVariant,
  mdiDownload,
  mdiDownloadCircleOutline,
} from '@mdi/js'

export const ChevronRight = styled(props => (
  <SvgIcon {...props}>
    <path d={mdiChevronRight} />
  </SvgIcon>
))({})

export const Download = styled(props => (
  <SvgIcon {...props}>
    <path d={mdiDownload} />
  </SvgIcon>
))({})

export const DownloadCircleOutline = styled(props => (
  <SvgIcon {...props}>
    <path d={mdiDownloadCircleOutline} />
  </SvgIcon>
))({})

export const InformationVariant = styled(props => (
  <SvgIcon {...props}>
    <path d={mdiInformationVariant} />
  </SvgIcon>
))({})

export const ChevronLeft = styled(props => (
  <SvgIcon {...props}>
    <path d={mdiChevronLeft} />
  </SvgIcon>
))({})

export const ContentCopy = styled(props => (
  <SvgIcon {...props}>
    <path d={mdiContentCopy} />
  </SvgIcon>
))({})

export const SearchIcon = styled(SearchIcon_)({})

export const LoginIcon = styled(LoginIcon_)({})
