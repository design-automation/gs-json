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

    // let m1:gsj.Model = new gsj.Model();
    // return true;

    // m1.setData(data);
    // let e1:gsj.Entity = new gsj.Entity(m1.getGeom()); //constructor
    // e1.getGeom(); //method 1
    // e1.getModel(); //method 2

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



// Entities tests, 1 constructor and 8 methods
export function test_ent_constructor():boolean {
    return true;
}
export function test_ent_getGeom():boolean {
    return true;
}
export function test_ent_getID():boolean {
    return true;
}
export function test_ent_getModel():boolean {
    return true;
}
// export function test_ent_getGeomType():boolean { //This method cannot be tested.
//     return true;
// }
export function test_ent_getAttribNames():boolean {
    return true;
}
export function test_ent_getAttribValue():boolean {
    return true;
}
export function test_ent_setAttribValue():boolean {
    return true;
}
export function test_ent_getGroupNames():boolean {
    return true;
}


// Point tests, extends Entities by 4 complementary methods
export function test_point_getGeomType():boolean {
    return true;
}
export function test_point_setPosition():boolean {
    return true;
}
export function test_point_getPosition():boolean {
    return true;
}
export function test_point_getVertices():boolean {
    return true;
}

// Object tests, extends Entities by 6 complementary methods
export function test_obj_getGeomType():boolean {
    return true;
}
// export function test_obj_getObjType():boolean { //This method cannot be tested.
//     return true;
// }
export function test_obj_getVertices():boolean {
    return true;
}
export function test_obj_getEdges():boolean {
    return true;
}
export function test_obj_getWires():boolean {
    return true;
}
export function test_obj_getFaces():boolean {
    return true;
}

// Polyline test, extend Obj by 1 method
export function test_Pline_getObjType():boolean {
    return true;
}

// Polymesh test, extend Obj by 1 method
export function test_Pmesh_getObjType():boolean {
    return true;
}