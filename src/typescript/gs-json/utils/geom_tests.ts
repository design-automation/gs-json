import * as gs from "./gs-json";

export function test_createPoint(): boolean {
    const model: gs.IModel = new gs.Model();
    const a: number[] = [1, 2, 3];
    //  for (let k: number = 0 ; 10 ; k++) {a[k] = Math.floor(Math.random() * 10); } (this line crashes Karma)
    model.getGeom().addPoint(a);
    // test 1
    if (model.getGeom().numPoints() !== 1) {return false; }
    // test 2
    for (let k: number = 0 ; k < a.length ; k++) {
        if (model.getGeom().getPointData(0)[1][k] !== a[k] ) {return false; }
    }
    return true;
}

// Geom constructor and its 19 public methods are tested
export function test_Geom_constructor(): boolean {
    const m1: gs.IModel = new gs.Model();
    const a: number[] = [1, 2, 3];
    m1.getGeom().addPoint(a);
    m1.getGeom().getPointData(0);

    const m2: gs.IModel = new gs.Model();
    //   console.log(m1.getGeom().getPointData(0));
    //  let g2: Geom = new Geom(m2, m1.getGeom().getPointData(0), null);
    // let g2: Geom = new Geom(m2, m1.getGeom().getPointData(0), []);

    // tester le constructeur
    // console.log(m2.getGeom().numPoints());
    // console.log(m2.getGeom().getPointData(0)[1]);
    return true;
}

export function test_Geom_getModel(): boolean {
   const m: gs.IModel = new gs.Model();
   const g: gs.IGeom = m.getGeom();
   g.addPoint([1, 2, 7]);
//   console.log(g);
//   console.log(g.getModel().getGeom().getPointData(0));
//   console.log(a.getModel().getGeom().getPointIDs());
   return true;
}

export function test_Geom_addPoint(): boolean {
    const model: gs.IModel = new gs.Model();
    const p1: number[] = [4, 8, 6];
    let num_Point: number = 1;
    //  for (let k: number = 0 ; 10 ; k++) {a[k] = Math.floor(Math.random() * 10); } (this line crashes Karma)
    model.getGeom().addPoint(p1);
    // test 1.1
    if (model.getGeom().numPoints() !== num_Point) {return false; }
    // test 1.2
    for (let j: number = 0; j < model.getGeom().numPoints(); j++) {
        for (let k: number = 0 ; k < p1.length ; k++) {
            if (model.getGeom().getPointData(j)[1][k] !== p1[k] ) {return false; }
        }
    }
    // //
    const p2: number[] = [4, 2, 8];
    num_Point = num_Point + 1;
    model.getGeom().addPoint(p2);
    // test 2.1
    if (model.getGeom().numPoints() !== num_Point) {return false; }
    // test 2.2
    for (let k: number = 0 ; k < p2.length ; k++) {
            if (model.getGeom().getPointData(1)[1][k] !== p2[k] ) {return false; }
        }
    // //
    const p3: number[] = [6, 1, 7];
    num_Point = num_Point + 1;
    model.getGeom().addPoint(p3);
    // test 3.1
    if (model.getGeom().numPoints() !== num_Point) {return false; }
    // test 3.2
    for (let k: number = 0 ; k < p3.length ; k++) {
            if (model.getGeom().getPointData(2)[1][k] !== p3[k] ) {return false; }
        }
    return true;
}

