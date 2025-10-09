<h3>Decimal Tiles</h3>
<p>
Decimal tiles split a navigation map or Meracator projected map into 10 x 10 polygons that visually seem to form perfect squares at the initial zoom level (1). Each zoom level splits a tile from a previous zoom level to 100 new tiles.
Decimal tiles can be represented by one number instead of a x-y-z vector by concatenating the zoom level with row number and column number (padded with zeros).
</p>

<h3>Permiters</h3><p>
A perimeter is defined by adding a peremiter threshold (p) to a decimal tile vector which represent p adjacent tiles to each direction. This means that the premeter contains a cebtral tile which is part of (p+1 times p+1) surrounding tiles that make up the permiter. A premiter is denoted by concatenating a dot and the perimeter threshold to the central tile.</p>

<h3>CDN</h3>

###
``` html
<script src="https://cdn.jsdelivr.net/gh/dTile/DT/dist/dtile.js"></script>
```
<BR>
<h3>JS</h3>

###
```
// vanilla JS
// 
var geoJSON = DT.perimJSON(25050,3);
//get a perimeter of threshold 3 around "Null Island" in zoom level 2;
//

var tile = DT.dtXYZ(51,51,2)
console.log(tile.coords);
//Get the tile located 51 tiles south of the north pole and one tile east to the meridian at zoom level 2
//In zoom level 2 the map is split to 100x100 tiles;


```

<h3>License</h3>
###
DT is released under the [MIT license](license.md).


###
[About](explainer/about.md)
