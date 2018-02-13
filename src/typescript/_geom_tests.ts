import {Arr} from "./libs/arr/arr";
import * as gs from "./gs-json";
import * as td from "./test_data";
import {} from "jasmine";

describe("Tests for Geom class", () => {
    it("test_copyPlaneFromModel", () => {
        expect( test_Geom_copyPlaneFromModel() ).toBe(true);
    });
    it("test_copyCircleFromModel", () => {
        expect( test_Geom_copyCircleFromModel() ).toBe(true);
    });
    it("test_copyObjFromModel", () => {
        expect( test_Geom_copyObjFromModel() ).toBe(true);
    });

    it("test_createPoint", () => {
        expect( test_Geom_createPoint() ).toBe(true);
    });
    it("test_Geom_constructor", () => {
        expect( test_Geom_constructor() ).toBe(true);
    });
    // it("test_test_Geom_getModel", () => {
    //     expect( test_Geom_getModel() ).toBe(true);
    // });
    it("test_Geom_addPoint", () => {
        expect( test_Geom_addPoint() ).toBe(true);
    });
    it("test_Geom_addPolyline", () => {
        expect( test_Geom_addPolyline() ).toBe(true);
    });
    it("test_test_Geom_addPolymesh", () => {
        expect( test_Geom_addPolymesh() ).toBe(true);
    });
    // it("test_Geom_getPointIDs", () => {
    //     expect( test_Geom_getAllPointIDs() ).toBe(true);
    // });
    it("test_Geom_getPoints", () => {
        expect( test_Geom_getPoints() ).toBe(true);
    });
    it("test_Geom_getPoint", () => {
        expect( test_Geom_getPoint() ).toBe(true);
    });
    it("test_Geom_delPoint", () => {
        expect( test_Geom_delPoint() ).toBe(true);
    });
    it("test_Geom_numPoints", () => {
        expect( test_Geom_numPoints() ).toBe(true);
    });
    it("test_Geom_mergePoints", () => {
        expect( test_Geom_mergePoints() ).toBe(true);
    });



    // it("test_Geom_getObjIDs", () => {
    //     expect( test_Geom_getAllObjIDs() ).toBe(true);
    // });
    it("test_Geom_getObjs", () => {
        expect( test_Geom_getObjs() ).toBe(true);
    });
    it("test_Geom_getObj", () => {
        expect( test_Geom_getObj() ).toBe(true);
    });
    it("test_Geom_delObj", () => {
        expect( test_Geom_delObj() ).toBe(true);
    });
    it("test_Geom_numObjs", () => {
        expect( test_Geom_numObjs() ).toBe(true);
    });
    it("test_Geom_getTopos", () => {
        expect( test_Geom_getTopos() ).toBe(true);
    });
    it("test_Geom_numTopos", () => {
        expect( test_Geom_numTopos() ).toBe(true);
    });
    it("test_Geom_getTopo", () => {
        expect( test_Geom_getTopo() ).toBe(true);
    });
    it("test_Geom_getTopoFromLabel", () => {
        expect( test_Geom_getTopoFromLabel() ).toBe(true);
    });

});


export function test_Geom_copyRayFromModel(): boolean {
    const m1: gs.IModel = new gs.Model();
    const g1: gs.IGeom =  m1.getGeom();
    const p1: gs.IPoint = g1.addPoint([0.1234, 0.44566, 0.345778]);
    const ray1: gs.IRay = g1.addRay(p1, [1,2,3]);
    const m2: gs.IModel = new gs.Model();
    const g2: gs.IGeom =  m2.getGeom();
    const ray2: gs.IRay = g2.copyRayFromModel(ray1);
    if(g2.numObjs() !== 1) {return false;}
    if(g2.numPoints() !== 1) {return false;}
    if(ray1.getOrigin()[2] !== ray2.getOrigin()[2]) {return false;}
    return true;
}

