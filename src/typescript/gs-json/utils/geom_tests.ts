import {Arr} from "./arr";
import * as gs from "./gs-json";
import * as td from "./test_data";

export function test_createPoint(): boolean {
    const model: gs.IModel = new gs.Model();
    const a: number[] = [1,2,3];
    //  for (let k:number = 0 ; 10 ; k++){a[k] = Math.floor(Math.random() * 10);} (this line crashes Karma)
    model.getGeom().addPoint(a);
    // test 1
    if (model.getGeom().numPoints() !== 1) {return false;}
    // test 2
    // for (let k: number = 0 ; k<a.length ; k++) {
    // if(model.getGeom().getPointData(0)[1][k] !== a[k]) {return false;}
    // }
    return true;
}

// Geom constructor and its 19 public methods are tested
export function test_Geom_constructor(): boolean {
    const m1: gs.IModel = new gs.Model();
    const a: number[] = [1,2,3];
    m1.getGeom().addPoint(a);
    // TODO
    // if(!(Arr.equal(m1.getGeom().getPointData(0)[1],a))) {return false;}
    return true;
}

export function test_Geom_addPoint(): boolean {
    const model: gs.IModel = new gs.Model();
    const p1: number[] = [4,8,6];
    let num_Point: number = 1;
    // for (let k:number = 0 ; 10 ; k++){a[k] = Math.floor(Math.random() * 10);} (this line crashes Karma)
    model.getGeom().addPoint(p1);
    // test 1.1
    if (model.getGeom().numPoints() !== num_Point) {return false;}
    // test 1.2
    for(let j: number = 0; j < model.getGeom().numPoints(); j++) {
        for (let k: number = 0 ; k<p1.length ; k++) {
            // TODO
            // if(model.getGeom().getPointData(j)[1][k] !== p1[k] ) {return false;}
        }
    }
    //
    const p2: number[] = [4, 2, 8];
    num_Point = num_Point + 1;
    model.getGeom().addPoint(p2);

    // test 2.1
    if (model.getGeom().numPoints() !== num_Point) {return false;}
    // test 2.2
    for (let k: number = 0 ; k<p2.length ; k++) {
        // TODO
        // if(model.getGeom().getPointData(1)[1][k] !== p2[k] ) {return false;}
    }
    ////
    const p3: number[] = [6,1,7];
    num_Point = num_Point + 1;
    model.getGeom().addPoint(p3);
    // test 3.1
    if (model.getGeom().numPoints() !== num_Point) {return false;}
    // test 3.2
    for (let k: number = 0 ; k<p3.length ; k++) {
        // TODO
        // if(model.getGeom().getPointData(2)[1][k] !== p3[k] ) {return false;}
    }
    return true;
}

export function test_Geom_addPolyline(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1 = g.addPoint([0,0,0]);
    const p2 = g.addPoint([2,0,0]);
    const p3 = g.addPoint([3,6,0]);
    const p4 = g.addPoint([7,4,9]);
    const pline1: gs.IPolyline = g.addPolyline([p1,p2,p3,p4], true);
    const pline2: gs.IPolyline = g.addPolyline([p1,p2,p3], false);
    if (g.numObjs() !== 2) {return false;}
    if (pline1.numFaces() !== 0) {return false;}
    if (pline1.numWires() !== 1) {return false;}
    if (pline2.numFaces() !== 0) {return false;}
    if (pline2.numWires() !== 1) {return false;}
    return true;
}

export function test_Geom_addPolymesh(): boolean {
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

    if (g.numObjs() !== 1) {return false; }
    if (pmesh1.numFaces() !== 2) {return false; }
    if (pmesh1.numWires() !== 1) {return false; }

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

    if (g.numObjs() !== 2) {return false; }
    if (pmesh2.numFaces() !== 6) {return false; }
    if (pmesh2.numWires() !== 0) {return false; }

    const pmesh3: gs.IPolymesh = g.addPolymesh([
    [p13,p12,p11,p10], // bottom
    [p10,p11,p15,p14], // side0
    [p13,p10,p14,p17], // side3
    [p14,p15,p16,p17], // top
    ]);

    if (g.numObjs() !== 3) {return false; }
    if (pmesh3.numFaces() !== 4) {return false; }
    if (pmesh3.numWires() !== 1) {return false; }

    return true;
}

