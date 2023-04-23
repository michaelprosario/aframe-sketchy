import { DrawElement } from "./draw-element";
import { DrawLocation } from "./draw-location";

export class DrawQueue {
    items: Array<DrawElement>;
    constructor() {
        this.items = [];
    }

    addItem(item: DrawElement) {
        this.items.push(item);
    }

}

export class Bot {

    constructor(private drawQueue: DrawQueue) {

    }

    angle: number = 0;
    positionX: number = 0;
    positionY: number = 0;
    positionZ: number = 0;
    drawColor: string = "red";

    drawBoxAt(width: number, height: number, depth: number, x: number, y: number, z: number) {
        let el = new DrawElement();
        el.geometry = {
            primitive: 'box',
            height: height,
            width: width,
            depth: depth
        }

        el.position = { x: x, y: y, z: z };
        el.color = this.drawColor;
        this.drawQueue.addItem(el);
    }

    drawBox(width: number, height: number, depth: number) {
        if (!height)
            height = width;

        if (!depth)
            depth = width;


        let el = new DrawElement();
        el.geometry = {
            primitive: 'box',
            height: height,
            width: width,
            depth: depth
        }

        var cubeX = this.positionX + width / 2;
        var cubeY = this.positionY + height / 2;
        var cubeZ = this.positionZ + depth / 2;
        var cubeRotationY = this.angle;

        el.position = { x: cubeX, y: cubeY, z: cubeZ };
        el.rotation = { x: 0, y: cubeRotationY, z: 0 };
        el.color = this.drawColor;
        this.drawQueue.addItem(el);
    }

    drawSphere(radius: number) {
        let el = new DrawElement();

        el.geometry =
        {
            primitive: 'sphere',
            radius: radius
        };

        var sX = this.positionX + radius / 2;
        var sY = this.positionY + radius / 2;
        var sZ = this.positionZ + radius / 2;

        el.position = { x: sX, y: sY, z: sZ };
        el.color = this.drawColor;
        this.drawQueue.addItem(el);
    }

    drawSphereAt(radius: number, x: number, y: number, z: number) {
        let el = new DrawElement();
        el.geometry = {
            primitive: 'sphere',
            radius: radius
        }

        el.position = { x: x, y: y, z: z };
        el.color = this.drawColor;
        this.drawQueue.addItem(el);
    }

    drawCone(radius: number, height: number) {
        let el = new DrawElement();
        el.geometry = {
            primitive: 'cone',
            radius: radius,
            height: height

        }

        var sX = this.positionX + radius / 2;
        var sY = this.positionY + radius / 2;
        var sZ = this.positionZ + radius / 2;

        el.position = { x: sX, y: sY, z: sZ };
        el.color = this.drawColor;

        this.drawQueue.addItem(el);
    }

    drawCylinder(radius: number, height: number) {
        let el = new DrawElement();
        el.geometry = {
            primitive: 'cylinder',
            radius: radius,
            height: height

        }

        var sX = this.positionX + radius / 2;
        var sY = this.positionY + radius / 2;
        var sZ = this.positionZ + radius / 2;

        el.position = { x: sX, y: sY, z: sZ }
        el.color = this.drawColor;

        this.drawQueue.addItem(el);
    }

    /*
    drawImageAt = function (strPath, width, height, x, y, z) {
        var entityEl = document.createElement('a-image');
        entityEl.setAttribute('geometry', {
            height: height,
            width: width

        });

        entityEl.setAttribute('position', { x: x, y: y, z: z });
        entityEl.setAttribute('src', strPath);
        entityEl.setAttribute('bot_element', true);

        sceneEl.appendChild(entityEl);
    }
    */

    moveUp(steps: number) {
        this.positionY += steps;
    }

    forward(steps: number) {
        var deltaX = steps * Math.cos(this.getAngleInRadians());
        var deltaZ = steps * Math.sin(this.getAngleInRadians());

        this.positionX += deltaX;
        this.positionZ += deltaZ;
    }

    moveForward(steps: number) {
        this.forward(steps);
    }

    moveLeft(steps: number) {
        var deltaX = steps * Math.cos(this.getAngleInRadians() - (Math.PI / 2));
        var deltaZ = steps * Math.sin(this.getAngleInRadians() - (Math.PI / 2));

        this.positionX += deltaX;
        this.positionZ += deltaZ;
    }

    moveRight(steps: number) {
        this.moveLeft(steps * -1);
    }

    setAngle(degrees: number) {
        this.angle = degrees;
    }

    getAngle() {
        return this.angle;
    }

    getAngleInRadians() {
        return (this.angle * Math.PI) / 180;
    }

    turn(angle: number) {
        var currentAngle = this.getAngle();
        this.setAngle(currentAngle + angle);
    }

    locations = new Array();
    saveLocation(locationName: string) {
        var aPoint = new DrawLocation();
        aPoint.x = this.positionX;
        aPoint.y = this.positionY;
        aPoint.z = this.positionZ;
        aPoint.angle = this.getAngle();
        // @ts-ignore
        this.locations[locationName] = aPoint;
    }

    moveToLocation(locationName: string) {
        // @ts-ignore
        var aPoint = this.locations[locationName];
        this.positionX = aPoint.x;
        this.positionY = aPoint.y;
        this.positionZ = aPoint.z;
        this.setAngle(aPoint.angle);
    }

    /*
    //todo ... need to figure this out!
    createText = function (myText) {
        var entityEl = document.createElement('a-entity');


        entityEl.setAttribute('position', { x: this.positionX, y: this.positionY, z: this.positionZ });
        entityEl.setAttribute('text', myText);

        sceneEl.appendChild(entityEl);
    }
    */

    /*
    drawModel = function (strModelName, strScaleParams, strRotationParams) {
        var entityEl = document.createElement('a-entity');

        var strObjModel = "obj: url(/models/" + strModelName + ".obj); ";
        strObjModel += "mtl: url(/models/" + strModelName + ".mtl); ";
        //console.log(strObjModel);

        entityEl.setAttribute('obj-model', strObjModel);
        entityEl.setAttribute('bot_element', true);

        var cubeX = this.positionX;
        var cubeY = this.positionY;
        var cubeZ = this.positionZ;
        var cubeRotationY = this.angle;

        entityEl.setAttribute('position', { x: cubeX, y: cubeY, z: cubeZ });
        entityEl.setAttribute('rotation', strRotationParams);
        entityEl.setAttribute('scale', strScaleParams);

        sceneEl.appendChild(entityEl);
    }
    */

    /*
    drawImage = function (strPath, strScaleParams, strRotationParams) {
        var entityEl = document.createElement('a-image');

        entityEl.setAttribute('src', strPath);
        entityEl.setAttribute('bot_element', true);

        var cubeX = this.positionX;
        var cubeY = this.positionY;
        var cubeZ = this.positionZ;
        var cubeRotationY = this.angle;

        entityEl.setAttribute('position', { x: cubeX, y: cubeY, z: cubeZ });
        entityEl.setAttribute('rotation', strRotationParams);
        entityEl.setAttribute('scale', strScaleParams);

        sceneEl.appendChild(entityEl);
    }
    */
}
