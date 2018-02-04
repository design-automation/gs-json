import {Arr} from "./libs/arr/arr";
import * as gs from "./_export";
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
    let points: gs.IPoint[] = m.getGeom().getAllPoints();
    if (!Arr.equal(points, [])) {return false; }
    points = [m.getGeom().addPoint([1, 3, 9])];
    const p2: gs.IPoint[] = m.getGeom().getAllPoints();
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

export function test_ent_getAttribs(): boolean {
    const m: gs.Model = new gs.Model(test_data.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IPoint = geom.addPoint([6,3,8]);
    if(a1.getAttribs()[0].getName() !== "test1") {return false;}
    const a2: gs.IObj = geom.getObj(0);
    if(a2.getAttribs()[0].getName() !== "obj_id") {return false;}
    return true;
}

export function test_ent_getAttribValue(): boolean {
    const m: gs.Model = new gs.Model(test_data.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IPoint = geom.getPoint(0);
    const test1: gs.IEntAttrib = m.getEntAttrib("test1", gs.EGeomType.points);
    const obj_id: gs.IEntAttrib = m.getEntAttrib("obj_id", gs.EGeomType.objs);
    if(a1.getAttribValue(test1) !== 641.600585938) {return false;}
    const a2: gs.IObj = geom.getObj(0);
    if(a2.getAttribValue(obj_id) !== 1234) {return false;}
    return true;
}

export function test_ent_setAttribValue(): boolean {
    const m: gs.Model = new gs.Model(test_data.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IPoint = geom.getPoint(0);
    const test1: gs.IEntAttrib = m.getEntAttrib("test1", gs.EGeomType.points);
    const obj_id: gs.IEntAttrib = m.getEntAttrib("obj_id", gs.EGeomType.objs);
    if(!(a1.getAttribValue(test1) === 641.600585938)) {return false;}
    // const a2: gs.IObj = geom.getObj(0);
    // if(!(a2.getAttribValue(obj_id) === 1234)) {return false;}
    // a1.setAttribValue(test1,12321);
    // a2.setAttribValue(obj_id,12333222321);
    // if((a1.getAttribValue(test1) === 641.600585938)) {return false;}
    // if((a2.getAttribValue(obj_id) === 1234)) {return false;}
    // if(!(a1.getAttribValue(test1) === 12321)) {return false;}
    // if(!(a2.getAttribValue(obj_id) === 12333222321)) {return false;}
    return true;
}

export function test_ent_getGroups(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const p1: gs.IPoint = geom.getPoint(0);
    const gpr1a: gs.IGroup = m.addGroup("test1a");
    const gpr1b: gs.IGroup = m.addGroup("test1b");
    const gpr1c: gs.IGroup = m.addGroup("test1b");
    gpr1a.addObj(a1);
    gpr1b.addObj(a1);
    gpr1c.addObj(a1);
    const gpr2: gs.IGroup = m.addGroup("test2");
    gpr2.addPoint(p1);
    if(a1.getGroups()[0].getName() !== "test1a") {return false;}
    if(a1.getGroups()[1].getName() !== "test1b") {return false;}
    if(p1.getGroups()[0].getName() !== "test2") {return false;}
    return true;
}

export function test_ent_addToGroup(): boolean {
    const m: gs.IModel = new gs.Model(test_data.box_with_groups());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const gpr1: gs.IGroup = m.addGroup("test1");
    // console.log(gpr1.hasObj(0));
    // console.log(true);
    if(gpr1.hasObj(a1)) {return false;}
    a1.addToGroup(gpr1);
    // console.log(gpr1.hasObj(0));
    if(gpr1.hasObj(a1)) {return false;}
    return true;
}
