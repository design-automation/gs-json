import * as gs from "./gs-json";
import {Arr} from "./arr";
/**
 * Series of tests to verify Entity Object Conic Curve implemented methods
 */
export function test_getObjType(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve: gs.IConicCurve = g.addConicCurve(pt,[1,0,0],[0,1,0],[45,135]);
    if(!(curve.getObjType() === 3)) {return false ;}
    return true;
}
export function test_isClosed(): boolean {
    return true;
}
export function test_getOrigin(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve: gs.IConicCurve = g.addConicCurve(pt,[1,0,0],[0,1,0],[45,135]);
    if(!Arr.equal(curve.getOrigin().getPosition(), pt.getPosition())) {return false;}
    return true;
}
export function test_getVectors(): boolean {
    // const m: gs.Model = new gs.Model();
    // const g: gs.IGeom = m.getGeom();
    // const pt: gs.IPoint = g.addPoint([0,0,0]);
    // const vector_1: number[] = [1,0,0];
    // const vector_2: number[] = [0,1,0];
    // const curve: gs.IConicCurve = g.addConicCurve(pt,vector_1,vector_2,[45,135]);
    // if(!Arr.equal(curve.getVectors()[0], vector_1)) {return false;}
    // if(!Arr.equal(curve.getVectors()[1], vector_2)) {return false;}
    return true;
}
export function test_getRadii(): boolean {
    return true;
}
export function test_getAngles(): boolean {
    // const m: gs.Model = new gs.Model();
    // const g: gs.IGeom = m.getGeom();
    // const pt: gs.IPoint = g.addPoint([0,0,0]);
    // const vector_1: number[] = [1,0,0];
    // const vector_2: number[] = [0,1,0];
    // const angle_1: number = 0;
    // const angle_2: number = 180;
    // const curve: gs.IConicCurve = g.addConicCurve(pt,vector_1,vector_2,[angle_1,angle_2]);
    // console.log(curve.getAngles());
    // if(!Arr.equal(curve.getAngles(), [angle_1, angle_2])) {return false;}
    return true;
}
