import * as cs from "./math_conics";
import * as gs from "./gs-json";

/**
 * Series of tests to verify Mathematic Conics implemented methods
 */
export function test_length(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    const curve: gs.IEllipse = g.addEllipse(pt,[1,0,0],[0,1,0],[45,135]);
    const distance: number =  cs.ellipseLength(curve);
    // console.log("distance is " + distance) ;
    return true;
}
export function test_evaluate(): boolean {
    // const m: gs.Model = new gs.Model();
    // const g: gs.IGeom = m.getGeom();
    // const pt: gs.IPoint = g.addPoint([0,0,0]);
    // const curve: gs.IConicCurve = g.addConicCurve(pt,[1,0,0],[0,1,0],[0,160]);
    // const xyz: number[] = cs.evaluate(curve, 0.5);
    // if(!(xyz === [0,0,0])) {return false;}
    return true;
}
