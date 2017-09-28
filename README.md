# gs-JSON

gs-JSON is a domain agnostic spatial modelling file format that integrates geometry and semantics. Geometry includes both polygonal and spline based geometric entities. Semantics consists of key-value pairs linked to entities in the model in two ways:
1. by specifying *attributes* linked to geometric entities at specific topological levels, and/or
1. by specifying *properties* linked to nested collections of geometric entities.   

These two approaches (attributes and properties) to adding semantics to a model are based on existing approaches in specific domains. Attributes are similar to the way sematics are specified in existing geospatial file formats such as geojson. However, in gs-JSON, the concept of attributes have been further generalised, allowing them to be added to topological levels that are implicit within the geometry. Properties are similar to the way semantics are specified in existing product modelling file formats such as the various STEP formats. Geometric entities can be groups into collections, and possible organised into part-whole hierarchies, with properties being specified for each level of the hierarchy. However, gs-JSON does not specify any domain-specific semantics. 

# Geometry
Geometric entities are interconnected into a topological hierarchy. 

## Topological Hierarchy
The topological hierarchy is follows:
* 0D Topology
  * POINT = a point is space.
  * VERTEX = a geometric node linked to a POINT.
* 1D Topology
  * EDGE = a line or curve bounded by start and end VERTICES.
  * WIRE = a set of one or more connected EDGES, either open or closed.
* 2D Topology
  * FACE = a surface bounded by a closed WIRE, with zero or more holes each bounded by a closed WIRE.

#### Wires
Each WIRE has:
* a set of connected EDGES (implicit), each of which has
* a sequence of VERTICES (implicit), each of which is
* associated with a single point.

#### Faces
Each FACE has:
* a set of closed WIRES (implicit), each of which has
* a set of connected EDGES (implicit), each of which has
* a sequence of VERTICES (implicit), each of which is
* associated with a single point.
    
#### Implicit Entities
In order to ensure that the file format is efficient and compact, internal entities are not explicitly represented. They nevertheless still exist implicitly. For example, a polygonal has an explicitly defined FACE and POINTS, but the WIRES, EDGES and VERTICES are all implicit. 

Other higher level topologies (such as shells, solids, and compound solids) can be created using *collections*. See below for more details. 

## Geometric Entities
The geometric entities are as follows:
* 0D VERTICES:
  * 0 - Acorn
  * 1 - Ray
  * 2 - Plane
* 1D WIRES, an array of:
  * 100 - Polyline
  * 130 - NURBS curve
  * 131 - Bezier curve
* 2D FACES:
  * 200 - Polygon
  * 230 - NURBS Surface
  * 231 - Bezier Surface

More geometric entities may be added in the future.

#### Point Arrays
All geometric entities references arrays of POINTS. Multiple geometric entities can reference the same POINTS. For example, a box can be created that has 8 points and 24 vertices (6 faces x 4 vertices). Each POINT is therefore referenced by three vertices. 

POINTS may be defined using different coordinate systems (2D, 3D, cartesian, polar, spherical). For example, a 2D cartesian POINTS array may look like this:
* [[0.1,0.2],[0.3,0.4], ...]

Each POINT array is associated with a transformation matrix that will transform the points in the array into the global 3D cartesian coordinate system. The origin of this global coordinate system is located at the *location* specific in the metadata. 

VERTICES index the POINTS in the point arrays as follows:
* [array number, point number]

#### Wire/Face Arrays
For maximum compactness, WIRES and FACES are represented using integer arrays, consisting of three elements as follows: 
* [type, [point indices], additional parameters]

So, for example, a polyline is defined as follows:
* [100,[[0,0],[0,1],[0,2],[0,3]],0]

This represents the following:
1. type = 100, i.e. polyline
1. point indices = [[0,0],[0,1],[0,2],[0,3]], referring to the arrays of points. 
1. additional parameters = 0, open polyline

