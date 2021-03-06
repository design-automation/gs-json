import * as gs from "./gs-json";
import * as td from "./generate/generate";
import {} from "jasmine";

describe("Tests for Polymesh class", () => {
    it("test_Polymesh_getObjType", () => {
        expect( test_Polymesh_getObjType() ).toBe(true);
    });
});


// Polymesh test, extend Obj by 1 method
export function test_Polymesh_getObjType(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1 = g.addPoint([0,0,0]);
    const p2 = g.addPoint([2,0,0]);
    const p3 = g.addPoint([2,7,0]);
    const p4 = g.addPoint([7,7,2]);
    const pmesh1: gs.IPolymesh = g.addPolymesh([
        [p1,p2,p3],
        [p2,p4,p3],
    ]);

    const p10 = g.addPoint([-5,-3,-2]);
    const p11 = g.addPoint([5,-3,-2]);
    const p12 = g.addPoint([5,3,-2]);
    const p13 = g.addPoint([-5,3,-2]);
    const p14 = g.addPoint([-5,-3,2]);
    const p15 = g.addPoint([5,-3,2]);
    const p16 = g.addPoint([5,3,2]);
    const p17 = g.addPoint([-5,3,2]);

    const pmesh2: gs.IPolymesh = g.addPolymesh([
        [p13,p12,p11,p10], // bottom
        [p10,p11,p15,p14], // side0
        [p11,p12,p16,p15], // side1
        [p12,p13,p17,p16], // side2
        [p13,p10,p14,p17], // side3
        [p14,p15,p16,p17], // top
    ]);

    const pmesh3: gs.IPolymesh = g.addPolymesh([
        [p13,p12,p11,p10], // bottom
        [p10,p11,p15,p14], // side0
        [p13,p10,p14,p17], // side3
        [p14,p15,p16,p17], // top
    ]);

    if (!(pmesh1.getObjType() === 200)) {return false;}
    if (!(pmesh2.getObjType() === 200)) {return false;}
    if (!(pmesh3.getObjType() === 200)) {return false;}

    const m2: gs.IModel = td.genModelBox();
    const box2: gs.Polymesh = m2.getGeom().getObj(0) as gs.Polymesh;
    if (box2.numWires() !== 0) {return false;}

    const m3: gs.IModel = td.genModelBoxOpen1();
    const box3: gs.Polymesh = m3.getGeom().getObj(0) as gs.Polymesh;
    if (box3.numWires() !== 1) {return false;}

    const m4: gs.IModel = td.genModelBoxOpen2();
    const box4: gs.Polymesh = m4.getGeom().getObj(0) as gs.Polymesh;
    if (box4.numWires() !== 1) {return false;}

    const m5: gs.IModel = td.genModelBoxOpen2Disjoint();
    const box5: gs.Polymesh = m5.getGeom().getObj(0) as gs.Polymesh;
    if (box5.numWires() !== 2) {return false;}

    const m6: gs.IModel = td.genModelTwoBoxesOpen();
    const box6: gs.Polymesh = m6.getGeom().getObj(0) as gs.Polymesh;
    if (m6.getGeom().getObj(0).numWires() !== 1) {return false;}
    if (m6.getGeom().getObj(1).numWires() !== 2) {return false;}

    return true;
}

