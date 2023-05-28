export interface RGB {
    red: number;
    green: number;
    blue: number;
}

export interface HSL {
    hue: number;
    saturation: number;
    lightness: number;
}

export interface HSV {
    hue: number;
    saturation: number;
    value: number;
}

export class Color {
    rgb: [number, number, number];

    constructor() {
        this.rgb = [255,255,255]
    }
}