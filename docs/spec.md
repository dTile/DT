# Decimal Tile System (DTS)

## Goal
Enabling an interchageable and short notation of map tiles on 2D maps or cubes on 3D simplified maps using only decimal numbers instead of the use of commas, brackes or vectors that represent degrees, minutes and seconds. This method enables a mathematical representation of a set cubes that may be used on virtual 3D printer for printing a model of a spacial area such as a city block, a room or a mountain. The process of 3D printing requires a preliminar definition of the positions of "raw material cubes" that are supposed to be glued on each layer starting with elevation 0 and going upwords.

## Motivation
A simple use of numbers that may represent areas for fast and coherent reference for the use of Real Estate agencies, gaming applications, nature disaster repsonse teams that need to set up evacuation areas and so on.

## Assumptions
The algorigthms use a simplified Mercator projection mapping model and the "bbox" notation concept. This concept assumes that the ground zero of a cube or box is the southwestern and deepest point which is located within its space boundaries. That concept requires a second set of numbers that represent the opposing corner. Thus any cube or box space that is parallel to the surface of the earth can be represented by an array of 6 coordinats.
> [!NOTE]
In a simpsitic way one can define a tile as a cube with an ommited height as can be inferred from the [BBOX spec](https://stevage.github.io/geojson-spec/#section-5). The value of a bbox vector must be an array of length 2*n where n is the number of dimensions with all axes of the most southwesterly and deepest point followed by all axes of the more northeasterly and elevated point.

### DTS Notation
A cube or a tile is represented by a decimal number where the first digit represents it granualarity (G). G sets up the amount of possible values that fill the root map horiaozntally (x) and vertically (y). The the next set of g digits (padded by zeros) reprsent the horizontal distance of tiles from the anti-meridian and the following G digits represent the numbers of tiles distance to the north pole. the next digis represent how many tiles are needed to reach the elevation from the surface of earth. A negative cube number represents a cube with negative elevation. A DTS notation has a guiding start digit (G) notation and a finalizing (F) digit notation which overcomes the ambiguity of leading and trailing zeros in decimal numbers.
> [!NOTE]
For simplicity, the notation of a coordinate uses brackets that enclose coordinates using [North-Easting](https://gisgeography.com/easting-northing-coordinates/) notation model.

### Granularity
The granularity (G) number represents how many times the algorithm splits the 2D root map into 10x10 tiles.
On granulariy 1 there are 100 tiles (10x10), on level 2 10,000 tiles and so on. 
The maximum number of tiles is 100 power of G. A tile on granularity 7 on the equator has an estimated width of 4 meters. A tile on granularity 8 has about 40 cm width and so on. Basically, there are very few applications that would need granulartiy 10 where the maximum width of a tile is about 4 mm.


<HR>

### Preliminary Definitions

#### 2D BBOX
Bounding tile that represents a polygon bounds that are contained in an an area defined by an array of 4 numbers made up of coordinates: south,west,north and east in this specific order.

#### 3D BBOX
Bounding box representing a box shape with bounds that are contained in an space defined by an array of 4 numbers made up by: south,west,depth,north,east and elevation in this specific order.

#### 2D Root Map
The area that covers all places on earth on a Mercator projected map [-90,-180,90,180] in the North-Easting Notation or [-180,-90,180,90] in geoJSON notation where longitude preceeds latitude. 

#### 3D Root Map
A pseudo 3D bbox that covers all places on the sea level on earth on a Mercator projected map [-90,-180,0,90,180,0]

#### Null Island
The point where the prime meridian meets the equator [0,0,0].

#### Frozen Island
The reference corner represents the ground zero point that image tile providers relate to as a starting point, being [-90,-180,0] in the North-Eastern notation model which is a starting refence point of their x and y parameters.

#### Tile factor
The number of tiles that fill up 2D root map horizontally or vertically which is calculated by powering 10 by G (Granularity).

#### Anchor
An anchor represents the starting refence vertex of a cube or a corener of a tile on a map. It has the south western deepest point defined by X which is the number of tiles/cubes from the antimeridian nad Y denoting the number of distance units from the north pole. The width of a tile or a cube is calculated by dividing the circumference on a spedific longitude by the tile factor. An anchor of a cube has an elevation denominator.

#### Projection
Projection is the anti anchor or the vertex opposing the anchor of a cube or a corner opposing the anchor of atile. A projection is not necessary in a cube notation since it can be retrieved by a function that takes the granularity as a parameter.

#### Tile notation G, X, Y
A tile is a denoted by number that is represented by concatenating G (granularity), X for horizontal distance, Y vertical distance. X and Y are padded with zeros that fill up the gap needed to achieve G digits.

#### Cube notation G, X, Y, E
A cube is denoted by number that is represented by concatenating G (granularity) , X  for horizontal distance, Y vertical horizontal distance and E for elevation distance in cubes from the surface of the earth. X and Y are padded with zeros that fill up the gap needed to achieve G digits. There is no need to pad elevation since the elevation number starts at the (G x 2 + 2) digit position.


#### Bbox or extended cube
An extended cube is represnted by a cube number followed by a decimal number represented by X2,Y2,E2 and  F. 
F represents the final guiding digit which solves the proble of unumbiguty of traling zeros. It defines how many digits compose X2 and Y2
X2 denotes the disance eastwards in cubes from the anchor.
Y2 denotes the disance northwards in cubes from the anchor.
Y2 denotes the elvated disance in cubes from the anchor.

and distance (height) from the anchor.
An extende cube can be represnted by concatenating 2 cube arguments.
The refernce point for a tile
A cube x coordinate in a specific granularity level represents the distance from 
![2D tile](https://dtile.github.io/DT/media/2dtile.png?raw=true)

<HR>



### Bboxing
Bboxing is a function of extending a basic box by adding the corressponding digits as the decimal number after the dot. The guided number is the final This is done to avoid the effect vanishing traling zeros. that reprent the oppoising corner of the refence tile. This is achieved by concatenating number of H cubes needed to reach the far horizontal edge of the containing box and V cubes needed to reach the far vertical edge of the resulting new box. 



