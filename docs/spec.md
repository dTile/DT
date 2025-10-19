## Goal
Enabling a notation of map tiles on 2D maps or cubes on 3D simplified maps using only decimal number instead of the use of commas or vectors that represent degrees, minutes and seconds. This method enables a mathematical representation of a set cubes that may be used on virutal 3D printer for a later printing a model of a spacial area such as a city block, a room or a mountain.

# Motivation
A simple use of numbers that may represent areas for fast and coherent reference for the use of Real Estate agencies, gaming applications, nature disaster repsonse teams that need to set up evacuation areas and so on.

## Assumptions
The model uses a simplified Mercator projection mapping model and the concept that the ground zero of a cube or tile is the southwestern and deepest point of a cube.
[https://stevage.github.io/geojson-spec/#section-5]. In a simpsitic way one can define a tile as a cube with height zero or height ommited.

### Definitions:

#### 2D BBOX
Bounding tile that represents a polygon bounds that are contained in an an area defined by an array of 4 numbers made up of coordinates: south,west,north and east in this specific order;

#### 3D BBOX
Bounding box that represents a shape with bounds that are contained in an space defined by an array of 4 numbers made up by: south,west,depth,north,east and elevation in this specific order;

#### 2D Root Map
The area that covers all places on earth on a Mercator projected map [-90,-180,90,180] in the North-Easting Notation or [-180,-90,180,90] in geoJSON notation where longitude preceeds latitude. 

#### 3D Root Map
A pseudeo that covers all places on the sea level on earth on a Mercator projected map [-90,-180,0,90,180,0]

#### Null Island
The point where the prime meridian meets the equatr [0,0,0].

#### Frozen Island
The reference corner represents the ground zero point that image mapping tile providers relate to as a starting point, being [-90,-180,0] in the North-Eastern notation model which is a starting refence point of their x and y parameters.

### Notation
A cube or a tile is represented by a decimal number where the first digit represents it granualarity (G). G sets up the amount of possible values that fill the root map horiaozntally (x) and vertically (y). The the next set of g digits (padded by zeros) reprsent the horizontal distance of tiles from the anti-meridian and the following G digits represent the numbers of tiles distance to the north pole. the next digis represent how many tiles are needed to reach the elevation from the surface of earth. A negative cube number represents a which is 

### Granularity
The granularity (g) number represents how many times the algorithm splits the 2D root map into 10x10 tiles
On granulariy 1 there are 100 tiles (10x10), on level 2 10,000 tiles and so on. 
tha max numbe of tiles is 100 power of g. A tile on granularity 7 on the equator has an estimated width of 4 meters. A tile on granularity 8 has about 40 cm with and so on.

### x, y and d
The refernce point for a tile
A cube coordinate in a specific granularity level reprentns the distance from 



### 3D Perimeter
The value of cube vector must be an array of length 2*n where n is the number of dimensions with all axes of the most southwesterly and deepest point followed by all axes of the more northeasterly and elevated point.