export function test_Geom_getPointIDs(): boolean {
    const m: gs.IModel = new gs.Model();
    const geom: gs.IGeom = m.getGeom();

    if(!(Arr.equal(geom.getPointIDs(),[]))) {return false;}
    geom.addPoint([1,3,8]);
    if(!(Arr.equal(geom.getPointIDs(),[0]))) {return false;}
    geom.addPoint([6,4,3]);
    if(!(Arr.equal(geom.getPointIDs(),[0,1]))) {return false;}
    geom.addPoint([8,8,8]);
    if(!(Arr.equal(geom.getPointIDs(),[0,1,2]))) {return false;}
    geom.addPoint([3,4,5]);
    if(!(Arr.equal(geom.getPointIDs(),[0,1,2,3]))) {return false;}
    geom.addPoint([2,3,5]);
    if(!(Arr.equal(geom.getPointIDs(),[0,1,2,3,4]))) {return false;}
    geom.addPoint([1,5,2]);
    if(!(Arr.equal(geom.getPointIDs(),[0,1,2,3,4,5]))) {return false;}
    return true;
}

export function test_Geom_getPoints(): boolean {
    const m: gs.Model = new gs.Model();
    const g1: gs.IGeom = m.getGeom();

    const p1: number[] = [1,3,9] ;
    g1.addPoint(p1);
    const p2: number[] = [2,1,6] ;
    g1.addPoint(p2);
    const p3: number[] = [4,9,2] ;
    g1.addPoint(p3);
    const p4: number[] = [2,3,4] ;
    g1.addPoint(p4);
    const p5: number[] = [8,4,3] ;
    g1.addPoint(p5);
    const p6: number[] = [6,1,7] ;
    g1.addPoint(p6);
    const p7: number[] = [9,0,4] ;
    g1.addPoint(p7);
    const p8: number[] = [4,0,8] ;
    g1.addPoint(p8);

    const test8: number[] = g1.getPoints()[7].getPosition();
    if (!Arr.equal( test8, p8)) {return false; }

    return true;
}

export function test_Geom_getPoint(): boolean {
    const m: gs.Model = new gs.Model();
    const geom: gs.IGeom = m.getGeom();
    const p1: gs.IPoint = geom.addPoint([1,3,8]);
    const p2: gs.IPoint = geom.addPoint([6,4,3]);
    const p3: gs.IPoint = geom.addPoint([8,8,8]);
    const p4: gs.IPoint = geom.addPoint([3,4,5]);
    const p5: gs.IPoint = geom.addPoint([2,3,5]);
    const p6: gs.IPoint = geom.addPoint([1,5,2]);

    if(!(Arr.equal(geom.getPointPosition(0),p1.getPosition()))) {return false;}
    if(!(Arr.equal(geom.getPointPosition(1),p2.getPosition()))) {return false;}
    if(!(Arr.equal(geom.getPointPosition(2),p3.getPosition()))) {return false;}
    if(!(Arr.equal(geom.getPointPosition(3),p4.getPosition()))) {return false;}
    if(!(Arr.equal(geom.getPointPosition(4),p5.getPosition()))) {return false;}
    if(!(Arr.equal(geom.getPointPosition(5),p6.getPosition()))) {return false;}
    return true;
}

