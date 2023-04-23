
import { Bot, DrawQueue } from './lib/bot';
import { AframeWriterService } from './lib/aframe-writer-service';
const fs = require('fs');

let drawQueue = new DrawQueue();
let bot = new Bot(drawQueue);


function test1() {
    for (var count2 = 0; count2 < 39; count2++) {
        bot.drawColor = 'purple';
        bot.positionX = (mathRandomInt(1, 100));
        bot.positionY = 0;
        bot.positionZ = (mathRandomInt(1, 100));
        for (var count = 0; count < 30; count++) {
            bot.drawBox(5, 1, 5);
            bot.turn(4);
            bot.moveUp(1);
        }
    }

    var service = new AframeWriterService();
    var html = service.makeHtmlFromItems(drawQueue.items);
    fs.writeFileSync('output.html', html);
}

function mathRandomInt(a: number, b: number) {
    if (a > b) {
        // Swap a and b to ensure a is smaller.
        var c = a;
        a = b;
        b = c;
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
}

function test2() {
    let direction: number = 0;
    for (var count = 0; count < 50; count++) {
        bot.drawBox(0.25, 0.25, 0.25);
        bot.forward(0.25);
        direction = mathRandomInt(1, 3);
        if (direction == 1) {
            bot.moveUp(0.25);
        }
        if (direction == 2) {
            bot.turn(90);
        }
        if (direction == 3) {
            bot.turn(-90);
        }
    }

    var service = new AframeWriterService();
    var html = service.makeHtmlFromItems(drawQueue.items);
    fs.writeFileSync('output.html', html);
}

test1();


