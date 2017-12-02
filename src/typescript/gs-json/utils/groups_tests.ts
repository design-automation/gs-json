import * as gs from "./gs-json";
import * as td from "./test_data";
import {Arr} from "./arr";

// Testing methods the Groups Class, composed of 1 constructor and 17 methods
export function test_Groups_constructor(): boolean {
    const m: gs.Model = new gs.Model(td.box_with_groups());
    return true;
}

export function test_Groups_getName(): boolean {
    const m: gs.Model = new gs.Model();
    const grp: gs.IGroup = m.addGroup("test");
    if (grp.getName() !== "test") {return false; }
    return true;
}

export function test_Groups_setName(): boolean {
    const m: gs.Model = new gs.Model();
    const grp: gs.IGroup = m.addGroup("test1");
    grp.setName("test2");
    if (grp.getName() !== "test2") {return false; }
    // if (m.getGroup("test2").getName() !== "test2") {return false; }
    return true;
}

export function test_Groups_getParentGroup(): boolean {
    const m: gs.Model = new gs.Model();
    const grp1: gs.IGroup = m.addGroup("test1");
    const grp2: gs.IGroup = m.addGroup("test2", "test1");
    if (grp2.getParentGroup() !== "test1") {return false; }
    const grp3: gs.IGroup = m.addGroup("test3");
    const grp4: gs.IGroup = m.addGroup("test4", "test1");
    if (grp1.getParentGroup() !== null) {return false; }
    if (grp2.getParentGroup() !== "test1") {return false; }
    if (grp3.getParentGroup() !== null) {return false; }
    if (grp4.getParentGroup() !== "test1") {return false; }
    return true;
}

export function test_Groups_getChildGroups(): boolean {
    const m: gs.Model = new gs.Model();
    const grp1: gs.IGroup = m.addGroup("test1");
    const grp2: gs.IGroup = m.addGroup("test2", "test1");
    const grp3: gs.IGroup = m.addGroup("test3");
    const grp4: gs.IGroup = m.addGroup("test4", "test1");
    if (!Arr.equal(grp1.getChildGroups() , [grp2.getName(), grp4.getName()])) {return false; }
    if (!Arr.equal(grp2.getChildGroups() , [])) {return false; }
    if (!Arr.equal(grp3.getChildGroups() , [])) {return false; }
    if (!Arr.equal(grp4.getChildGroups() , [])) {return false; }
    return true;
}

export function test_Groups_setParentGroup(): boolean {
    const m: gs.Model = new gs.Model();
    const grp1: gs.IGroup = m.addGroup("test1");
    const grp2: gs.IGroup = m.addGroup("test2");
    grp2.setParentGroup("test1");
    if (grp2.getParentGroup() !== "test1") {return false; }
    return true;
}

export function test_Groups_removeParentGroup(): boolean {
    const m: gs.Model = new gs.Model();
    const grp1: gs.IGroup = m.addGroup("test1");
    const grp2: gs.IGroup = m.addGroup("test2");
    if (grp2.getParentGroup() !== null) {return false; }
    grp2.setParentGroup("test1");
    if (grp2.getParentGroup() !== "test1") {return false; }
    grp2.setParentGroup("test2");
    if (grp2.getParentGroup() !== "test2") {return false; }
    grp2.removeParentGroup();
    if (grp2.getParentGroup() !== null) {return false; }
    return true;
}

export function test_Groups_getObjIDs(): boolean {
    const m: gs.Model = new gs.Model();
    const grp: gs.IGroup = m.addGroup("Group1");
    grp.addObjs([4, 2, 9, 8]);
    if (!Arr.equal([4, 2, 9, 8], grp.getObjIDs())) {return false;}
    return true;
}

