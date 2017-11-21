import * as gsj from "./gs-json";
import * as test_data from "./test_data";

export function test_setPointPosition():boolean {
    let model:gsj.IModel = new gsj.Model();
    let point:gsj.IPoint = model.getGeom().addPoint([11,22,33]);
    point.setPosition([4,5,6]);
    let pos:number[] = point.getPosition();
    return gsj.Arr.equal([4,5,6], pos);
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
export function test_Polyline_getObjType():boolean {
    let model:gsj.IModel = new gsj.Model();
    model.setData(test_data.box);
    let wire:number[] = model.getGeom().getData(new gsj.GeomPath(0, gsj.EGeomType.wires, 2));
    if (gsj.Arr.equal(wire,[2, 6, 5, 1, 2])) {return false;}
    return true;
}

// Polymesh test, extend Obj by 1 method
export function test_Polymesh_getObjType():boolean {
    return true;
}