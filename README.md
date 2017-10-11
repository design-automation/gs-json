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

### WIRE Entities
Each WIRE has:
* a set of connected EDGES (implicit), each of which has
* a sequence of VERTICES (implicit), each of which is
* associated with a single (implicit) POINT.

### SHELL Entities
Each SHELL has:
* a set of connected FACES (implicit), each of which has
* a set of closed WIRES (implicit), each of which has
* a set of connected EDGES (implicit), each of which has
* a sequence of VERTICES (implicit), each of which is
* associated with a single (implicit) POINT.

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
"geometry": {
        "counts": [444,555,44,22,11],
	"entities": [
		[  //VERTEX entities array
			[...],
			[...],
			[...],
			//...
		],
		[  //WIRE entities array
			[...],
			[...],
			[...],
			//...
		],
		[  //SHELL entities array
			[...],
			[...],
			[...],
			//...
		] 
	]
}
```
## Entities Arrays
Entities are represented using integer arrays, consisting of three elements as follows: 
* [type, [array of point indices], [array of additional parameters]]

So, for example, a single polyline is defined as follows:
* [100, [0,1,2], [0]]

This represents the following:
1. type = 100, i.e. polyline
1. point indices = [0,1,2] 
1. additional parameters = 0, an open polyline

If the entity has no additional parameters, then the third element may be an empty array. 

### Indexing Method for Entities
In order to identify specific entities in the entities array, a simple integer index is used.

For explicit geometry such as WIRES and SHELLS, these indexes refer directly to the position in an array of of geometric elements. For example, the SHELL with index 100 simply refers to the SHELLS array. 

For implicit geometry such as POINTS, VERTICES, and EDGES, a conversion will need to be performed. A simple way to implement the conversion is to instantiate all implicit entities. For example, for EDGE number 100, the conversion would create an array of all edges in the model, and then select edge number 100. However, for large and compelx models, more efficient approaches may need to be considered. 

# JSON Encoding of Semantics
Within a js-JSON file, all semantics is defined in a two arrays, as follows:
```javascript
"semantics": {
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
}
```

The attributes and collections arrays each contain objects that define the semantics.

## Attribute Objects
Attributes objects are defined as follows:
* {"uuid"="xxx", "name"="my_attrib", "topology"="faces", "values"=[...]}

*Topology* can be "points", "vertices", "edges", "wires", and "faces".

*Values* is an array the defines the values for some subset of geometric entities. For example, if "topology"="faces", then the values will be specified for some subset of the faces in the model. The values can be any valid JSON type.

The array of values may typically be sparse (i.e. there may be many 'null' values) and may contain many repeat values. A compact array representation is used, where the first item is the value and the second item is an array of entity indexes. 

For example, lets say a model contains 20 entities, and that these entities are assigned the following values:
* [null,'a','b','c','a',null,null,null,'b','c','b','c','a','b','b','c',null,null,null,null]

The attribute object values array would be as follows: 
* [  ["a",[1,4,12]],  ["b",[2,8,10,13,14]],  ["c",[3,9,11,15]]  ]

Thus, any values that are not specified are assumed to be null.

The values may also consist of an array that point back into specific geometric entities. (For example, in the winged-edge data structure, each edge points to a set of neighbouring edges.) The method of indexing these entities is described in more detail in the section 'Indexing Method for Entities' above. 

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
* {"uuid"="xxx", "name"="my_coll", "typology"="xxx", "entities"=[...], "properties"={"key1":value1, "key2":value2, ...}}

*typology* is either "points", "vertices", "edges", "wires", "shells", "collections", or "none". 

*entities* is an array of integer indexes. If *topology* is "points", "vertices", "edges", "wires" or "shells", then the indexes point back into specific geometric entities at that topological level. If *topology* is "collections", then the indexes point back at  specific collections. (Circular references must be avoided.) If *topology* is "none" then this collection contains no entities (it may be the root of a tree), so *entities* can be omitted. 

*properties* is an object containing a set of key-value pairs. The key is a string, and is the name of the property. The value can be any valid JSON type. 

# Example
WORK IN PROGRESS.

There are some examples files here:
* https://github.com/phtj/gs-JSON/tree/master/tests

Below is an annoted example. Note that javascript style comments are used even though comments are not technically allowed in JSON.

```javascript
{
	//---------------------------------------------------------------------------------------------
	"metadata": {
		"filetype":"mobius",
		"version": 0.1,
		"schema":"xxx",
		"crs": {"epsg":3857},
		"location": "+40.6894-074.0447" //ISO 6709, ±DD.DDDD±DDD.DDDD degrees format
	},
	//---------------------------------------------------------------------------------------------
	"skins": {
		//See https://github.com/mrdoob/three.js/wiki/JSON-Texture-format-4
		"images": [],	 //based on three.js
		"textures": [],	 //based on three.js
		"materials": [	 //based on three.js
			{...},
			{...},
			{...}
		], 
	}
	//---------------------------------------------------------------------------------------------
	"geometry": {
        	"counts": [444,555,44,22,11,5], //number of points, vertices, edges, wires, faces, shells
		"entities": [
			[ //VERTEX entities
				[0, [0], []],	        //acorn	 [type, [origin vtx], []]
				[1, [1], [1,1,1]],	//ray	 [type, [origin vtx], [ray vector]]
				[2, [2], [1,0,0]]	//plane	 [type, [origin vtx], [plane normal vector]]
				//...
			],
			[ //WIRE entities
				[100, [0,1,2,3], [0]],	  //open polyline (3 edges)     [type, [vtxs], [open_closed]]
				[100, [7,8,9,10], [1]],	  //closed polylines (4 edges)  [type, [vtxs], [open_closed]]
				//...
			],
			[ //SHELL entities
				[200, [[50,51,52,53]], []],	       //shell with one polygon	 [type, [[vtxs]], []]
				[200, [[60,61,62], [70,71,72]], []],   //shell with two polygons [type, [[vtxs],[vtxs]], []]
				//...
			]
		]
	}
	//---------------------------------------------------------------------------------------------
	"semantics": {
		"attributes": [
			{//positions of implicit POINTS 
				"name": "position", 
				"topology": "points",
				"values": [
					[[1.1,2.2,3.3],[3]],
					[[4.4,5.5,6.6],[1]], 
					[[7.7,8.8,9.9],[2,5,7,9]], 
					[[10.,10.,10.],[0]], 
					[[11.,11.,11.],[4,6]], 
					[[12.,13.,14.],[8]], 
					//...
				]
			}
			{//some data attached to implicit POINTS 
				"uuid":"xxxxx",
				"name":"trees",
				"topology":"points", 
				"values": [
					["raintree",  [1,3,5,6,7,8,11,...]],
					["oaktree",	  [2,3,20,22,...]],
					//...
				]
			},
			{//some data attached to implicit EDGES
				"uuid":"xxxxx",
				"name":"construction",
				"topology":"edges" 
				"values": [
					["timber",	 [5,23,67,99,...]],
					["steel",	 [25,27,44,52,...]],
					["concrete", [1,45,46,87,...]],
					//...
				]
			},
			{//some data attached to implicit FACES
				"uuid":"xxxxx",
				"name":"insolation",
				"topology":"faces" 
				"values": [
					[123, [1]],
					[567, [2]],
					[264, [3]],
					[422, [4]],
					[124, [5]],
					//...
				]
			},
			{//the viewer may "recognise" this attrib and render the geometry accordingly
				"uuid":"xxxxx",
				"name":"color",
				"topology":"vertices"
				"values": [
					[[0.3,0.2,0.4], [1,2,4,6,7]],
					[[0.7,0.2,0.3], [8,9,12,44,66]],
					//...
				]
			},
			{//the viewer may "recognise" this attrib and render the geometry accordingly
				"uuid":"xxxxx",
				"name":"normals",
				"topology":"vertices",
				"values": [
					[[0.0,0.0,1.0], [1,3,5,7,9,...]],
					[[0.0,1.0,1.0], [2,4,6,8,...]],
					[[1.0,0.0,1.0], [10,20,30,40,...]],
					//....
				]
			}
		},
		"collections": [
			{//Empty collection (which is ok), it has some properties
				"uuid":"xxxxx", 
				"name":"no_geometry",
				"topology":"none",
				"properties": {"key1":value1, "key2":value2, ...},
			},
			{//A collection containing some EDGES. It has no properties (which is ok).
				"uuid":"xxxxx",	 
				"name":"some_edges", //user defined name
				"topology":"edges",
				"entities":[200,300,400,500]
			},
			{//A collection containing some WIRES
				"uuid":"xxxxx", 
				"name":"some_wires", //user defined name
				"topology":"wires",
				"entities":[22,33,44],
				"properties": {"key1":value1, "key2":value2, ...}
			},
			{//A collection containing some SHELLS
				"uuid":"xxxxx", 
				"name":"some_shells", //user defined name
				"topology":"shells",
				"entities":[22,33,44],
				"properties": {"key1":value1, "key2":value2, ...}
			},
			{//A collection containing some other collections.
				"uuid":"xxxxx", 
				"name":"coll_of_colls",
				"topology":"collections",
				"entities":[0,2], 
				"properties": {"key1":value1, "key2":value2, ...}
			},
		]
	}
	//---------------------------------------------------------------------------------------------
}
````
