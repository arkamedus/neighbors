/** @license
 * 
 * OA Integrated Engine (Utils.js) — Javascript and HTML Interactive DOM & Canvas Framework
 * 
 * Author          :   Gordon Goodrum
 * License         :   Open Source with author attribution for non-commercial, open source projects only.
 * Contact         :   stopgordy@gmail.com
 * 
 * Copyright 2015 — Gordon Goodrum. All rights reserved.
 */



/**
 * @constructor
 */
function Keyboard() {
    
}
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

/** @type {Array<boolean>} */
var Key = [];
/** @type {Array<boolean>} */
var KeyReleased = [];
/** @type {Array<boolean>} */
var KeyPressed = [];

for (var u = 0; u < 255; u += 1) {
    Key[u] = false;
    KeyPressed[u] = false;
    KeyReleased[u] = false;
}

function onKeyDown(event) {
    if (Key[event.keyCode] == false) {
        KeyPressed[event.keyCode] = true;
    }
    Key[event.keyCode] = true;
    console.log("keyboard: " + event.keyCode + "pressed");
}

function onKeyUp(event) {
    Key[event.keyCode] = false;
    KeyReleased[event.keyCode] = true;
}



var Mouse = {
    pos: new Vec2(),
    wheel: 0,
    pos_last: new Vec2(),
    button: [false, false, false, false, false, false],
    buttonPressed: [false, false, false, false, false, false],
    buttonReleased: [false, false, false, false, false, false]
};

window.addEventListener("mousedown", handleMouseEvent);
window.addEventListener("mouseup", handleMouseEventUp);

window.addEventListener("contextmenu", stopEvent);

function stopEvent(event) {
    if (event.preventDefault != undefined)
        event.preventDefault();
    if (event.stopPropagation != undefined)
        event.stopPropagation();

    return false;
}

function onTouchDown(event) {
    Mouse.button[5] = true;
    Mouse.pos.x = event.changedTouches[0].pageX;
    Mouse.pos.y = event.changedTouches[0].pageY;
    //GUIManager.createSimpleNotification("press!"+Mouse.pos.x);
    // console.log("touch event: "+event.keyCode+"pressed");
}

function onTouchUp(event) {
    Mouse.button[5] = false;
}

window.addEventListener("touchstart", onTouchDown, false);
window.addEventListener("touchend", onTouchUp, false);

function handleMouseEvent(e) {
    //console.log("spoqn");
    // if (KERNAL.MOUSE_X > 0 && KERNAL.MOUSE_X)
    var evt = window.event || e;
    var mb = 1;
    if (evt.which) {
        if (evt.which == 3) mb = 2;
        if (evt.which == 2) mb = 4;
    } else if (evt.button) {
        if (evt.button == 2) mb = 2;
        if (evt.button == 4) mb = 4;
    }
    //       if (mb==0){
    //           mb=1;
    //  GUIManager.createSimpleNotification("assume left button "+mb);}
    Mouse.buttonPressed[mb] = true;
    Mouse.button[mb] = true;
    console.log(mb);
    return true;
}

function handleMouseEventUp(e) {
    var evt = window.event || e;
    var mb = 1;
    if (evt.which) {
        if (evt.which == 3) mb = 2;
        if (evt.which == 2) mb = 4;
    } else if (evt.button) {
        if (evt.button == 2) mb = 2;
        if (evt.button == 4) mb = 4;
    }
    Mouse.buttonReleased[mb] = true;
    Mouse.button[mb] = false;
    return true;
}

var Util = {
    meta: {
        mousePos: {
            x: 0,
            y: 0,
            lastx: 0,
            lasty: 0
        },
        getMousePosRect: {
            left: 0,
            top: 0
        }
    }
};

window.addEventListener('mousemove', function (evt) {
    Util.meta.mousePos = getMousePos(document.body, evt);
    Mouse.pos.x = Util.meta.mousePos.x;
    Mouse.pos.y = Util.meta.mousePos.y;
    // console.log(2);
}, false);

function getMousePos(elem, evt) {
    Util.meta.getMousePosRect = elem.getBoundingClientRect();
    return {
        x: evt.clientX - Util.meta.getMousePosRect.left,
        y: evt.clientY - Util.meta.getMousePosRect.top
    };
}



var bias = function (v, b) {
    return v / ((1 / b - 2) * (1 - v) + 1);
}