import { useMemo } from 'react'
import Toolbar_ from './toolbar'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Span } from '../../html-tags'

export const Toolbar = Toolbar_

const parseDescription = description => {
  const parser = new DOMParser()
  const dom = parser.parseFromString(description, 'text/html')
  const childNodes = dom.getElementsByTagName('body')[0].childNodes
  const nodes = []
  for (const [, node] of childNodes.entries()) {
    switch (node.constructor) {
      case HTMLAnchorElement:
        nodes.push({
          Component: Link,
          props: {
            href: node.href,
            children: node.innerHTML,
          },
          el: node,
        })
        break

      default:
        if (node.constructor !== Text) {
          console.warn(
            'Unknown node type when parsing list description. Treating as Text node',
            description,
            node.constructor
          )
        }

        nodes.push({
          Component: Span,
          props: {
            children: node.nodeValue,
          },
          el: node,
        })
        break
    }
  }

  return nodes
}

export default ({ description, ...props }) => {
  const nodes = useMemo(() => parseDescription(description), [description])

  return (
    <Toolbar_
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
      {...props}
    >
      <Typography
        variant="h6"
        variantMapping={{
          h6: 'h2',
        }}
        sx={theme => ({
          fontSize: '0.8rem',
          textAlign: 'center',
          [theme.breakpoints.up('md')]: {
            fontSize: 'unset',
          },
        })}
      >
        {nodes.map(({ Component, props }, i) => (
          <Component key={i} {...props} />
        ))}
      </Typography>
    </Toolbar_>
  )
}