export function test_Geom_copyPlaneFromModel(): boolean {
    const m1: gs.IModel = new gs.Model();
    const g1: gs.IGeom =  m1.getGeom();
    const p: gs.IPoint = g1.addPoint([0.1234, 0.44566, 0.345778]);
    const pl1: gs.IPlane = g1.addPlane(p, [1,2,3], [7,2,5]);
    const m2: gs.IModel = new gs.Model();
    const g2: gs.IGeom =  m2.getGeom();
    const pl2: gs.IPlane = g2.copyPlaneFromModel(pl1);
    if(g2.numObjs() !== 1) {return false;}
    if(g2.numPoints() !== 1) {return false;}
    if(pl1.getOrigin()[2] !== pl2.getOrigin()[2]) {return false;}
    return true;
}

export function test_Geom_copyCircleFromModel(): boolean {
    const m1: gs.IModel = new gs.Model();
    const g1: gs.IGeom =  m1.getGeom();
    const p: gs.IPoint = g1.addPoint([0.1234, 0.44566, 0.345778]);
    const cir1: gs.ICircle = g1.addCircle(p, [1,2,3], [7,2,5]);
    const m2: gs.IModel = new gs.Model();
    const g2: gs.IGeom =  m2.getGeom();
    const cir2: gs.ICircle = g2.copyCircleFromModel(cir1);
    if(g2.numObjs() !== 1) {return false;}
    if(g2.numPoints() !== 1) {return false;}
    if(cir1.getOrigin()[2] !== cir2.getOrigin()[2]) {return false;}
    return true;
}

export function test_Geom_copyObjFromModel(): boolean {
    const m1: gs.IModel = new gs.Model();
    const g1: gs.IGeom =  m1.getGeom();
    const p1: gs.IPoint = g1.addPoint([0.1234, 0.44566, 0.345778]);
    const ray1: gs.IRay = g1.addRay(p1, [1,2,3]);
    const pl1: gs.IPlane = g1.addPlane(p1, [1,2,3], [7,2,5]);
    const cir1: gs.ICircle = g1.addCircle(p1, [1,2,3], [7,2,5]);
    const m2: gs.IModel = new gs.Model();
    const g2: gs.IGeom =  m2.getGeom();
    // copy three objects
    const ray2: gs.IRay = g2.copyRayFromModel(ray1) as gs.IRay;
    const pl2: gs.IPlane = g2.copyPlaneFromModel(pl1) as gs.IPlane;
    const cir2: gs.ICircle = g2.copyObjFromModel(cir1) as gs.ICircle;
    if(g2.numObjs() !== 3) {return false;}
    if(g2.numPoints() !== 3) {return false;}
    if(cir1.getOrigin()[2] !== cir2.getOrigin()[2]) {return false;}
    return true;
}

export function test_Geom_createPoint(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom =  m.getGeom();
    const p1: gs.IPoint = g.addPoint([1,2,3]);
    const p2: gs.IPoint = g.addPoint([0,0,0]);
    const p3: gs.IPoint = g.addPoint([0.1234, 0.44566, 0.345778]);
    if (g.numPoints() !== 3) {return false;}
    if (!Arr.equal(g.getAllPoints()[1].getPosition(), [0,0,0])) {return false;}
    return true;
}

// Geom constructor and its 19 public methods are tested
export function test_Geom_constructor(): boolean {
    const m1: gs.IModel = new gs.Model();
    const a: gs.XYZ = [1,2,3];
    m1.getGeom().addPoint(a);
    // TODO
    // if(!(Arr.equal(m1.getGeom().getPointData(0)[1],a))) {return false;}
    return true;
}

