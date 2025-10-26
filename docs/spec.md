# Decimal Tile Notation (DTN)

## Goal
Shorthand mathematical represenation of perimeters that can be used as a standard for a fast and coherent gridding and bounding of map areas. DTN uses aggregate short notation of tiles using only decimal numbers instead of the use of commas, brackes, arrays or vectors that represent degrees, minutes and seconds. This notation is extended to cubes and boxes by adding an elevation parameter. Thus, a mathematical representation of a set cubes may be used on virtual 3D printer for printing a model of a spatial area such as a city block, a room or a mountain. 

## Motivation
A simple use of numbers that may represent areas for fast and coherent reference for the use of Real Estate agencies, gaming applications, nature disaster repsonse teams, evacuation area assignment, traffic management, architecture, navigation, news alerts, weather forcasts and so on.

## Application
The process of 3D printing (visual of physical) requires a preliminar definition of the positions of "raw material cubes" within a predifined bounding box. The cubes are mapped in a way that assigns their location and how they shuld be arranged or glued to each layer starting at the most sunken level and iterating the process at the next elevation levels.

## Assumptions
The algorigthms use a simplified Mercator projection mapping model and the "bbox" notation concept. This concept assumes that the ground zero of a cube or box is the southwestern and deepest point which is located within its space boundaries. That concept requires a second set of numbers that represent the opposing corner or vertix. Thus, any cube or box of cubes that is parallel to the surface of the earth can be represented by an array of 6 coordinats. DTN as opposed to geoJSON spec assings the anchor to the northwestern corner because tile map providers start their image tiles in the northwestern corner of the map in order to avoid the need of using negative numbers.

