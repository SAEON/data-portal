import { styled } from '@mui/material/styles'

export const Div = styled('div')({})

export const Span = styled('span')({})

export const Main = styled('main')({})

export const Header = styled('header')({})

export const Img = styled('img')({})

export const A = styled('a')({})

export const B = styled('b')({})
export const Br = styled('br')({})

export const Sup = styled('sup')({})

export const Table = styled('table')({})
export const Thead = styled('thead')({})
export const Tbody = styled('tbody')({})
export const Tfoot = styled('tfoot')({})
export const Tr = styled('tr')({})
export const Th = styled('th')({})
export const Td = styled('td')({})

export const Code = styled('code')({})

export const Pre = styled('pre')(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[200]}`,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
  padding: theme.spacing(1),
}))