export function test_Groups_addObj(): boolean {
    const m: gs.Model = new gs.Model();
    const grp: gs.IGroup = m.addGroup("Group1");
    if (!Arr.equal([], grp.getObjIDs())) {return false;}
    grp.addObj(4);
    if (!Arr.equal([4], grp.getObjIDs())) {return false;}
    grp.addObj(2);
    if (!Arr.equal([4, 2], grp.getObjIDs())) {return false;}
    grp.addObj(9);
    if (!Arr.equal([4, 2, 9], grp.getObjIDs())) {return false;}
    grp.addObj(8);
    if (!Arr.equal([4, 2, 9, 8], grp.getObjIDs())) {return false;}
    grp.addObj(8);
    grp.addObj(8);
    grp.addObj(8);
    return true;
}

export function test_Groups_addObjs(): boolean {
    const m: gs.Model = new gs.Model();
    const grp: gs.IGroup = m.addGroup("Group1");
    if (!Arr.equal([], grp.getObjIDs())) {return false;}
    grp.addObj(4);
    if (!Arr.equal([4], grp.getObjIDs())) {return false;}
    grp.addObjs([2, 9, 8]);
    if (!Arr.equal([4, 2, 9, 8], grp.getObjIDs())) {return false;}
    return true;
}

export function test_Groups_removeObj(): boolean {
    const m: gs.Model = new gs.Model();
    const grp: gs.IGroup = m.addGroup("Group1");
    if (!Arr.equal([], grp.getObjIDs())) {return false;}
    grp.addObjs([4, 2, 9, 8]);
    if (!Arr.equal([4, 2, 9, 8], grp.getObjIDs())) {return false;}
    grp.removeObj(2);
    if (!Arr.equal([4, 9, 8], grp.getObjIDs())) {return false;}
    grp.removeObj(9);
    if (!Arr.equal([4, 8], grp.getObjIDs())) {return false;}
    return true;
}

export function test_Groups_removeObjs(): boolean {
    const m: gs.Model = new gs.Model();
    const grp: gs.IGroup = m.addGroup("Group1");
    if (!Arr.equal([], grp.getObjIDs())) {return false;}
    grp.addObjs([4, 2, 9, 8]);
    if (!Arr.equal([4, 2, 9, 8], grp.getObjIDs())) {return false;}
    grp.removeObjs([4, 9]);
    if (!Arr.equal([2, 8], grp.getObjIDs())) {return false;}
    return true;
}

export function test_Groups_getTopos(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const g1: gs.IGroup = m.addGroup("Box");
    const g2: gs.IGroup = m.addGroup("Box");
    if (!Arr.equal(g1.getTopoTree().getTopos(), [])) {return false; }
    g1.getTopoTree().addTopo(m.getGeom().getObj(0).getFaces()[0]);
    if (Arr.equal(g1.getTopoTree().getTopos(), [])) {return false; }
    if (!Arr.equal(g2.getTopoTree().getTopos(), [])) {return false; }
    g2.getTopoTree().addTopo(m.getGeom().getObj(0).getWires()[0]);
    if (Arr.equal(g2.getTopoTree().getTopos(), [])) {return false; }
    return true;
    // g.getTopoTree().getTopos(gs.EGeomType.faces).numVertices()
    // console.log(m.getGeom().getObj(0).getFaces()[0].numVertices());
    // console.log(m.getGeom().getObj(0).getFaces()[0].numEdges());
    // console.log(g.getTopoTree().getTopos()[0]);
    // console.log(g.getTopoTree().getTopos()[0].numVertices());
    // if (g.getTopoTree().getTopos().length === 1) {return false; }
    // console.log(g.getTopoTree().getTopos()); // Works well
    // console.log(Arr.equal(g.getTopoTree().getTopos()[0], m.getGeom().getObj(0).getFaces()[0]); );
    // console.log(m.getGeom().getObj(0).getFaces());
    // console.log(m.getGeom().getObj(0).getFaces()[0].getGeomType());
    // // g.getTopoTree().addTopo(m.getGeom().getObj(0).getWires()[0]); // OK
    // // ajouter le lien entre groupe et topos (topo tree)
    // console.log(g.getTopoTree().getTopos()); // Works well : ) : ) : )
    // console.log(g);
    // console.log(m.getGeom().getObj(0).getWires()[0]);
    // console.log(g.getTopos(gs.EGeomType.wires));
    // g.addTopos(m.getGeom().getObj(0).getFaces());
    // console.log(g);
}

