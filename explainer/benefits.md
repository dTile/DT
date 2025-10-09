Decimal Tiles
Decimal tiles split a navigation map or Meracator projected map into 10 x 10 polygons that visually seem to form perfect squares at the initial zoom level (0). Each zoom level splits a tile from a previous zoom level to 100 new tiles. Decimal tiles can be represented by one number instead of a x-y-z vector by concatenating the zoom level with row number and column number (padded with zeros). Decimal tiles have one tile in zoom level 0 and 100 tiles in zoom level 1. Tiles corners are are defined by spliting a previous level tile by 10 columns and 10 rows. Level 2 of decimal tiles has 10,000 tiles after splitting tiles from the previous zoom leve to 100 new tiles.

Binary or Decimal
Map tiles represent the conventional polygons that make up a tile layer. A tile layer is a matrix of image tiles that are superimposed on a an HTML element or digital canvas giving a perception of a continous map. ▦ A binary tile in a specific zoom level has the corners defined by splitting a tile from a previous zoom level to 4 new tiles (2x2).
A decimal tile in a specific zoom level has the corners defined by splitting a tile from a previous zoom level to 100 new tiles (10x10).

Decimal tiles may be easier to program, name, manipulate, split, backtrack or join in many situations.

Permiters
A perimeter is defied by adding a peremiter parameter (p) to a decimal tile wich adds p adjacent tiles to each direction. This means that the premeter contans a cneteral tile plus p X p tiles in the permiter. A premiter is denoted by concatenating a dot and the perimeter threshold to the central tile. thus 25050.4 represnts a central tile that its northwestern corner is (0 degrees latitude and 0 degrees longitude) "null island" that plus 16 tiles that surround it.