The third element may in some cases be omitted. 
For example, a polygon has no parameters. 

# Semantics
Semantic information can be added to the model in two ways: *attributes* and *collections*. 

## Attributes
Attributes can be defined for POINTS, VERTICES, EDGES, WIRES and FACES. When an attribute is defined, all entities of that type will be assigned a value.

The array of values may typically be sparse (i.e. there may be many 'null' values) and may contain many repeat values. An efficient reveresed list is sued, where the first item is the value and the second item is an array of entity indexes. (Using JSON objects does not work, since keys that are not strings will cause problems.)

For example, for the arry of values below:
* [null,'a','b','c','a',null,null,null,'b','c','b','c','a','b','b','c',null,null]

The represented is as follows: 
* [["a",[1,4,12]],["b",[2,8,10,13,14]],["c",[3,9,11,15]]]

## Collections
Collections can have user defined properties, which are define as key-value pairs. 

A collection can contain:
* a set of entities (possibly mixed topologival types, including implicit entities), and
* other collections.

The set of entities inside a collection are defined by indexing the geometry (i.e. the FACES, WIRES, EDGES, VERTICES, and POINTS). 

#### Indexing Geometry
In order to identify the entities and sub-entities in a collection, indexing arrays are used.

The basic form of these arrays is as follows:
* For WIRES: [wire_number, edge_number, vertex_number]
* For FACES: [face_number, wire_number, edge_number, vertex_number]

For example:
* wire 0, edge 1, vertex 0:
  * [0,1,0] 
* face 0, wire 1, edge 2, vertex 0:
  * [0,1,2,0] 

An index array may be truncated.
For example, 
* face 0, wire 1, edge 2:
  * [0,1,2] No need to specify any vertices.

An index value may use right side indexing, i.e. negative numbers (c.f. Python slicing).
For example:
* face 0, wire 1, last edge:
  * [0,1,-1]

An index value may be 'null', indicating that the level should be skipped.
For example:
* face 0, skip wires, skip edges, vertex 10:
  * [0,null,null,10]

An index value may specofy a range, as follows: [from, to, step]. The 'step' may be omitted, in which case it is assumed to be 1. 
For example:
* face 0, wire 1, edges 2 to 4:
  * [0,1,[2,4]]
* face 0, wire 1, last three edges:
  * [0,1,[-3,-1]]
* face 0, wire 1, all edges:
  * [0,1,[0,-1]]

The above may all be combined.
For example:
* face 0, skip wires, every other edge, start vertex:
  * [0,null,[0,-1,2],0]

# Example

WORK IN PROGRESS.

Note: javascript comments are used in these examples even though comments are not technically allowed in JSON.