export function test_Groups_addTopo(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const g: gs.IGroup = m.addGroup("Group");
    if (!Arr.equal(g.getTopoTree().getTopos(), [])) {return false; }
    g.getTopoTree().addTopo(m.getGeom().getObj(0).getFaces()[0]);
    if (Arr.equal(g.getTopoTree().getTopos(), [])) {return false; }
    return true;

    // console.log(m.getGeom().getObj(0).getWires()[0]);
    // g.addTopo(m.getGeom().getObj(0).getWires()[0]);
    // g.addTopos(m.getGeom().getObj(0).getFaces());

    // console.log("==============")
    // console.log(g)
    // console.log(g.topoToArray());
}

export function test_Groups_addTopos(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const g: gs.IGroup = m.addGroup("Box");
    if (!Arr.equal(g.getTopoTree().getTopos(), [])) {return false; }
    const f1: gs.IFace = m.getGeom().getObj(0).getFaces()[0];
    const f2: gs.IFace = m.getGeom().getObj(0).getFaces()[1];
    const f3: gs.IFace = m.getGeom().getObj(0).getFaces()[2];
    const w1: gs.IWire = m.getGeom().getObj(0).getWires()[0];
    g.addTopos([f1]);
    if (!g.getTopoTree().hasTopo(f1) || g.getTopoTree().hasTopo(f2)
        || g.getTopoTree().hasTopo(f3) || g.getTopoTree().hasTopo(w1)) {return false; }
    g.addTopos([f2, f3, w1]);
    if (!g.getTopoTree().hasTopo(f1) || !g.getTopoTree().hasTopo(f2)
        || !g.getTopoTree().hasTopo(f3) || !g.getTopoTree().hasTopo(w1)) {return false; }
    return true;
}

export function test_Groups_removeTopo(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const g: gs.IGroup = m.addGroup("Box");
    const f1: gs.IFace = m.getGeom().getObj(0).getFaces()[0];
    const f2: gs.IFace = m.getGeom().getObj(0).getFaces()[1];
    const f3: gs.IFace = m.getGeom().getObj(0).getFaces()[2];
    const w1: gs.IWire = m.getGeom().getObj(0).getWires()[0];
    if (!Arr.equal(g.getTopoTree().getTopos(), [])) {return false; }
    g.addTopos([f1, f2, f3, w1]);
    if (!g.getTopoTree().hasTopo(f1) || !g.getTopoTree().hasTopo(f2)
        || !g.getTopoTree().hasTopo(f3) || !g.getTopoTree().hasTopo(w1)) {return false; }
    g.removeTopo(f1);
    if (g.getTopoTree().hasTopo(f1) || !g.getTopoTree().hasTopo(f2)
        || !g.getTopoTree().hasTopo(f3) || !g.getTopoTree().hasTopo(w1)) {return false; }
    return true;
}

export function test_Groups_removeTopos(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const g: gs.IGroup = m.addGroup("Box");
    const f1: gs.IFace = m.getGeom().getObj(0).getFaces()[0];
    const f2: gs.IFace = m.getGeom().getObj(0).getFaces()[1];
    const f3: gs.IFace = m.getGeom().getObj(0).getFaces()[2];
    const w1: gs.IWire = m.getGeom().getObj(0).getWires()[0];
    if (!Arr.equal(g.getTopoTree().getTopos(), [])) {return false; }
    g.addTopos([f1, f2, f3, w1]);
    if (!g.getTopoTree().hasTopo(f1) || !g.getTopoTree().hasTopo(f2)
        || !g.getTopoTree().hasTopo(f3) || !g.getTopoTree().hasTopo(w1)) {return false; }
    g.removeTopos([f2, f3, w1]);
    if (!g.getTopoTree().hasTopo(f1) || g.getTopoTree().hasTopo(f2)
        || g.getTopoTree().hasTopo(f3) || g.getTopoTree().hasTopo(w1)) {return false; }
    return true;
}

