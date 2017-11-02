# gs-JSON

gs-JSON is a domain agnostic unifying 3D file format for geometric and semantic modelling (hence the 'gs'). 

# Conceptual Model
The gs-JSON conceptual model uses topology as the organising framework for defining both geometry and semantics.

Geometry includes both polygonal and spline based geometric entities. Semantics consists of data linked to entities and collections of entities in the model.

## Topology
The topological hierarchy is follows:
* 0D Topology
  * POINT = a point is space.
  * VERTEX = a location in space associated with a single POINT.
* 1D Topology
  * EDGE = a line or curve bounded by start and end VERTICES.
  * WIRE = a set of one or more connected EDGES, either open or closed.
* 2D Topology
  * FACE = a face bounded by a closed WIRE, with zero or more holes each bounded by a closed WIRE.
  * SHELL = a set of one or more connected FACES, either open or closed. 

VERTICES, WIRES and SHELLS can be instantiated as geometric entities. 

### POINT Entities
The base data to which everything else is connected is a set of points in space. 

### WIRE Entities
Each WIRE has:
* a set of connected EDGES (implicit), each of which has
* a sequence of VERTICES (implicit), each of which is
* associated with a single (implicit) POINT.

### SHELL Entities
Each SHELL has:
* a set of connected FACES (implicit), each of which has
** a set of connected EDGES (implicit), each of which has
** a sequence of VERTICES (implicit), each of which is
* a set of closed WIRES (implicit), each of which has
** a set of connected EDGES (implicit), each of which has
** a sequence of VERTICES (implicit), each of which is
* each vertex is associated with a single (implicit) POINT.

### Shared Entities
Multiple geometric entities can reference the same POINTS. For example, a box can be created that has 8 points and 24 vertices (6 faces x 4 vertices). Each POINT is therefore referenced by three vertices. 

However, higher level entities cannot be shared. For example, an EDGE cannot be part of two faces. Thus, if two faces have EDGES touching, then the POINTS can be shared, but there will still be seperate EDGES, each with its own VERTICES. 

## Geomety
The geometric entities together with their type identifiers are as follows:
* 0D VERTEX entities:
  * 0 - Acorn
  * 1 - Ray
  * 2 - Plane
* 1D WIRE entities:
  * 100 - Polyline
  * 120 - NURBS curve
  * 121 - Bezier curve
* 2D SHELL entities:
  * 200 - Polygon Mesh (can be non-planar, being tested...)
  * 220 - NURBS Surface
  * 221 - Bezier Surface

More geometric entities may be added in the future.

Other higher level topological entities (such as solids and compound solids) can be created using *collections*. See below for more details. 

### Implicit Entities
In order to ensure that the file format is efficient and compact, internal entities are not explicitly represented. They nevertheless still exist implicitly. For example, a polygonal mesh has an explicitly defined SHELL, but the FACES, WIRES, EDGES, VERTICES and POINTS are all implicit. 

## Semantics
Semantic information can be added to the model in two ways:

1. by specifying *attributes* linked to geometric entities at specific topological levels, and/or
1. by specifying *properties* linked to nested collections of geometric entities.   

These two approaches to adding semantics to a model are based on existing approaches in specific domains. Attributes are similar to the way sematics are specified in existing geospatial file formats such as geojson. However, in gs-JSON, the concept of attributes has been further generalised, allowing them to be added to topological levels that are implicit within the geometry. Properties are similar to the way semantics are specified in existing product modelling file formats such as the various STEP formats. Geometric entities can be groups into collections, and possible organised into part-whole hierarchies, with properties being specified for each level of the hierarchy. However, gs-JSON does not specify any domain-specific semantics.

# JSON Encoding of Geometry
Within a gs-JSON file, the all geometry is defined in a single *entities* array containing three sub-arrays, as follows:
```javascript
"geometry": [
	[...],
	[...],
	[...],
	//...
]
```
## Entities Arrays
Entities are represented using integer arrays, consisting of three elements as follows: 
* [wires], [faces], [parameters]]

### Polylines
A polyline is defined as follows:
* [[[0,1,2,3,0]], [], [100]]

This represents the following:
1. a single wire, with point indices 0,1,2,3,0 (since the first and last are the same, it must be closed.)
1. no faces
1. one parameter, type = 100, i.e. polyline.

Polylines can be open or closed. A closed polyline is not the same as a polygon. 

### Polygon Meshes
A polygon mesh is defined as follows:
* [[[60,61,62,63,60]], [[60,61,63,60], [61,62,63,61]], [200]]

This represents the following:
1. a single closed wire with 4 point indices 60,61,62,63,60
1. two triangular faces 60,61,63,60 and 61,62,63,61
1. one parameter, type = 200, i.e. polygon mesh

Polygon meshes have faces and wires, both of which are always closed. The wires represent the naked edges of the mesh. A mesh with no wires is a solid. 

# JSON Encoding of Semantics
Within a js-JSON file, all semantics is defined in a two arrays, as follows:
```javascript
"attributes":  [ 
	{...},
	{...},
	{...},
	//...
],
"collections": [ 
	{...},
	{...},
	{...},
	//...
]
```

The attributes and collections arrays each contain objects that define the semantics.

## Attribute Objects
Attributes objects are defined as follows:
* {"uuid"="xxx", "name"="my_attrib", "topology"="xxx", "values"=[...], "map"=[...] }

*topology* can be "points", "vertices", "edges", "wires", "faces", and "shells".

*values* is an array the defines the set of values that will be assigned to the geometric entities. The values can be any valid JSON type.

*map* is an array of indices, whose length is equal to the number of geometric entities.  

### Viewer Attributes
Certain POINT attributes may be recognised by the viewer. (This of course dpeends on the implementation of the viewer.)
 
* position - the position of the point, in 3d [x,y.z] or 2d [x,y].
* normal - the point normal vector, in 3d [x,y.z].
* colour - the point colour, as [r,g,b].
* xform - the point transformation matrix. (See https://threejs.org/docs/#api/math/Matrix4 for more information about the transformation matrix form.)
 
## Collections Objects
A collection can contain:
* geometric entities (explicit and implicit), and/or
* other collections.

Collections are homogeneous. All the entities in a collection must be of the same type. So for eample, if a collection contains EDGES, then all entities in that cillection will be EDGES. However, since collections can also contain other collections, it is still possible to group together non-homogeneous entities. For example, a collection can contain two other collectiosn, one EDGES and the other SHELLS. 

Collections objects are defined as follows: 
* {"uuid"="xxx", "name"="my_coll", "typology"="xxx", "entities"=[...], "collections"=[...], "properties"={"key1":value1, "key2":value2, ...}}

*typology* is either "points", "vertices", "edges", "wires", "shells", "collections", or "none". 

*entities* is ...

*properties* is an object containing a set of key-value pairs. The key is a string, and is the name of the property. The value can be any valid JSON type. 

# Example
WORK IN PROGRESS.

There are some examples files here:
* https://github.com/phtj/gs-JSON/tree/master/tests


