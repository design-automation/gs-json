import * as cs from "./math_conics";
import * as gs from "./gs-json";

/**
 * Series of tests to verify Mathematic Conics implemented methods
 */
export function test_circleLength(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([1,1,1]);
    const circle: gs.ICircle = g.addCircle(pt, [1,0,0],[0,1,0],[0,360]);
    const threshold: number = 1e-6;
    if(Math.abs(cs.circleLength(circle) - 2*Math.PI*1) > threshold) {return false ;}
    return true;
}
export function test_circleEvaluate(): boolean {
    return true;
}
export function test_circleGetRenderXYZs(): boolean {
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
