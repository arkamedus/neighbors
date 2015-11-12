/** @license
 * 
 * OA Integrated Engine (Client.js) — Javascript and HTML Interactive DOM & Canvas Framework
 * 
 * Author          :   Gordon Goodrum
 * License         :   Open Source with author attribution for non-commercial, open source projects only.
 * Contact         :   stopgordy@gmail.com
 * 
 * Copyright 2015 — Gordon Goodrum. All rights reserved.
 */


var kernel = new Kernel({
    fps: 60,
    debug: true
});
var mouse = new Mouse();
var keyboard = new Keyboard();
var db = new DB();

var neighbors = new Module();
var surface = (new SurfaceGL()).resize(window.innerWidth, window.innerHeight);
var overlay = (new Surface()).resize(window.innerWidth, window.innerHeight);

var sc_current = (new Scene({
    background_color: '#2e4765'
}));
sc_current.camera.from.set(0, 20, 10);
sc_current.camera.to.set(0, 0, 4);
sc_current.camera.aspect = (window.innerWidth / window.innerHeight);
var e, i;
for (i = 0; i < 4; i++) {
    e = new Actor();
    e.position.set(Math.random() * 1920, Math.random() * 1080, 0);
    e.sprite = sp_floor_grass;
    e.dynamic = false;
   // sc_current.nodes.push(e);
}

for (i = 0; i < 3; i++) {
    e = new Actor();
    e.position.set((Math.random() * 10)-5, (Math.random() * 10)-5, 0);
    e.sprite = sp_wolf;
   // sc_current.nodes.push(e);
}

var li = new Light();
li.position.set(3.5, 2, 5);
sc_current.lights.push(li);

var ac_default = new Actor();


neighbors.init = function () {


    // (function(){ // anonymous function
    surface.attach(0, 0) //._init();//.fill("#eee");
    webGLStart(surface);
    overlay.attach(0, 0);
    // surface._load_texture('../common/texture/huge.png');


    //verlay.attach(0,0);

    /*
    var img = new Image();
    img.src = '../common/sprite/sp_npc_wolf.png';
    img.onload = function () {
            for (var i = 0; i < 12; i++) {
                overlay.context.drawImage(this, Math.random() * overlay._width, Math.random() * overlay._height);
            }
        }
        //document.body.innerHTML = Localization.intro.oa;
*/
    var bo = document.createElement('div');
    bo.innerHTML = Localization.intro.oa;
    document.body.appendChild(bo);
    // DIVS AND OTHER HTML/CSS REFERENCES
    var intro = document.getElementById('intro');
    var page = document.createElement('div'),
        page_inner, navigation;


    var textures = ['../common/texture/red01.png', '../common/texture/red02.png', '../common/texture/blue01.png', '../common/texture/green01.png', '../common/texture/green02.png', '../common/texture/yellow01.png', '../common/texture/purple01.png', '../common/texture/purple02.png'];
    //document.body.style.background="url("+textures.random()+")";
    document.body.style.color = "#fff";

    var gui_scale = 32;



    window.setTimeout(function () {
        intro.className = "intro_subtext animated bounceOutUp";
        console.log("bounce?");
    }, 2250);

    window.setTimeout(function () {
        document.body.removeChild(bo);
        document.body.appendChild(page);
        page.innerHTML = "<div class='animated bounceInDown' style='height:128px;line-height:128px;vertical-align:center;'><span style='padding-left:64px;text-align:left;font-size:3.2vw;'><a href='#'><img src='../common/icon/library_w.png' height='" + gui_scale + "px' style='margin-left:64px;float:left;margin-top:32px;padding:8px;'/></a><a href='#'><img src='../common/icon/key_w.png' height='" + gui_scale + "px' style='margin-left:32px;float:left;margin-top:32px;padding:8px;'/></a><a href='#'><img src='../common/icon/world_w.png' height='" + gui_scale + "px' style='margin-left:32px;float:left;margin-top:32px;padding:8px;'/></a><a href='#'><img src='../common/icon/catalogue_w.png' height='" + gui_scale + "px' style='margin-left:32px;float:left;margin-top:32px;padding:8px;'/></a><a href='#'><img src='../common/icon/store_w.png' height='" + gui_scale + "px' style='margin-left:32px;float:left;margin-top:32px;padding:8px;'/></a>                  <span style='padding-right:64px;text-align:left;float:right;font-size:1.4vw;'><a href='#'><img src='../common/icon/cog_w.png' height='" + gui_scale + "px' style='display:inline-block;margin-top:32px;padding:8px;'/></a></span></span></div><div id='page_inner' style='font-size:32pt;font-weight:bold;'><div style='position:absolute;bottom:0;padding:0px;'><a href='#' id='intro_item_0' style='visibility:hidden;padding:8px;margin:8px;'>Sign Up</a><br><a href='#' id='intro_item_1' style='visibility:hidden;padding:8px;margin:8px;'>Log In</a><br><a href='#' id='intro_item_2' style='visibility:hidden;padding:8px;margin:8px;'>Sandbox</a><br><a href='#' id='intro_item_3' style='visibility:hidden;padding:8px;margin:8px;'>Settings</a></div></div>";
        //        page.className = "page animated bounceInDown";

        page_inner = document.getElementById('page_inner');
        page_inner.style.width = window.innerWidth - 64;
        page_inner.style.height = window.innerHeight - (64 + 64);

        page_inner.style.left = "64px";
        //page_inner.style.top="256px";
    }, 2250 + 620);
/*
    window.setTimeout(function () {
        document.getElementById('intro_item_0').className = "animated bounceInLeft";
        document.getElementById('intro_item_0').style.visibility = "visible";
    }, 2250 + 620 + (120 * 1));
    window.setTimeout(function () {
        document.getElementById('intro_item_1').className = "animated bounceInLeft";
        document.getElementById('intro_item_1').style.visibility = "visible";
    }, 2250 + 620 + (120 * 2));
    window.setTimeout(function () {
        document.getElementById('intro_item_2').className = "animated bounceInLeft";
        document.getElementById('intro_item_2').style.visibility = "visible";
    }, 2250 + 620 + (120 * 3));
    window.setTimeout(function () {
        document.getElementById('intro_item_3').className = "animated bounceInLeft";
        document.getElementById('intro_item_3').style.visibility = "visible";
    }, 2250 + 620 + (120 * 4));


    // class='animated bounceInLeft'

    window.setTimeout(function () {
        navigation = document.createElement('div');
        navigation.style.position = "fixed";
        navigation.style.bottom = "8px";
        navigation.innerHTML = "<div style='width:100%;font-size:2vw;font-weight:bolder;text-align:center;'><a href='#'>world</a> — <a href='#'>library</a> — <a href='#'>shelf</a> — <a href='#'>sandbox</a> — <a href='#'>catalogue</a></div>";
        navigation.className = "animated bounceInUp";
        //document.body.appendChild(navigation);
    }, 2250 + 620 + 620);


*/

    // })();


    //var su_background = (new Surface()).resize(window.innerWidth,window.innerHeight).attach(0,0).fill("#ff0");
    //var su_foreground = (new Surface()).resize(window.innerWidth,window.innerHeight).attach(0,0).fill('#0ff');

};
var fa = [],
    fc = [];
