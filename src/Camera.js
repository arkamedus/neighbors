/** @license
 * 
 * OA Integrated Engine (Camera.js) — Javascript and HTML Interactive DOM & Canvas Framework
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
function Camera() {
    this.from = new Vec3().set(0, 100, 30);
    this.to = new Vec3();
    this.up = new Vec3().set(0, 0, 1);
    this.tmpv = new Vec3();
    this.fov = 45;
    this.aspect = 1;
    this.projection = new Projection();
    this.animation = {
        active: false,
        startfrom: new Vec3(),
        startto: new Vec3(),
        pos: 0,
        gain: 0.5,
        speed: 1,
        finishfrom: new Vec3(),
        finishto: new Vec3()
    };
    this._tmp = {
        v1: new Vec3(),
        v2: new Vec3(),
        v3: new Vec3(),
        p1: new Vec2(),
        p2: new Vec2(),
        p3: new Vec2(),
        drawntris: 0,
        culltris: 0,
        _t: [],
        sx: 0,
        sy: 0,
        sr: 0,
        sh: 0,
        sc: 0,
        vx: 0,
        vy: 0,
        lightingvec: 0
    };
    //this.viewFloorFrustumT1 = new Tri2();
   // this.viewFloorFrustumT2 = new Tri2();
};
Camera.prototype.animate = function(startfrom, finishfrom, startto, finishto, speed, gain){
    this.animation.active = true;
    this.animation.startfrom.copy(startfrom);
    this.animation.finishfrom.copy(finishfrom);
    this.animation.startto.copy(startto);
    this.animation.finishto.copy(finishto);
    this.animation.gain = gain;
    this.animation.pos = 0;
    this.animation.speed = speed;
};
Camera.prototype.update = function(){
    if (this.animation.active){
        this.from.x = lerp(this.animation.startfrom.x,this.animation.finishfrom.x,gain(this.animation.pos,this.animation.gain));
        this.from.y = lerp(this.animation.startfrom.y,this.animation.finishfrom.y,gain(this.animation.pos,this.animation.gain)); 
        this.from.z = lerp(this.animation.startfrom.z,this.animation.finishfrom.z,gain(this.animation.pos,this.animation.gain)); 
        
        this.to.x = lerp(this.animation.startto.x,this.animation.finishto.x,gain(this.animation.pos,this.animation.gain));
        this.to.y = lerp(this.animation.startto.y,this.animation.finishto.y,gain(this.animation.pos,this.animation.gain)); 
        this.to.z = lerp(this.animation.startto.z,this.animation.finishto.z,gain(this.animation.pos,this.animation.gain)); 
        
        this.animation.pos+=this.animation.speed;
        if (this.animation.pos>=1){
         this.animation.active= false;   
        }
    }
};
Camera.prototype.drawActor = function (canvas,actor) {

    this.projection.toScreen(canvas, actor.position, this.from, this._tmp.p1);
    this._tmp.v2.copy(this.from).z = 0;
    this._tmp.v1.copy(actor.position).pointTo(this._tmp.v2);
    // console.log('before' ,this._tmp.v1);
    //var dv = c.normal();
    // dv[2] = 0;
    // dv = vecRotZ(vecNorm(dv), 90);
    this._tmp.v1.rotZ(90).add(actor.position);
    //console.log('after' ,this._tmp.v1);
    this.projection.toScreen(canvas, this._tmp.v1, this.from, this._tmp.p2);
    /*
            this._context.beginPath();
            this._context.strokeStyle = "#00f";
            this._context.arc(this._tmp.p2.x + 0.5, this._tmp.p2.y + 0.5, 3, 0, 2 * Math.PI);
            this._context.stroke();
    
     this._context.beginPath();
            this._context.strokeStyle = "#f00";
            this._context.arc(this._tmp.p1.x + 0.5, this._tmp.p1.y + 0.5, 3, 0, 2 * Math.PI);
            this._context.stroke();
            
*/
    // ent.img = ent.img || ent.decal;

    this._tmp.sx = (this._tmp.p2.dist(this._tmp.p1) / 24);
    this._tmp.sy = this._tmp.sx;
    this._tmp.sr = (((Math.sin(((kernel.ticks/6))+actor.rand))*(actor.velocity.mag())*3.5)); //3 * ((Math.sin((Kernel._ticks / 5) + ent.rand) * vecMagnitude([ent.velocity[0], ent.velocity[1], 0]) / 4 * 0.5));
    //var sy = 2;//Math.pow(Math.atan2(camera.from[2],char.position[2]),1.42);

    this._tmp.sh = 0; //60 * (1 + (Math.sin((Kernel._ticks / 2.5) + ent.rand) * 1)) * vecMagnitude([ent.velocity[0], ent.velocity[1], 0]) / 3;

    this._tmp.sc = actor.scale.x || 1;
    this._tmp.vx = this._tmp.p1.x - ((actor.sprite.width / 2) * this._tmp.sx * this._tmp.sc);
    this._tmp.vy = (this._tmp.p1.y - (actor.sprite.height * this._tmp.sy * this._tmp.sc) - this._tmp.sh)-((((1+Math.sin((kernel.ticks/3)))*(actor.velocity.mag())*500.5))*(this._tmp.sx/2));
    //var di = ent.img5
    //context.rect(d[0]-((ent.img.width/2)*sx*sc),d[1],ent.img.width*sx*sc,ent.img.height*sx*sc);
    //context.clip();

    //console.log('drawn');
    if (this._tmp.p1.x - (actor.sprite.width * this._tmp.sx * this._tmp.sc) / 2 > canvas._width || this._tmp.p1.x + (actor.sprite.width * this._tmp.sx * this._tmp.sc) / 2 < 0 || this._tmp.p1.y < 0 || this._tmp.p1.y - (actor.sprite.height * this._tmp.sy * this._tmp.sc) > canvas._height) { // horizontal

        return false;
    }

    //surf._drawnSprite++;

    canvas.context.save();
    //con.rect(d[0] - ((ent.img.width / 2) * sx * sc), d[1], ent.img.width * sx * sc, ent.img.height * sx * sc);
    //con.clip();
    // RENDER.CONTEXT.scale(-1,1);
    canvas.context.translate((0.5 + this._tmp.vx + (actor.sprite.width * this._tmp.sx * this._tmp.sc / 2)), (0.5 + this._tmp.vy + (actor.sprite.height * this._tmp.sy * this._tmp.sc / 2)));
    if (this._tmp.sr != 0) {
        canvas.context.rotate(this._tmp.sr);
    }

    canvas.context.drawImage(actor.sprite, (0.5 - (actor.sprite.width * this._tmp.sc * this._tmp.sx / 2)), -(0.5 + (actor.sprite.height * this._tmp.sc * this._tmp.sy / 2)), actor.sprite.width * this._tmp.sx * this._tmp.sc, actor.sprite.height * this._tmp.sy * this._tmp.sc);


    canvas.context.restore();

}

