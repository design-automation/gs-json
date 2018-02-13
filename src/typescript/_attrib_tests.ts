import * as gs from "./gs-json";
import * as gen from "./generate/generate";
import * as td from "./test_data";
import {} from "jasmine";

describe("Tests for Attrib class", () => {
    it("test_Attrib_constructor", () => {
        expect( test_Attrib_constructor() ).toBe(true);
    });
    it("test_Attrib_getName", () => {
        expect( test_Attrib_getName() ).toBe(true);
    });
    it("test_Attrib_setName", () => {
        expect( test_Attrib_setName() ).toBe(true);
    });
    it("test_Attrib_getGeomType", () => {
        expect( test_Attrib_getGeomType() ).toBe(true);
    });
    it("test_Attrib_getObjDataType", () => {
        expect( test_Attrib_getObjDataType() ).toBe(true);
    });
    it("test_Attrib_getValues", () => {
        expect( test_Attrib_getValues() ).toBe(true);
    });
    it("test_Attrib_getLabels", () => {
        expect( test_Attrib_getLabels() ).toBe(true);
    });
    it("test_Attrib_count", () => {
        expect( test_Attrib_count() ).toBe(true);
    });
});

export function test_Attrib_constructor(): boolean {
    const m: gs.IModel = new gs.Model();
    const b: gs.IAttrib = m.addEntAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
    return true;
}

export function test_Attrib_getName(): boolean {
    const m: gs.IModel = new gs.Model();
    const b: gs.IAttrib = m.addEntAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
    if (b.getName() !== "test1" ) {return false; }
    return true;
}

export function test_Attrib_setName(): boolean {
    const m: gs.IModel = new gs.Model();
    const a: gs.IAttrib = m.addEntAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);

    a.setName("test2");
    if (a.getName() === "test1" ) {return false; }
    if (a.getName() !== "test2" ) {return false; }
    return true;
}

export function test_Attrib_getGeomType(): boolean {
    const m: gs.IModel = new gs.Model();
    const b: gs.IAttrib = m.addEntAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
    if (b.getGeomType() !== gs.EGeomType.objs) {return false; }
    return true;
}

export function test_Attrib_getObjDataType(): boolean {
    const m: gs.IModel = new gs.Model();
    const b: gs.IAttrib = m.addEntAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
    if (b.getDataType() !== gs.EDataType.type_num) {return false; }
    return true;
}

export function test_Attrib_getValues(): boolean {
    const m: gs.IModel = gen.genModelBoxWithAttribs();
    const g: gs.IGeom = m.getGeom();
    const ent_attribs: gs.IEntAttrib[] = m.getAllEntAttribs();
    // test ent attrib
    const values1: any[] = ent_attribs[0].getValues();
    g.addPoints([[1,2,3], [2,3,4], [3,4,5]]);
    const points: gs.IPoint[] = g.getAllPoints();
    g.delPoint(points[5]);
    const values2: any[] = ent_attribs[0].getValues();
    if (values1.length !== 8) {return false;}
    if (values2.length !== 10) {return false;}
    // test topo attribs
    const topo_attribs: gs.ITopoAttrib[] = m.getAllTopoAttribs();
    const topo_values1: any[] =  topo_attribs[0].getValues();
    const topo_values2: any[] =  topo_attribs[1].getValues();
    const topo_values3: any[] =  topo_attribs[2].getValues();
    if (topo_values1.length !== 24) {return false;}
    if (topo_values2.length !== 24) {return false;}
    if (topo_values3.length !== 6) {return false;}
    return true;
}

export function test_Attrib_getLabels(): boolean {
    const m: gs.IModel = gen.genModelBoxWithAttribs();
    const g: gs.IGeom = m.getGeom();
    // test ent attrib
    const ent_attribs: gs.IEntAttrib[] = m.getAllEntAttribs();
    const ent_labels: string[] = ent_attribs[0].getLabels();
    if (ent_labels.length !== 8) {return false;}
    // test topo attribs
    const topo_attribs: gs.ITopoAttrib[] = m.getAllTopoAttribs();
    const topo_labels1: string[] = topo_attribs[0].getLabels();
    const topo_labels2: string[] = topo_attribs[1].getLabels();
    const topo_labels3: string[] = topo_attribs[2].getLabels();
    if (topo_labels1.length !== 24) {return false;}
    if (topo_labels2.length !== 24) {return false;}
    if (topo_labels3.length !== 6) {return false;}
    return true;
}

export function test_Attrib_count(): boolean {
    const m: gs.IModel = new gs.Model();
    const a1: gs.XYZ = [Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    const a2: gs.XYZ = [Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    const a3: gs.XYZ = [Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    const a4: gs.XYZ = [Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    // add 4 points
    m.getGeom().addPoint(a1);
    m.getGeom().addPoint(a2);
    m.getGeom().addPoint(a3);
    m.getGeom().addPoint(a4);
    // create a point attribute, all values should be null
    const b: gs.IAttrib = m.addEntAttrib("Color of points", gs.EGeomType.points, gs.EDataType.type_str);
    // if (b.count() !== 4) {return false; }
    return true;
}