export function test_Geom_delPoint(): boolean {

    const m: gs.Model = new gs.Model(td.open_box());
    if(m.getGeom().delPoint(m.getGeom().numPoints())){return false;}
    m.getGeom().delPoint(0);
    if(!(m.getGeom().numPoints() === 7)){return false;}
    m.getGeom().delPoint(1);
    if(!(m.getGeom().numPoints() === 6)){return false;}
    m.getGeom().delPoint(2);
    if(!(m.getGeom().numPoints() === 5)){return false;}
    m.getGeom().delPoint(3);
    if(!(m.getGeom().numPoints() === 4)){return false;}



    // console.log(m.getGeom().delPoint(0))
    // console.log(m.getGeom().numPoints())



    // console.log(m.getGeom().numPoints())

    // console.log(m.getGeom().getPoint(0))


    // if(!(m.getGeom().delPoint(3))){return false;}

    // console.log(m.getGeom().getPointIDs())

    // console.log(m.getGeom().getPoints())

    // m.getGeom().delPoint(1);
    // m.getGeom().delPoint(2);
    // m.getGeom().delPoint(3);
    // m.getGeom().delPoint(4);
    // m.getGeom().delPoint(5);
    // m.getGeom().delPoint(6);
    // m.getGeom().delPoint(7);

    // console.log(m);

    // console.log(m.getGeom().getPoints())


    // const gp1: gs.IGroup = m.addGroup("Group1");


    // if(!(m.getGeom().numObjs() === 1)){return false;}
    // m.getGeom().delObj(0,true);
    // if(!(m.getGeom().numObjs() === 0)){return false;}
    // const p1 = m.getGeom().addPoint([0,0,0]);
    // const p2 = m.getGeom().addPoint([2,0,0]);
    // const p3 = m.getGeom().addPoint([3,6,0]);
    // const p4 = m.getGeom().addPoint([7,4,9]);
    // const pline1: gs.IPolyline = m.getGeom().addPolyline([p1,p2,p3,p4], true);
    // const pline2: gs.IPolyline = m.getGeom().addPolyline([p1,p2,p3], false);
    // const pline3: gs.IPolyline = m.getGeom().addPolyline([p1,p3,p4], false);
    // gp1.addObjs([1,2,3])
    // if(!(m.getGeom().numObjs() === 3)){return false;}
    // m.getGeom().delObj(3,true);
    // if(gp1.hasObj(3)){return false;}
    // if(!gp1.hasObj(2)){return false;}
    // if(!gp1.hasObj(1)){return false;}
    // if(!(m.getGeom().numObjs() === 2)){return false;}
    // m.getGeom().delObj(2,true);
    // if(gp1.hasObj(3)){return false;}
    // if(gp1.hasObj(2)){return false;}
    // if(!gp1.hasObj(1)){return false;}
    // if(!(m.getGeom().numObjs() === 1)){return false;}
    // m.getGeom().delObj(1,true);
    // if(gp1.hasObj(3)){return false;}
    // if(gp1.hasObj(2)){return false;}
    // if(gp1.hasObj(1)){return false;}    
    // if(!(m.getGeom().numObjs() === 0)){return false;}



















    // const m: gs.Model = new gs.Model(td.open_box());    
    // m.getGeom().delPoints([0,1,2,3,4,5,6,7]);
    // console.log(m.getGeom());



    // console.log(m.getGeom().getPoints());

    // if(!(m.getGeom().numPoints() == 5)){return false;}
    // for(let k:number = 0 ; k < 4; k++){
    // m.getGeom().delPoint(5-k);
    // if(!(m.getGeom().numPoints() == 5 - (k+1) )){return false;}
    // }

    ///////////////////////////////////////
    // Etape 1: test du retrait du Point ID.

    // const m: gs.Model = new gs.Model(td.open_box());
    // console.log(m.getGeom().getPointIDs());
    // Re-check all other functions after using a delPoint.
    // Interfers with getPointIDS (for the reason that makeSeq is used)

    // m.getGeom().delPoint(4)

    // m.getGeom().delPoint(4);
    // console.log(m);
    //console.log(m.getGeom());
    //console.log(m.getGeom().getPointPosition(4));
    // This sub Point looks kind of solved..

    // const var1:number[] = m.getGeom().getPointIDs();
    // console.log(var1);
    //  delete var1[0];

    // console.log(var1);

    // console.log(m.getGeom().numPoints());

    // m.getGeom().delPoint(5);
    // // delete m.getGeom().
    // console.log(m.getGeom().getPointIDs());
    // //    console.log(m.getGeom().getP)
    // console.log(m);
    return true;

    //////////////////////////////////////////////////////////////////////
    ///////////////////////// DEL POINT TEST /////////////////////////////
    //////////////////////////////////////////////////////////////////////
        // The below test is to run when delPoint funciton is implemented
        // if(!(geom.numPoints() == 5)){return false;}
        // for(let k:number = 0 ; k < 4; k++){
        // geom.delPoint(5-k);
        // if(!(geom.numPoints() == 5 - (k+1) )){return false;}
        // }
    //////////////////////////////////////////////////////////////////////
    ///////////////////////// DEL POINT TEST /////////////////////////////
    //////////////////////////////////////////////////////////////////////
}

