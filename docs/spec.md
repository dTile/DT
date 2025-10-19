## Motivation
Enabling a notation of map tiles on 2D maps or cubes on 3D simplified maps using only decimal number instead of the use of commas or vectors that represent degrees, minutes and seconds. This method enables a mathematical representation of a set cubes that may be used on virutal 3d printer for a later printing a model of a city block or a mountain.

## Assumptions
The model uses a simplified Mercator mapping model and the concept that the ground zero of a cube or tile is the southwestern and deepest point of a cube.
[https://stevage.github.io/geojson-spec/#section-5]. In a simpsitic a tile is a cube with height zero or height ommited.


### 3D Perimeter
The value of cube vector must be an array of length 2*n where n is the number of dimensions with all axes of the most southwesterly and deepest point followed by all axes of the more northeasterly and elevated point.