```javascript
{
    //---------------------------------------------------------------------------------------------
    "metadata": {
	    "filetype":"mobius",
            "version": 1.0,
            "schema":"xxx",
            "crs": {"epsg":3857},
	    "location": "+40.6894-074.0447" //ISO 6709, ±DD.DDDD±DDD.DDDD degrees format
    },
    //---------------------------------------------------------------------------------------------
    "skins": {
        //See https://github.com/mrdoob/three.js/wiki/JSON-Texture-format-4
        "images": [],    //based on three.js
        "textures": [],  //based on three.js
        "materials": [  //based on three.js
            {...},
            {...},
            {...}
        ], 
    }
    //---------------------------------------------------------------------------------------------
    "geometry": {
        "points": [
	    [
                [[1.2,3.4],[5.6,7.8],[9.10,11.12], ....],            //array of 2d [x,y] coordinates
	        [1,0,0,20, 0,1,0,0, 0,0,1,0, 0,0,0,1]                //point transformation matrix, 4x4
	    ],
	    [
                [[0.1,0.2,0.3],[1.4,1.5,1.6],[2.7,2.8,2.9], ....],   //array of 3d [x,y,z] coordinates
	        [1,0,0,30, 0,1,0,0, 0,0,1,0, 0,0,0,1]                //point transformation matrix, 4x4
	    ],
	    [
                [[1.1,1.2,1.3],[2.4,2.5,2.6],[3.7,3.8,3.9], ....]    //array of 3d [x,y,z] coordinates
	        [1,0,0,40, 0,1,0,0, 0,0,1,0, 0,0,0,1]                //point transformation matrix, 4x4
	    ]
        ]
        "vertices": [
            [0, [0,0]],            //acorn   [type, [origin vtx_id]]
            [1, [0,0], [1,1,1]],   //ray     [type, [origin vtx_id], [ray vector]]
            [2, [1,1], [1,0,0]]    //plane   [type, [origin vtx_id], [plane normal vector]]
	    //...
        ]
        "wires": [
            [100, [[0,0],[0,1],[0,2],[0,3]], 0],   //planar open polyline, open (3 edges)  [type, [vtx_ids], [open_closed]]
            [100, [[1,0],[1,1],[1,2],[1,3]], 1],   //3d closed polylines (4 edges)         [type, [vtx_ids], [open_closed]]
	    //...
        ]
        "faces": [
            [200, [[[2,50],[2,51],[2,52],[2,53]]]],                //polygon              [type, [[periphery vtx_ids]], []]
            [200, [[[1,60],[1,61],[1,62]],[[1,3],[1,4],[1,5]]]],   //polygon with a hole  [type, [[periphery vtx_ids],[hole 1 vtx_ids],[hole 1 vtx_ids]]]
	    //...
        ]
    }
    //---------------------------------------------------------------------------------------------
    "semantics": {
        "attributes": [
            {//some data attached to all the POINTS 
                "uuid":"xxxxx",
                "name":"trees",
                "level":"points", 
                "values": [
                    ["raintree",  [1,3,5,6,7,8,11,...]],
                    ["oaktree",   [2,3,20,22,...]],
                    //...
                ]
            },
            {//some data attached to all the implicit EDGES
                "uuid":"xxxxx",
                "name":"construction",
                "level":"edges" 
                "values": [
                    ["timber",   [5,23,67,99,...]],
                    ["steel",    [25,27,44,52,...]],
                    ["concrete", [1,45,46,87,...]],
                    //...
                ]
            },
            {//some data attached to all the FACES
                "uuid":"xxxxx",
                "name":"insolation",
                "level":"faces" 
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
                "level":"faces"
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
                "level":"vertices"
                "values": [
                    [[0.3,0.2,0.4], [1,2,4,6,7]],
                    [[0.7,0.2,0.3], [8,9,12,44,66]],
                    //...
                ]            
            },
            {//the viewer may "recognise" this attrib and render the geometry accordingly
                "uuid":"xxxxx",
                "name":"normals":
                "level":"vertices"
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
                "faces":[[0,0,[0,-1,2]]], //first face, first wire, every other edge (uses ranges)
            },
            {//A collection containing two WIRES
                "uuid":"xxxxx", 
                "name":"two_wires",
                "faces":[[1,0],[1,1]],
                "properties": {"key1":value1, "key2":value2, ...}
            },
            {//A collection containing some other collections.
                "uuid":"xxxxx", 
                "name":"coll_of_colls",
                "collections":["no_geometry", "one_vertex"],
                "properties": {"key1":value1, "key2":value2, ...}
            },
            {//A collection containing some random stuff.
                "uuid":"xxxxx", 
                "name":"everything_all_mixed_up",
                "vertices":[0,1,2],                         //three vertices
                "wires":[[0,1],[1,0]],                      //two edges, in wires
                "faces":[[0,0,1],[1,1,0]],                  //another two edges, in faces
                "collections":["coll_of_colls"],            //a collection
                "properties": {"key1":value1, "key2":value2, ...}
            }
        }
    }
    //---------------------------------------------------------------------------------------------
}
````