export function test_Geom_numPoints(): boolean {

    const m: gs.Model = new gs.Model();
    const geom: gs.IGeom = m.getGeom();
    if(!(geom.numPoints() === 0)) {return false;}
    geom.addPoint([1,3,8]);
    if(!(geom.numPoints() === 1)) {return false;}
    geom.addPoint([8,8,8]);
    if(!(geom.numPoints() === 2)) {return false;}
    geom.addPoint([3,4,5]);
    if(!(geom.numPoints() === 3)) {return false;}
    geom.addPoint([2,3,5]);
    if(!(geom.numPoints() === 4)) {return false;}
    geom.addPoint([1,5,2]);
    if(!(geom.numPoints() === 5)) {return false;}

    return true;

    // for(let k:number = 0; 8 ; k++){               // provoke a Karma Crash
    // if(!(geom.numPoints() == k)){return false;}
    // let x:number = Math.floor(Math.random()*10);
    // let y:number = Math.floor(Math.random()*10);
    // let z:number = Math.floor(Math.random()*10);
    // geom.addPoint([x,y,z]);
    // }
}

export function test_Geom_setPointPosition(): boolean {
    const m: gs.Model = new gs.Model();
    const geom: gs.IGeom = m.getGeom();
    geom.addPoint([1,3,8]);
    geom.setPointPosition(0,[4,8,9]);
    if(!(Arr.equal(geom.getPointPosition(0),[4,8,9]))) {return false;}
    return true;
}

export function test_Geom_getPointPosition(): boolean {
    const m: gs.Model = new gs.Model();
    const geom: gs.IGeom = m.getGeom();
    geom.addPoint([1,3,8]);
    if(!(Arr.equal(geom.getPointPosition(0),[1,3,8]))) {return false;}
    return true;
}

export function test_Geom_getObjIDs(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const geom: gs.IGeom = m.getGeom();
    const p1 = geom.addPoint([0,0,0]);
    const p2 = geom.addPoint([2,0,0]);
    const p3 = geom.addPoint([3,6,0]);
    const p4 = geom.addPoint([7,4,9]);
    if(!((Arr.equal(geom.getObjIDs(),[0])))) {return false;}
    const pline1: gs.IPolyline = geom.addPolyline([p1,p2,p3,p4], true);
    if(!((Arr.equal(geom.getObjIDs(),[0,1])))) {return false;}
    const pline2: gs.IPolyline = geom.addPolyline([p1,p2,p3], false);
    if(!((Arr.equal(geom.getObjIDs(),[0,1,2])))) {return false;}
    const pline3: gs.IPolyline = geom.addPolyline([p1,p3,p4], false);
    if(!((Arr.equal(geom.getObjIDs(),[0,1,2,3])))) {return false;}
    return true;
}

export function test_Geom_getObjs(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const geom: gs.IGeom = m.getGeom();
    const p1 = geom.addPoint([0,0,0]);
    const p2 = geom.addPoint([2,0,0]);
    const p3 = geom.addPoint([3,6,0]);
    const p4 = geom.addPoint([7,4,9]);
    const pline1: gs.IPolyline = geom.addPolyline([p1,p2,p3,p4], true);
    const pline2: gs.IPolyline = geom.addPolyline([p1,p2,p3], false);
    const pline3: gs.IPolyline = geom.addPolyline([p1,p3,p4], false);

    if(!(Arr.equal([geom.getObjs()[0].getObjType()],[200]))) {return false;}
    if(!(Arr.equal([geom.getObjs()[1].getObjType()],[100]))) {return false;}
    if(!(Arr.equal([geom.getObjs()[2].getObjType()],[100]))) {return false;}

    return true;
}

export function test_Geom_getObj(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const geom: gs.IGeom = m.getGeom();
    const polymesh: gs.IObj = geom.getObj(0);
    if(!(Arr.equal([polymesh.getObjType()],[200]))) {return false;}
    return true;
}

