import {Arr} from "./arr";
import * as gs from "./gs-json";
import * as test_data from "./test_data";

// Entities tests, 1 constructor and 8 methods
export function test_ent_constructor(): boolean {
    // abstract class
    const m: gs.Model = new gs.Model(test_data.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a: gs.IPoint = geom.addPoint([6,3,8]);
    return true;
}

export function test_ent_getGeom(): boolean {
    const m: gs.Model = new gs.Model();
    // case Point
    let points: gs.IPoint[] = m.getGeom().getPoints();
    if (!Arr.equal(points, [])) {return false; }
    points = [m.getGeom().addPoint([1, 3, 9])];
    const p2: gs.IPoint[] = m.getGeom().getPoints();
    if (!(p2[0].getPosition() === points[0].getPosition())) {return false; }
    // Works well for the Point case, Polyline and Polymesh need as well
    // to be tested, and getAttribs() need first to be tested (Model).
    // case Polyline, to test later on, GetAttribs need to be checked first.
    // let p3: gs.IPoint = m.getGeom().addPoint([1, 4, 9]); ;
    // let p4: gs.IPoint = m.getGeom().addPoint([1, 3, 7]); ;
    // let wire: gs.IPoint[] = [p2[0], p3, p4];
    // let Pline: gs.IObj = m.getGeom().addPolyline(wire, false);
    return true;
}

export function test_ent_getID(): boolean {
    const m: gs.Model = new gs.Model();
    const geom: gs.IGeom = m.getGeom();
    const a: gs.IPoint = geom.addPoint([6,3,8]);
    if( !(a.getID() === 0) ) {return false;}
    return true;
}

export function test_ent_getModel(): boolean {
    const m: gs.Model = new gs.Model();
    const geom: gs.IGeom = m.getGeom();
    const a: gs.IPoint = geom.addPoint([6,3,8]);
    if(!(m.getGeom().numPoints() === 1)) {return false;}
    return true;
}

export function test_ent_getAttribNames(): boolean {
    const m: gs.Model = new gs.Model(test_data.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IPoint = geom.addPoint([6,3,8]);
    if(!(a1.getAttribNames()[0] === "test1")) {return false;}
    const a2: gs.IObj = geom.getObj(0);
    if(!(a2.getAttribNames()[0] === "obj_id")) {return false;}
    return true;
}

export function test_ent_getAttribValue(): boolean {
    const m: gs.Model = new gs.Model(test_data.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IPoint = geom.getPoint(0);
    if(!(a1.getAttribValue("test1") === 641.600585938)) {return false;}
    const a2: gs.IObj = geom.getObj(0);
    if(!(a2.getAttribValue("obj_id") === 1234)) {return false;}
    return true;
}

export function test_ent_setAttribValue(): boolean {
    const m: gs.Model = new gs.Model(test_data.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IPoint = geom.getPoint(0);
    if(!(a1.getAttribValue("test1") === 641.600585938)) {return false;}
    const a2: gs.IObj = geom.getObj(0);
    if(!(a2.getAttribValue("obj_id") === 1234)) {return false;}
    a1.setAttribValue("test1",12321);
    a2.setAttribValue("obj_id",12333222321);
    if((a1.getAttribValue("test1") === 641.600585938)) {return false;}
    if((a2.getAttribValue("obj_id") === 1234)) {return false;}
    if(!(a1.getAttribValue("test1") === 12321)) {return false;}
    if(!(a2.getAttribValue("obj_id") === 12333222321)) {return false;}
    return true;
}

export function test_ent_getGroupNames(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const p1: gs.IPoint = geom.getPoint(0);

    const gpr1: gs.IGroup = m.addGroup("test1");
    gpr1.addObj(0);
    const gpr2: gs.IGroup = m.addGroup("test2");
    gpr2.addPoint(0);

    if(!Arr.equal(a1.getGroupNames(),["test1"])) {return false;}
    if(!Arr.equal(p1.getGroupNames(),["test2"])) {return false;}

    // console.log(a1.getGroupNames())
    // console.log(p1.getGroupNames())

    // console.log(a1);
    // console.log(p1);
    // console.log(gpr2);
    // console.log(a1.getGroupNames())
     // == ["test 1"]);
    // console.log(p1.getGroupNames())

     // == ["test 2"]);

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

export function test_ent_addToGroup(): boolean {
    const m: gs.IModel = new gs.Model(test_data.box_with_groups());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const gpr1: gs.IGroup = m.addGroup("test1");
    // console.log(gpr1.hasObj(0));
    // console.log(true);
    if(gpr1.hasObj(0)) {return false;}
    a1.addToGroup("test1");
    // console.log(gpr1.hasObj(0));
    if(gpr1.hasObj(0)) {return false;}
    return true;
}

// Point tests, extends Entities by 4 complementary methods
export function test_point_getGeomType(): boolean {
    const m: gs.IModel = new gs.Model(test_data.box_with_groups());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IPoint = geom.getPoint(0);
    if(!(a1.getGeomType() === gs.EGeomType.points)) {return false;}
    return true;
}

export function test_point_setPosition(): boolean {
    const model: gs.IModel = new gs.Model();
    const point: gs.IPoint = model.getGeom().addPoint([11,22,33]);
    point.setPosition([4,5,6]);
    if((Arr.equal(point.getPosition(),[11,22,33]))) {return false;}
    if(!(Arr.equal(point.getPosition(),[4,5,6]))) {return false;}
    //if(!(Arr.equal(point.getPosition(),null))) {return false;}
    // point.setPosition([1,2]); //what should this do?
    // point.setPosition([1,2,3,4]); //what should this do?
    // point.setPosition([1,,2]); //sparse array
    return true;
}

export function test_point_getPosition(): boolean {
    const model: gs.IModel = new gs.Model();
    const point: gs.IPoint = model.getGeom().addPoint([11, 22, 33]);
    point.setPosition([4, 5, 6]);
    const pos: number[] = point.getPosition();
    return Arr.equal([4, 5, 6], pos);
}

export function test_point_getVertices(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const p0: gs.IPoint = m.getGeom().getPoint(0);
    const p1: gs.IPoint = m.getGeom().getPoint(1);
    const p2: gs.IPoint = m.getGeom().getPoint(2);
    const p3: gs.IPoint = m.getGeom().getPoint(3);
    const p4: gs.IPoint = m.getGeom().getPoint(4);
    const p5: gs.IPoint = m.getGeom().getPoint(5);
    const p6: gs.IPoint = m.getGeom().getPoint(6);
    const p7: gs.IPoint = m.getGeom().getPoint(7);
    if(!(p0.getVertices().length === 3)) {return false;}
    if(!(p0.getVertices()[0].getWireOrFace().getTopoPath().ti === 0)) {return false;}
    if(!(p0.getVertices()[0].getTopoPath().si === 0)) {return false;}
    if(!(p0.getVertices()[1].getTopoPath().ti === 0)) {return false;}
    if(!(p0.getVertices()[1].getTopoPath().si === 3)) {return false;}
    if(!(p0.getVertices()[2].getTopoPath().ti === 3)) {return false;}
    if(!(p0.getVertices()[2].getTopoPath().si === 0)) {return false;}
    if(!(p1.getVertices().length === 3)) {return false;}
    if(!(p2.getVertices().length === 3)) {return false;}
    if(!(p3.getVertices().length === 3)) {return false;}
    if(!(p4.getVertices().length === 3)) {return false;}
    if(!(p5.getVertices().length === 3)) {return false;}
    if(!(p6.getVertices().length === 3)) {return false;}
    if(!(p7.getVertices().length === 3)) {return false;}
    return true;
}

// Object tests, extends Entities by 6 complementary methods
export function test_obj_getGeomType(): boolean {
    const m: gs.IModel = new gs.Model(test_data.box_with_groups());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    if(!(a1.getGeomType() == gs.EGeomType.objs)) {return false;}
    return true;
}

export function test_obj_getVertices(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPathData = a1.getVertices()[0][0][0].getTopoPath();
    geom.numTopos(gs.EGeomType.vertices);
    a1.getVertices(); // Looks fine
    return true;
}

export function test_obj_getEdges(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPathData = a1.getEdges()[0][0][0].getTopoPath() ;
    geom.numTopos(gs.EGeomType.edges);
    a1.getEdges(); // Looks fine
    return true;
}

export function test_obj_getWires(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPathData = a1.getWires()[0].getTopoPath() ;
    geom.numTopos(gs.EGeomType.wires);
    //a1.getWires(); // Looks fine
    return true;
}

export function test_obj_getFaces(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPathData = a1.getFaces()[0].getTopoPath() ;
    geom.numTopos(gs.EGeomType.faces);
    a1.getFaces(); // Looks fine

    return true;
}

// Polyline test, extend Obj by 1 method
export function test_Polyline_getObjType(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1 = g.addPoint([0,0,0]);
    const p2 = g.addPoint([2,0,0]);
    const p3 = g.addPoint([3,6,0]);
    const p4 = g.addPoint([7,4,9]);
    const pline1: gs.IPolyline = g.addPolyline([p1,p2,p3,p4], true);
    const pline2: gs.IPolyline = g.addPolyline([p1,p2,p3], false);
    if (!(pline1.getObjType() === 100)) {return false;}
    if (!(pline2.getObjType() === 100)) {return false;}

    return true;
}

// Polymesh test, extend Obj by 1 method
export function test_Polymesh_getObjType(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1 = g.addPoint([0,0,0]);
    const p2 = g.addPoint([2,0,0]);
    const p3 = g.addPoint([2,7,0]);
    const p4 = g.addPoint([7,7,2]);
    const pmesh1: gs.IPolymesh = g.addPolymesh([
        [p1,p2,p3],
        [p2,p4,p3],
    ]);

    const p10 = g.addPoint([-5,-3,-2]);
    const p11 = g.addPoint([5,-3,-2]);
    const p12 = g.addPoint([5,3,-2]);
    const p13 = g.addPoint([-5,3,-2]);
    const p14 = g.addPoint([-5,-3,2]);
    const p15 = g.addPoint([5,-3,2]);
    const p16 = g.addPoint([5,3,2]);
    const p17 = g.addPoint([-5,3,2]);

    const pmesh2: gs.IPolymesh = g.addPolymesh([
        [p13,p12,p11,p10], // bottom
        [p10,p11,p15,p14], // side0
        [p11,p12,p16,p15], // side1
        [p12,p13,p17,p16], // side2
        [p13,p10,p14,p17], // side3
        [p14,p15,p16,p17], // top
    ]);

    const pmesh3: gs.IPolymesh = g.addPolymesh([
        [p13,p12,p11,p10], // bottom
        [p10,p11,p15,p14], // side0
        [p13,p10,p14,p17], // side3
        [p14,p15,p16,p17], // top
    ]);

    if (!(pmesh1.getObjType() === 200)) {return false;}
    if (!(pmesh2.getObjType() === 200)) {return false;}
    if (!(pmesh3.getObjType() === 200)) {return false;}

    return true;
}

export function test_Plane_getCartesians(): void {    
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const A1: gs.IPoint = g.addPoint([0,0,0]);
    const V1: gs.IPoint = g.addPoint([0,0,0]);
    const V2: gs.IPoint = g.addPoint([0,0,1]);
    const P1: gs.IPlane = g.addPlane(A1, [V1,V2]);
    console.log(P1.getCartesians());
}