import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export default ({ map, items, listStyle, itemStyle, children }) => {
  return (
    <DragDropContext
      onDragEnd={result => {
        console.log(result)
        if (!result.destination) return
        const newItems = reorder(items, result.source.index, result.destination.index)
        // setItems(newItems)
      }}
    >
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={listStyle(snapshot.isDraggingOver)}
          >
            {children(items, (el, i) => (
              <Draggable key={items[i].id} draggableId={items[i].id} index={i}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={itemStyle(snapshot.isDragging, provided.draggableProps.style)}
                  >
                    {el}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
