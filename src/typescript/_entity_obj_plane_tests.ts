import * as gs from "./gs-json";
import {Arr} from "./libs/arr/arr";
import {} from "jasmine";

describe("Tests for Plane class", () => {
    it("test_Plane_getCartesians", () => {
        expect( test_Plane_getCartesians() ).toBe(true);
    });
    it("test_Plane_getVectors", () => {
        expect( test_Plane_getAxes() ).toBe(true);
    });
});

export function test_Plane_getCartesians(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const origin: gs.IPoint = g.addPoint([0,0,0]);
    const plane: gs.IPlane = g.addPlane(origin, [0,0,1], [0,1,0]);
    const cart: number[] = plane.getCartesians();
    return true;
}

export function test_Plane_getAxes(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const origin: gs.IPoint = g.addPoint([0,0,0]);
    const plane: gs.IPlane = g.addPlane(origin, [1,2,3], [4,5,6]);
    const vectors: gs.XYZ[] = plane.getAxes();
    const plane2: gs.IPlane = g.addPlane(origin, vectors[0], vectors[1]);
    return true;
}

