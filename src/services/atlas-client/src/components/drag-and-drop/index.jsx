import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { createPortal } from 'react-dom'

const _dragEl = document.getElementById('dnd-portal')

const optionalPortal = (styles, element) =>
  styles.position === 'fixed' ? createPortal(element, _dragEl) : element

export default ({ items, listStyle, itemStyle, children, reorderItems }) => {
  return (
    <DragDropContext onDragEnd={reorderItems}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={listStyle(snapshot.isDraggingOver, snapshot.isUsingPlaceholder)}
          >
            {children(items, (child, i, disableDrag, id) => {
              return (
                <Draggable key={id} isDragDisabled={disableDrag} draggableId={id} index={i}>
                  {(provided, snapshot) =>
                    optionalPortal(
                      provided.draggableProps.style,
                      <div
                        ref={provided.innerRef}
                        style={itemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div style={itemStyle(snapshot.isDragging)}>{child}</div>
                      </div>
                    )
                  }
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