export function test_Geom_addPoint(): boolean {
    const model: gs.IModel = new gs.Model();
    const p1: gs.XYZ = [4,8,6];
    let num_Point: number = 1;
    // for (let k:number = 0 ; 10 ; k++){a[k] = Math.floor(Math.random() * 10);} (this line crashes Karma)
    model.getGeom().addPoint(p1);
    // test 1.1
    if (model.getGeom().numPoints() !== num_Point) {return false;}
    // test 1.2
    for(let j: number = 0; j < model.getGeom().numPoints(); j++) {
        for (const k of p1) {
            // TODO
            // if(model.getGeom().getPointData(j)[1][k] !== p1[k] ) {return false;}
        }
    }
    //
    const p2: gs.XYZ = [4, 2, 8];
    num_Point = num_Point + 1;
    model.getGeom().addPoint(p2);

    // test 2.1
    if (model.getGeom().numPoints() !== num_Point) {return false;}
    // test 2.2
    for (const k of p2) {
        // TODO
        // if(model.getGeom().getPointData(1)[1][k] !== p2[k] ) {return false;}
    }
    ////
    const p3: gs.XYZ = [6,1,7];
    num_Point = num_Point + 1;
    model.getGeom().addPoint(p3);
    // test 3.1
    if (model.getGeom().numPoints() !== num_Point) {return false;}
    // test 3.2
    for (const k of p3) {
        // TODO
        // if(model.getGeom().getPointData(2)[1][k] !== p3[k] ) {return false;}
    }
    return true;
}

export function test_Geom_addPolyline(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1 = g.addPoint([0,0,0]);
    const p2 = g.addPoint([2,0,0]);
    const p3 = g.addPoint([3,6,0]);
    const p4 = g.addPoint([7,4,9]);
    const pline1: gs.IPolyline = g.addPolyline([p1,p2,p3,p4], true);
    const pline2: gs.IPolyline = g.addPolyline([p1,p2,p3], false);
    if (g.numObjs() !== 2) {return false;}
    if (pline1.numFaces() !== 0) {return false;}
    if (pline1.numWires() !== 1) {return false;}
    if (pline2.numFaces() !== 0) {return false;}
    if (pline2.numWires() !== 1) {return false;}
    return true;
}

export function test_Geom_addPolymesh(): boolean {
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

    if (g.numObjs() !== 1) {return false; }
    if (pmesh1.numFaces() !== 2) {return false; }
    if (pmesh1.numWires() !== 1) {return false; }

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

    if (g.numObjs() !== 2) {return false; }
    if (pmesh2.numFaces() !== 6) {return false; }
    if (pmesh2.numWires() !== 0) {return false; }

    const pmesh3: gs.IPolymesh = g.addPolymesh([
    [p13,p12,p11,p10], // bottom
    [p10,p11,p15,p14], // side0
    [p13,p10,p14,p17], // side3
    [p14,p15,p16,p17], // top
    ]);

    if (g.numObjs() !== 3) {return false; }
    if (pmesh3.numFaces() !== 4) {return false; }
    if (pmesh3.numWires() !== 1) {return false; }

    return true;
}

export function test_Geom_getPoints(): boolean {
    const m: gs.Model = new gs.Model();
    const g1: gs.IGeom = m.getGeom();

    const p1: gs.XYZ = [1,3,9] ;
    g1.addPoint(p1);
    const p2: gs.XYZ = [2,1,6] ;
    g1.addPoint(p2);
    const p3: gs.XYZ = [4,9,2] ;
    g1.addPoint(p3);
    const p4: gs.XYZ = [2,3,4] ;
    g1.addPoint(p4);
    const p5: gs.XYZ = [8,4,3] ;
    g1.addPoint(p5);
    const p6: gs.XYZ = [6,1,7] ;
    g1.addPoint(p6);
    const p7: gs.XYZ = [9,0,4] ;
    g1.addPoint(p7);
    const p8: gs.XYZ = [4,0,8] ;
    g1.addPoint(p8);

    const test8: gs.XYZ = g1.getAllPoints()[7].getPosition();
    if (!Arr.equal( test8, p8)) {return false; }

    return true;
}

