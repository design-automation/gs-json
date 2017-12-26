import * as gs from "./gs-json";

export function test_Plane_getCartesians(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const A1: gs.IPoint = g.addPoint([0,0,0]);
    const V1: gs.IPoint = g.addPoint([1,0,0]);
    const V2: gs.IPoint = g.addPoint([0,1,0]);
    const P1: gs.IPlane = g.addPlane(A1, V1, V2);
    P1.getCartesians();
    return true;
}
