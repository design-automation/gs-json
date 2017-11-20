import * as gsj from "./gs-json";

export function test_setPointPosition():boolean {
    let model:gsj.IModel = new gsj.Model();
    let point:gsj.IPoint = model.getGeom().addPoint([11,22,33]);
    point.setPosition([4,5,6]);
    let pos:number[] = point.getPosition();
    return gsj.Arr.equal([4,5,6], pos);
}

let data: gsj.IModelData = {
    "metadata": {
            "filetype": "mobius",
            "version": 0.1,
            "crs": { "epsg": 3857 },
            "location": "+40.6894-074.0447"
        },
    "points":[
            [0, 1, 2, 3],
            [[-0.7794438004493713, -1.0, 0.0], [0.22055619955062866, -1.0, 0.0], [0.22055619955062866, -1.0, 3.0]]
        ],
    "objects": [
        [
            [[16, 17, 18, 19, 20, 21]],
            [],
            [100]
        ]
    ],
    "attribs": [
        {
            "name": "Name_3",
            "geom_type": "vertices",
            "data_type":"number",
            "map": [[[0, 1, 2, 3, 4, 5], []], [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], []], [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], []], [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], []], [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], []], [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []], [[0, 1, 2, 3], []]],
            "values": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
        }
    ],
    "groups": [
        {
            "name": "boxes",
            "objs": [[6], [7]]
        }
    ]
};

//let path1:gsj.IGeomPath = new gsj.GeomPath(1, gsj.EGeomType.faces, 2, gsj.EGeomType.vertices, 3);

// let path1: gsj.IPath = {
//     "id":24,
//     "topo_type": gsj.ETopoType.points,
//     "topo_num": 908,
//     "topo_subtype": gsj.ETopoType.points,
//     "topo_subnum": 904
// }


export function test1():void{
    let m1:gsj.Model = new gsj.Model();
    m1.setData(data);
    // let e1:gsj.Entity = new gsj.Entity(m1.getGeom()); //constructor
    // e1.getGeom(); //method 1
    // e1.getModel(); //method 2
}
//test1(); //OK

export function test2():void{
    let m2:gsj.Model = new gsj.Model();
    m2.setData(data);
    let P1:gsj.Point = new gsj.Point(m2.getGeom(),1); // constructor
    // P1.getPath(); //set of methods
    P1.setPosition([2,2,4]);
    P1.getPosition();
    P1.getAttribNames();
    P1.setAttribValue("Name_1",9);
    P1.getAttribValue("Name_1");
}
//test2(); //OK