export function test_Geom_getPoint(): boolean {
    const m: gs.Model = new gs.Model();
    const geom: gs.IGeom = m.getGeom();
    const p1: gs.IPoint = geom.addPoint([1,3,8]);
    const p2: gs.IPoint = geom.addPoint([6,4,3]);
    const p3: gs.IPoint = geom.addPoint([8,8,8]);
    const p4: gs.IPoint = geom.addPoint([3,4,5]);
    const p5: gs.IPoint = geom.addPoint([2,3,5]);
    const p6: gs.IPoint = geom.addPoint([1,5,2]);

    if(!(Arr.equal(geom.getPoint(0).getPosition(),p1.getPosition()))) {return false;}
    if(!(Arr.equal(geom.getPoint(1).getPosition(),p2.getPosition()))) {return false;}
    if(!(Arr.equal(geom.getPoint(2).getPosition(),p3.getPosition()))) {return false;}
    if(!(Arr.equal(geom.getPoint(3).getPosition(),p4.getPosition()))) {return false;}
    if(!(Arr.equal(geom.getPoint(4).getPosition(),p5.getPosition()))) {return false;}
    if(!(Arr.equal(geom.getPoint(5).getPosition(),p6.getPosition()))) {return false;}
    return true;
}

export function test_Geom_delPoint(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom =  m.getGeom();
    const p0: gs.IPoint = g.addPoint([1,2,3]);
    const p1: gs.IPoint = g.addPoint([0,0,0]);
    const p2: gs.IPoint = g.addPoint([4,5,6]);
    if (!g.delPoint(p1)) {return false;}
    if (g.numPoints() !== 2) {return false;}
    if (!Arr.equal(g.getPoint(2).getPosition(), [4,5,6])) {return false;}
    if (!g.delPoint(p2)) {return false;}
    if (g.numPoints() !== 1) {return false;}
    if (!Arr.equal(g.getPoint(0).getPosition(), [1,2,3])) {return false;}
    if (!g.delPoint(p0)) {return false;}
    if (g.numPoints() !== 0) {return false;}
    return true;
}

export function test_Geom_numPoints(): boolean {
    const m: gs.Model = new gs.Model();
    const geom: gs.IGeom = m.getGeom();
    if(!(geom.numPoints() === 0)) {return false;}
    geom.addPoint([1,3,8]);
    if(!(geom.numPoints() === 1)) {return false;}
    geom.addPoint([8,8,8]);
    if(!(geom.numPoints() === 2)) {return false;}
    geom.addPoint([3,4,5]);
    if(!(geom.numPoints() === 3)) {return false;}
    geom.addPoint([2,3,5]);
    if(!(geom.numPoints() === 4)) {return false;}
    geom.addPoint([1,5,2]);
    if(!(geom.numPoints() === 5)) {return false;}

    return true;
}

export function test_Geom_mergePoints(): boolean {
    const m: gs.IModel = new gs.Model();
    const geom: gs.IGeom = m.getGeom();
    for (let i = 0; i < 1000; i++) {
        geom.addPoint([Math.random(), Math.random(), Math.random()]);
    }
    for (let i = 0; i < 1000; i++) {
        if (Math.random() > 0.5) {
            geom.delPoint(geom.getPoint(i));
        }
    }
    geom.mergeAllPoints(0.2);
    if (geom.numPoints() === 1000) {return false;}
    const m2: gs.Model = new gs.Model();
    const g2: gs.IGeom = m2.getGeom();
    const p1: gs.IPoint = g2.addPoint([10,0,0]);
    const p2: gs.IPoint = g2.addPoint([20,0,0]);
    const new_points: gs.IPoint[] = g2.mergePoints([p1, p2]);
    if(new_points.length !== 1) {return false;}
    if(new_points[0].getPosition()[0] !== 15) {return false;}
    return true;
}

