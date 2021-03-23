import { ResizableBox } from 'react-resizable'

export default ({ children, resizable, state, setState, defaultWidth, defaultHeight }) => {
  return (
    <ResizableBox
      resizeHandles={resizable ? ['se'] : []}
      width={state.dimensions.width}
      height={state.dimensions.height}
      axis={resizable ? 'both' : 'none'}
      minConstraints={[Math.min(250, defaultWidth), Math.min(200, defaultHeight)]}
      draggableOpts={{ grid: [1, 1] }}
      onResizeStart={() => {
        if (!resizable) return
        setState(
          Object.assign(
            { ...state },
            {
              isResizing: true,
              dimensions: { ...state.dimensions },
            }
          )
        )
      }}
      onResizeStop={(e, { size }) => {
        if (!resizable) return
        setState(
          Object.assign(
            { ...state },
            {
              snapped: false,
              previousDimensions: null,
              dimensions: {
                width: size.width,
                height: size.height,
              },
              isResizing: false,
            }
          )
        )
      }}
    >
      {children}
    </ResizableBox>
  )
}
