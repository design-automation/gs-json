import * as gs from "./gs-json";
import {Arr} from "./arr";
/**
 * Series of tests to verify Entity Object Ellipse implemented methods
 */
export function test_getObjType(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve: gs.IEllipse = g.addCircle(pt,[1,0,0],[0,1,0],[45,135]);
    if(curve.getObjType() !== gs.EObjType.circle) {return false ;}
    return true;
}

export function test_isClosed(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve1: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[45,135]);
    if(curve1.isClosed()) {return false;}
    const curve2: gs.ICircle = g.addCircle(pt,[10,0,0],[0,1,0]);
    if(!curve2.isClosed()) {return false;}
    return true;

}

export function test_getOrigin(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[45,135]);
    if(!Arr.equal(curve.getOrigin().getPosition(), pt.getPosition())) {return false;}
    return true;
}

export function test_getVectors(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[45,135]);
    curve.getVectors();
    return true;
}

export function test_getRadius(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[45,135]);
    curve.getRadius();
    return true;
}

export function test_getAngles(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[45,135]);
    curve.getAngles();
    return true;
}