### DTN Notation
A cube or a tile is represented by a decimal number where the first digit represents it granualarity (G). G sets up the ammount of possible values that fill the root map horiaozntally and vertically (Tile facto 10**G). The the next set of G digits (padded by zeros) reprsent the horizontal distance of tiles from the anti-meridian and the following G digits (Y) represent the numbers of tiles distance to the north pole. the next digis represent how many tiles are needed to reach the elevation from the surface of earth. A negative cube number represents a cube with negative elevation. A DTS notation has a guiding start digit (G) notation and a finalizing (F) digit notation which overcome the ambiguity of leading and trailing zeros in decimal numbers.
> [!NOTE]
For simplicity, the notation of a coordinate uses brackets that enclose coordinates using [North-Easting UTM](https://gisgeography.com/easting-northing-coordinates/) notation model.

<HR>

### Preliminary Definitions

#### Decimal Degree Coordinate - DD
Decimal dergree string that denotes a point on a 2D map by concatenating the latitude a comma and the longitude.

#### Decimal Degree 3D Coordinate - DD3
Decimal dergree string that denotes a point on a 3D map by concatenating the latitude a comma, the longitude a comma and altitude.

#### Tile
A map tile is 4 corner quadrilateral that has 4 DD coordinates that confine its area. A tile looks like a perfect square on a Mercator project map although in reaiity it is a trapezoid due to the curvature of the earth.

#### Cube
A cube is a vector that has 8 DD3C units that confine its space on a 3D map.

#### 2D Root Map
The area that covers all places on earth on a Mercator projected map [[90,-180],[90,180],[-90,180],[-90,-180]].
or a bbox [-180,-90,180,90] in geoJSON notation where longitude preceeds latitude. 

#### Tile factor - Granularity
The number of tiles that fill up 2D root map horizontally or vertically which is calculated by powering 10 by G (Granularity).

#### Decimal Granularity
The granularity (G) number represents how many times the algorithm splits the 2D root map into 10x10 tiles.
On granulariy 1 there are 100 tiles (10x10), on level 2 10,000 tiles and so on. 
The maximum number of tiles is 100 power of G. A tile on granularity 7 on the equator has an estimated width of 4 meters. A tile on granularity level 8 has about 40 cm width and so on. Basically, there are very few applications that would need granulartiy 10 where the maximum width of a tile is about 4 mm.

#### Tile notation G, X, Y
A tile is denoted by number by concatenating G (granularity - geen), X for horizontal distance (red) from the anti-meridian, Y vertical distance (blue) from the north pole. X and Y are padded with zeros that fill up the gap needed to achieve G digits. A tile X coordinate in a specific granularity level represents the number of tiles that fill up the distance of the specific tile to the antimeridian which is loacted at [90,-180,-90,-180].  A coordinates of the polygon that bounds a tile can be extracted by an API function that takes G, X and Y as paramters and vice versa.

#### Cube notation G, X, Y, E
A cube is denoted by number by concatenating G (granularity), X for horizontal distance from the anti-meridian, Y vertical distance from the north pole and E elevation distance from the sea level. X and Y are padded with zeros that fill up the gap needed to achieve G digits. The elevation parameter of a cube denotes how far the cube is located (in cube units) from the surface of the earth, be it elevated or sunken (negative).

> [!NOTE]
In a simpsitic way one can define a tile as a cube with an ommited height as can be inferred from the [BBOX spec](https://stevage.github.io/geojson-spec/#section-5). "The value of a bbox vector must be an array of length 2*n where n is the number of dimensions with all axes of the most southwesterly and deepest point followed by all axes of the more northeasterly and elevated point".

#### TBOX - Tile Box
Bounding quadrilateral that outlines the bounds of all tiles that are between an anchor tile northwest corner and an pposing tile's southeast corner (hinch). A tilebox can be defined by one number that includes the tile number anchor at the interger part of a number and the distances in tiles to the oposing (hinch) tile at the decimal part of that number.

#### TBOX "abcd" notation
The set of corners that delimit a quadrilatieral are by letters that are orders clockwise from the northwest corner.
Northwestern DD corner is denominated "a" or "nw". 
Northeastern DD corner is denominated "b" or "ne".
Southeastern DD corner is denominated "c" or "sw". 
Northeastern DD corner is denominated "d" or "se".
Northwestern tile in a tilebox is denominated "at" or "nwt". 
Northeastern tile in a tilebox is denominated "bt" or "net".
Southeastern tile in a tilebox is denominated "ct" or "swt". 
Northeastern tile in a tilebox is denominated "dt" or "set".



#### CBOX - Cube Box
Bounding box represents a 3D area that contains all cubes situated between the northwest deppest cube (anfhor) corner and an opposing cube (hinch) south-east most eleveted conrer.

#### BBOX
To formula to create a geoJSON bbox [flipped(sw),flipped(ne)] where "flipped" means flipping the order of coordinates.

#### 3D Root Map
A pseudo 3D bbox that covers all places on the sea level on earth on a Mercator projected map [-90,-180,0,90,180,0

#### Null Island
The point where the prime meridian meets the equator [0,0,0].

#### Anti Null Island
The point where the anti-meridian meets the equator [0,0,0].

#### Frozen Island
The reference corner that denominates the ground zero point that image tile providers relate to as a starting point, being [90,-180,0] in the North-Eastern notation model which is a starting refence point of their x and y parameters.

#### Penguin Island
The antipode of Frozen Island  [-90,-180,0]

#### Anchor
An anchor represents the starting reference vertex of a cube or corner of a tile on a map. It has the north western deepest point defined by X which is the number of tiles/cubes needed to fill the gap from the antimeridian and Y denoting the number of distance units from the north pole. The width of a tile or a cube is calculated by dividing the circumference on a spedific longitude by the tile factor. An anchor of a cube has an elevation denominator.

#### Hitch or Projection
Hitch is the opposing end of the anchor, namely the farthest vertex opposing the anchor of a cube or a corner opposing the anchor of a tile. A hitch is not necessary in a cube notation since it can be retrieved by a function that takes the granularity as a parameter. But, it is necesary to create a defition of a bbox which contains several cubes or tiles.

![2D tile](https://dtile.github.io/DT/media/2dtile.png?raw=true)

#### Cube notation G, X, Y, E
A cube is denoted by number that is represented by concatenating G (granularity) , X  for horizontal distance, Y vertical distance and E for elevation distance in cubes from the surface of the earth. X and Y are padded with zeros that fill up the gap needed to achieve G digits. There is no need to pad elevation since the elevation number starts at the (G x 2 + 2) digit position.

#### Bbox or extended cube
An extended cube is represented by a cube number followed by a decimal number represented by X2,Y2,E2 and F. 
F represents the final guiding digit which solves the problem of unumbiguity of traling zeros. It defines how many digits compose X2 and Y2.
X2 denotes the disance eastwards in cubes from the anchor.
Y2 denotes the disance northwards in cubes from the anchor.
E2 denotes the elvated disance in cubes from the anchor.
An extended box is denoted adding the hitch number as the decimal part o a cube number. The hitch number is denoted by concatenating X2,Y2,E2 (after padding at the start with F zeros) and concatenating it with F.
The G and F guide digits delimit the bbox number at the edges.
<HR>


### Hatching or Bboxing
Hatching of Bboxing is an operation of extending a basic tile or a cube into a tbox and cbox by adding the corressponding increments. Digits of the increments (xi, yi, ei) are added  at the decimal part of the tile/cube number after the dot. A guiding final digit (F) is added at the end of the decimal part to avoid the effect vanishing traling zeros and to indicate how many digits are needed for expanding a cube or tile in each dimension as rtelated to the anchor. Figuratively. bboxing a cube is a process of inflating it to the northeast end by gluing (or replicating) XI cubes to the east, YI cubes to the south and EI to the sky creating a new bigger box (which is composed by basic similar cubes glued together). Hatching is done by adding a corresponding number ("Hitch" number) as a decimal part of a cube/tile. Hatching saves coding of big numbers of adjacent cubes that are contained in a box by the use of only one number and reusing an anchor number as its cube part and addting hitch number that represents an opposing vertex to the anchor.
