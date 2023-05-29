import { CSSProperties, MouseEventHandler, useState } from "react"

const useMouse = (startPos: {x:number,y:number}, offset: {x: number, y: number}) => {
  const [dragInfo, setDragInfo] = useState({
    isDragging: false,
    origin: { x: 0, y: 0 },
    translation: startPos,
    lastTranslation: startPos,
  })

  const { isDragging } = dragInfo
  const handleMouseDown:MouseEventHandler = (event:React.MouseEvent<Element, MouseEvent>) => {
      setDragInfo({
        ...dragInfo,
        isDragging: true,
        origin: { x: event.clientX, y: event.clientY },
        translation: {
          x: event.clientX - offset.x,
          y: event.clientY - offset.y,
        },
      })
  }

  const handleMouseMove:MouseEventHandler = (event:React.MouseEvent<Element, MouseEvent>) => {
    if (isDragging) {
      const { origin, lastTranslation } = dragInfo
      setDragInfo({
        ...dragInfo,
        translation: {
          x: event.clientX - offset.x,
          y: event.clientY - offset.y,
        },
      })
    }
  }

  const handleMouseUp:MouseEventHandler = (_:React.MouseEvent<Element, MouseEvent>) => {
    if (isDragging) {
      const { translation } = dragInfo
      setDragInfo({
        ...dragInfo,
        isDragging: false,
        lastTranslation: { x: translation.x, y: translation.y },
      })
    }
  }

  const cursorPosition:{x:number, y:number} = {
    x: dragInfo.translation.x,
    y: dragInfo.translation.y,
  }

  return {
    isDragging,
    cursorPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  }
}

export default useMouse