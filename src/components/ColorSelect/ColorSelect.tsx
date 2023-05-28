import React, {CSSProperties, useRef, useEffect, useState } from "react";
import useMouse from "../../hooks/useMouse";

export interface ColorSelectProps {
    hue: string;
    selectHandler: Function;
}

const colorSelectStyle: CSSProperties = {
    border: "1px solid #000000",
};

export const ColorSelect = (props: ColorSelectProps) => {
    const startPosition = { x: 0, y: 0 }

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const {
        cursorPosition,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
      } = useMouse(startPosition, {x: offsetX, y: offsetY})
    useEffect(() => {
        let ctx:CanvasRenderingContext2D | null | undefined  = canvasRef?.current?.getContext("2d");
        if (!ctx) return;

        const w = canvasRef?.current?.offsetWidth ?? 0;
        const h = canvasRef?.current?.offsetHeight ?? 0;
        
        ctx.clearRect(0,0,w,h);
        let gradientWhite = ctx.createLinearGradient(w,0,0,0)
        let gradientBlack = ctx.createLinearGradient(0,0,0,h)
        gradientWhite.addColorStop(0, "#ffffff00");
        gradientWhite.addColorStop(1, "#ffffffff");
        gradientBlack.addColorStop(0, "#00000000");
        gradientBlack.addColorStop(1, "#000000ff");

        ctx.fillStyle = props.hue;
        ctx.fillRect(0,0,w,h);
        ctx.fillStyle = gradientWhite;
        ctx.fillRect(0,0,w,h);
        ctx.fillStyle = gradientBlack;
        ctx.fillRect(0,0,w,h);

    }, [canvasRef]);
    useEffect(() => {
        const rect:DOMRect | undefined = canvasRef?.current?.getBoundingClientRect();
        setOffsetX(rect?.left as number);
        setOffsetY(rect?.top as number);
        console.log(offsetX, offsetY);
    }, [canvasRef?.current]);
    useEffect(()=> {
        console.log("sample");
        
        let ctx:CanvasRenderingContext2D | null | undefined  = canvasRef?.current?.getContext("2d");
        if (!ctx) return;
        const pixel = ctx.getImageData(cursorPosition.x,cursorPosition.y,1,1).data;
        const red:number = pixel[0];
        const green:number = pixel[1];
        const blue:number = pixel[2];
        console.log(red, blue, green);
    },[cursorPosition]);


    let cursorStyle:CSSProperties = {
        left: cursorPosition.x + "px",
        top: cursorPosition.y + "px",
        position: "absolute",
        pointerEvents: "none",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        border :"2px solid #555566ee",
        mixBlendMode: "difference",
        backgroundColor: "#00000000",
        transform:"translate(-50%,-50%)",
    };

    return (
        <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        style={{width:"fit-content", height:"fit-content", overflow:"hidden", position:"relative"}}
        >
            <canvas width={255} height={255} style={colorSelectStyle} className="color-select" ref={canvasRef}/>
            <div style={{...cursorStyle}} />
        </div>
    )
}