import React, {CSSProperties, useRef, useEffect, useState } from "react";
import useMouse from "../../hooks/useMouse";

export interface HueSelectProps {
    selectHandler: ((color:{red:number, green:number, blue:number}) => void);
}

export const HueSelect = (props: HueSelectProps) => {
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
        fillHueSlider(ctx, w,h);
    }, [canvasRef]);

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
        props.selectHandler({red:red, green:green, blue:blue});
    },[cursorPosition.x,cursorPosition.x]);

    let cursorStyle:CSSProperties = {
        top: cursorPosition.y + "px",
        position: "absolute",
        pointerEvents: "none",
        backgroundColor: "#00000000",
        transform:"translate(0%,-50%)",
        outline :"1px solid #ffffffee",
        boxSizing:"border-box",
        borderRadius:"99px",
    };
    let cursorSelectedStyle:CSSProperties = isDragging ? {
        transition: "0s ease-out",
        border :"2px solid #00000055",
        width: "100%",
        height: "8px",
    } : {
        transition: ".2s cubic-bezier(.49,1.42,.47,1)",
        border :"1px solid #00000055",
        width: "100%",
        height: "3px",
    };

    return (
        <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        style={{width:"fit-content", height:"fit-content", position:"relative", display:"flex", justifyContent:"center", alignItems:"center"}}
        >
            <canvas width={32} height={255} style={{borderRadius:"4px", boxShadow:"0px 2px 8px #111"}} ref={canvasRef}/>
            <div style={{...cursorStyle, ...cursorSelectedStyle}} />
        </div>
    )
}

function fillHueSlider(ctx: CanvasRenderingContext2D, width:number, height:number) {
    ctx.clearRect(0,0,width,height);
    let gradientHue = ctx.createLinearGradient(0,0,0,height);
    
    gradientHue.addColorStop(0 / 6, "#ff0000");
    gradientHue.addColorStop(1 / 6, "#ffff00");
    gradientHue.addColorStop(2 / 6, "#00ff00");
    gradientHue.addColorStop(3 / 6, "#00ffff");
    gradientHue.addColorStop(4 / 6, "#0000ff");
    gradientHue.addColorStop(5 / 6, "#ff00ff");
    gradientHue.addColorStop(6 / 6, "#ff0000");

    ctx.fillStyle = gradientHue;
    ctx.fillRect(0,0,width,height);
}