export function test_Geom_delObj(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());

    // /////////////////////////////////////////////////
    // // Case 2: With Attributes
    // const att1: gs.IEntAttrib = m.addAttrib("Attribute1", gs.EGeomType.objs, gs.EDataType.type_num) as gs.IEntAttrib;
    // const att2: gs.IEntAttrib = m.addAttrib("Attribute2", gs.EGeomType.points, gs.EDataType.type_num) as gs.IEntAttrib;

    // const p1 = m.getGeom().addPoint([0,0,0]);
    // pb with add point to attribs

    // // End of Case 2
    // /////////////////////////////////////////////////

    /////////////////////////////////////////////////
    // Case 1: Groups, Polylines/Points added then correctly deleted
    const gp1: gs.IGroup = m.addGroup("Group1");
    if(!(m.getGeom().numObjs() === 1)){return false;}
    m.getGeom().delObj(0,true);
    if(!(m.getGeom().numObjs() === 0)){return false;}
    const p1 = m.getGeom().addPoint([0,0,0]);
    const p2 = m.getGeom().addPoint([2,0,0]);
    const p3 = m.getGeom().addPoint([3,6,0]);
    const p4 = m.getGeom().addPoint([7,4,9]);
    const pline1: gs.IPolyline = m.getGeom().addPolyline([p1,p2,p3,p4], true);
    const pline2: gs.IPolyline = m.getGeom().addPolyline([p1,p2,p3], false);
    const pline3: gs.IPolyline = m.getGeom().addPolyline([p1,p3,p4], false);
    gp1.addObjs([1,2,3])
    if(!(m.getGeom().numObjs() === 3)){return false;}
    m.getGeom().delObj(3,true);
    if(gp1.hasObj(3)){return false;}
    if(!gp1.hasObj(2)){return false;}
    if(!gp1.hasObj(1)){return false;}
    if(!(m.getGeom().numObjs() === 2)){return false;}
    m.getGeom().delObj(2,true);
    if(gp1.hasObj(3)){return false;}
    if(gp1.hasObj(2)){return false;}
    if(!gp1.hasObj(1)){return false;}
    if(!(m.getGeom().numObjs() === 1)){return false;}
    m.getGeom().delObj(1,true);
    if(gp1.hasObj(3)){return false;}
    if(gp1.hasObj(2)){return false;}
    if(gp1.hasObj(1)){return false;}    
    if(!(m.getGeom().numObjs() === 0)){return false;}
    // End Case 1; Correctly implemented
    /////////////////////////////////////////////////


    // console.log(m.getAttrib("Attribute1", gs.EGeomType.objs));
    // console.log(att1.getValue(0));
    // console.log(att1.getValue(1));


    // console.log(att1.setValue(0, 1));

    // Now we do the same with Attributes, to check:

    // Then, the deleting functions for Points, and should be Okay..         


    // console.log(m)

//    console.log(m.getAttrib("Attribute1"))


//    const att1: gs.IEntAttrib = m.getAttrib("Attribute1", gs.EGeomType.objs) as gs.IEntAttrib ;
    // console.log(att1)
    // att1
    // att1.setValue(pline1.getID(), 123)
 //  console.log( ">>>>>" , att1.getName())
    // att1.setValue(pline2.getID(), 1234)
    // att1.setValue(pline3.getID(), 123456)
 
    // console.log(att1)
 
    // attrib.setValue(faces[3].getTopoPath(), 1234)
    // const attrib: gs.ITopoAttrib = m1.getAttrib("faces_id", gs.EGeomType.faces) as gs.ITopoAttrib;

    // att1.setValue(pline1.getID(), [123])

    // const m1: gs.IModel = new gs.Model(td.box_with_attribs());
    // const faces: gs.IFace[] = m1.getGeom().getObj(0).getFaces();
    // const attrib: gs.ITopoAttrib = m1.getAttrib("faces_id", gs.EGeomType.faces) as gs.ITopoAttrib;
    // attrib.setValue(faces[3].getTopoPath(), 1234);
    //  console.log(attrib)

    // // console.log(att1.getName());
    // console.log(att1)

    // console.log(att1.getValue(1));
    // console.log(att1.getValue(2));
    // console.log(att1.getValue(3));

    // att1.setValue()

    // console.log(att1.getName())
    // console.log(m.getAttribs(gs.EGeomType.objs));


    // const att1: gs.IAttrib = m.addAttrib()

    // To Do: Attribute checking

    // This test requires the delPoint implementation before running
    // let m:gs.Model = new gs.Model(td.open_box());
    // let geom:gs.IGeom = m.getGeom();
    // if(!((Arr.equal(geom.getObjIDs(),[0])))){return false;}
    // geom.delObj(0,true);
    // let p1 = geom.addPoint([0,0,0]);
    // let p2 = geom.addPoint([2,0,0]);
    // let p3 = geom.addPoint([3,6,0]);
    // let p4 = geom.addPoint([7,4,9]);
    // let pline1:gs.IPolyline = geom.addPolyline([p1,p2,p3,p4], true);
    // if(!((Arr.equal(geom.getObjIDs(),[0])))){return false;}
    // let a:number = geom.getPointIDs().length;
    // geom.delObj(0,false);
    // if(!(Arr.equal(geom.getObjIDs(),[]))){return false;}
    // if( !(a-geom.getPointIDs().length == 4)){return false;}
    return true;
}

