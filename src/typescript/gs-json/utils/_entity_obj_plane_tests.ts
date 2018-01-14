import * as gs from "./_export";

export function test_Plane_getCartesians(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const origin: gs.IPoint = g.addPoint([0,0,0]);
    const plane: gs.IPlane = g.addPlane(origin, [0,0,1], [0,1,0]);
    const cart: number[] = plane.getCartesians();
    return true;
}