export function test_Geom_addPolyline(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1 = g.addPoint([0, 0, 0]);
    const p2 = g.addPoint([2, 0, 0]);
    const p3 = g.addPoint([3, 6, 0]);
    const p4 = g.addPoint([7, 4, 9]);
    const pline1: gs.IPolyline = g.addPolyline([p1, p2, p3, p4], true);
    const pline2: gs.IPolyline = g.addPolyline([p1, p2, p3], false);
    if (g.numObjs() !== 2) {return false; }
    if (pline1.numFaces() !== 0) {return false; }
    if (pline1.numWires() !== 1) {return false; }
    if (pline2.numFaces() !== 0) {return false; }
    if (pline2.numWires() !== 1) {return false; }
    return true;

}
export function test_Geom_addPolymesh(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1 = g.addPoint([0, 0, 0]);
    const p2 = g.addPoint([2, 0, 0]);
    const p3 = g.addPoint([2, 7, 0]);
    const p4 = g.addPoint([7, 7, 2]);
    const pmesh1: gs.IPolymesh = g.addPolymesh([
        [p1, p2, p3],
        [p2, p4, p3],
   ]);

    if (g.numObjs() !== 1) {return false; }
    if (pmesh1.numFaces() !== 2) {return false; }
    if (pmesh1.numWires() !== 1) {return false; }

    const p10 = g.addPoint([-5, -3, -2]);
    const p11 = g.addPoint([5, -3, -2]);
    const p12 = g.addPoint([5, 3, -2]);
    const p13 = g.addPoint([-5, 3, -2]);
    const p14 = g.addPoint([-5, -3, 2]);
    const p15 = g.addPoint([5, -3, 2]);
    const p16 = g.addPoint([5, 3, 2]);
    const p17 = g.addPoint([-5, 3, 2]);

    const pmesh2: gs.IPolymesh = g.addPolymesh([
      [p13, p12, p11, p10], // bottom
      [p10, p11, p15, p14], // side0
      [p11, p12, p16, p15], // side1
      [p12, p13, p17, p16], // side2
      [p13, p10, p14, p17], // side3
      [p14, p15, p16, p17], // top
    ]);

    if (g.numObjs() !== 2) {return false; }
    if (pmesh2.numFaces() !== 6) {return false; }
    if (pmesh2.numWires() !== 0) {return false; }

    const pmesh3: gs.IPolymesh = g.addPolymesh([
      [p13, p12, p11, p10], // bottom
      [p10, p11, p15, p14], // side0
      [p13, p10, p14, p17], // side3
      [p14, p15, p16, p17],  // top
   ]);

    if (g.numObjs() !== 3) {return false; }
    if (pmesh3.numFaces() !== 4) {return false; }
    if (pmesh3.numWires() !== 1) {return false; }

    return true;
}
export function test_Geom_getPointData(): boolean {
    return true;
}
export function test_Geom_getObjData(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    g.addPoint([1, 3, 8]);
    g.addPoint([6, 4, 3]);
    const b1: gs.ITopoPath = new gs.TopoPath(0, null, null, null, null);
    const b2: gs.ITopoPath = new gs.TopoPath(1, null, null, null, null);
    // console.log(b1.equals(b1));
    // console.log(b1.equals(b2));
    // console.log(a.getObjData(b1));
    // console.log(a.getObjData(b2));
    return true;
}
export function test_Geom_getPointIDs(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    g.addPoint([1, 3, 8]);
    g.addPoint([6, 4, 3]);
    g.addPoint([8, 8, 8]);
    g.addPoint([3, 4, 5]);
    g.addPoint([2, 3, 5]);
    g.addPoint([1, 5, 2]);
//    console.log(a.getPointIDs()); // expect to return the number 6, as there are 6 points
    return true;
}
export function test_Geom_getPoints(): boolean {
    const m: gs.Model = new gs.Model();
    const g1: gs.IGeom = m.getGeom();

    const p1: number[] = [1, 3, 9] ;
    g1.addPoint(p1);
    const p2: number[] = [2, 1, 6] ;
    g1.addPoint(p2);
    const p3: number[] = [4, 9, 2] ;
    g1.addPoint(p3);
    const p4: number[] = [2, 3, 4] ;
    g1.addPoint(p4);
    const p5: number[] = [8, 4, 3] ;
    g1.addPoint(p5);
    const p6: number[] = [6, 1, 7] ;
    g1.addPoint(p6);
    const p7: number[] = [9, 0, 4] ;
    g1.addPoint(p7);
    const p8: number[] = [4, 0, 8] ;
    g1.addPoint(p8);

    if ( g1.getPoints()[0].getGeom().getPointData(g1.getPoints()[0].getID())[1] !== p1 ) {return false; }
    if ( g1.getPoints()[0].getGeom().getPointData(g1.getPoints()[1].getID())[1] !== p2 ) {return false; }
    if ( g1.getPoints()[0].getGeom().getPointData(g1.getPoints()[2].getID())[1] !== p3 ) {return false; }
    if ( g1.getPoints()[0].getGeom().getPointData(g1.getPoints()[3].getID())[1] !== p4 ) {return false; }
    if ( g1.getPoints()[0].getGeom().getPointData(g1.getPoints()[4].getID())[1] !== p5 ) {return false; }
    if ( g1.getPoints()[0].getGeom().getPointData(g1.getPoints()[5].getID())[1] !== p6 ) {return false; }
    if ( g1.getPoints()[0].getGeom().getPointData(g1.getPoints()[6].getID())[1] !== p7 ) {return false; }
    if ( g1.getPoints()[0].getGeom().getPointData(g1.getPoints()[7].getID())[1] !== p8 ) {return false; }

    return true;
}
export function test_Geom_getPoint(): boolean {
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    g.addPoint([1, 3, 8]);
    g.addPoint([6, 4, 3]);
    g.addPoint([8, 8, 8]);
    g.addPoint([3, 4, 5]);
    g.addPoint([2, 3, 5]);
    g.addPoint([1, 5, 2]);
    for (let i = 0; i < 6; i++) {
        g.getPoint(i);
    }
    return true;
}
export function test_Geom_delPoint(): boolean {
    return true;
}
export function test_Geom_numPoints(): boolean {
    return true;
}
export function test_Geom_setPointPosition(): boolean {
    return true;
}
export function test_Geom_getPointPosition(): boolean {
    return true;
}
export function test_Geom_getObjIDs(): boolean {
    return true;
}
export function test_Geom_getObjs(): boolean {
    return true;
}
export function test_Geom_getObj(): boolean {
    return true;
}
export function test_Geom_delObj(): boolean {
    return true;
}
export function test_Geom_numObjs(): boolean {
    return true;
}
export function test_Geom_getTopos(): boolean {
    return true;
}
export function test_Geom_numTopos(): boolean {
    return true;
}
export function test_Geom_getAttribTemplate(): boolean {
    return true;
}
