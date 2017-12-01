import * as gs from "./gs-json";
import * as test_data from "./test_data";
import * as ifs from "./ifaces_gs";
import {Model} from "./model";
import {Arr} from "./arr";

// Entities tests, 1 constructor and 8 methods
export function test_ent_constructor():boolean {
    let m:gs.Model = new gs.Model(test_data.box_with_attribs());
    let geom:gs.IGeom = m.getGeom();
    let a:ifs.IPoint = geom.addPoint([6,3,8]); //unexported abstract class
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
    let m:gs.Model = new gs.Model();
    let geom:gs.IGeom = m.getGeom();
    let a:ifs.IPoint = geom.addPoint([6,3,8]);
    if( !(a.getID() == 0) ){return false;}
    return true;
}
export function test_ent_getModel():boolean {
    let m:gs.Model = new gs.Model();
    let geom:gs.IGeom = m.getGeom();
    let a:ifs.IPoint = geom.addPoint([6,3,8]);
    if(!(a.getModel().getGeom().numPoints() == 1)){return false;}
    return true;
}
// export function test_ent_getGeomType():boolean { //This method cannot be tested.
//     return true;
// }
export function test_ent_getAttribNames():boolean {
    let m:gs.Model = new gs.Model(test_data.box_with_attribs());
    let geom:gs.IGeom = m.getGeom();
    let a1:ifs.IPoint = geom.addPoint([6,3,8]);
    if(!(a1.getAttribNames()[0] == "test1")){return false;}
    let a2:ifs.IObj = geom.getObj(0);
    if(!(a2.getAttribNames()[0] == "obj_id")){return false;}
    return true;
}
export function test_ent_getAttribValue():boolean {
    let m:gs.Model = new gs.Model(test_data.box_with_attribs());
    let geom:gs.IGeom = m.getGeom();
    let a1:ifs.IPoint = geom.getPoint(0);
    if(!(a1.getAttribValue("test1") == 641.600585938)){return false;}
    let a2:ifs.IObj = geom.getObj(0);
    if(!(a2.getAttribValue("obj_id") == 1234)){return false;}
    return true;
}
export function test_ent_setAttribValue():boolean {
    let m:gs.Model = new gs.Model(test_data.box_with_attribs());
    let geom:gs.IGeom = m.getGeom();
    let a1:ifs.IPoint = geom.getPoint(0);
    if(!(a1.getAttribValue("test1") == 641.600585938)){return false;}
    let a2:ifs.IObj = geom.getObj(0);
    if(!(a2.getAttribValue("obj_id") == 1234)){return false;}
    a1.setAttribValue("test1",12321);
    a2.setAttribValue("obj_id",12333222321);
    if((a1.getAttribValue("test1") == 641.600585938)){return false;}
    if((a2.getAttribValue("obj_id") == 1234)){return false;}
    if(!(a1.getAttribValue("test1") == 12321)){return false;}
    if(!(a2.getAttribValue("obj_id") == 12333222321)){return false;}
    return true;
}
export function test_ent_getGroupNames():boolean {
    let m:gs.IModel = new gs.Model(test_data.box_with_groups());
    let geom:gs.IGeom = m.getGeom();
    let a1:ifs.IObj = geom.getObj(0);
    
    // TO DO

    // console.log(a1.getGroupNames());
    // console.log(geom);
    // console.log(m.getGroups())
// console.log(m);
    // let model:gs.IModel ;    
    // model = new gs.Model(test_data.box_with_groups());
    // model.getGroups();
    // let grp:gs.IGroup = model.getGroup("building_obj");
    // console.log(grp);
// == ["building_obj"]

    return true;
}
export function test_ent_addToGroup():boolean {
    // let m:gs.IModel = new gs.Model(test_data.box_with_groups());
    // let geom:gs.IGeom = m.getGeom();
    // let a1:ifs.IObj = geom.getObj(0);
    // let gpr1
    return true;
}

// Point tests, extends Entities by 4 complementary methods
export function test_point_getGeomType():boolean {
    let m:gs.IModel = new gs.Model(test_data.box_with_groups());
    let geom:gs.IGeom = m.getGeom();
    let a1:ifs.IPoint = geom.getPoint(0);
    if(!(a1.getGeomType() == gs.EGeomType.points)){return false;}
    return true;
}
export function test_point_setPosition():boolean {
    let model:gs.IModel = new gs.Model();
    let point:gs.IPoint = model.getGeom().addPoint([11,22,33]);
    point.setPosition([4,5,6]);
    if((Arr.equal(point.getPosition(),[11,22,33]))){return false;}
    if(!(Arr.equal(point.getPosition(),[4,5,6]))){return false;}
    point.setPosition(null); //what should this do?
    if((Arr.equal(point.getPosition(),[4,5,6]))){return false;}
    if(!(Arr.equal(point.getPosition(),null))){return false;}
        // point.setPosition([1,2]); //what should this do?
        // point.setPosition([1,2,3,4]); //what should this do?
        // point.setPosition([1,,2]); //sparse array
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
    
// TO DO // LINKED WITH GET OBJ DATA IN GEOM
    let m:gs.IModel = new gs.Model(test_data.box_with_groups());
    let geom:gs.IGeom = m.getGeom();
    let a1:gs.IPoint = m.getGeom().addPoint([2,4,6]);
//       console.log(a1.getVertices()) 
// console.log(a1.getGeom().getObjs()) //
    return true;
}

