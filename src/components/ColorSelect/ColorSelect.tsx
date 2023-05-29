import React, {CSSProperties, useRef, useEffect, useState } from "react";
import useMouse from "../../hooks/useMouse";

export interface ColorSelectProps {
    hue: string;
    selectHandler: ((red:number, green:number, blue:number) => void);
}

const colorSelectStyle: CSSProperties = {
    border: "1px solid #000000",
};

export const ColorSelect = (props: ColorSelectProps) => {
    const startPosition = { x: 0, y: 0 };

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const {
        isDragging,
        cursorPosition,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
      } = useMouse(startPosition, {x: offsetX, y: offsetY})

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        const w = canvasRef?.current?.offsetWidth ?? 0;
        const h = canvasRef?.current?.offsetHeight ?? 0;
        fillHueRect(ctx, props.hue, w,h);
    }, [canvasRef, props.hue]);

    useEffect(() => {
        const rect:DOMRect | undefined = canvasRef?.current?.getBoundingClientRect();
        setOffsetX(rect?.left as number);
        setOffsetY(rect?.top as number);
    }, [canvasRef?.current]);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        const pixel = ctx.getImageData(cursorPosition.x,cursorPosition.y,1,1, {"willReadFrequently": true} as CanvasRenderingContext2DSettings).data;
        const red:number = pixel[0];
        const green:number = pixel[1];
        const blue:number = pixel[2];
        props.selectHandler(red, green, blue);
    },[cursorPosition,props.hue]);

    let cursorStyle:CSSProperties = {
        left: cursorPosition.x + "px",
        top: cursorPosition.y + "px",
        position: "absolute",
        pointerEvents: "none",
        borderRadius: "50%",
        backgroundColor: "#00000000",
        transform:"translate(-50%,-50%)",
        outline :"1px solid #00000055",
    };
    let cursorSelectedStyle:CSSProperties = isDragging ? {
        transition: "0s ease-out",
        border :"2px solid #ffffffee",
        width: "8px",
        height: "8px",
    } : {
        transition: ".2s cubic-bezier(.49,1.42,.47,1)",
        border :"1px solid #ffffffee",
        width: "2px",
        height: "2px",
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
            <div style={{...cursorStyle, ...cursorSelectedStyle}} />
        </div>
    )
}

function fillHueRect(ctx: CanvasRenderingContext2D, baseColor:string, width:number, height:number) {
    ctx.clearRect(0,0,width,height);
    let gradientWhite = ctx.createLinearGradient(width,0,0,0);
    let gradientBlack = ctx.createLinearGradient(0,0,0,height);
    gradientWhite.addColorStop(0, "#ffffff00");
    gradientWhite.addColorStop(1, "#ffffffff");
    gradientBlack.addColorStop(0, "#00000000");
    gradientBlack.addColorStop(1, "#000000ff");

    ctx.fillStyle = baseColor;
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = gradientWhite;
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = gradientBlack;
    ctx.fillRect(0,0,width,height);
}