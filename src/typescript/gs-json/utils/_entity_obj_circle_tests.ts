import * as gs from "./_export";
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
    const vector_x: gs.XYZ = [1,0,0];
    const vector_y: gs.XYZ = [0,1,0];
    const curve: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[45,135]);
    if(!Arr.equal(curve.getVectors()[0], vector_x)) {return false;}
    if(!Arr.equal(curve.getVectors()[1], vector_y)) {return false;}
    return true;
}
export function test_setVectors(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const vector_x: gs.XYZ = [1,0,0];
    const vector_y: gs.XYZ = [0,1,0];
    const vector_x_new: gs.XYZ = [0,1,0];
    const vector_y_new: gs.XYZ = [-1,0,0];
    const curve: gs.ICircle = g.addCircle(pt,vector_x,vector_y,[45,135]);
    curve.setVectors(vector_x_new,vector_y_new);
    if(!Arr.equal(curve.getVectors()[0], vector_x_new)) {return false;}
    if(!Arr.equal(curve.getVectors()[1], vector_y_new)) {return false;}
    return true;
}
export function test_getAngles(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const angle_1: number = 140;
    const angle_2: number = 145;
    const curve: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[angle_1,angle_2]);
    if(!Arr.equal(curve.getAngles(), [angle_1,angle_2])) {return false;}
    return true;
}
export function test_setAngles(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const angle_1: number = 140;
    const angle_2: number = 145;
    const angle_1_new: number = 135;
    const angle_2_new: number = 150;
    const curve: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[angle_1,angle_2]);
    curve.setAngles([angle_1_new,angle_2_new]);
    if(!Arr.equal(curve.getAngles(), [angle_1_new,angle_2_new])) {return false;}
    return true;
}
export function test_getRadius(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const radius: number = 1.23;
    const pt: gs.IPoint = g.addPoint([5,6,7]);
    const curve: gs.ICircle = g.addCircle(pt,[radius,0,0],[0,1,0],[45,135]);
    if(curve.getRadius() !== radius) {return false;}
    return true;
}
export function test_isClosed(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const angle_1: number = 0;
    const angle_2: number = 180;
    const angle_3: number = 360;
    const curve1: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[angle_1,angle_2]);
    const curve2: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[angle_1,angle_3]);
    if(curve1.isClosed() === true) {return false;}
    return curve2.isClosed();
}

export function test_length(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const angle_1: number = 0;
    const angle_2: number = 180;
    const angle_3: number = 360;
    const curve1: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[10,200]);
    if(curve1.length() < 0) {return false;}
    return true;
}

export function test_eval(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const angle_1: number = 0;
    const angle_2: number = 180;
    const angle_3: number = 360;
    const curve1: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[10,200]);
    const point = curve1.evalParam(0.3);
    return true;
}

export function test_equiPoints(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const angle_1: number = 0;
    const angle_2: number = 180;
    const angle_3: number = 360;
    const curve1: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[10,200]);
    const points = curve1.equiPoints(20);
    if (points.length !== 20) {return false;}
    return true;
}
