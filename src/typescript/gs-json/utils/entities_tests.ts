import * as gs from "./gs-json";
import * as test_data from "./test_data";
import * as ifs from "./ifaces_gs";
import {Model} from "./model";
import {Arr} from "./arr";

// Entities tests, 1 constructor and 8 methods
export function test_ent_constructor():boolean {
    return true;
}
export function test_ent_getGeom():boolean {
    let m:gs.Model = new Model();
    // case Point
    let points:ifs.IPoint[] = m.getGeom().getPoints();
        if(!Arr.equal(points,[])){return false;}
        points = [m.getGeom().addPoint([1,3,9])];
        let p2:ifs.IPoint[] = points[0].getGeom().getPoints();
    if(!(p2[0].getPosition() == points[0].getPosition())){return false;}
    // Works well for the Point case, Polyline and Polymesh need as well 
    // to be tested, and getAttribs() need first to be tested (Model).
    // case Polyline, to test later on, GetAttribs need to be checked first.
    // let p3:ifs.IPoint = m.getGeom().addPoint([1,4,9]) ;
    // let p4:ifs.IPoint = m.getGeom().addPoint([1,3,7]) ;
    // let wire:ifs.IPoint[] = [p2[0],p3,p4];
    // let Pline:ifs.IObj = m.getGeom().addPolyline(wire,false);
    // console.log(m.getGeom().getModel().getAttribs());
    // console.log(m.getGeom().addPolyline([m.getGeom().addPoint([1,3,9]),m.getGeom().addPoint([1,3,7])],true));
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
export function test_ent_addToGroup():boolean {
    return true;
}

// Point tests, extends Entities by 4 complementary methods
export function test_point_getGeomType():boolean {
    return true;
}
export function test_point_setPosition():boolean {
    let model:gs.IModel = new gs.Model();
    let point:gs.IPoint = model.getGeom().addPoint([11,22,33]);
    point.setPosition([4,5,6]);
    point.setPosition(null); //what should this do?
    point.setPosition([1,2]); //what should this do?
    point.setPosition([1,2,3,4]); //what should this do?
    point.setPosition([1,,2]); //sparse array
    return true;
}
export function test_point_getPosition():boolean {
    let model:gs.IModel = new gs.Model();
    let point:gs.IPoint = model.getGeom().addPoint([11,22,33]);
    point.setPosition([4,5,6]);
    let pos:number[] = point.getPosition();
    return gs.Arr.equal([4,5,6], pos);
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
    let model:gs.IModel = new gs.Model(test_data.open_box());
    // let wire:number[] = model.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.wires, 2));
    // if (gs.Arr.equal(wire,[2, 6, 5, 1, 2])) {return false;}
    return true;
}

// Polymesh test, extend Obj by 1 method
export function test_Polymesh_getObjType():boolean {
    return true;
}