var s = 5;

for (var ix = -s; ix <= s; ix++) {
    fa[ix + s] = [];
    fc[ix + s] = [];
    for (var iy = -s; iy <= s; iy++) {
        fa[ix + s][iy + s] = Math.random() * 2;
        fc[ix + s][iy + s] = "#01" + (5 + Math.floor(Math.random() * 4)) + "a" + (5 + Math.floor(Math.random() * 2)) + "1";
    }
}
neighbors.update = function () {
    //drawScene();




    if (sc_current !== null) {

        
        ac_default.position.set(0,0,0);
        ac_default.rotation.set(0,0,0);
        ac_default.scale.set(1,1,1);

        //drawScene();
        //surface._buffer_clear();
        //surface._buffer_mesh(me_tree01);
        //surface._render(sc_current.camera);
        
        
        
        sc_current.camera.projection.set(sc_current.camera);
        overlay.fill(sc_current.background_color);

         //sc_current.camera.from.rotZ(0.01);


        /*
        var s = 4;
        for (var iy = -s; iy <= s-1; iy++) {
            for (var ix = -s; ix <= s-1; ix++) {
                sc_current.camera.drawFace3(overlay, (new Vec3()).set(ix, iy, fa[ix+s][iy+s]), (new Vec3()).set(ix+1, iy, fa[ix+s+1][iy+s]), (new Vec3()).set(ix+1, iy+1, fa[ix+s+1][iy+s+1]), fc[ix+s][iy+s]);
                sc_current.camera.drawFace3(overlay, (new Vec3()).set(ix, iy +1, fa[ix+s][iy +1+s]), (new Vec3()).set(ix, iy, fa[ix+s][iy+s]), (new Vec3()).set(ix+1, iy+1, fa[ix+s+1][iy+s+1]), fc[ix+s][iy+s]);
//surface._context.stroke();
            }
            }*/



       // me_tree01.sortQ(sc_current.camera.from).draw(overlay, sc_current.camera, 0);
        me_tree01.sortQ(sc_current.camera.from,ac_default).draw(overlay, sc_current.camera, ac_default, sp_lightmap_sewersdoor);
        
        ac_default.rotation.y=-2.12;
        
        me_chest01.sortQ(sc_current.camera.from,ac_default).draw(overlay, sc_current.camera, ac_default, sp_huge);


        // DRAW DEBUG LIGHTS
        var lp = new Vec2();


        overlay.context.strokeStyle = "#fff";
        for (ix = 0; ix < sc_current.lights.length; ix++) {
            sc_current.camera.projection.toScreen(overlay, sc_current.lights[ix].position, sc_current.camera.from, lp);
            overlay.context.beginPath();
            overlay.context.arc(lp.x, lp.y, 32, 0, 2 * Math.PI);
            overlay.context.stroke();
        };
        
        
        /*
        // NOT QUITE REAL TIME BLURRING....!
        var radius = 2,amt = 3;
        
        overlay.context.globalAlpha= 1/(radius*2);
        
        for ( iy = -radius; iy <= radius; iy++) {
            for ( ix = -radius; ix <= radius; ix++) {
                overlay.context.drawImage(overlay.element,ix*amt,iy*amt)
            }
        }
        
        overlay.context.globalAlpha = 1;
        
        */


//lighten(overlay)



        

        for (var i = 0; i < sc_current.nodes.length; i++) {

            sc_current.nodes[i].update();
            
            if (sc_current.nodes[i].sprite !== null) {
                if (sc_current.nodes[i].sprite.ready){
                    sc_current.camera.drawActor(overlay,sc_current.nodes[i]);
                }
                    /*if (sp_shadow.ready){
                           overlay.context.drawImage(sp_shadow, sc_current.nodes[i].position.x-(sp_shadow.origin.x), sc_current.nodes[i].position.y-(sp_shadow.origin.y));
                    }
                overlay.context.drawImage(sc_current.nodes[i].sprite, sc_current.nodes[i].position.x-(sc_current.nodes[i].sprite.origin.x), sc_current.nodes[i].position.y-(sc_current.nodes[i].sprite.origin.y));
                }*/
            }
        }

    }
    //overlay.fill('#eee');

};

neighbors.end = function () {

};









kernel.registerModule(neighbors);
kernel.init();