export function test_Groups_getPointIDs(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const g: gs.IGroup = m.addGroup("Box");
    g.addPoints([0, 2, 4]);
    if (g.getPointIDs()[1] !== 2) {return false; }
    return true;
}

export function test_Groups_addPoint(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const g: gs.IGroup = m.addGroup("Box");
    const point: gs.IPoint = m.getGeom().addPoint([11, 22, 33]);
    g.addPoint(point.getID());
    if (!(m.getGeom().numPoints() - g.getPointIDs()[0] === 1)) {return false; }
    return true;
}

export function test_Groups_addPoints(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const g1: gs.IGroup = m.addGroup("Box");
    const g2: gs.IGroup = m.addGroup("Box");
    const point1: gs.IPoint = m.getGeom().addPoint([11, 22, 36]);
    const point2: gs.IPoint = m.getGeom().addPoint([12, 22, 23]);
    const point3: gs.IPoint = m.getGeom().addPoint([14, 32, 33]);
    g2.addPoints([point1.getID(), point2.getID(), point3.getID()]);
    if (! (g2.getPointIDs().length - g1.getPointIDs().length === 3)) {return false; }
    return true;
}

export function test_Groups_removePoint(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const g1: gs.IGroup = m.addGroup("Box");
    const g2: gs.IGroup = m.addGroup("Box");
    const point1: gs.IPoint = m.getGeom().addPoint([11, 22, 36]);
    const point2: gs.IPoint = m.getGeom().addPoint([12, 22, 23]);
    const point3: gs.IPoint = m.getGeom().addPoint([194, 32, 33]);
    const point4: gs.IPoint = m.getGeom().addPoint([12, 229, 23]);
    const point5: gs.IPoint = m.getGeom().addPoint([11, 22, 369]);
    g2.addPoints([point1.getID(), point2.getID(), point3.getID(), point4.getID(), point5.getID()]);
    if (!(g2.getPointIDs().length === 5)) {return false; }
    g2.removePoint(point2.getID());
    if (!(g2.getPointIDs().length === 4)) {return false; }
    g2.removePoint(point3.getID());
    if (!(g2.getPointIDs().length === 3)) {return false; }
    return true;
}

export function test_Groups_removePoints(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const g: gs.IGroup = m.addGroup("Box");
    const point1: gs.IPoint = m.getGeom().addPoint([11, 22, 36]);
    const point2: gs.IPoint = m.getGeom().addPoint([12, 22, 23]);
    const point3: gs.IPoint = m.getGeom().addPoint([194, 32, 33]);
    const point4: gs.IPoint = m.getGeom().addPoint([12, 229, 23]);
    const point5: gs.IPoint = m.getGeom().addPoint([11, 22, 369]);
    g.addPoints([point1.getID(), point2.getID(), point3.getID(), point4.getID(), point5.getID()]);
    if (!(g.getPointIDs().length === 5)) {return false; }
    g.removePoints([point2.getID(), point4.getID(), point5.getID()]);
    if (!(g.getPointIDs().length === 2)) {return false; }
    return true;
}

export function test_Groups_getProps(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const g: gs.IGroup = m.addGroup("Box");
    // console.log(g.getProps());
    return true;
}

export function test_Groups_setProps(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const g: gs.IGroup = m.addGroup("Box");
    const a: Map<string, any> = new Map();
    if (! g.getProps() === null) {return false; }
    a.set("one", 1);
    a.set("two", 2);
    a.set("three", 3);
    a.set("four", 4);
    g.setProps(a);
    if (!(g.getProps() === a)) {return false; }
    return true;
}