export function test_Geom_getObjs(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const geom: gs.IGeom = m.getGeom();
    const p1 = geom.addPoint([0,0,0]);
    const p2 = geom.addPoint([2,0,0]);
    const p3 = geom.addPoint([3,6,0]);
    const p4 = geom.addPoint([7,4,9]);
    const pline1: gs.IPolyline = geom.addPolyline([p1,p2,p3,p4], true);
    const pline2: gs.IPolyline = geom.addPolyline([p1,p2,p3], false);
    const pline3: gs.IPolyline = geom.addPolyline([p1,p3,p4], false);

    if(!(Arr.equal([geom.getAllObjs()[0].getObjType()],[200]))) {return false;}
    if(!(Arr.equal([geom.getAllObjs()[1].getObjType()],[100]))) {return false;}
    if(!(Arr.equal([geom.getAllObjs()[2].getObjType()],[100]))) {return false;}

    return true;
}

export function test_Geom_getObj(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const geom: gs.IGeom = m.getGeom();
    const polymesh: gs.IObj = geom.getObj(0);
    if(!(Arr.equal([polymesh.getObjType()],[200]))) {return false;}

    return true;
}

export function test_Geom_delObj(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const g: gs.IGeom = m.getGeom();
    const p1 = g.addPoint([0,0,0]);
    const p2 = g.addPoint([2,0,0]);
    const p3 = g.addPoint([3,6,0]);
    const p4 = g.addPoint([7,4,9]);
    const p5 = g.addPoint([1,2,6]);
    const p6 = g.addPoint([7,8,99]);
    const box: gs.IPolymesh = g.getObj(0) as gs.IPolymesh;
    const pline1: gs.IPolyline = g.addPolyline([p1,p2,p3,p4,p5,p6], true);
    const pline2: gs.IPolyline = g.addPolyline([p1,p2,p3], false);
    const pline3: gs.IPolyline = g.addPolyline([p1,p3,p4], false);
    // delete some stuff
    if (g.numObjs() !== 4) {return false;}
    g.delObj(box, false);
    if (g.numObjs() !== 3) {return false;}
    g.delObjs([pline1, pline3], false);
    if (g.numObjs() !== 1) {return false;}
    // create some attribs
    const p_att: gs.IEntAttrib = m.addEntAttrib("test0", gs.EGeomType.points, gs.EDataType.type_str);
    const o_att: gs.IEntAttrib = m.addEntAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
    const e_att: gs.ITopoAttrib = m.addTopoAttrib("test2", gs.EGeomType.edges, gs.EDataType.type_num);
    const w_att: gs.ITopoAttrib = m.addTopoAttrib("test3", gs.EGeomType.wires, gs.EDataType.type_num);
    // set attribs
    p1.setAttribValue(p_att, "jshjdhjh");
    pline2.setAttribValue(o_att, 12234456);
    // now delete some more stuff
    g.delObj(pline2, true);
    if (g.numObjs() !== 0) {return false;}
    // now check if attributes are updated
    //console.log(m);
    return true;
}

export function test_Geom_numObjs(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const geom: gs.IGeom = m.getGeom();
    // numObjs no longer allos you to specify EObjType
    if(!(geom.numObjs() === 1 )) {return false;}
    const p1 = geom.addPoint([0,0,0]);
    const p2 = geom.addPoint([2,0,0]);
    const p3 = geom.addPoint([3,6,0]);
    const p4 = geom.addPoint([7,4,9]);
    const pline1: gs.IPolyline = geom.addPolyline([p1,p2,p3,p4], true);
    if(!(geom.numObjs() === 2 )) {return false;}
    const pline2: gs.IPolyline = geom.addPolyline([p1,p2,p3], false);
    if(!(geom.numObjs() === 3 )) {return false;}
    const pline3: gs.IPolyline = geom.addPolyline([p1,p3,p4], false);
    if(!(geom.numObjs() === 4 )) {return false;}
    return true;
}

