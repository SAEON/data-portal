import {
  forwardRef,
  Children,
  isValidElement,
  useContext,
  createContext,
  cloneElement,
  useRef,
  useEffect,
} from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListSubheader from '@mui/material/ListSubheader'
import { VariableSizeList } from 'react-window'

const LISTBOX_PADDING = 8

const useResetCache = data => {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])
  return ref
}

const OuterElementContext = createContext({})

export default forwardRef(({ children, ...other }, ref) => {
  const itemData = Children.toArray(children)
  const smUp = useMediaQuery(theme => theme.breakpoints.up('sm'))
  const itemCount = itemData.length
  const itemSize = smUp ? 36 : 48

  const getChildSize = child =>
    isValidElement(child) && child.type === ListSubheader ? 48 : itemSize

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
  }

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={useResetCache(itemCount)}
          outerElementType={forwardRef((props, ref) => {
            const outerProps = useContext(OuterElementContext)
            return <div ref={ref} {...props} {...outerProps} />
          })}
          innerElementType={forwardRef((props, ref) => {
            props.style.height = props.style.height - itemSize //STEVEN: closest cause to the extra row's worth of height issue that I can find
            return <ul ref={ref} {...props} />
          })}
          itemSize={index => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {({ data, index, style }) =>
            cloneElement(data[index], {
              style: {
                ...style,
                top: style.top + LISTBOX_PADDING,
              },
            })
          }
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  )
})
