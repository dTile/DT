var dTile=(function(){
var verions = "v0.0.5";
var root = {x:0,y:0,z:0};
/**
* Returns a tile that surrounds [lat,lng] point in a drilldown level.
*
* @param   {number} lat .
* @param   {number} lng .
* @param   {number} drillLevel .
* @returns {tile} .
*
*/
function get(lat,lng,drillLevel,p){
var o = drill(root,lat,lng,drillLevel,p)
return o
}

/**
* Returns the encoded number of a tile.
*
* @param   {tile} .
* @returns {number} .
*
* @example
* var myTile = new LatLon(52.205, 0.119);
*/
var encode=function(x,y,z,p,xClass,yClass,zClass){
var perim = "";
if(p){perim = "."+p}
var st="";
var n=Math.pow(10,z);
var xmod=x % n;
var ymod=y % n;
if(xmod<0){xmod+=n};
var paddedY=String(ymod).padStart(z,'0');
var paddedX=String(xmod).padStart(z,'0');
st=z + paddedX + paddedY + perim;
if(xClass){
st='<b><span class="'+ zClass +'">' +z +'</span><span class="'+ xClass +'">' + paddedX +'</span><span class="'+ yClass +'">'+ paddedY+'</span>'+perim+'</b>';
}
return st;
}

/**
* Returns decoded tile from a number.
* @param   {number}.
* @returns {tile}.
*
*/

function decode(l,precision){
if(!validTN(l)){return}
var st="" + l;
var p=0;
var arr = st.split(".");
if(arr.length>1){
p=parseInt(arr[1])
}
st = arr[0];
st=st.slice(1);
const middleIndex=Math.floor(st.length / 2);
const firstPart=st.substring(0, middleIndex);
var x=parseInt(firstPart);
const secondPart=st.substring(middleIndex);
var y=parseInt(secondPart);
var z=firstPart.length;
return dtXYZ(x,y,z,p,precision);
}

/**
* Returns a tile from a number with its corner coordinates.
*
* @param {number} x - X units distance from [[90,-180],[-90,-180]] (towards east).
* @param {number} y - Y units from [[90,-180],[90,180]] (towards south).
* @param {number} z - Z zoom level.
* @param {number} precision - (optional). sets decimal precisions of coordinates.
*/
function dtXYZ(x,y,z,perimeter,precision){
var v;
if(z){
v={x:x,y:y,z:z,name:x+':'+y+':'+z,number:encode(x,y,z)};
if(perimeter){v.p=perimeter}
var pi=Math.PI,n=Math.pow(10,z);
let lngNW=x / n * 360 - 180;
let latNW=180 * Math.atan(Math.sinh(pi * (1 - 2 * y / n))) / pi;
let lngSW=x / n * 360 - 180;
let latSW=180 * Math.atan(Math.sinh(pi * (1 - 2 * (y+1) / n))) / pi;
let lngNE=(x+1) / n * 360 - 180;
let latNE=180 * Math.atan(Math.sinh(pi * (1 - 2 * (y) / n))) / pi;
let lngSE=(x+1) / n * 360 - 180;
let latSE=180 * Math.atan(Math.sinh(pi * (1 - 2 * (y+1) / n))) / pi;
if(precision){
latSE=latSE.toFixed(precision);
lngSE=lngSE.toFixed(precision);
latSW=latSW.toFixed(precision);
lngSW=lngSW.toFixed(precision);
latNW=latNW.toFixed(precision);
lngNW=lngNW.toFixed(precision);
latNE=latNE.toFixed(precision);
lngNE=lngNE.toFixed(precision);
}
v.ne=[latNE,lngNE];
v.nw=[latNW,lngNW];
v.sw=[latSW,lngSW];
v.se=[latSE,lngSE];
v.coords=[v.sw,v.nw,v.ne,v.se];
}
return v;
}

/**
* Returns a perimeter JSON object that includes the outline, center tile and a grid of surrounding tiles.
*
* @param {number} l - tile number.
* @param {number} perimiter - perimeter distance to each direction.
* @param {number} precision - decimal precision of coordinates.
* @param {number} compress - if true compresses the JSON string.
* @returns {string} JSON object 
*/
function perimJSON(l,perimeter,precision,compress){
return getJSON(l,perimeter,precision,false,compress)
}

/**
* Returns a perimeter JSON object that includes the outline and the center tile.
*
* @param {number} l - tile number.
* @param {number} perimiter - perimeter distance to each direction.
* @param {number} precision - decimal precision of coordinates.
* @param {number} compress - if true compresses the JSON string.
* @returns {string} JSON object 
*/

function outlineJSON(l,perimeter,precision,compress){
return getJSON(l,perimeter,precision,true,compress)
}

function getJSON(l,perimeter,precision,outlineMode,compress){
var o;
var quads;
if(outlineMode){
o = outline(l,perimeter,precision,true);
}else{
o = perim(l,perimeter,precision,true);
}
var features=[];
var bbox = [];
var pbox = [];
var center = o.center;
var ftr;
var params;
var quad;
quad = o.center;
params={name:quad.number,type:quad.type,noFill:1};
params.color="green";
ftr=feature(quad.coords,params);
features.push(ftr);
quad = o.outline;
params={name:quad.number,type:quad.type,noFill:1};
params.color="red";
pbox=[quad.sw[1],quad.sw[0],quad.ne[1],quad.ne[0]];
ftr=feature(quad.coords,params);
ftr.bbox = pbox;
features.push(ftr);

quads = o.grid||[];
quads.forEach((quad)=>{
if(quad.coords){
params={name:quad.number,type:quad.type,noFill:1};
ftr=feature(quad.coords,params)
features.push(ftr);
}
})
var json={type:"FeatureCollection",features:features,bbox:pbox};
if(compress){
json=JSON.stringify(json);
}else{
json=JSON.stringify(json,null,2);
}
return json
}

function tileJSON(x,y,z,precision){
var quad = dtXYZ(x,y,z,null,precision)
var features=[];

if(quad.coords){
var params={name:quad.number,type:quad.type,noFill:1};
var ftr=feature(quad.coords,params);
var bbox=[quad.sw[1],quad.sw[0],quad.ne[1],quad.ne[0]];
ftr.bbox = bbox;
features.push(ftr);
}

var json={type:"FeatureCollection",features:features};
json=JSON.stringify(json,null,2);
return json
}

/**
* Returns a perimiter relative to its center.
*
* @param {number} l - tile number.
* @param {number} perimiter - perimeter distance to each direction.
* @param {precision} precision - decimal precision of coordinates.
* @returns {object} with tiles - tile of type "outline" is the outer tile, tile of type "center" is the central tile, item with the "grid" type retuns an array of tiles the fill the outline
*/
function perim(l,perimeter,precision){return perimRaw(l,perimeter,precision,true)}

/**
* Returns a perimiter oultine relative to its center without the grid.
*
* @param {number} l - tile number.
* @param {number} perimiter - perimeter distance to each direction.
* @param {precision} precision - decimal precision of coordinates.
* @returns {object} with tiles - tile of type "outline" is the outer tile, tile of type "center" is the central tile
*/
function outline(l,perimeter,precision){return perimRaw(l,perimeter,precision,false)}

/**
* Returns a perimiter from a number with its corner coordinates.
*
* @param {number} l - tile number.
* @param {number} perimiter - perimeter distance to each direction.
* @param {precision} precision - decimal precision of coordinates.
* @param {boolean} grid - if true includes perimeter tiles in the returned array.
* @returns {object} with tiles - o.oultine for outline, o.center - the central tile, o.grid - array of tiles
*/
function perimRaw(l,perimeter,precision,grid){
var o = {}
var quads =[];
var st = "" + l;
st=st.split(".")[0]
st = st.slice(1);
const middleIndex = Math.floor(st.length / 2);
const firstPart = st.substring(0, middleIndex);
var x=parseInt(firstPart);
const secondPart = st.substring(middleIndex);
var y=parseInt(secondPart);
var z = firstPart.length;
var bingo = dtXYZ(x,y,z);
bingo.type = "bingo";
//quads.push(bingo);
var maxX = Math.pow(10,z);
var maxY = maxX;
var main ={perimeter:perimeter,center:encode(x,y,z,perimeter)};
main.center = bingo.number;
main.type="perimeter";
if(perimeter){
var xLeft = x-perimeter;
var xRight = x+perimeter;
var yTop = y-perimeter;
if(yTop<0){yTop=0}
if(yBottom>=maxY){yTop=maxY-1}
var yBottom = y+perimeter;
for (let i = xLeft ; i <= xRight; i++){
for (let j = yTop; j <= yBottom; j++){
var v = dtXYZ(i,j,z,null,precision);
v.type = "dtile";
if(grid){quads.push(v)};
if(i==xLeft && j==yTop){
main.nw=v.nw;
main.nwNumber = v.number;
}
if(i==xLeft && j==yBottom){
main.sw=v.sw;
main.swNumber = v.number;
}
if(i==xRight && j==yBottom){
main.se=v.se;
main.seNumber = v.number;
}
if(i==xRight && j==yTop){
main.ne=v.ne;
main.neNumber = v.number;
}
}
}
main.x=x;
main.y=y;
main.z=z;
main.coords=[main.sw,main.nw,main.ne,main.se]
main.p=perimeter;
main.number=encode(x,y,z,perimeter)
quads.push(main);
}
o.outline = main;
o.center = bingo;
o.grid = quads;
return o;
}

/*
function isIn(lat,lng,coords){
var ret=false
if(lat>coords[0][0] && lat<coords[1][0] && lng>=coords[1][1] && lng<coords[2][1]){
ret=true
}
return ret
}
*/
function isInT(lat,lng,q){
var ret=false
if(lat>q.sw[0] && lat<q.nw[0] && lng>=q.nw[1] && lng<q.ne[1]){
ret=true
}
return ret
}


/**
* Returns an array of 100 tiles of the next zoom level at x and y.
*
* @param {number} x.
* @param {number} y.
* @param {number} z.
* @returns {array} or tiles
*/
function split100(x,y,z){
var quads;
var pi = Math.PI;
var lrad;
if(validTile(x,y,z)){
quads = [];
var incr = Math.pow(0.1,z+1);
for (var i = 0; i < 10;i++){
for (var j = 0; j < 10;j++){
var xLoc = x * 10  + i;
var yLoc = y * 10  + j;
var quad=[];
var startLng = 180;
let lngNW = ((xLoc) * incr)  * 360 - startLng;
lrad = Math.atan(Math.sinh(pi * (1 - 2 * (yLoc) * incr)));
let latNW = 180 * lrad / pi;
let lngSW = ((xLoc) * incr)  * 360 - startLng;
lrad = Math.atan(Math.sinh(pi * (1 - 2 * (y * 10 + j + 1) * incr)));
let latSW = 180 * lrad / pi;
let lngSE = ((x * 10  + i + 1) * incr)  * 360 - startLng;
lrad = Math.atan(Math.sinh(pi * (1 - 2 * (y * 10 + j + 1) * incr)));
let latSE = 180 * lrad / pi;
let lngNE = ((x * 10  + i + 1) * incr)  * 360 - startLng;
lrad = Math.atan(Math.sinh(pi * (1 - 2 * (yLoc) * incr)));
let latNE = 180 * lrad / pi;
var newQuad={}
newQuad.z = z + 1;
newQuad.x = x*10+i;
newQuad.sw = [latSW,lngSW];
newQuad.nw = [latNW,lngNW];
newQuad.se = [latSE,lngSE];
newQuad.ne = [latNE,lngNE];
newQuad.y = y*10+j;
newQuad.type = "dtile";
newQuad.number = encode(newQuad.x,newQuad.y,newQuad.z);
quads.push(newQuad)
}
}
}
return quads
}

// tile factory
/**
* Creates a vector normal to Earth’s surface on the Mercator projection model.
*
* @param {number} x - X units distance from [[90,-180],[-90,-180]] (towards east).
* @param {number} y - Y units from [[90,-180],[90,180]] (towards south).
* @param {number} z - Z zoom level.
* @param {number} p - P perimiter (optional). defines how many adjacent tiles to add on each direaction.
*
* @example
*   const n = DT.tile(5, 5, 1) returns the tile that has its corner on "null island" on a 10 x 10 matrix;
*   const n = DT.tile(50, 50, 2) returns the tile that has its corner on "null island" on a 100 x 100 matrix;
*/
function tile(x,y,z,p){
//if (!(this instanceof DTile)) return new DTile(x,y,z);
this.x = 0;
this.y = 0;
this.z = 0;
this.p = p||0;
if(z){
this.x = Number(x);
this.y = Number(y);
this.z = Number(z);
}else if(y){
}
return this
}

/**
* recusive function that finds the matching tile of a given lat and lng.
*
* @param {tile} q - recursive parameter initialy set to the root (0:0:0).
* @param {number} lat - latitude.
* @param {number} lng - longitude.
* @param {number} maxlevel - tells the recursive function to stop recursion and return the matching tile.
*/
function drill(q,lat,lng,maxLevel){
//var per = p || 1;
var xi = q.x;
var yi = q.y;
var z = q.z;
var pi = Math.PI;
let n=Math.pow(2.0,z);
var maxN = n * 2;
var x=xi,y=yi;
if(x<0){
x=x+maxN
}
if(x>=n){
x=x-maxN
}
var qds = split100(q.x,q.y,q.z);
var found;
qds.forEach(function(q){
if (isInT(lat,lng,q)){
found = q;
}
})

if(!found){return}
if(z+1<maxLevel ){
return drill(found,lat,lng,maxLevel)
}else{
found.number = encode(found.x, found.y, found.z);
found.coords = [found.sw,found.nw,found.ne,found.se];
return found
}
}

function feature(coords,properties){
var poly = [];
coords.forEach((point)=>{
poly.push([point[1],point[0]])
})
var prop=properties;
var feature={
"geometry":{
"type":"Polygon",
"coordinates":[poly]
},
"type":"Feature",
"properties": prop
}
return feature
}

function validTile(x,y,z){
var ok=false;
if(Number.isInteger(x)&&Number.isInteger(y)&&Number.isInteger(z)){
ok = true;
}
return ok;
}

function validTN(tn){
var ok;
n = Number(tn);
//n = Math.floor(Number(tn));
if(n !== Infinity && String(n) === tn && n >= 0){
var st="" + tn;
var p=0;
var arr = st.split(".");
var int = arr[0];

const firstChar = int[0];
const firstDigit = Number(firstChar);
var length = int.length
if(firstDigit==(length-1)/2){
ok=1;
}
}
return ok;	
}
function nFormat(num, precision) {
if (precision === false){return num;}
var pow = Math.pow(10, precision === undefined ? 6 : precision);
return Math.round(num * pow) / pow;
}

var exports = {
  varsion:version,
tile:tile,
feature:feature,
get:get,
encode:encode,
dtXYZ:dtXYZ,
perim:perim,
outline:outline,
perimJSON:perimJSON,
tileJSON:tileJSON,
outlineJSON:outlineJSON,
decode:decode,
split100:split100,
nFormat:nFormat,
validTN:validTN,
}

//return exports;
window.DT = exports;
if (typeof module != 'undefined' && module.exports) module.exports = exports; // ≡ export defaults
})();
