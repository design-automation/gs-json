import * as gs from "./gs-json";
import {Arr} from "./libs/arr/arr";
import {} from "jasmine";

describe("Tests for Entity Object Circle", () => {
    it("test_getObjType", () => {
        expect( test_getObjType() ).toBe(true);
    });
    it("test_getOrigin", () => {
        expect( test_getOrigin() ).toBe(true);
    });
    it("test_getAxes", () => {
        expect( test_getAxes() ).toBe(true);
    });
    it("test_setOrientation", () => {
        expect( test_setOrientation() ).toBe(true);
    });
    it("test_getAngles", () => {
        expect( test_getAngles() ).toBe(true);
    });
    it("test_setAngles", () => {
        expect( test_setAngles() ).toBe(true);
    });
    it("test_getRadius", () => {
        expect( test_getRadius() ).toBe(true);
    });
    it("test_isClosed", () => {
        expect( test_isClosed() ).toBe(true);
    });
    it("test_length", () => {
        expect( test_length() ).toBe(true);
    });
    it("test_evalParam", () => {
        expect( test_evalParam() ).toBe(true);
    });
    it("test_evalPoint", () => {
        expect( test_evalPoint() ).toBe(true);
    });
    it("test_equiPoints", () => {
        expect( test_equiPoints() ).toBe(true);
    });
});


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
export function test_getAxes(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const vector_x: gs.XYZ = [1,0,0];
    const vector_y: gs.XYZ = [0,1,0];
    const curve: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[45,135]);
    if(!Arr.equal(curve.getAxes()[0], vector_x)) {return false;}
    return true;
}
export function test_setOrientation(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const vector_x: gs.XYZ = [1,0,0];
    const vector_y: gs.XYZ = [0,1,0];
    const vector_x_new: gs.XYZ = [0,1,0];
    const vector_y_new: gs.XYZ = [-1,0,0];
    const curve: gs.ICircle = g.addCircle(pt,vector_x,vector_y,[45,135]);
    curve.setOrientation(vector_x_new,vector_y_new);
    if(!Arr.equal(curve.getAxes()[0], vector_x_new)) {return false;}
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
export function test_setRadius(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const radius: number = 1.23;
    const pt: gs.IPoint = g.addPoint([5,6,7]);
    const curve: gs.ICircle = g.addCircle(pt,[radius,0,0],[0,1,0],[45,135]);
    curve.setRadius(123);
    if(curve.getRadius() !== 123) {return false;}
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

export function test_evalParam(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const circle: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[45,135]);
    const point1 = circle.evalParam(0);
    //console.log(point1.getPosition());
    const point2 = circle.evalParam(0.5);
    //console.log(point2.getPosition());
    const point3 = circle.evalParam(1);
    //console.log(point3.getPosition());
    return true;
}

export function test_evalPoint(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    {
        const circle: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[360-45,45]);

        const point1: gs.IPoint = g.addPoint([0,1,0]);
        const t1:number = circle.evalPoint(point1);
        //console.log("t1", t1);
        if (t1 !== 1) {return false;}

        const point2: gs.IPoint = g.addPoint([0,-1,0]);
        const t2:number = circle.evalPoint(point2);
        //console.log("t2", t2);
        if (t2 !== 0) {return false;}

        const point3: gs.IPoint = g.addPoint([1,0,0]);
        const t3:number = circle.evalPoint(point3);
        //console.log("t3", t3);
        if (t3 !== 0.5) {return false;}
    }
    {
        const circle: gs.ICircle = g.addCircle(pt,[1,0,0],[0,1,0],[45,135]);

        const point1: gs.IPoint = g.addPoint([1,0,0]);
        const t1:number = circle.evalPoint(point1);
        //console.log("t1", t1);
        if (t1 !== 0) {return false;}

        const point2: gs.IPoint = g.addPoint([-1,0,0]);
        const t2:number = circle.evalPoint(point2);
        //console.log("t2", t2);
        if (t2 !== 1) {return false;}

        const point3: gs.IPoint = g.addPoint([0,1,0]);
        const t3:number = circle.evalPoint(point3);
        //console.log("t3", t3);
        if (t3 !== 0.5) {return false;}

        const point4: gs.IPoint = g.addPoint([0,1,0.2]);
        const t4:number = circle.evalPoint(point4);
        //console.log("t3", t3);
        if (t4 !== 0.5) {return false;}
    }
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
