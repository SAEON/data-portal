import { styled } from '@mui/material/styles'

const Div = styled('div')({
  '& > div': {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
})

const Div2 = styled('div')({})

export default ({ children, state, MENU_HEADER_HEIGHT }) => {
  return (
    <Div
      sx={{
        height: `calc(100% - ${MENU_HEADER_HEIGHT}px)`,
      }}
    >
      <Div2
        sx={
          state.isResizing
            ? {
                background: `linear-gradient(to right, #adadad 4px, transparent 4px) 0 0,
                  linear-gradient(to right, #adadad 4px, transparent 4px) 0 100%,
                  linear-gradient(to left, #adadad 4px, transparent 4px) 100% 0,
                  linear-gradient(to left, #adadad 4px, transparent 4px) 100% 100%,
                  linear-gradient(to bottom, #adadad 4px, transparent 4px) 0 0,
                  linear-gradient(to bottom, #adadad 4px, transparent 4px) 100% 0,
                  linear-gradient(to top, #adadad 4px, transparent 4px) 0 100%,
                  linear-gradient(to top, #adadad 4px, transparent 4px) 100% 100%`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '20px 20px',
              }
            : {}
        }
      >
        {typeof children === 'function'
          ? children({
              height: state.dimensions.height - 31,
              width: state.dimensions.width,
            })
          : children}
      </Div2>
    </Div>
  )
}
