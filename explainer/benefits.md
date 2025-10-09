<h3>Decimal Tiles</h3>
<p>
Decimal tiles split a navigation map or Meracator projected map into 10 x 10 polygons that visually seem to form perfect squares at the initial zoom level 1. Each zoom level splits a tile from a previous zoom level to 100 new tiles.
Decimal tiles can be represented by one number instead of a x-y-z vector by concatenating the zoom level with row number and column number (padded with zeros).
Tiles corners are are defined by spliting a previous level tile by 10 columns and 10 rows. Level 2 of decimal tiles has 10,000 tiles after splitting tiles from the previous zoom leve to 100 new tiles. 
</p>

<h3>Binary or Decimal</h3>
<p>
Map tiles represent the conventional polygons that make up a tile layer. A tile layer is a matrix of image tiles that are superimposed on a an HTML element or digital canvas giving a perception of a continous map.
<span style='font-size:200px;'>&#9638;</span>.
A binary tile in a specific zoom level has the corners defined by splitting a tile from a previous zoom level to 4 new tiles (2x2).<BR>
A decimal tile in a specific zoom level has the corners defined by splitting a tile from a previous zoom level to 100 new tiles (10x10).
Decimal tiles have one tile in zoom level 0 and 100 tiles in zoom level 1 that making better use of the available characters in the decimal system.
Decimal tiles may be easier to program, name, manipulate, split, backtrack or join in many situations.<BR>
For expalnatory purposes we assume that a map has a bounding box with its northwester corner at 90 &deg; North and -180 &deg; East whereas the Southeastern corner is located at -90 &deg; North and 180 &deg; East.
</p>

<h3>Permiters</h3>
<p>
A perimeter is defined by adding a peremiter threshold (p) to a decimal tile vector which represent p adjacent tiles to each direction. This means that the premeter contains a cneteral tile which is part of (p+1 times p+1) surroundin tiles that make up the permiter.A premiter is denoted by concatenating a dot and the perimeter threshold to the central tile. Thus, 25050.3 (2:50:50:3) represnts a central tile plus 48 tiles that surround it. 25050 represnts a tile hat its northwestern corner is "null island"  (0 degrees latitude and 0 degrees longitude) since it is made up by spliting the map to 100x100 tiles and moving south and east 50 tiles starting from the map northwestern corner.
</p>

<h3>Motivation</h3>
The decimal tile system (DTS), enables a unified global area definition without a need to specify coordinats or a clumsy system of comma delimited arrays. It may solve the problem of governments and lifesaving entities who don't use a well defined and unified systen of proveying, understandable, comparable, traceable and unifed permiters. Some governments or counties use their own asymetrical and incoherent delimiting systems because they are afraid of sxposing coordinates of priveate properties or because they want to create inneficient budgeting system that give more possibilites of money laundring or manipulative biddings by the use of red tape and inequal areas sizin and zoning.

