import SvgIcon from '@mui/material/SvgIcon'
import { styled } from '@mui/material/styles'

import SearchIcon_ from 'mdi-react/SearchIcon'
import LoginIcon_ from 'mdi-react/LoginVariantIcon'
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiChevronDown,
  mdiChevronUp,
  mdiClose,
  mdiContentCopy,
  mdiDownload,
  mdiDownloadCircleOutline,
  mdiInformationVariant,
  mdiPencil,
  mdiEye,
  mdiEyeOff,
  mdiFormatQuoteOpen,
} from '@mdi/js'

export const FormatQuoteOpen = styled(props => (
  <SvgIcon {...props}>
    <path d={mdiFormatQuoteOpen} />
  </SvgIcon>
))({})

export const EyeOff = styled(props => (
  <SvgIcon {...props}>
    <path d={mdiEyeOff} />
  </SvgIcon>
))({})

export const Eye = styled(props => (
  <SvgIcon {...props}>
    <path d={mdiEye} />
  </SvgIcon>
))({})

export const ChevronDown = styled(props => (
  <SvgIcon {...props}>
    <path d={mdiChevronDown} />
  </SvgIcon>
))({})

export const ChevronUp = styled(props => (
  <SvgIcon {...props}>
    <path d={mdiChevronUp} />
  </SvgIcon>
))({})

export const Close = styled(props => (
  <SvgIcon {...props}>
    <path d={mdiClose} />
  </SvgIcon>
))({})

export const Pencil = styled(props => (
  <SvgIcon {...props}>
    <path d={mdiPencil} />
  </SvgIcon>
))({})

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
