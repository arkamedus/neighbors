/** @license
 * 
 * OA Integrated Engine (Surface.js) — Javascript and HTML Interactive DOM & Canvas Framework
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

function Surface() {
    this.nodes = 0;
    this.element = document.createElement('canvas');
    this.context = this.element.getContext('2d');
    this._width = 500;
    this._height = 500;
    this._draw_textures = false;
    this._draw_stroke = false;
    this._draw_lighting = false;
    this._draw_outline = true;
    this._draw_only_outline = false;
    this.lightpos = new Vec3().set(3, 2, 10);
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
    }
//document.body.appendChild(this.context);
    return this;
}

Surface.prototype.resize = function (width, height) {
    this.element.width= width;this._width=width;
    this.element.height = height;this._height=height;
    return this;
}


Surface.prototype.attach = function (x, y) {
    //console.log(this.element);
    document.body.appendChild(this.element);
    this.element.style.position = "fixed";
    this.element.style.left = x + "px";
    this.element.style.top = y + "px";
    return this;
}

Surface.prototype.fill = function (col) {
    this.context.beginPath();
    this.context.fillStyle = col;
    this.context.rect(0, 0, this._width, this._height);
    this.context.fill();
    return this;
}

function triangleGrow(p1, p2, p3, amt) {
    var center = new Vec2();
    center.x = (p1.x + p2.x + p3.x) / 3;
    center.y = (p1.y + p2.y + p3.y) / 3;

    var nv = new Vec2();

    p1.sub(nv.copy(center).pointTo(p1).mulI(amt));
    p2.sub(nv.copy(center).pointTo(p2).mulI(amt));
    p3.sub(nv.copy(center).pointTo(p3).mulI(amt));
    
   // p1.copy(nv.copy(p1).sub(center).mulI((nv.mag() + amt) / (nv.mag())).add(center));
   // p2.copy(nv.copy(p2).sub(center).mulI((nv.mag() + amt) / (nv.mag())).add(center));
   // p3.copy(nv.copy(p3).sub(center).mulI((nv.mag() + amt) / (nv.mag())).add(center));
}

Surface.prototype.drawFace = function (camera, tri, parent, texture) {
    this._tmp.drawntris++;
    camera.projection.toScreen(this, this._tmp.v1.copy(tri.pos1).mul(parent.scale).flipX().rotZ(-parent.rotation.y).rotX(parent.rotation.x).rotY(parent.rotation.z).add(parent.position), camera.from, this._tmp.p1);
    camera.projection.toScreen(this, this._tmp.v2.copy(tri.pos2).mul(parent.scale).flipX().rotZ(-parent.rotation.y).rotX(parent.rotation.x).rotY(parent.rotation.z).add(parent.position), camera.from, this._tmp.p2);
    camera.projection.toScreen(this, this._tmp.v3.copy(tri.pos3).mul(parent.scale).flipX().rotZ(-parent.rotation.y).rotX(parent.rotation.x).rotY(parent.rotation.z).add(parent.position), camera.from, this._tmp.p3);
    
triangleGrow(this._tmp.p1,this._tmp.p2,this._tmp.p3,2.59);    


    if ((this._tmp.p3.x === -99 && this._tmp.p3.y === -99) || (this._tmp.p2.x === -99 && this._tmp.p2.y === -99) || (this._tmp.p1.x === -99 && this._tmp.p1.y === -99)) {
        return false;
    } else if ((this._tmp.p1.x < 0 && this._tmp.p2.x < 0 && this._tmp.p3.x < 0) || (this._tmp.p1.x > this._width && this._tmp.p2.x > this._width && this._tmp.p3.x > this._width) || (this._tmp.p1.y < 0 && this._tmp.p2.y < 0 && this._tmp.p3.y < 0) || (this._tmp.p1.y > this._height && this._tmp.p2.y > this._height && this._tmp.p3.y > this._height)) {

        return false;
    } else {

        // if (!this._draw_stroke) {
        //triangleGrow(this._tmp.p1,this._tmp.p2,this._tmp.p3,0.79);
        // }
        //console.log(this._tmp);
        this.context.beginPath();
        // this._context.strokeStyle = "#000";
        this.context.moveTo((0.5 + this._tmp.p1.x), (0.5 + this._tmp.p1.y));
        this.context.lineTo((0.5 + this._tmp.p2.x), (0.5 + this._tmp.p2.y));
        this.context.lineTo((0.5 + this._tmp.p3.x), (0.5 + this._tmp.p3.y));
        //this._context.closePath();


        if (this._draw_textures && texture) {


            this._tmp._t[20] = 0;
            this._tmp._t[21] = 0;
            this._tmp._t[22] = texture.width;
            this._tmp._t[23] = texture.height;

            this._tmp._t[8] = this._tmp.p1.x;
            this._tmp._t[9] = this._tmp.p1.y;

            this._tmp._t[10] = this._tmp.p2.x;
            this._tmp._t[11] = this._tmp.p2.y;

            this._tmp._t[12] = this._tmp.p3.x;
            this._tmp._t[13] = this._tmp.p3.y;

            this._tmp._t[14] = (tri.uv1.x + this._tmp._t[20]) * this._tmp._t[22];
            this._tmp._t[15] = (tri.uv1.y + this._tmp._t[21]) * this._tmp._t[23];

            this._tmp._t[16] = (tri.uv2.x + this._tmp._t[20]) * this._tmp._t[22];
            this._tmp._t[17] = (tri.uv2.y + this._tmp._t[21]) * this._tmp._t[23];

            this._tmp._t[18] = (tri.uv3.x + this._tmp._t[20]) * this._tmp._t[22];
            this._tmp._t[19] = (tri.uv3.y + this._tmp._t[21]) * this._tmp._t[23];

            this._tmp._t[10] -= this._tmp._t[8];
            this._tmp._t[11] -= this._tmp._t[9];
            this._tmp._t[12] -= this._tmp._t[8];
            this._tmp._t[13] -= this._tmp._t[9];

            this._tmp._t[16] -= this._tmp._t[14];
            this._tmp._t[17] -= this._tmp._t[15];
            this._tmp._t[18] -= this._tmp._t[14];
            this._tmp._t[19] -= this._tmp._t[15];

            this._tmp._t[6] = this._tmp._t[16] * this._tmp._t[19] - this._tmp._t[18] * this._tmp._t[17];

            if (this._tmp._t[6] === 0) {
                return false;
            }

            this._tmp._t[7] = 1 / this._tmp._t[6];

            this._tmp._t[0] = (this._tmp._t[19] * this._tmp._t[10] - this._tmp._t[17] * this._tmp._t[12]) * this._tmp._t[7];
            this._tmp._t[1] = (this._tmp._t[19] * this._tmp._t[11] - this._tmp._t[17] * this._tmp._t[13]) * this._tmp._t[7];
            this._tmp._t[2] = (this._tmp._t[16] * this._tmp._t[12] - this._tmp._t[18] * this._tmp._t[10]) * this._tmp._t[7];
            this._tmp._t[3] = (this._tmp._t[16] * this._tmp._t[13] - this._tmp._t[18] * this._tmp._t[11]) * this._tmp._t[7];

            this._tmp._t[4] = this._tmp._t[8] - this._tmp._t[0] * this._tmp._t[14] - this._tmp._t[2] * this._tmp._t[15];
            this._tmp._t[5] = this._tmp._t[9] - this._tmp._t[1] * this._tmp._t[14] - this._tmp._t[3] * this._tmp._t[15];

          //  this.context.strokeStyle = "rgba(" + tri.color1.r + "," + tri.color1.g + "," + tri.color1.b + ",1)";
                // }
              //  this.context.stroke();
            
            this.context.save();
            this.context.clip();
            this.context.transform(this._tmp._t[0], this._tmp._t[1], this._tmp._t[2], this._tmp._t[3], this._tmp._t[4], this._tmp._t[5]);
            this.context.drawImage(texture, 0, 0);
            this.context.restore();



        } else {


            // }else{
            //    lighting_vec =0;
            // }

            //console.log(lighting_vec);
            if (this._draw_only_outline) {
                this.context.strokeStyle = "#fff";

                this.context.stroke();
            } else {
                this.context.fillStyle = "rgba(" + tri.color1.r + "," + tri.color1.g + "," + tri.color1.b + ",1)";

                this.context.fill();
            }

        }

        if (this._draw_lighting) {

            this._tmp.lighting_vec = this._tmp.v1.copy(this._tmp.v2.copy(tri.normal).mul(parent.scale).rotY(parent.rotation.y).rotX(parent.rotation.x).rotZ(parent.rotation.z)).dot(this._tmp.v2.copy(tri.center).mul(parent.scale).rotZ(parent.rotation.z).add(parent.position).pointTo(this.lightpos));

            if (this._tmp.lighting_vec < 0) {
                //this._tmp.lighting_vec = bias(Math.abs(this._tmp.lighting_vec / 2), 0.85);
                //this._tmp.lighting_vec *= bias(((128 - (Math.min(128, this._tmp.v1.copy(tri.center).mul(parent.scale).add(parent.position).dist(this.lightpos)))) / 128), 0.35);

            } else {
                this._tmp.lighting_vec = 0;
            }
        }

        if (this._draw_stroke) {
            this.context.lineWidth = '0.89';
            if (this._draw_textures) {
                // this._context.globalCompositeOperation = 'multiply';
                //this._context.strokeStyle = "rgba(" + Math.min((105 + ((205 * lighting_vec) | 0)), 255) + "," + Math.min((105 + ((205 * lighting_vec) | 0)), 255) + "," + Math.min((105 + ((205 * lighting_vec) | 0)), 255) + ",1)";
                // this._context.fill();
                //this._context.globalCompositeOperation = 'source-over';
            } else {
                //  if (this._draw_lighting){
                //  this._context.strokeStyle = "rgba(" + ((tri.color.x*lighting_vec)|0) + "," +((tri.color.y*lighting_vec)|0) + "," + ((tri.color.z*lighting_vec)|0)  +",255)";
                // }else{
                this.context.strokeStyle = "rgba(" + tri.color1.r + "," + tri.color1.g + "," + tri.color1.b + ",1)";
                // }
                this.context.stroke();
                //this._context.strokeStyle = this._context.fillStyle;
            }

        }

        if (this._draw_lighting) {

            // triangleGrow(this._tmp.p1,this._tmp.p2,this._tmp.p3,2);
            //console.log(this._tmp);
            /*  this._context.beginPath();
              // this._context.strokeStyle = "#000";
              this._context.moveTo((0.5 + this._tmp.p1.x), (0.5 + this._tmp.p1.y));
              this._context.lineTo((0.5 + this._tmp.p2.x), (0.5 + this._tmp.p2.y));
              this._context.lineTo((0.5 + this._tmp.p3.x), (0.5 + this._tmp.p3.y));
              this._context.closePath();*/


            //console.log(lighting_vec);
            this.context.globalCompositeOperation = 'multiply';
            this.context.fillStyle = "rgba(" + Math.min((100 + ((205 * this._tmp.lighting_vec) | 0)), 255) + "," + Math.min((100 + ((205 * this._tmp.lighting_vec) | 0)), 255) + "," + Math.min((100 + ((205 * this._tmp.lighting_vec) | 0)), 255) + ",1)";
            // this._context.strokeStyle = this._context.fillStyle;
            this.context.fill();
            // this._context.stroke();
            this.context.globalCompositeOperation = 'source-over';

        }


    }
    // this._context.stroke();
};
