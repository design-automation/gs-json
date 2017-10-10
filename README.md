# gs-JSON

gs-JSON is a domain agnostic unifying 3D file format for geometric and semantic modelling (hence the 'gs'). 

# Conceptual Model
gs-JSON conceptual model uses topology as the organising framework for defining both geometry and semantics.

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
  * FACE = a surface bounded by a closed WIRE, with zero or more holes each bounded by a closed WIRE.

### Wire Entities
Each WIRE has:
* a set of connected EDGES (implicit), each of which has
* a sequence of VERTICES (implicit), each of which is
* associated with a single (implicit) POINT.

### Face Entities
Each FACE has:
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
* 2D FACE entities:
  * 200 - Polygon (with holes, being tested...)
  * 201 - Mesh (being tested...)
  * 220 - NURBS Surface
  * 221 - Bezier Surface

More geometric entities may be added in the future.

Other higher level topologies (such as shells, solids, and compound solids) can be created using *collections*. See below for more details. 

### Implicit Entities
In order to ensure that the file format is efficient and compact, internal entities are not explicitly represented. They nevertheless still exist implicitly. For example, a polygonal has an explicitly defined FACE, but the WIRES, EDGES, VERTICES and POINTS are all implicit. 

## Semantics
Semantic information can be added to the model in two ways:

1. by specifying *attributes* linked to geometric entities at specific topological levels, and/or
1. by specifying *properties* linked to nested collections of geometric entities.   

These two approaches to adding semantics to a model are based on existing approaches in specific domains. Attributes are similar to the way sematics are specified in existing geospatial file formats such as geojson. However, in gs-JSON, the concept of attributes has been further generalised, allowing them to be added to topological levels that are implicit within the geometry. Properties are similar to the way semantics are specified in existing product modelling file formats such as the various STEP formats. Geometric entities can be groups into collections, and possible organised into part-whole hierarchies, with properties being specified for each level of the hierarchy. However, gs-JSON does not specify any domain-specific semantics.

# JSON Encoding of Geometry
Within a gs-JSON file, the all geometry is defined in a single array containing four sub-arrays, as follows:
```javascript
"geometry": {

        "pointcount": 444,
        "vertexcount": 555,
        "edgecount": 44,
        "wirecount": 22,
        "facecount": 11,
	
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
		[  //FACE entities array
			[...],
			[...],
			[...],
			//...
		] 
	]
}
```
## Entities Arrays
For maximum compactness, entities are represented using integer arrays, consisting of three elements as follows: 
* [type, [array of point indices], [array of additional parameters]]

So, for example, a polyline is defined as follows:
* [100, [0,1,2], [0]]

This represents the following:
1. type = 100, i.e. polyline
1. point indices = [0,1,2] 
1. additional parameters = 0, an open polyline

If the entity has no additional parameters, then the third element may be an empty array. 

### Indexing Method for Entities
In order to identify specific entities in the entities array, a special type of *entity index array* is used.

The basic form of the indexing arrays is as follows:
* [topology_index, ....]

The *topology index* refers to one of the four sub-arrays: either the POINTS, VERTICES, WIRES or FACES. The value must therefore be in the range [0-4].

The entity index array referes to specific geometric entities or ranges of entities. The first element in the array is the *topology index*, which identifies the topological level. This is followed by indices that dig down into the geometry, through the topological levels. The basic form of these arrays are as follows:
* For indexing VERTEX entities: [0, vertex_index, implicit_point_index]
* For indexing WIRE entities:   [1, wire_index, implicit_edge_index, implicit_vertex_index, implicit_point_index]
* For indexing FACE entities:   [2, face_index, implicit_wire_index, implicit_edge_index, implicit_vertex_index, implicit_point_index]

The *implicit_point_index* must be 0 (assumng it has not been truncated). This is because a vertex can only have one point. For straight line polygonal geometry, the *implicit_edge_index* must be either 0 or 1, since straight line edges can only have two vertices.

An entity index array may be truncated.
For example, 
* wire 0, edge 2, vertex 1, point 0:
  * [1,0,2,1,0]
* face 0, wire 1, edge 2:
  * [2,0,1,2] 

An entity index value may use right side indexing, i.e. negative numbers (c.f. Python slicing).
For example:
* face 0, wire 1, last edge:
  * [2,0,1,-1]

An entity index value may be 'null', indicating that the level should be skipped.
For example:
* face 0, skip wires, skip edges, vertex 10:
  * [2,0,null,null,10]

An entity index value may specify a range, as follows: [from, to, step]. The 'step' may be omitted, in which case it is assumed to be 1. 
For example:
* face 0, wire 1, edges 2 to 4:
  * [2,0,1,[2,4]]
* face 0, wire 1, last three edges:
  * [2,0,1,[-3,-1]]
* face 0, wire 1, all edges:
  * [2,0,1,[0,-1]]

