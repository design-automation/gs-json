import * as gs from "./gs-json";

/**
* A box with one side open.
*/
export let box: gs.IModelData = {
    "metadata": {
        "filetype":"gs-json",
        "version": "0.1.1",
        "crs": {"epsg":3857},
        "location": "+0-0" 
    },
    "geom": {
        "points":[
            [0, 1, 2, 3, 4, 5, 6, 7],
            [
                [-0.7, -1.0, 0.0], 
                [0.2, -1.0, 0.0], 
                [0.2, -1.0, 3.0], 
                [-0.7, -1.0, 3.0], 
                [-0.7, 1.0, 0.0], 
                [0.2, 1.0, 0.0], 
                [0.2, 1.0, 3.0], 
                [-0.7, 1.0, 3.0]
            ]
        ],
        "objs":[
            [
                [
                    [0, 1, 2, 3, -1]
                ],
                [
                    [1, 5, 4, 0, -1], 
                    [2, 6, 5, 1, -1], 
                    [3, 7, 6, 2, -1], 
                    [0, 4, 7, 3, -1], 
                    [5, 6, 7, 4, -1]
                ],
                [200]
            ]
        ]
    }
}
/**
* A box with one side open, with some attributes:
* "test1" is a point attribute of type "number". 
* "test2" is a vertex attribute of type "string". 
* "shell_id" is a faces attribute of type "number". 
* "test3" is a faces attribute of type "number". 
*/
export let box_with_attribs: gs.IModelData = {
    "metadata": {
        "filetype":"gs-json",
        "version": "0.1.1",
        "crs": {"epsg":3857},
        "location": "+0-0" 
    },
    "geom": {
        "points":[
            [0, 1, 2, 3, 4, 5, 6, 7],
            [
                [-0.7, -1.0, 0.0], 
                [0.2, -1.0, 0.0], 
                [0.2, -1.0, 3.0], 
                [-0.7, -1.0, 3.0], 
                [-0.7, 1.0, 0.0], 
                [0.2, 1.0, 0.0], 
                [0.2, 1.0, 3.0], 
                [-0.7, 1.0, 3.0]
            ]
        ],
        "objs":[
            [
                [
                    [5, 4, 5]
                ],
                [
                    [1, 5, 4, 0, -1], 
                    [2, 6, 5, 1, -1], 
                    [3, 7, 6, 2, -1], 
                    [0, 4, 7, 3, -1], 
                    [2, 1, 0, 3, -1], 
                    [5, 6, 7, 4, -1]
                ],
                [200]
            ]
        ]
    },
    "attribs": {
        "points": [
            {
                "name":"test1",
                "geom_type":"points",
                "data_type":"number",
                "values": [
                    [0, 1, 2, 3, 4, 5, 6, 7],
                    [641.600585938, 800.463806152, 510.895019531, 775.474304199, 879.505859375, 205.040100098, 522.06060791, 885.056274414]
                ]
            }
        ],
        "vertices":[
            {
                "name":"test2",
                "geom_type":"vertices",
                "data_type":"string",
                "values": [
                    [[[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []]],
                    ["id_0", "id_1", "id_2", "id_3"]
                ]
            }
        ],
        "faces":[
            {
                "name":"shell_id", 
                "geom_type":"faces",
                "data_type":"number",
                "values": [
                    [[0, 0, 0, 0, 0, 0]],
                    [0]
                ]
            },
            {
                "name":"test3",
                "geom_type":"faces",
                "data_type":"number",
                "values": [
                    [[0, 1, 2, 3, 4, 5]],
                    [2.0, 12.0, 22.0, 32.0, 42.0, 52.0]
                ]
            }
        ]
    }
}
/**
* A box with one side open, with some groups.
*/
export let box_with_groups: gs.IModelData = {
    "metadata": {
        "filetype":"gs-json",
        "version": "0.1.1",
        "crs": {"epsg":3857},
        "location": "+0-0" 
    },
    "geom": {
        "points":[
            [0, 1, 2, 3, 4, 5, 6, 7],
            [
                [-0.7, -1.0, 0.0],//0
                [0.2, -1.0, 0.0], //1
                [0.2, -1.0, 3.0], //2
                [-0.7, -1.0, 3.0],//3
                [-0.7, 1.0, 0.0], //4
                [0.2, 1.0, 0.0],  //5
                [0.2, 1.0, 3.0],  //6
                [-0.7, 1.0, 3.0]  //7
            ]
        ],
        "objs":[
            [
                [
                    [0, 1, 2, 3, -1]  //opening 0
                ], 
                [
                    [1, 5, 4, 0, -1], //floor 0
                    [2, 6, 5, 1, -1], //wall  1
                    [3, 7, 6, 2, -1], //roof  2
                    [0, 4, 7, 3, -1], //wall  3
                    [5, 6, 7, 4, -1]  //wall  4
                ],
                [200]
            ]
        ]
    },
    "groups": [
        {
            "name":"building_obj",
            "objs": [0],
            "props":[["descr","The building object, that has wire and faces."]]
        },
        //groups with topo
        {
            "name":"building_all_faces",
            "topos": [
                [[0,[0,1,2,3,4]]], //obj 0, all faces
                [],
                [],
                [],
                [],
                []
            ], 
            "props":{"descr":"Three walls, a floor and a roof."}
        },
        // {
        //     "name":"walls",
        //     "parent":"building_obj",
        //     "topos": [
        //         [[0,[1,3,4]]], //obj 0, faces 1,3,4
        //         [],
        //         [],
        //         [],
        //         [],
        //         []
        //     ], 
        //     "props":{"descr":"Three walls."}
        // },
        // {
        //     "name":"floor",
        //     "parent":"building_obj",
        //     "topos": [
        //         [[0,[0]]], //obj 0, face 0
        //         [],
        //         [],
        //         [],
        //         [],
        //         []
        //     ] 
        // },
        // {
        //     "name":"roof",
        //     "parent":"building_obj",
        //     "topos": [
        //         [[0,[2]]], //obj 0, face 2
        //         [],
        //         [],
        //         [],
        //         [],
        //         []
        //     ] 
        // },
        // {
        //     "name":"winodw_openings",
        //     "parent":"building_obj",
        //     "topos": [
        //         [],
        //         [[0,[0]]], //obj 0, wire 0
        //         [],
        //         [],
        //         [],
        //         []
        //     ] 
        // },
        // {
        //     "name":"vertical_edges_of_faces",
        //     "parent":"building_obj",
        //     "edges": [
        //         [0,1,1,1,3], //obj 0, edges 1,3 in face 1
        //         [0,1,3,1,3], //obj 0, edges 1,3 in face 3
        //         [0,1,4,0,2]  //obj 0, edges 0,2 in face 4
        //     ]
        // },
        // {
        //     "name":"vertices_on_ground",
        //     "parent":"building_obj",
        //     "vertices": [
        //         [0,0,0,0,1], //obj 0, wires, wire 0, vertices 0,1
        //         [0,1,0],     //obj 0, faces, face 0, all vertices
        //         [0,1,1,2,3], //obj 0, faces, face 1, vertices 2,3
        //         [0,1,3,0,1], //obj 0, faces, face 3, vertices 0,1
        //         [0,1,4,0,3]  //obj 0, faces, face 4, vertices 0,3
        //     ]
        // },
        {
            "name":"points_on_ground",
            "parent":"building_obj",
            "points": [0,1,4,5]
        }
    ]
}