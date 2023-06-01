import ColorFormatError from "./errors/ColorFormatError";

export interface IRGB {
    red: number;
    green: number;
    blue: number;

    toHsl(): void;
    toHsv(): void;
}

export interface IHSL {
    hue: number;
    saturation: number;
    lightness: number;

    toRgb(): void;
    toHsv(): void;
}

export interface IHSV {
    hue: number;
    saturation: number;
    value: number;

    toRgb(): void;
    toHsl(): void;
}

export class RGB implements IRGB {
    red: number;
    green: number;
    blue: number;

    toHsl():HSL {
        const r = this.red/255;
        const g = this.green/255;
        const b = this.blue/255;
        const cmax = Math.max(r,g,b);
        const cmin = Math.min(r,g,b);
        const deltaDiff = cmax - cmin;
        let hue = 0;
        let sat = 0;
        let lig = (cmax + cmin) / 2;
        sat = (deltaDiff == 0) ? 0 : 1 - Math.abs(2*lig - 1);

        if (deltaDiff == 0) { hue = 0; } else {
            switch (cmax) {
                case r:
                    hue = 60 * ((g - b)/deltaDiff % 6);
                    break;
                case g:
                    hue = 60 * ((b - r)/deltaDiff + 2);
                    break;
                case b:
                    hue = 60 * ((r - g)/deltaDiff + 4);
                    break;
                default:
                    break;
            }
        }

        return new HSL(hue, sat, lig);
    };

    toHsv():HSV{
        const r = this.red/255;
        const g = this.green/255;
        const b = this.blue/255;
        const cmax = Math.max(r,g,b);
        const cmin = Math.min(r,g,b);
        const deltaDiff = cmax - cmin;
        let hue = 0;
        let sat = (cmax == 0) ? 0 : deltaDiff/cmax;
        let val = cmax;

        if (deltaDiff == 0) { hue = 0; } else {
            switch (cmax) {
                case r:
                    hue = 60 * (((g - b)/deltaDiff) % 6);
                    break;
                case g:
                    hue = 60 * ((b - r)/deltaDiff + 2);
                    break;
                case b:
                    hue = 60 * ((r - g)/deltaDiff + 4);
                    break;
                default:
                    break;
            }
        }
        
        return new HSV(hue, sat, val);
    };

    constructor(red:number, green:number, blue:number) {
        if (red < 0 || red > 255) throw new ColorFormatError("Invalid value for red");
        if (green < 0 || green > 255) throw new ColorFormatError("Invalid value for green");
        if (blue < 0 || blue > 255) throw new ColorFormatError("Invalid value for blue");
        this.red = red, this.green=green, this.blue = blue;
    }
}

export class HSL {
    hue: number;
    saturation: number;
    lightness: number;

    constructor(hue:number, sat:number, lig:number) {
        if (hue < 0 || hue > 360) throw new ColorFormatError("Invalid value for hue");
        if (sat < 0 || sat > 1) throw new ColorFormatError("Invalid value for saturation");
        if (lig < 0 || lig > 1) throw new ColorFormatError("Invalid value for lightness");
        this.hue = hue, this.saturation=sat, this.lightness = lig;
    }
}

export class HSV {
    hue: number;
    saturation: number;
    value: number;

    constructor(hue:number, sat:number, val:number) {
        if (hue < 0 || hue > 360) throw new ColorFormatError("Invalid value for hue");
        if (sat < 0 || sat > 1) throw new ColorFormatError("Invalid value for saturation");
        if (val < 0 || val > 1) throw new ColorFormatError("Invalid value for value");
        this.hue = hue, this.saturation=sat, this.value = val;
    }
}

export class Color {
    rgb: [number, number, number];

    constructor() {
        this.rgb = [255,255,255]
    }
}