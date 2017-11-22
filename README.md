[![Build Status](https://travis-ci.org/phtj/gs-json.svg?branch=master)]
# gs-json

gs-json is a domain agnostic unifying 3D file format for geometric and semantic modelling (hence the 'gs'). 

See the API docs: https://phtj.github.io/gs-json

# Conceptual Model
The gs-JSON conceptual model uses topology as the organising framework for defining both geometry and semantics.

Geometry consists of objects, and includes both polygonal and spline based geometry. Semantics consists of data linked to objects and groups of objects in the model.

## Topology
Each geometric object consists of a set of topological components.
The topological component hierarchy is follows:
* 0D Components
  * POINT = a point is space.
  * VERTEX = a location in space associated with a single POINT.
* 1D Components
  * EDGE = a line or curve bounded by start and end VERTICES.
  * WIRE = a set of one or more connected EDGES, either open or closed.
* 2D Components
  * FACE = a face bounded by a closed WIRE, with zero or more holes each bounded by a closed WIRE.
  * SHELL = a set of one or more connected FACES, either open or closed. 

### Points
The base data to which everything else is connected is a set of points in space. 

### Wires
Each wire has:
* a set of connected edges (implicit), and
* a sequence of vertices (implicit), each of which is
* associated with a single (implicit) point.

### Shells
Each shell has topological sub-components: wires and faces.

The wires represent the naked edges of the shell. Since a shell can have holes, there may be more than one. A shell can also have no naked edges, in which case it is closed. Wires have:
* a set of connected edges (implicit), and
* a sequence of vertices (implicit), each of which is
* associated with a single (implicit) point.

The faces have:
* a set of connected edges (implicit) forming a closed loop, each of which has
* a sequence of vertices (implicit).

### Shared Points and Vertices
Vertices can share points. For example, a box can be created that has 8 points and 24 vertices (6 faces x 4 vertices). Each point is therefore referenced by three vertices. 

Edges that belong to the same wire or face share vertices. For example, an open wire with two edges will share have three vertices. The middle vertex will be shared by two edges.

Hhigher level components cannot be shared. For example, an edge cannot be part of two faces. Thus, if two faces have edges touching, then the points can be shared, but there will still be seperate EDGES, each with its own vertices. 

## Geomety
The geometric objects together with their type identifiers are as follows:
* 0D VERTEX objects:
  * 0 - Acorn //not implemented
  * 1 - Ray //not implemented
  * 2 - Plane //not implemented
* 1D WIRE objects:
  * 100 - Polyline
  * 120 - NURBS curve //not implemented
  * 121 - Bezier curve //not implemented
* 2D SHELL objects:
  * 200 - Polymesh
  * 220 - NURBS Surface //not implemented
  * 221 - Bezier Surface //not implemented

More geometric objects may be added in the future.

Other higher level objects (such as solids) can be created using *collections*. See below for more details. 

### Implicit Topology
In order to ensure that the file format is efficient and compact, topological components are not explicitly represented. They nevertheless still exist implicitly. For example, a polygonal mesh has implicit faces, wires, edges, and vertices. 

## Semantics
Semantic information can be added to the model in two ways:

1. by specifying *attributes* linked to the topological components inside obejcts, and/or
1. by specifying *properties* linked to nested groups of geometric objects.   

These two approaches to adding semantics to a model are based on existing approaches in specific domains. Attributes are similar to the way sematics are specified in existing geospatial file formats such as geojson. However, in gs-JSON, the concept of attributes has been further generalised, allowing them to be added to topological components that are implicit within geometric objects. Properties are similar to the way semantics are specified in existing product modelling file formats such as the various STEP formats. Geometric objects can be groups into collections, and possible organised into part-whole hierarchies, with properties being specified for each level of the hierarchy. However, gs-JSON does not specify any domain-specific semantics.

# JSON Encoding of Geometry
Within a gs-JSON file, the all geometry is defined in a single *geometry* array, where each element in the array specified a geometric object, as follows:
```javascript
"geometry": [
	[...],
	[...],
	[...],
	//...
]
```
## Geometric Objects
Objects are represented using integer arrays, consisting of three sub-arrays as follows: 
* [[wires], [faces], [parameters]]

### Polylines
A example of a polyline:
* [[[0,1,2,3,0]], [], [100]]

This represents the following:
1. a single wire, with point indices 0,1,2,3,0 (since the first and last are the same, it must be closed.)
1. no faces
1. one parameter, type = 100, i.e. polyline.

Polylines can be open or closed. A closed polyline is not the same as a polygon. 

### Polygon Meshes
An example of a polygon mesh:
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
"groups": [ 
	{...},
	{...},
	{...},
	//...
]
```

The attributes and groups arrays each define the semantics.

## Attributes
Attributes are defined as follows:
* {"name"="my_attrib", "topo_type"="xxx", "data_type"="xxx", "values"=[...], "values_map"=[...] }

*topo_type* can be "points", "vertices", "edges", "wires", "faces", and "shells".

*data_type* can be "string", "number","boolean","string[]","number[]","boolean[]".

*values* is an array the defines the set of unique values that will be assigned to the geometric objects. The values must follow the data type specified in *data_type*.

*values_map* is an array of indices, whose length is equal to the number of elements.  

### Viewer Attributes
Certain attributes may be recognised by the viewer. (This of course dpeends on the implementation of the viewer.)
 
* position - the position of the point, in 3d [x,y.z] or 2d [x,y].
* normal - the point normal vector, in 3d [x,y.z].
* colour - the point colour, as [r,g,b].
 
## Groups
A group can contain geometric objects. Geometric objects may be contained in more than one group.

Each group can have a single parent group. This allows groups to form a hierarchy. If no parent is defined, the the group is assumed to be a *root* or *top-level* group. 

Groups are defined as follows: 
* {"name"="my_coll", "typology"="xxx", "objects"=[...], "parent"=[...], "props"={"key1":value1, "key2":value2, ...}}

*typology* is either "points", "vertices", "edges", "wires", "shells", "collections", or "none". 

*objects* is an integer array of objects indices. 

*props* is an object containing a set of key-value pairs. The key is a string, and is the name of the property. The value can be any valid JSON type. 

# Example

There are some examples files here:
* https://github.com/phtj/gs-JSON/tree/master/src/assets/gs-json