The above may all be combined.
For example:
* face 0, skip wires, every other edge, start vertex:
  * [2,0,null,[0,-1,2],0]

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

### Viwer Point Attributes
Certain POINT attributes may be recognised by the viewer. (This of course dpeends on the implmentation of the viewer.)
 
* position - the position of the point, in 3d [x,y.z] or 2d [x,y]
* normal - the point normal vector, in 3d [x,y.z]
* colour - the point colour, as [r,g,b]
* xform - the point transformation matrix

(See https://threejs.org/docs/#api/math/Matrix4 for more informatio about the transformation matrix form.)
 
## Collections Objects
A collection can contain:
* geometric entities (explicit and implicit), and/or
* other collections.

Collections objects are defined as follows: 
* {"uuid"="xxx", "name"="my_coll", "entities"=[...], "collections"=[...], "properties"={"key1":value1, "key2":value2, ...}}

*Entities* is an array of integer indexes that point back into specific geometric entities. These entities may be both explicit or implicit entities (i.e. FACES, WIRES, EDGES, VERTICES, and POINTS), and may be mixed. The method of indexing these entities is described in more detail in the section 'Indexing Method for Entities' above. 

*Collections* is an array of strings, which must all be names of other collections. These other collections must all have beend defined earlier in the collections array. 

*Properties* is an object containing a set of key-value pairs. The key is a string, and is the name of the property. The value can be any valid JSON type. 

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

		"pointcount": 444,
		"vertexcount": 555,
		"edgecount": 44,
		"wirecount": 22,
		"facecount": 11,
		
		"entities": [
			[ //VERTEX entities
				[0, [0], []],	        //acorn	 [type, [origin vtx], []]
				[1, [1], [1,1,1]],	//ray	 [type, [origin vtx], [ray vector]]
				[2, [2], [1,0,0]]	//plane	 [type, [origin vtx], [plane normal vector]]
				//...
			],
			[ //WIRE entities
				[100, [0,1,2,3], [0]],	  //open polyline, open (7 edges)	 [type, [vtxs], [open_closed]]
				[100, [7,8,9,10], [1]],	  //3d closed polylines (4 edges)		 [type, [vtxs], [open_closed]]
				//...
			],
			[ //FACE entities
				[200, [50,51,52,53], []],	 //polygon		[type, [[periphery vtxs]], []]
				[200, [60,61,62], [70,71,72]],	 //polygon with a hole	[type, [[periphery vtxs],[hole 1 vtxs]]]
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
			{//some data attached to all the implicit POINTS 
				"uuid":"xxxxx",
				"name":"trees",
				"topology":"points", 
				"values": [
					["raintree",  [1,3,5,6,7,8,11,...]],
					["oaktree",	  [2,3,20,22,...]],
					//...
				]
			},
			{//some data attached to all the implicit EDGES
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
			{//some data attached to all the FACES
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
				"name":"materials",
				"topology":"faces"
				"values": [
					[0, [1,2,4,6,7]],
					[1, [8,9,12,44,66]],
					[2, [55,77]],
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
				"name":"normals":
				"topology":"vertices"
				"values": [
					[[0.0,0.0,1.0], [1,3,5,7,9,...]],
					[[0.0,1.0,1.0], [2,4,6,8,...]],
					[[1.0,0.0,1.0], [10,20,30,40,...]],
					//....
				]
			}
		},
		"collections": {
			{//Empty collection (which is ok), it has some properties
				"uuid":"xxxxx", 
				"name":"no_geometry",
				"properties": {"key1":value1, "key2":value2, ...},
			},
			{//A collection containing two EDGES. It has no properties (which is ok).
				"uuid":"xxxxx",	 
				"name":"some_edges", //user defined name
				"entities":[
					[2,0,0,[0,-1,2]] //first face, first wire, every other edge (uses ranges)
				], 
			},
			{//A collection containing two WIRES
				"uuid":"xxxxx", 
				"name":"two_wires",
				"entities":[
					[2,1,[0,1]] //second face, first two wires (periphery and hole)
				], 
				"properties": {"key1":value1, "key2":value2, ...}
			},
			{//A collection containing some other collections.
				"uuid":"xxxxx", 
				"name":"coll_of_colls",
				"collections":["no_geometry", "some_edges"],
				"properties": {"key1":value1, "key2":value2, ...}
			},
			{//A collection containing some random stuff.
				"uuid":"xxxxx", 
				"name":"everything_all_mixed_up",
				"entities": [
					[0,[0,2]],	//three vertices
					[1,[0,1],0],	//two edges, in different wires
					[2,0,0,1]	//second edge in first face
				]
				"collections":["coll_of_colls"],			//a collection
				"properties": {"key1":value1, "key2":value2, ...}
			}
		}
	}
	//---------------------------------------------------------------------------------------------
}
````