export function test_Geom_numObjs(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const geom: gs.IGeom = m.getGeom();
    //numObjs no longer allos you to specify EObjType
    if(!(geom.numObjs() === 1 )) {return false;}
    const p1 = geom.addPoint([0,0,0]);
    const p2 = geom.addPoint([2,0,0]);
    const p3 = geom.addPoint([3,6,0]);
    const p4 = geom.addPoint([7,4,9]);
    const pline1: gs.IPolyline = geom.addPolyline([p1,p2,p3,p4], true);
    if(!(geom.numObjs() === 2 )) {return false;}
    const pline2: gs.IPolyline = geom.addPolyline([p1,p2,p3], false);
    if(!(geom.numObjs() === 3 )) {return false;}
    const pline3: gs.IPolyline = geom.addPolyline([p1,p3,p4], false);
    if(!(geom.numObjs() === 4 )) {return false;}
    return true;
}

export function test_Geom_getTopos(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const geom: gs.IGeom = m.getGeom();
    if(!(geom.getTopos(
    gs.EGeomType.edges).length === geom.numTopos(gs.EGeomType.edges))) {return false;}
    if(!(geom.getTopos(
    gs.EGeomType.vertices).length === geom.numTopos(gs.EGeomType.vertices))) {return false;}
    if(!(geom.getTopos(
    gs.EGeomType.faces).length === geom.numTopos(gs.EGeomType.faces))) {return false;}
    if(!(geom.getTopos(
    gs.EGeomType.wires).length === geom.numTopos(gs.EGeomType.wires))) {return false;}
    return true;
}