Camera.prototype.drawFace3 = function(canvas, v1, v2, v3, color) {
            this.projection.toScreen(canvas, v1, this.from, this._tmp.p1);
            this.projection.toScreen(canvas, v2, this.from, this._tmp.p2);
            this.projection.toScreen(canvas, v3, this.from, this._tmp.p3);



    var ax, ay, az, bx, by, bz, rx, ry, rz, m;

    //point0 -> point1
    ax = v2.x - v1.x;
    ay = v2.y - v1.y;
    az = v2.z - v1.z;

    //point0 -> point2
    bx = v3.x - v1.x;
    by = v3.y - v1.y;
    bz = v3.z - v1.z;

    //cross product
    rx = ay * bz - by * az;
    ry = az * bx - bz * ax,
        rz = ax * by - bx * ay;

    //magnitude
    m = Math.sqrt(rx * rx + ry * ry + rz * rz);

    //normalize
   // this.normal.set(rx / m, ry / m, rz / m);

//function triangleCenter(data) {
  //  return [(data[0] + data[3] + data[6]) / 3, (data[1] + data[4] + data[7]) / 3, (data[2] + data[5] + data[8]) / 3];
//}
            
            
            
    //  this.center.set((v1.x + v2.x + v3.x) / 3, (v1.y + v2.y + v3.y) / 3, (v1.z + v2.z + v3.z) / 3);
            
            
        
            
            
         //   if (this._draw_lighting) {
/*
            this._tmp.lighting_vec = this._tmp.v1.copy(this._tmp.v2.copy(this.normal)).dot(this._tmp.v2.copy(this.center).pointTo(this.lightpos));

            if (this._tmp.lighting_vec < 0) {
                this._tmp.lighting_vec = bias(Math.abs(this._tmp.lighting_vec / 2), 0.85);
                this._tmp.lighting_vec *= bias(((128 - (Math.min(128, this._tmp.v1.copy(this.center).dist(this.lightpos)))) / 128), 0.35);

            } else {
                this._tmp.lighting_vec = 0;
            }*/
       // }

        //if (this._draw_stroke) {
           // canvas._context.lineWidth = '0.89';

       // }

        //if (this._draw_lighting) {

            // triangleGrow(this._tmp.p1,this._tmp.p2,this._tmp.p3,2);

        

       // }
            
            
            triangleGrow(this._tmp.p1,this._tmp.p2,this._tmp.p3,2);
            canvas.context.fillStyle = color || "#000";
            canvas.context.beginPath();
            canvas.context.moveTo(this._tmp.p1.x, this._tmp.p1.y);
            canvas.context.lineTo(this._tmp.p2.x, this._tmp.p2.y);
            canvas.context.lineTo(this._tmp.p3.x, this._tmp.p3.y);
            canvas.context.fill();
            
               // canvas.context.globalCompositeOperation = 'multiply';
           // canvas.context.fillStyle = "rgba(" + Math.min((100 + ((205 * this._tmp.lighting_vec) | 0)), 255) + "," + Math.min((100 + ((205 * this._tmp.lighting_vec) | 0)), 255) + "," + Math.min((100 + ((205 * this._tmp.lighting_vec) | 0)), 255) + ",1)";
         //    canvas.context.strokeStyle = canvas.context.fillStyle;
         // canvas.context.fill();
    canvas.context.strokeStyle = color || '#f00';
             canvas.context.stroke();
           // canvas.context.globalCompositeOperation = 'source-over';
        }



