import React, { CSSProperties, useEffect, useState } from "react";
import { ColorSelect } from "../ColorSelect/ColorSelect";
import { HueSelect } from "../HueSelect/HueSelect";
import { RGB } from "../../color";

export interface ColorPickerProps {
    selectHandler: ((color:RGB) => void);
}

export const ColorPicker = (props:ColorPickerProps) => {
    const [currentHue, setCurrentHue] = useState(new RGB(255,0,0));
    const [currentColor, setCurrentColor] = useState(new RGB(255,0,0));

    useEffect(() => {
        props.selectHandler(currentColor);
    }, [currentColor]);

    const containerStyle:CSSProperties = {
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        height:"fit-content",
        width:"fit-content",

        backgroundColor:"#222",
        background:"linear-gradient(0deg, #333 54%, #222 100%)",
        borderRadius:"4px",
        padding:"8px",
        paddingBottom:"16px",
        overflow:"hidden",
    }

    return (
    <div style={containerStyle}>
        <ColorSelect hue={currentHue} selectHandler={setCurrentColor}/>
        <div style={{width:"4px", height:"100%"}}></div>
        <HueSelect selectHandler={setCurrentHue}/>
        <div style={{display:"flex", flexDirection:"column"}}>
            <div style={{color:"#fff"}}>{`RGB: (${currentColor.red}:${currentColor.green}:${currentColor.blue})`}</div>
            <div style={{color:"#fff"}}>{`HSV: ${currentColor.toHsv().hue} : ${currentColor.toHsv().saturation} : ${currentColor.toHsv().value}`}</div>
            <div style={{color:"#fff"}}>{`HSL: ${currentColor.toHsl().hue} : ${currentColor.toHsl().saturation} : ${currentColor.toHsl().lightness}`}</div>
        </div>
    </div>
    )
}