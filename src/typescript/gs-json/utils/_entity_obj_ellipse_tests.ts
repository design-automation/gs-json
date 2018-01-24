import * as gs from "./_export";
import {Arr} from "./arr";
/**
 * Series of tests to verify Entity Object Ellipse implemented methods
 */
export function test_getObjType(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve: gs.IEllipse = g.addEllipse(pt,[1,0,0],[0,1,0],[45,135]);
    if(!(curve.getObjType() === gs.EObjType.ellipse)) {return false ;}
    return true;
}
export function test_isClosed(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve1: gs.IEllipse = g.addEllipse(pt,[1,0,0],[0,1,0],[45,135]);
    if(curve1.isClosed()) {return false;}
    const curve2: gs.IEllipse = g.addEllipse(pt,[10,0,0],[0,1,0]);
    if(!curve2.isClosed()) {return false;}
    return true;
}
export function test_getOrigin(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve: gs.IEllipse = g.addEllipse(pt,[1,0,0],[0,1,0],[45,135]);
    if(!Arr.equal(curve.getOrigin().getPosition(), pt.getPosition())) {return false;}
    return true;
}
export function test_getVectors(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve: gs.IEllipse = g.addEllipse(pt,[1,0,0],[0,1,0],[45,135]);
    console.log(curve.getVectors());
    return true;
}
export function test_getRadii(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve: gs.IEllipse = g.addEllipse(pt,[1,0,0],[0,1,0],[45,135]);
    curve.getRadii();
    return true;
}
export function test_getAngles(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve: gs.IEllipse = g.addEllipse(pt,[1,0,0],[0,1,0],[45,135]);
    curve.getAngles();
    return true;
}
export function test_get_U1(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve: gs.IEllipse = g.addEllipse(pt,[1.123,4,6],[3,1.456,9],[45,135]);
    console.log(curve.get_U1());
    return true;
}
export function test_get_V1(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve: gs.IEllipse = g.addEllipse(pt,[1.123,4,6],[3,1.456,9],[45,135]);
    console.log(curve.get_V1());
    return true;
}
