import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default ({ layers, listStyle, itemStyle, children, reorderItems }) => {
  return (
    <DragDropContext onDragEnd={reorderItems}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={listStyle(snapshot.isDraggingOver)}
          >
            {children(layers, (child, i) => (
              <Draggable key={i} draggableId={i.toString()} index={i}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={itemStyle(snapshot.isDragging, provided.draggableProps.style)}
                  >
                    {child}
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
