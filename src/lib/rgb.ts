export class WebHelper 
{
    //http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    componentToHex(c: any) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    rgb(r: number, g: number, b: number) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }
}
