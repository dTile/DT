<h3>Decimal Tiles</h3>
Decimal tiles enable a unified referring system for areas on the surface of the earth instead of an alternative or complementary set of coordinates by using unique numbers, overcoming the cumbersome use of vectors, commas, degrees, minutes, seconds and bearings. Decimal tiles split a navigation map or Meracator projected map into 10 x 10 matrices of polygons. The polygons visually seem to form perfect adjacent squares or a grid. The tiles are actually trapezoids that look like squares due to earth curvature. Each drill-down level splits a tile from a previous zoom level into 100 new tiles enabling granularity as required by the context. Decimal tiles can be represented by one number instead of a vector by concatenating the drill-down level with row number and column number (padded with zeros). A tile number shares the digits of its ancestors, which makes zooming and joining or splitting tiles more understandable and easier to program or share.
<br>

<h3>Permiters</h3>
A perimeter is defined by adding a perimeter threshold (p) to a decimal tile vector or number which represents p adjacent tiles to each direction. This means that the perimeter contains a central tile which is part of a matrix that has (p x 2) + 1 columns and rows. A perimeter is denoted by concatenating a dot and the perimeter threshold to the central tile. The API converts tiles or perimeters to coordinates which can be suppoerimposed on mapping systems or naviagation applications as grids or interactive areas. The API enables generation of geoJSON objects that contain tile coordinates and metadata of the perimeters and the tiles within.
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


[About](explainer/benefits.md)

<br>

[Demo](https://dtile.github.io/DT/test/)

<hr>

![Demo use](https://dtile.github.io/DT/test/dt.png?raw=true)



 <hr>
  
> [!NOTE]
> Tiles visually seem to form perfect adjacent squares or a grid. The tiles are actually trapezoids that look like squares due to earth curvature under the Mercator projection model.


 
<h3>License</h3>

###
DT is released under the [MIT license](LICENSE)

