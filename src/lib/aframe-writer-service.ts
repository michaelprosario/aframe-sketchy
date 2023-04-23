import { JSDOM } from 'jsdom'
import { DrawElement } from './DrawElement';
import { Point3 } from './Point3.js';

export class AframeWriterService {
    makeHtmlFromItems(items: Array<DrawElement>): string {
        const dom = new JSDOM(`<!DOCTYPE html> <html><head><script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script></head><body></body></html>`);
        const document = dom.window.document;
        const scene = document.createElement("a-scene");
        document.body.appendChild(scene);


        for (let item of items) {
            if (item.geometry.primitive === "box") {
                let el = document.createElement("a-box");
                el.setAttribute("width", item.geometry.width);
                el.setAttribute("height", item.geometry.height);
                el.setAttribute("depth", item.geometry.depth);

                el.setAttribute("position", this.getAframePoint(item.position));
                el.setAttribute("rotation", this.getAframePoint(item.rotation));
                el.setAttribute("color", item.color);
                scene.appendChild(el);
            }
        }

        return scene.outerHTML;
    }

    private getAframePoint(point: Point3): string {
        return point.x + " " + point.y + " " + point.z;
    }
}