// Object tests, extends Entities by 6 complementary methods
export function test_obj_getGeomType():boolean {
    let m:gs.IModel = new gs.Model(test_data.box_with_groups());
    let geom:gs.IGeom = m.getGeom();
    let a1:gs.IObj = geom.getObj(0);
    if(!(a1.getGeomType() == gs.EGeomType.objs)){return false;}
    return true;
}
// export function test_obj_getObjType():boolean { //This method cannot be tested.
//     return true;
// }
export function test_obj_getVertices():boolean {
    let m:gs.IModel = new gs.Model(test_data.open_box());
    let geom:gs.IGeom = m.getGeom();
    let a1:gs.IObj = geom.getObj(0);
    let path1:gs.ITopoPath = a1.getVertices()[0][0][0].getTopoPath() ;
    console.log(geom.numTopos(gs.EGeomType.vertices))
    console.log(a1.getVertices()) // Looks fine
    return true;
}
export function test_obj_getEdges():boolean {
    let m:gs.IModel = new gs.Model(test_data.open_box());
    let geom:gs.IGeom = m.getGeom();
    let a1:gs.IObj = geom.getObj(0);
    let path1:gs.ITopoPath = a1.getEdges()[0][0][0].getTopoPath() ;
    console.log(geom.numTopos(gs.EGeomType.edges))
    console.log(a1.getEdges()) // Looks fine
    return true;
}
export function test_obj_getWires():boolean {
    let m:gs.IModel = new gs.Model(test_data.open_box());
    let geom:gs.IGeom = m.getGeom();
    let a1:gs.IObj = geom.getObj(0);
    let path1:gs.ITopoPath = a1.getWires()[0].getTopoPath() ;
    console.log(geom.numTopos(gs.EGeomType.wires))
    console.log(a1.getWires()) //Looks fine
    return true;
}
export function test_obj_getFaces():boolean {
    let m:gs.IModel = new gs.Model(test_data.open_box());
    let geom:gs.IGeom = m.getGeom();
    let a1:gs.IObj = geom.getObj(0);
    let path1:gs.ITopoPath = a1.getFaces()[0].getTopoPath() ;
    console.log(geom.numTopos(gs.EGeomType.faces))
    console.log(a1.getFaces()) //Looks fine
    return true;
}

// Polyline test, extend Obj by 1 method
export function test_Polyline_getObjType():boolean {
    let m:gs.IModel = new gs.Model();
    let g:gs.IGeom = m.getGeom();
    let p1 = g.addPoint([0,0,0]);
    let p2 = g.addPoint([2,0,0]);
    let p3 = g.addPoint([3,6,0]);
    let p4 = g.addPoint([7,4,9]);
    let pline1:gs.IPolyline = g.addPolyline([p1,p2,p3,p4], true);
    let pline2:gs.IPolyline = g.addPolyline([p1,p2,p3], false);
    if (!(pline1.getObjType() == 100)) {return false;}
    if (!(pline2.getObjType() == 100)) {return false;}
    return true;
}
// Polymesh test, extend Obj by 1 method
export function test_Polymesh_getObjType():boolean {
    let m:gs.IModel = new gs.Model();
    let g:gs.IGeom = m.getGeom();
    let p1 = g.addPoint([0,0,0]);
    let p2 = g.addPoint([2,0,0]);
    let p3 = g.addPoint([2,7,0]);
    let p4 = g.addPoint([7,7,2]);
    let pmesh1:gs.IPolymesh = g.addPolymesh([
    [p1,p2,p3],
    [p2,p4,p3]
    ]);

    let p10 = g.addPoint([-5,-3,-2]);
    let p11 = g.addPoint([5,-3,-2]);
    let p12 = g.addPoint([5,3,-2]);
    let p13 = g.addPoint([-5,3,-2]);
    let p14 = g.addPoint([-5,-3,2]);
    let p15 = g.addPoint([5,-3,2]);
    let p16 = g.addPoint([5,3,2]);
    let p17 = g.addPoint([-5,3,2]);

    let pmesh2:gs.IPolymesh = g.addPolymesh([
    [p13,p12,p11,p10], //bottom
    [p10,p11,p15,p14], //side0
    [p11,p12,p16,p15], //side1
    [p12,p13,p17,p16], //side2
    [p13,p10,p14,p17], //side3
    [p14,p15,p16,p17]  //top
    ]);

    let pmesh3:gs.IPolymesh = g.addPolymesh([
    [p13,p12,p11,p10], //bottom
    [p10,p11,p15,p14], //side0
    [p13,p10,p14,p17], //side3
    [p14,p15,p16,p17]  //top
    ]);

    if (!(pmesh1.getObjType() == 200)) {return false;}
    if (!(pmesh2.getObjType() == 200)) {return false;}
    if (!(pmesh3.getObjType() == 200)) {return false;}

    return true;
}