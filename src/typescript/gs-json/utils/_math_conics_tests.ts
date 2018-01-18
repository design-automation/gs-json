import * as cs from "./math_conics";
import * as gs from "./_export";

/**
 * Series of tests to verify Mathematic Conics implemented methods
 */
export function test_circleLength(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([1,2,9]);
    const angle_1: number = 45;
    const angle_2: number = 145;
    const radius: number = 400;
    const threshold: number = 1e-6;
    let circle: gs.Circle = null;
    for(let k=1; k<100;k++) {
    circle = g.addCircle(pt, [radius,0,0],[0,radius,0],[Math.min(angle_1,angle_2/k),Math.max(angle_1,angle_2/k)]);
    if(Math.abs(cs.circleLength(circle)
        - radius*Math.abs(angle_2/k - angle_1)*2*Math.PI/360) > threshold) {return false ;}
    }
    return true;
}
export function test_circleEvaluate(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([1,2,9]);
    const angle_1: number = 0;
    const angle_2: number = 360;
    const vector_x: gs.XYZ = [0,4,0];
    const vector_y: gs.XYZ = [-4,0,0];
    const circle: gs.ICircle = g.addCircle(pt, vector_x,vector_y,[angle_1,angle_2]);
    const threshold: number = 1e-6;
    let xyz: gs.XYZ = null;
    let theta: number = null;
    let x: number = null;
    let y: number = null;
    let z: number = null;

    const init_angle: number = Math.PI/2;
    // Evaluation on 99 points on the circle
    for(let k = 1; k<100; k++) {
        xyz = cs.circleEvaluate(circle, 1/k);
        theta = (circle.getAngles()[0] + (circle.getAngles()[1] - circle.getAngles()[0])/k)*2*Math.PI/360;

        x = circle.getRadius()*Math.cos(theta + init_angle) + circle.getOrigin().getPosition()[0];
        y = circle.getRadius()*Math.sin(theta + init_angle) + circle.getOrigin().getPosition()[1];
        z = circle.getOrigin().getPosition()[2];
        if(Math.abs(xyz[0] - x) > threshold) {return false ;}
        if(Math.abs(xyz[1] - y) > threshold) {return false ;}
        if(Math.abs(xyz[2] - z) > threshold) {return false ;}
    }

    const t: number = 0 ;
    xyz = cs.circleEvaluate(circle, t);
    theta = (circle.getAngles()[0] + (circle.getAngles()[1] - circle.getAngles()[0])*t)*2*Math.PI/360;
    // const init_angle: number = Math.PI/2;
    x = circle.getRadius()*Math.cos(theta + init_angle) + circle.getOrigin().getPosition()[0];
    y = circle.getRadius()*Math.sin(theta + init_angle) + circle.getOrigin().getPosition()[1];
    z = circle.getOrigin().getPosition()[2];
    if(Math.abs(xyz[0] - x) > threshold) {return false ;}
    if(Math.abs(xyz[1] - y) > threshold) {return false ;}
    if(Math.abs(xyz[2] - z) > threshold) {return false ;}
    return true;
}
export function test_circleGetRenderXYZs(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();

    // In [0,x,y] Plan
    const center1: gs.IPoint = g.addPoint([1,1,0]);
    const circle1: gs.ICircle = g.addCircle(center1,[1,0,0],[0,1,0],[0,90]);
    console.log(cs.circleGetRenderXYZs(circle1,0.4));

    // In [0,x,z] Plan
    const center2: gs.IPoint = g.addPoint([1,0,2]);
    const circle2: gs.ICircle = g.addCircle(center2,[1,0,0],[0,0,1],[0,90]);
    // console.log(cs.circleGetRenderXYZs(circle2,0.4));

    // In [0,y,z] Plan
    const center3: gs.IPoint = g.addPoint([0,1,2]);
    const circle3: gs.ICircle = g.addCircle(center3,[0,1,0],[0,0,1],[0,90]);
    // console.log(cs.circleGetRenderXYZs(circle3,0.4));

    // In [0,x,(y+z).normalize()] Plan
    const center4: gs.IPoint = g.addPoint([0,Math.sqrt(2)/2,Math.sqrt(2)/2]);
    const circle4: gs.ICircle = g.addCircle(center4,[1,0,0],[0,Math.sqrt(2)/2,Math.sqrt(2)/2],[0,90]);
    // console.log(cs.circleGetRenderXYZs(circle4,0.4));

    // In [0,(x+z).normalize()),y] Plan
    const center5: gs.IPoint = g.addPoint([Math.sqrt(2)/2,0,Math.sqrt(2)/2]);
    const circle5: gs.ICircle = g.addCircle(center5,[Math.sqrt(2)/2,0,Math.sqrt(2)/2],[0,1,0],[0,90]);
    // console.log(cs.circleGetRenderXYZs(circle5,0.4));

    // In [0,-y,x] Plan
    const center6: gs.IPoint = g.addPoint([0,-1,0]);
    const circle6: gs.ICircle = g.addCircle(center6,[0,-1,0],[1,0,0],[0,90]);
    // console.log(cs.circleGetRenderXYZs(circle6,0.4));
    return true;
}
export function test_ellipseLength(): boolean {
    return true;
}
export function test_ellipseEvaluate(): boolean {
    return true;
}
export function test_ellipseGetRenderXYZs(): boolean {
    return true;
}
