import {} from "jasmine";
import * as entities_tests from "../utils/entities_tests";

describe("Tests for Entity class", () => {
    it("test_ent_constructor", () => {
        expect( entities_tests.test_ent_constructor() ).toBe(true);
    });
    it("test_ent_getGeom", () => {
        expect( entities_tests.test_ent_getGeom() ).toBe(true);
    });
    it("test_ent_getID", () => {
        expect( entities_tests.test_ent_getID() ).toBe(true);
    });
    it("test_ent_getModel", () => {
        expect( entities_tests.test_ent_getModel() ).toBe(true);
    });
    // it('test_ent_getGeomType', () => {
    //     expect( entities_tests.test_ent_getGeomType() ).toBe(true);
    // });
    it("test_ent_getAttribNames", () => {
        expect( entities_tests.test_ent_getAttribNames() ).toBe(true);
    });
    it("test_ent_getAttribValue", () => {
        expect( entities_tests.test_ent_getAttribValue() ).toBe(true);
    });
    it("test_ent_setAttribValue", () => {
        expect( entities_tests.test_ent_setAttribValue() ).toBe(true);
    });
    it("test_ent_getGroupNames", () => {
        expect( entities_tests.test_ent_getGroupNames() ).toBe(true);
    });
});

describe("Tests for Point class", () => {
    it("test_point_getGeomType", () => {
        expect( entities_tests.test_point_getGeomType() ).toBe(true);
    });
    it("test_point_setPosition", () => {
        expect( entities_tests.test_point_setPosition() ).toBe(true);
    });
    it("test_point_getPosition", () => {
        expect( entities_tests.test_point_getPosition() ).toBe(true);
    });
    it("test_point_getVertices", () => {
    expect( entities_tests.test_point_getVertices() ).toBe(true);
    });
});

describe("Tests for Obj class", () => {
    it("test_obj_getGeomType", () => {
        expect( entities_tests.test_obj_getGeomType() ).toBe(true);
    });
    it("test_obj_getObjType", () => {
        expect( entities_tests.test_obj_getObjType() ).toBe(true);
    });
    it("test_obj_getPoints", () => {
        expect( entities_tests.test_obj_getPoints() ).toBe(true);
    });
    it("test_obj_getVertices", () => {
        expect( entities_tests.test_obj_getVertices() ).toBe(true);
    });
    it("test_obj_getEdges", () => {
        expect( entities_tests.test_obj_getEdges() ).toBe(true);
    });
    it("test_obj_getWires", () => {
        expect( entities_tests.test_obj_getWires() ).toBe(true);
    });
    it("test_obj_getFaces", () => {
        expect( entities_tests.test_obj_getFaces() ).toBe(true);
    });
});

describe("Tests for Polyline class", () => {
    it("test_Pline_getObjType", () => {
        expect( entities_tests.test_Polyline_getObjType() ).toBe(true);
    });
});

describe("Tests for Polymesh class", () => {
    it("test_Pmesh_getObjType", () => {
        expect( entities_tests.test_Polymesh_getObjType() ).toBe(true);
    });
});
