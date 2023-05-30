import React, { CSSProperties, useEffect, useState } from "react";
import { ColorSelect } from "../ColorSelect/ColorSelect";
import { HueSelect } from "../HueSelect/HueSelect";

export interface ColorPickerProps {
    selectHandler: ((color:{red:number, green:number, blue:number}) => void);
}

export const ColorPicker = (props:ColorPickerProps) => {
    const [currentHue, setCurrentHue] = useState({red:0, green:0, blue:0});
    const [currentColor, setCurrentColor] = useState({red:0, green:0, blue:0});

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
    </div>
    )
}