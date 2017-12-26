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
