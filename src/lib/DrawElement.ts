import { Point3 } from "./Point3";


export class DrawElement {
    geometry: any;
    position: Point3;
    color: string;
    rotation: Point3;

    constructor() {
        this.color = 'red';
        this.rotation = new Point3();
        this.position = new Point3();
    }
}
