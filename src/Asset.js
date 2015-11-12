/** @license
 * 
 * OA Integrated Engine (Asset.js) — Javascript and HTML Interactive DOM & Canvas Framework
 * 
 * Author          :   Gordon Goodrum
 * License         :   Open Source with author attribution for non-commercial, open source projects only.
 * Contact         :   stopgordy@gmail.com
 * 
 * Copyright 2015 — Gordon Goodrum. All rights reserved.
 */

function loadSprite(src){
    var i;
    i = new Image();
    i.ready = false;
    i.src=src;
    i.origin = (new Vec2())
    
    i.onload=function(){
     i.ready = true;   
    }
    
    return i;
}

function loadFile(src, func) {
        //AssetManager.total_items++;

        var xmlhttp = new XMLHttpRequest();
        xmlhttp._loaded = false;
        xmlhttp.onreadystatechange = function () {
            //console.log(xmlhttp);
            if (!xmlhttp._loaded && xmlhttp.readyState === 4 && (xmlhttp.status === 200 || xmlhttp.responseText)) {
                func(xmlhttp.responseText);
                //AssetManager.loaded_items++;
                //console.log('loaded!');
                xmlhttp._loaded = true;
            }
        };
        xmlhttp.open("GET", src, true);
        xmlhttp.send();
    }

var sp_shadow = loadSprite('../common/sprite/sp_shadow.png');sp_shadow.origin.set(32,32);

var sp_wolf = loadSprite('../common/sprite/sp_npc_wolf.png');sp_wolf.origin.set(64,128);


var sp_floor_grass = loadSprite('../common/sprite/sp_floor01.png');sp_floor_grass.origin.set(512,512);

var sp_huge= loadSprite('../common/texture/huge.png');//sp_shadow.origin.set(32,32);

var sp_lightmap_sewersdoor = loadSprite('../common/texture/lightmap_sewersdoor.png');//sp_floor_grass.origin.set(512,512);


















var me_tree01 = (new Mesh()).parsePLY('../common/mesh/sewer01_sd.ply');


var me_chest01 = (new Mesh()).parsePLY('../common/mesh/chest01_sd.ply');