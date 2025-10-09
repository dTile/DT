<h3>Decimal Tiles</h3>
<p>
Decimal tiles split a navigation map or Meracator projected map into 10 x 10 polygons that visually seem to form perfect squares at the initial zoom level (1). Each zoom level splits a tile from a previous zoom level to 100 new tiles.
Decimal tiles can be represented by one number instead of a x-y-z vector by concatenating the zoom level with row number and column number (padded with zeros).
</p>

<h3>Permiters</h3><p>
A perimeter is defined by adding a peremiter threshold (p) to a decimal tile vector which represent p adjacent tiles to each direction. This means that the premeter contains a cneteral tile which is part of (p+1 times p+1) surrounding tiles that make up the permiter. A premiter is denoted by concatenating a dot and the perimeter threshold to the central tile.</p>

<h3>CDN</h3>
``` html
<script src="https://cdn.jsdelivr.net/gh/dTile/DT/dist/dtile.js"></script>
```

``` js
// vanilla JS
// init with element
var geoJSON = DT.perimJSON(2,50,50,3);
//get 49 decimal tiles that surround "Null Island" at 0N,0N in zoom level 2;
```


## License
DT is released under the [MIT license].