export function test_Geom_getTopo(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const geom: gs.IGeom = m.getGeom();
    const face: gs.ITopo = geom.getTopo({id:0, tt:1, ti:1});
    const wire: gs.ITopo = geom.getTopo({id:0, tt:0, ti:0});
    const face_edge: gs.ITopo = geom.getTopo({id:0, tt:1, ti:0, st: 1, si: 0});
    const wire_edge: gs.ITopo = geom.getTopo({id:0, tt:0, ti:0, st: 1, si: 0});
    const face_vertex: gs.ITopo = geom.getTopo({id:0, tt:1, ti:0, st: 0, si: 0});
    const wire_vertex: gs.ITopo = geom.getTopo({id:0, tt:0, ti:0, st: 0, si: 0});
    if (face.getGeomType() !== gs.EGeomType.faces) {return false;}
    if (wire.getGeomType() !== gs.EGeomType.wires) {return false;}
    if (face_edge.getGeomType() !== gs.EGeomType.edges) {return false;}
    if (wire_edge.getGeomType() !== gs.EGeomType.edges) {return false;}
    if (face_vertex.getGeomType() !== gs.EGeomType.vertices) {return false;}
    if (wire_vertex.getGeomType() !== gs.EGeomType.vertices) {return false;}
    return true;
}

export function test_Geom_getTopoFromLabel(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const geom: gs.IGeom = m.getGeom();
    const face: gs.ITopo = geom.getTopoFromLabel("o0:f1");
    const wire: gs.ITopo = geom.getTopoFromLabel("o0:w0");
    const face_edge: gs.ITopo = geom.getTopoFromLabel("o0:f1:e1");
    const wire_edge: gs.ITopo = geom.getTopoFromLabel("o0:w0:e2");
    const face_vertex: gs.ITopo = geom.getTopoFromLabel("o0:f1:v2");
    const wire_vertex: gs.ITopo = geom.getTopoFromLabel("o0:w0:v2");
    if (face.getGeomType() !== gs.EGeomType.faces) {return false;}
    if (wire.getGeomType() !== gs.EGeomType.wires) {return false;}
    if (face_edge.getGeomType() !== gs.EGeomType.edges) {return false;}
    if (wire_edge.getGeomType() !== gs.EGeomType.edges) {return false;}
    if (face_vertex.getGeomType() !== gs.EGeomType.vertices) {return false;}
    if (wire_vertex.getGeomType() !== gs.EGeomType.vertices) {return false;}
    return true;
}

export function test_Geom_getTopos(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const geom: gs.IGeom = m.getGeom();
    if(!(geom.getTopos(
    gs.EGeomType.edges).length === geom.numTopos(gs.EGeomType.edges))) {return false;}
    if(!(geom.getTopos(
    gs.EGeomType.vertices).length === geom.numTopos(gs.EGeomType.vertices))) {return false;}
    if(!(geom.getTopos(
    gs.EGeomType.faces).length === geom.numTopos(gs.EGeomType.faces))) {return false;}
    if(!(geom.getTopos(
    gs.EGeomType.wires).length === geom.numTopos(gs.EGeomType.wires))) {return false;}
    return true;
}

export function test_Geom_numTopos(): boolean {
    const m: gs.Model = new gs.Model(td.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    if(!(geom.getTopos(
    gs.EGeomType.edges).length === geom.numTopos(gs.EGeomType.edges))) {return false;}
    if(!(geom.getTopos(
    gs.EGeomType.vertices).length === geom.numTopos(gs.EGeomType.vertices))) {return false;}
    if(!(geom.getTopos(
    gs.EGeomType.faces).length === geom.numTopos(gs.EGeomType.faces))) {return false;}
    if(!(geom.getTopos(
    gs.EGeomType.wires).length === geom.numTopos(gs.EGeomType.wires))) {return false;}

    return true;
}
