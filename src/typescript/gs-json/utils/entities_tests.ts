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
    let pos = point.getPosition();
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
            "name": "position",
            "topo_type": "points",
            "data_type": "number[]",
            "map": [0, 1, 2, 3],
            "values": [[-0.7794438004493713, -1.0, 0.0], [0.22055619955062866, -1.0, 0.0], [0.22055619955062866, -1.0, 3.0]]
        }
    ],
    "groups": [
        {
            "name": "boxes",
            "objs": [[6], [7]]
        }
    ]
};

export function test1():void{
    let m1:Model = new Model();
    m1.setData(data);
    let e1:Entity = new Entity(m1.getGeom()); //constructor
    e1.getGeom(); //method 1
    e1.getModel(); //method 2
}
test1() //OK