export function test_Geom_numTopos(): boolean {
    const m: gs.Model = new gs.Model(td.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    if(!(geom.getTopos(
    gs.EGeomType.edges).length === geom.numTopos(gs.EGeomType.edges))) {return false;}
    if(!(geom.getTopos(
    gs.EGeomType.vertices).length === geom.numTopos(gs.EGeomType.vertices))) {return false;}
    if(!(geom.getTopos(
    gs.EGeomType.faces).length === geom.numTopos(gs.EGeomType.faces))) {return false;}
    if(!(geom.getTopos(
    gs.EGeomType.wires).length === geom.numTopos(gs.EGeomType.wires))) {return false;}
    return true;
}

//  ================================================================================================
//  ================================================================================================
//  ================================================================================================
//  ================================================================================================

// METHOD DELETED
// export function test_Geom_getAttribTemplate(): boolean {
//     const m: gs.Model = new gs.Model(td.open_box());
//     const geom: gs.IGeom = m.getGeom();

//     const p1 = geom.addPoint([0,0,0]);
//     const p2 = geom.addPoint([2,0,0]);
//     const p3 = geom.addPoint([3,6,0]);
//     const p4 = geom.addPoint([7,4,9]);
//     const pline1: gs.IPolyline = geom.addPolyline([p1,p2,p3,p4], true);
//     const pline2: gs.IPolyline = geom.addPolyline([p1,p2,p3], false);
//     const pline3: gs.IPolyline = geom.addPolyline([p1,p3,p4], false);

//     if(!(geom.getAttribTemplate(
//     gs.EGeomType.points).length === geom.numPoints())) {return false;}
//     if(!(geom.getAttribTemplate(
//     gs.EGeomType.objs).length === geom.numObjs() )) {return false;}
//     if(!(geom.getAttribTemplate(
//     gs.EGeomType.wires).length === geom.numTopos(gs.EGeomType.wires))) {return false;}
//     if(!(geom.getAttribTemplate(
//     gs.EGeomType.faces)[0][0].length === geom.numTopos(gs.EGeomType.faces))) {return false;}
//     if(!(Arr.flatten(geom.getAttribTemplate(
//     gs.EGeomType.edges)).length === geom.numTopos(gs.EGeomType.edges))) {return false;}
//     if(!(Arr.flatten(geom.getAttribTemplate(
//     gs.EGeomType.vertices)).length === geom.numTopos(gs.EGeomType.vertices))) {return false;}

//     return true;
// }

// METHOD  DELETED
// export function test_Geom_getPointData(): boolean {
//     const m: gs.Model = new gs.Model(td.open_box());
//     const geom: gs.IGeom = m.getGeom();
//     for ( const k  of  m.getGeom().getPointIDs()) {
//         if(!(Arr.equal(m.getGeom().getPoint(
//             geom.getPointIDs()[k]).getPosition(),geom.getPointData(k)[1]))) {return false;} // compiles well
//     }
//     return true;
// }

// METHOD DELETED
// export function test_Geom_getObjData(): boolean { // A REVERIFIER
//     const m: gs.Model = new gs.Model(td.open_box());
//     const geom: gs.IGeom = m.getGeom();
//     // const path:gs.ITopoPath = ;

//     // Vertices/Edges (Wires)
//     if(!Arr.equal([m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.vertices, 3))],[3])){return false;}
//     if(!Arr.equal(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 2)),[2,3])){return false;}
//     // Vertices/Edges (Faces)
//     if(!Arr.equal([m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.faces, 3, gs.EGeomType.vertices, 2))],[7])){return false;}
//     if(!Arr.equal(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.faces, 3, gs.EGeomType.edges, 1)),[4,7])){return false;}
//     // Wire
//     if(!Arr.equal(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.wires, 0)),[0, 1, 2, 3, -1])){return false;}
//     // Face
//     if(!Arr.equal(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.faces, 3)),[0, 4, 7, 3, -1])){return false;}
//     // Object
//     if(!Arr.equal(m.getGeom().getObjData(new gs.TopoPath(0))[0][0],[0, 1, 2, 3, -1])){return false;}
//     if(!Arr.equal(m.getGeom().getObjData(new gs.TopoPath(0))[2],[200])){return false;}
//     if(!Arr.equal(m.getGeom().getObjData(new gs.TopoPath(0))[1][3],[0, 4, 7, 3, -1])){return false;}

//     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//     //Exceptions, All 11 below tests, if released, must show errors:
//     // Case object undefined:    console.log(m.getGeom().getObjData(new gs.TopoPath(0))) = OK

//     // Case Object undefined, OK (test 1/11)
//     // console.log(m.getGeom().getObjData(new gs.TopoPath(4)))
//     // Case Edges undefined, test 2/11 OK
//     // console.log(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.faces, 10)))
//     // Case Wires undefined, test 3/11 OK
//     // console.log(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.wires, 10)))
//     // Case Vertices (Wires) undefined or points -1: (test 4/11 and 5/11) OK
//     // console.log(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.vertices, 44)))
//     // console.log(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.vertices, 4)))
//     // Case Vertices (Faces) undefined or points -1: (test 6/11 and 7/11) OK
//     // console.log(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 88)))
//     // console.log(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 4)))
//     // Case Edges (Wires) undefined or linked to a -1: (test 8/11 and 9/11) OK
//     // console.log(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 44)))
//     if(!Arr.equal(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 3)),[3,0])){return false;}
//     // console.log(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 3)))
//     // Case Edges (Faces) undefined or linked to a -1: (test 10/11 and 11/11) OK
//     // console.log(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 88)))
//     if(!Arr.equal(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 3)),[0,1])){return false;}
//     // console.log(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 3)))

//     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//     // console.log(m.getGeom().getObjData(new gs.TopoPath(0))[0])
//     // // if(!Arr.equal(m.getGeom().getObjData(new gs.TopoPath(0)),[[0, 1, 2, 3, -1],[[1, 5, 4, 0, -1],[2, 6, 5, 1, -1],[3, 7, 6, 2, -1],[0, 4, 7, 3, -1],[5, 6, 7, 4, -1],],[200]])){return false;}
//     // console.log(m.getGeom().getObjData(new gs.TopoPath(0)))
//     // // Exceptions, 2 cases, first, when path shows -1 or undefined

//     // console.log(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.vertices, 4)))
//     // console.log(m.getGeom().getObjData(new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.vertices, 5)))
//     // console.log(4)
//     // console.log(m.getGeom().getObjData(new gs.TopoPath(0)))
//     // // if(!Arr.equal([],[])){return false;}
//     // // if(!Arr.equal([],[])){return false;}
//     // // if(!Arr.equal([],[])){return false;}

//     // const path: gs.ITopoPath = new gs.TopoPath(0);
//     // console.log(geom.getObjData(path))
//     // Edges of Wires

//     // const path0: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0);
//     // const path1: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 1);
//     // const path2: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 2);
//     // const path3: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 3);

//     // console.log(geom.getObjData(path0))
//     // console.log(geom.getObjData(path1))
//     // console.log(geom.getObjData(path2))
//     // console.log(geom.getObjData(path3))

//     // Edges of Faces

//     // const path00: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 3, gs.EGeomType.vertices, 2);
//     // const path01: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 1);
//     // const path02: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 2);
//     // const path03: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 3);
//     // const path04: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 4);
//     // const path05: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 5);

//     // console.log(geom.getObjData(path00))
//     // console.log(geom.getObjData(path01))
//     // console.log(geom.getObjData(path02))
//     // console.log(geom.getObjData(path03))
//     // console.log(geom.getObjData(path04))
//     // console.log(geom.getObjData(path05))

//     //    geom.getObjData()

//     geom.getObjs()[0];

//     geom.getObj(0).getGeom().getObj(0);

//     geom.getObjData(geom.getTopos(gs.EGeomType.vertices)[0].getTopoPath());
//     geom.getObjData(geom.getTopos(gs.EGeomType.edges)[0].getTopoPath());
//     geom.getObjData(geom.getTopos(gs.EGeomType.wires)[0].getTopoPath());
//     geom.getObjData(geom.getTopos(gs.EGeomType.faces)[0].getTopoPath());

//     geom.getObjData(geom.getTopos(gs.EGeomType.vertices)[0].getTopoPath());
//     geom.getObjData(geom.getTopos(gs.EGeomType.vertices)[1].getTopoPath());
//     geom.getObjData(geom.getTopos(gs.EGeomType.vertices)[2].getTopoPath());
//     geom.getObjData(geom.getTopos(gs.EGeomType.vertices)[3].getTopoPath());

//     // console.log(    geom.getObjData(geom.getTopos(gs.EGeomType.vertices)[4].getTopoPath()));
//     // console.log(    geom.getObjData(geom.getTopos(gs.EGeomType.vertices)[4].getTopoPath()));
//     // I would have thought -1 wouldn't be an output of this function

//     geom.getObjData(geom.getTopos(gs.EGeomType.vertices)[4].getTopoPath());
//     geom.getObjData(geom.getTopos(gs.EGeomType.vertices)[5].getTopoPath());
//     geom.getObjData(geom.getTopos(gs.EGeomType.vertices)[6].getTopoPath());
//     geom.getObjData(geom.getTopos(gs.EGeomType.vertices)[7].getTopoPath());
//     geom.getObjData(geom.getTopos(gs.EGeomType.vertices)[8].getTopoPath());

//     // console.log(geom.getPointPosition(0))
//     // // console.log(geom.getTopos(gs.EGeomType.points))
//     // console.log(geom.getObjData(0))

//     // console.log(geom.getTopos(gs.EGeomType.points)[0].getTopoPath())
//     // console.log(geom.getObjData(geom.getTopos(gs.EGeomType.points)[0].getTopoPath()))

//     // console.log(geom.getObjData(gs.EObjType))
//     // for(let k  in  m.getGeom().getObjIDs()){
//     // console.log(m.getGeom().getObj(geom.getObjIDs()[k]).getGeom().getModel().getGeom().getObjs())
//     // console.log(geom.getObjData())
//     // console.log(m.getGeom().getObj(geom.getObjIDs()[k]))
//     // .getGeom().getObj()[k])
//     // console.log(m.getGeom().getObj(geom.getObjIDs()[k]).getGeom().getModel().getObj()[0][2])
//     // console.log(m.getGeom().getObj(geom.getObjIDs()[k]).getGeom().getModel().getObj()[0][3])
//     // if(!(Arr.equal(m.getGeom().getObj(geom.getObjIDs()[k]).numWires(),geom.getObjData(k)[1])))
//     // {return false;} // compiles well
//     // }
//     // let m:gs.IModel = new gs.Model();
//     // let g:gs.IGeom = m.getGeom();
//     // g.addPoint([1,3,8]);
//     // g.addPoint([6,4,3]);
//     // let b1:gs.ITopoPath = new gs.TopoPath(0, null, null, null, null)
//     // let b2:gs.ITopoPath = new gs.TopoPath(1, null, null, null, null)

//     // console.log(b1.equals(b1));
//     // console.log(b1.equals(b2));
//     // console.log(a.getObjData(b1));
//     // console.log(a.getObjData(b2));
//     return true;
// }
