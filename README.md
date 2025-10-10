<h3>Decimal Tiles</h3>
Decimal tiles enamble a unified refering system for spatial areas on earth instead or an arlternative or complementary set of coordinates by using unique numbers overcoming the need for using vectors, commas, minuts or seconds. Decimal tiles split a navigation map or Meracator projected map into 10 x 10 matrices of polygons. The polygons visually seem to form perfect adjacent squares or a grid. The tiles are actually trapezoids that look like square due to earh curvature. Each drill-down level splits a tile from a previous zoom level to 100 new tiles.
Decimal tiles can be represented by one number instead of a vector by concatenating the zoom level with row number and column number (padded with zeros). A tile number shares the digits of its ancestors whicm makes zooming and joining or spliting tiles more understandable.
<br>

<h3>Permiters</h3>
A perimeter is defined by adding a peremiter threshold (p) to a decimal tile vector which represent p adjacent tiles to each direction. This means that the premeter contains a central tile which is part of a matrix which has (p x 2) + 1 columns and rows that make up the permiter. A premiter is denoted by concatenating a dot and the perimeter threshold to the central tile.
<br>

<h3>CDN</h3>

###
``` html
<script src="https://cdn.jsdelivr.net/gh/dTile/DT/dist/dtile.js"></script>
```


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
<br>

[About](explainer/about.md)

<br>

[Demo](https://dtile.github.io/DT/test/)



 <hr>
<h3>License</h3>

###
DT is released under the [MIT license](LICENSE)

