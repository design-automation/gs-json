import * as gs from "./_export";
import * as td from "./gen_gs_models";
import * as three from "three";

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

export function test_Polyline_setIsClosed(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1 = g.addPoint([0,0,0]);
    const p2 = g.addPoint([2,0,0]);
    const p3 = g.addPoint([3,6,0]);
    const p4 = g.addPoint([7,4,9]);
    const pline1: gs.IPolyline = g.addPolyline([p1,p2,p3,p4], false);
    if (pline1.numEdges() !== 3) {return false;}
    pline1.setIsClosed(true);
    if (!pline1.isClosed()) {return false;}
    if (pline1.numEdges() !== 4) {return false;}
    pline1.setIsClosed(false);
    if (pline1.isClosed()) {return false;}
    if (pline1.numEdges() !== 3) {return false;}
    return true;
}

export function test_Polyline_insertVertex(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1 = g.addPoint([0,0,0]);
    const p2 = g.addPoint([2,0,0]);
    const p3 = g.addPoint([3,6,0]);
    const p4 = g.addPoint([7,4,9]);
    const pline1: gs.IPolyline = g.addPolyline([p1,p2,p3,p4], true);
    const edge: gs.IEdge = pline1.getEdges()[0][0][1];
    pline1.insertVertex(edge, g.addPoint([1,1,0]));
    return true;
}

export function test_Polyline_xform(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1 = g.addPoint([0,0,0]);
    const p2 = g.addPoint([2,0,0]);
    const p3 = g.addPoint([3,6,0]);
    const p4 = g.addPoint([7,4,9]);
    const pline1: gs.IPolyline = g.addPolyline([p1,p2,p3,p4], true);
    const matrix: three.Matrix4 = new three.Matrix4();
    matrix.setPosition(new three.Vector3(20, 10, 0));
    pline1.xform(matrix);
    //console.log("test_Polyline_xform", m);
    return true;
}

export function test_Polyline_copy(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1 = g.addPoint([0,0,0]);
    const p2 = g.addPoint([2,0,0]);
    const p3 = g.addPoint([3,6,0]);
    const p4 = g.addPoint([7,4,9]);
    const pline1: gs.IPolyline = g.addPolyline([p1,p2,p3,p4], true);
    const matrix: three.Matrix4 = new three.Matrix4();
    matrix.setPosition(new three.Vector3(20, 10, 0));
    pline1.copy(true).xform(matrix);
    matrix.setPosition(new three.Vector3(40, 10, 0));
    pline1.copy(true).xform(matrix);
    matrix.setPosition(new three.Vector3(60, 10, 0));
    pline1.copy(true).xform(matrix);
    //console.log("test_Polyline_copy", m);
    return true;
}

export function test_Polyline_toString(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1 = g.addPoint([0,0,0]);
    const p2 = g.addPoint([2,0,0]);
    const p3 = g.addPoint([3,6,0]);
    const p4 = g.addPoint([7,4,9]);
    const pline1: gs.IPolyline = g.addPolyline([p1,p2,p3,p4], true);
    if (pline1.toString() !== "Obj:polyline"){return false;}
    //console.log("POINT", p1.toString());
    //console.log("POLYLINE", pline1.toString());
    return true;
}