/**
 * @constructor
 */
function Projection() {
    this.d = new Vec3();
    this.u = new Vec3();
    this.v = new Vec3();

    this.mm = 0;

    this.p = new Vec3();
    this.s = new Vec2();

    this.tfov = 1;
    this.tfovpower = 1;
    this.tfovpoweraspect = 1;
    return this;
}
/** @type {function(Camera):Projection} */
Projection.prototype.set = function (camera) {
    this.d.copy(camera.to).sub(camera.from);
    //console.log(this.d);
    this.mm = Math.sqrt(this.d.x * this.d.x + this.d.y * this.d.y + this.d.z * this.d.z);

    this.d.divI(this.mm);
    this.u.copy(camera.up);
    this.mm = this.u.dot(this.d);

    this.u.x -= (this.mm * this.d.x);
    this.u.y -= (this.mm * this.d.y);
    this.u.z -= (this.mm * this.d.z);
    this.mm = Math.sqrt(this.u.x * this.u.x + this.u.y * this.u.y + this.u.z * this.u.z);

    this.u.divI(this.mm);

    this.tfov = Math.tan(camera.fov * Math.PI / 360);
    this.tfovpower = this.tfov * this.tfov;
    this.tfovpoweraspect = (camera.aspect * this.tfov) * (camera.aspect * this.tfov);

    this.u.mulI(this.tfov);

    this.v.set(this.u.y * this.d.z - this.d.y * this.u.z, this.u.z * this.d.x - this.d.z * this.u.x, this.u.x * this.d.y - this.d.x * this.u.y).mulI(camera.aspect);

    return this;
};

/** @type {function(Surface,Vec2,Vec3,Vec3)} */
Projection.prototype.toWorld = function (canvas, m, from, target) {
    // if (this.isOrtho) {
    //     return [m[0] + (from[0]) + (0) - (canvas._width / 2), m[1] - (from[1]) + (0) - (canvas._height / 2), 0];
    // } else {
    //, mX, mY, mZ;
    this.s.x = 2 * m.x / canvas._width - 1;
    this.s.y = 1 - 2 * m.y / canvas._height;
    this.p.x = this.d.x + this.u.x * this.s.y + this.v.x * this.s.x;
    this.p.y = this.d.y + this.u.y * this.s.y + this.v.y * this.s.x;
    this.p.z = this.d.z + this.u.z * this.s.y + this.v.z * this.s.x;
    if (this.p.z != 0) {
        target.set(from.x - from.z * this.p.x / this.p.z, from.y - from.z * this.p.y / this.p.z, 0);
    } else {
        target.set(from.x - from.z * this.p.x, from.y - from.z * this.p.y, 0);
    }
    // }
};

/** @type {function(Surface,Vec3,Vec3,Vec2)} */
Projection.prototype.toScreen = function (canvas, position, from, target) {
    this.p.set(position.x - from.x, position.y - from.y, position.z - from.z);
    this.mm = this.p.dot(this.d); //this.p.x * this.d.x + this.p.y * this.d.y + this.p.z * this.d.z;
    if (this.mm > 0) {
        this.p.divI(this.mm);
        this.mm = this.p.dot(this.v) / this.tfovpoweraspect; //(this.p.x * this.v.x + this.p.y * this.v.y + this.p.z * this.v.z) / this.tfovpoweraspect;
        target.x = (this.mm + 1) / 2 * canvas._width;
        this.mm = this.p.dot(this.u) / this.tfovpower; //(this.p.x * this.u.x + this.p.y * this.u.y + this.p.z * this.u.z) / this.tfovpower;
        target.y = (1 - this.mm) / 2 * canvas._height;
    } else {
        target.set(-99, -99);
    }

};

