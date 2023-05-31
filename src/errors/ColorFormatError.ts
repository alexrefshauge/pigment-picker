export default class ColorFormatError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "Color format error";
        Object.setPrototypeOf(this, ColorFormatError.prototype);
    }
}