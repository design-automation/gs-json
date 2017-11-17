import * as ifs from "../utils/interfaces";
import {Arr} from "./arr";
import {Model} from "../utils/model";
import {Geom} from "./geom";
import {Entity,Point,Obj,Polyline,Polymesh} from "./entities";
import {Topo} from "./topos";
import {Attrib, Path} from "./attribs";
import {Group} from "./groups";

export function test_setPointPosition():boolean {
    let model:ifs.IModel = new Model();
    let point:ifs.IPoint = model.createPoint([11,22,33]);
    point.setPosition([4,5,6]);
    let pos:number[] = point.getPosition();
    return Arr.equal([4,5,6], pos);
}

let data: ifs.IModelData = {
    "metadata": {
            "filetype": "mobius",
            "version": 0.1,
            "crs": { "epsg": 3857 },
            "location": "+40.6894-074.0447"
        },
    "geometry": [
        [
            [[16, 17, 18, 19, 20, 21]],
            [],
            [100]
        ]
    ],
    "attribs": [
        {
            "name": "Name_1",
            "topo_type": "points",
            "data_type": "number[]",
            "map": [0, 1, 2, 3],
            "values": [[-0.7794438004493713, -1.0, 0.0], [0.22055619955062866, -1.0, 0.0], [0.22055619955062866, -1.0, 3.0]]
        },
        {
            "name": "Name_3",
            "topo_type": "vertices",
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

let path1:ifs.IPath = new Path(24, ifs.ETopoType.points, 908, ifs.ETopoType.points, 909);

// let path1: ifs.IPath = {
//     "id":24,
//     "topo_type": ifs.ETopoType.points,
//     "topo_num": 908,
//     "topo_subtype": ifs.ETopoType.points,
//     "topo_subnum": 904
// }


export function test1():void{
    let m1:Model = new Model();
    m1.setData(data);
    let e1:Entity = new Entity(m1.getGeom()); //constructor
    e1.getGeom(); //method 1
    e1.getModel(); //method 2
}
test1(); //OK

export function test2():void{
    let m2:Model = new Model();
    m2.setData(data);
    let P1:Point = new Point(m2.getGeom(),path1); // constructor
    P1.getPath(); //set of methods
    P1.setPosition([2,2,4]);
    P1.getPosition();
    P1.getAttribNames();
    P1.setAttribValue("Name_1",9);
    P1.getAttribValue("Name_1");
}
test2(); //OK
