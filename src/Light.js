/** @license
 * 
 * OA Integrated Engine (Light.js) — Javascript and HTML Interactive DOM & Canvas Framework
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
function Light() {
    this.position=new Vec3();
    this.color = (new RGB()).set(1,1,1);
    this.distance = 10;
}

