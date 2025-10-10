var dTile=(function(){
var root = {x:0,y:0,z:0};

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
*
* @param   {number}.
* @returns {tile}.
*
*/

function decode(l,precision){
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
if(perimeter){
v.p=perimeter;
}
var pi=Math.PI,n=Math.pow(10,z);
let lngNW=x / n * 360 - 180;
let latNW=180 * Math.atan(Math.sinh(pi * (1 - 2 * y / n))) / pi;
let lngSW=x / n * 360 - 180;
let latSW=180 * Math.atan(Math.sinh(pi * (1 - 2 * (y+1) / n))) / pi;
let lngNE=(x+1) / n * 360 - 180;
let latNE=180 * Math.atan(Math.sinh(pi * (1 - 2 * (y) / n))) / pi;
//lrad=Math.atan(Math.sinh(pi * (1 - 2 * (y) / n)));
//let latNE=180 * lrad / pi;
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
//v.coords=[v.sw,v.nw,v.ne,v.se,v.sw];
v.coords=[v.sw,v.nw,v.ne,v.se];
}
return v;
}


function perimJSON(l,perimeter,precision){
var quads = perim(l,perimeter,precision,true);
var features=[];
var bbox = [];
var pbox = [];
quads.forEach((quad)=>{
if(quad.coords){
var params={name:quad.number,type:quad.type,noFill:1};
if(quad.type=="perimeter"){
pbox=[quad.sw[1],quad.sw[0],quad.ne[1],quad.ne[0]];
params.color="red";
}

var ftr=feature(quad.coords,params)
if(quad.type=="bingo"){
bbox=[quad.sw[1],quad.sw[0],quad.ne[1],quad.ne[0]];
ftr.bbox = bbox;
}
features.push(ftr);
}
})
var json={type:"FeatureCollection",features:features,bbox:pbox};
json=JSON.stringify(json,null,2);
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
* Returns a perimiter tile from a number with its corner coordinates.
*
* @param {number} l - tile number.
* @param {number} perimiter - perimeter distance to each direaction.
* @param {precision} precision - decimal precision of coordinates.
* @param {boolean} grid - if true includes perimeter tiles in the returned array.
* @returns {array} or tiles - tile of type "perimeter is the outer tile, tile of type "bingo" is the central tile
*/

function perim(l,perimeter,precision,grid){
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
quads.push(bingo);
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
return quads;
}

function isIn(lat,lng,coords){
var ret=false
if(lat>coords[0][0] && lat<coords[1][0] && lng>=coords[1][1] && lng<coords[2][1]){
ret=true
}
return ret
}
function isInT(lat,lng,q){
var ret=false
if(lat>q.sw[0] && lat<q.nw[0] && lng>=q.nw[1] && lng<q.ne[1]){
ret=true
}
return ret
}


/**
* Returns an array of 100 tiles of the next zoom level.
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

function validTile(x,y,z){
var ok=false;
if(Number.isInteger(x)&&Number.isInteger(y)&&Number.isInteger(z)){
ok = true;
}
return ok;
}

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
var lrad
var quads={main:{},parent:q,center:{}};
var quad=[]

var qds = split100(q.x,q.y,q.z);
var found;
qds.forEach(function(q){
if (isInT(lat,lng,q)){
found = q;
}
})

if(z+1<maxLevel && found){
return drill(found,lat,lng,maxLevel)
}else{
found.number = encode(found.x, found.y, found.z);
found.coords = [found.sw,found.nw,found.ne,found.se];
//return quads
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


function nFormat(num, precision) {
if (precision === false){return num;}
var pow = Math.pow(10, precision === undefined ? 6 : precision);
return Math.round(num * pow) / pow;
}

var exports = {
tile:tile,
tileJSON:tileJSON,
feature:feature,
get:get,
encode:encode,
dtXYZ:dtXYZ,
perim:perim,
perimJSON:perimJSON,
decode:decode,
split100:split100,
nFormat,nFormat
}

//return exports;
window.DT = exports;
if (typeof module != 'undefined' && module.exports) module.exports = exports; // ≡ export default LatLon
})();
