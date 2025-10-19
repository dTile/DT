## Goal
Enabling a notation of map tiles on 2D maps or cubes on 3D simplified maps using only decimal number instead of the use of commas or vectors that represent degrees, minutes and seconds. This method enables a mathematical representation of a set cubes that may be used on virutal 3d printer for a later printing a model of a city block or a mountain.

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
The area that covers all places on earth on a Mercator projected map [-90,-180,90,180]

#### 3D Root Map
A pseudeo that covers all places on the sea level on earth on a Mercator projected map [-90,-180,0,90,180,0]


### Granularity
The granularity number represents how many times the algorithm devides the root map


### 3D Perimeter
The value of cube vector must be an array of length 2*n where n is the number of dimensions with all axes of the most southwesterly and deepest point followed by all axes of the more northeasterly and elevated point.
