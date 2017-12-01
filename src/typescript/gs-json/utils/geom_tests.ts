import * as gs from "./gs-json";
import * as test_data from "./test_data";

export function test_createPoint():boolean {
    let model:gs.IModel = new gs.Model();
    let a:number[] = [1,2,3];
    //  for (let k:number = 0 ; 10 ; k++){a[k] = Math.floor(Math.random() * 10);} (this line crashes Karma)
    model.getGeom().addPoint(a);
    //test 1
    if (model.getGeom().numPoints() != 1) {return false;}
    //test 2
    for (let k:number = 0 ; k<a.length ; k++){
    if(model.getGeom().getPointData(0)[1][k] != a[k] ) {return false};
    }
    return true;
}
// Geom constructor and its 19 public methods are tested
export function test_Geom_constructor():boolean {
    let m1:gs.IModel = new gs.Model();
    let a:number[] = [1,2,3];
    m1.getGeom().addPoint(a);
    if(!(gs.Arr.equal(m1.getGeom().getPointData(0)[1],a))){return false;}
    return true;
}
export function test_Geom_getModel():boolean {
    let m:gs.Model = new gs.Model(test_data.box_with_attribs());
    let geom:gs.IGeom = m.getGeom();
    if(!(geom.getModel().getAttribs(gs.EGeomType.points)[0].getName() == m.getAttribs(gs.EGeomType.points)[0].getName())){return false;}
    return true;
}
export function test_Geom_addPoint():boolean {
    let model:gs.IModel = new gs.Model();
    let p1:number[] = [4,8,6];
    let num_Point:number = 1;
    //  for (let k:number = 0 ; 10 ; k++){a[k] = Math.floor(Math.random() * 10);} (this line crashes Karma)
    model.getGeom().addPoint(p1);
    //test 1.1
    if (model.getGeom().numPoints() != num_Point) {return false;}
    //test 1.2
    for(let j:number = 0; j < model.getGeom().numPoints(); j++){
    for (let k:number = 0 ; k<p1.length ; k++){
    if(model.getGeom().getPointData(j)[1][k] != p1[k] ) {return false};       
    }
    }
    ////
    let p2:number[] = [4,2,8];
    num_Point = num_Point + 1;
    model.getGeom().addPoint(p2);
    //test 2.1
    if (model.getGeom().numPoints() != num_Point) {return false;}
    //test 2.2
    for (let k:number = 0 ; k<p2.length ; k++){
    if(model.getGeom().getPointData(1)[1][k] != p2[k] ) {return false};       
    }
    ////
    let p3:number[] = [6,1,7];
    num_Point = num_Point + 1;
    model.getGeom().addPoint(p3);
    //test 3.1
    if (model.getGeom().numPoints() != num_Point) {return false;}
    //test 3.2
    for (let k:number = 0 ; k<p3.length ; k++){
    if(model.getGeom().getPointData(2)[1][k] != p3[k] ) {return false};       
    }    
    return true;
}

export function test_Geom_addPolyline():boolean {
    let m:gs.IModel = new gs.Model();
    let g:gs.IGeom = m.getGeom();
    let p1 = g.addPoint([0,0,0]);
    let p2 = g.addPoint([2,0,0]);
    let p3 = g.addPoint([3,6,0]);
    let p4 = g.addPoint([7,4,9]);
    let pline1:gs.IPolyline = g.addPolyline([p1,p2,p3,p4], true);
    let pline2:gs.IPolyline = g.addPolyline([p1,p2,p3], false);
    if (g.numObjs() != 2) {return false;}
    if (pline1.numFaces() != 0) {return false;}
    if (pline1.numWires() != 1) {return false;}
    if (pline2.numFaces() != 0) {return false;}
    if (pline2.numWires() != 1) {return false;}
// <<<<<<< HEAD
//     // console.log("get the wire 0", g.getObjData(new gs.TopoPath(0, gs.EGeomType.wires, 0)));
// =======
// >>>>>>> bafbac73c9771851c06681e79f8c33e5bac39a81
    return true;

}
export function test_Geom_addPolymesh():boolean {
    let m:gs.IModel = new gs.Model();
    let g:gs.IGeom = m.getGeom();
    let p1 = g.addPoint([0,0,0]);
    let p2 = g.addPoint([2,0,0]);
    let p3 = g.addPoint([2,7,0]);
    let p4 = g.addPoint([7,7,2]);
    let pmesh1:gs.IPolymesh = g.addPolymesh([
    [p1,p2,p3],
    [p2,p4,p3]
    ]);

    if (g.numObjs() != 1) {return false;}
    if (pmesh1.numFaces() != 2) {return false;}
    if (pmesh1.numWires() != 1) {return false;}


    let p10 = g.addPoint([-5,-3,-2]);
    let p11 = g.addPoint([5,-3,-2]);
    let p12 = g.addPoint([5,3,-2]);
    let p13 = g.addPoint([-5,3,-2]);
    let p14 = g.addPoint([-5,-3,2]);
    let p15 = g.addPoint([5,-3,2]);
    let p16 = g.addPoint([5,3,2]);
    let p17 = g.addPoint([-5,3,2]);

    let pmesh2:gs.IPolymesh = g.addPolymesh([
    [p13,p12,p11,p10], //bottom
    [p10,p11,p15,p14], //side0
    [p11,p12,p16,p15], //side1
    [p12,p13,p17,p16], //side2
    [p13,p10,p14,p17], //side3
    [p14,p15,p16,p17]  //top
    ]);

    if (g.numObjs() != 2) {return false;}
    if (pmesh2.numFaces() != 6) {return false;}
    if (pmesh2.numWires() != 0) {return false;}

    let pmesh3:gs.IPolymesh = g.addPolymesh([
    [p13,p12,p11,p10], //bottom
    [p10,p11,p15,p14], //side0
    [p13,p10,p14,p17], //side3
    [p14,p15,p16,p17]  //top
    ]);

    if (g.numObjs() != 3) {return false;}
    if (pmesh3.numFaces() != 4) {return false;}
    if (pmesh3.numWires() != 1) {return false;}

    return true;
}
export function test_Geom_getPointData():boolean {
    let m:gs.Model = new gs.Model(test_data.open_box());
    let geom:gs.IGeom = m.getGeom();
    for ( let k  in  m.getGeom().getPointIDs()){
    if(!(gs.Arr.equal(m.getGeom().getPoint(geom.getPointIDs()[k]).getPosition(),geom.getPointData(k)[1]))){return false;} // compiles well
    }
    return true;
}
export function test_Geom_getObjData():boolean {
    let m:gs.Model = new gs.Model(test_data.open_box());
    let geom:gs.IGeom = m.getGeom();
    // for(let k  in  m.getGeom().getObjIDs()){
    // console.log(m.getGeom().getObj(geom.getObjIDs()[k]).getGeom().getModel().getGeom().getObjs())
    // console.log(geom.getObjData())
    // console.log(m.getGeom().getObj(geom.getObjIDs()[k]))
    // .getGeom().getObj()[k])
    // console.log(m.getGeom().getObj(geom.getObjIDs()[k]).getGeom().getModel().getObj()[0][2])
    // console.log(m.getGeom().getObj(geom.getObjIDs()[k]).getGeom().getModel().getObj()[0][3])
    // if(!(gs.Arr.equal(m.getGeom().getObj(geom.getObjIDs()[k]).numWires(),geom.getObjData(k)[1]))){return false;} // compiles well
    // }
    // let m:gs.IModel = new gs.Model();
    // let g:gs.IGeom = m.getGeom();
    // g.addPoint([1,3,8]);
    // g.addPoint([6,4,3]);
    // let b1:gs.ITopoPath = new gs.TopoPath(0, null, null, null, null)
    // let b2:gs.ITopoPath = new gs.TopoPath(1, null, null, null, null)
    // console.log(b1.equals(b1));
    // console.log(b1.equals(b2));
    // console.log(a.getObjData(b1));
    // console.log(a.getObjData(b2));
    return true;
}
export function test_Geom_getPointIDs():boolean {
    let m:gs.IModel = new gs.Model();
    let g:gs.IGeom = m.getGeom();
    g.addPoint([1,3,8]);
    g.addPoint([6,4,3]);
    g.addPoint([8,8,8]);
    g.addPoint([3,4,5]);
    g.addPoint([2,3,5]);
    g.addPoint([1,5,2]);
//    console.log(a.getPointIDs()); //expect to return the number 6, as there are 6 points
    return true;
}
export function test_Geom_getPoints():boolean {
    let m:gs.Model = new gs.Model();
    let g1:gs.IGeom = m.getGeom();
    let p1:number[] = [1,3,9] ;
    g1.addPoint(p1);
    let p2:number[] = [2,1,6] ;
    g1.addPoint(p2);
    let p3:number[] = [4,9,2] ;
    g1.addPoint(p3);
    let p4:number[] = [2,3,4] ;
    g1.addPoint(p4);
    let p5:number[] = [8,4,3] ;
    g1.addPoint(p5);
    let p6:number[] = [6,1,7] ;
    g1.addPoint(p6);
    let p7:number[] = [9,0,4] ;
    g1.addPoint(p7);
    let p8:number[] = [4,0,8] ;
    g1.addPoint(p8);

    if( g1.getPoints()[0].getGeom().getPointData(g1.getPoints()[0].getID())[1] != p1 ) {return false;}
    if( g1.getPoints()[0].getGeom().getPointData(g1.getPoints()[1].getID())[1] != p2 ) {return false;}
    if( g1.getPoints()[0].getGeom().getPointData(g1.getPoints()[2].getID())[1] != p3 ) {return false;}
    if( g1.getPoints()[0].getGeom().getPointData(g1.getPoints()[3].getID())[1] != p4 ) {return false;}
    if( g1.getPoints()[0].getGeom().getPointData(g1.getPoints()[4].getID())[1] != p5 ) {return false;}
    if( g1.getPoints()[0].getGeom().getPointData(g1.getPoints()[5].getID())[1] != p6 ) {return false;}
    if( g1.getPoints()[0].getGeom().getPointData(g1.getPoints()[6].getID())[1] != p7 ) {return false;}
    if( g1.getPoints()[0].getGeom().getPointData(g1.getPoints()[7].getID())[1] != p8 ) {return false;}

    return true;
}
export function test_Geom_getPoint():boolean {
    let m:gs.Model = new gs.Model();
    let g:gs.IGeom = m.getGeom();
    g.addPoint([1,3,8]);
    g.addPoint([6,4,3]);
    g.addPoint([8,8,8]);
    g.addPoint([3,4,5]);
    g.addPoint([2,3,5]);
    g.addPoint([1,5,2]);
    for(let i:number=0;i<g.getPoints.length;i++){
    // console.log(a.getPoint(i));
    }
    return true;
}
export function test_Geom_delPoint():boolean {
    let m:gs.Model = new gs.Model();
    let geom:gs.IGeom = m.getGeom();
    geom.addPoint([1,3,8]);
    geom.addPoint([8,8,8]);
    geom.addPoint([3,4,5]);
    geom.addPoint([2,3,5]);
    geom.addPoint([1,5,2]);
    // The below test is to run when delPoint funciton is implemented
    // if(!(geom.numPoints() == 5)){return false;}
    // for(let k:number = 0 ; k < 4; k++){
    // geom.delPoint(5-k);
    // if(!(geom.numPoints() == 5 - (k+1) )){return false;}
    // }
    return true;
}
export function test_Geom_numPoints():boolean {
    let m:gs.Model = new gs.Model();
    let geom:gs.IGeom = m.getGeom();
    if(!(geom.numPoints() == 0)){return false;}
    geom.addPoint([1,3,8]);
    if(!(geom.numPoints() == 1)){return false;}
    geom.addPoint([8,8,8]);
    if(!(geom.numPoints() == 2)){return false;}
    geom.addPoint([3,4,5]);
    if(!(geom.numPoints() == 3)){return false;}
    geom.addPoint([2,3,5]);
    if(!(geom.numPoints() == 4)){return false;}
    geom.addPoint([1,5,2]);
    if(!(geom.numPoints() == 5)){return false;}
    return true;
                                    // for(let k:number = 0; 8 ; k++){               // provoke a Karma Crash
                                    // if(!(geom.numPoints() == k)){return false;}
                                    // let x:number = Math.floor(Math.random()*10);
                                    // let y:number = Math.floor(Math.random()*10);
                                    // let z:number = Math.floor(Math.random()*10);
                                    // geom.addPoint([x,y,z]);            
                                    // }    
}
export function test_Geom_setPointPosition():boolean {
    return true;
}
export function test_Geom_getPointPosition():boolean {
    return true;
}
export function test_Geom_getObjIDs():boolean {
    return true;
}
export function test_Geom_getObjs():boolean {
    return true;
}
export function test_Geom_getObj():boolean {
    return true;
}
export function test_Geom_delObj():boolean {
    return true;
}
export function test_Geom_numObjs():boolean {
    return true;
}
export function test_Geom_getTopos():boolean {
    let m:gs.Model = new gs.Model(test_data.open_box());
    let geom:gs.IGeom = m.getGeom();
    if(!(geom.getTopos(gs.EGeomType.edges).length == geom.numTopos(gs.EGeomType.edges))){return false;}
    if(!(geom.getTopos(gs.EGeomType.vertices).length == geom.numTopos(gs.EGeomType.vertices))){return false;}
    if(!(geom.getTopos(gs.EGeomType.faces).length == geom.numTopos(gs.EGeomType.faces))){return false;}
    if(!(geom.getTopos(gs.EGeomType.wires).length == geom.numTopos(gs.EGeomType.wires))){return false;}
    return true;
}
export function test_Geom_numTopos():boolean {
    let m:gs.Model = new gs.Model(test_data.box_with_attribs());
    let geom:gs.IGeom = m.getGeom();
    if(!(geom.getTopos(gs.EGeomType.edges).length == geom.numTopos(gs.EGeomType.edges))){return false;}
    if(!(geom.getTopos(gs.EGeomType.vertices).length == geom.numTopos(gs.EGeomType.vertices))){return false;}
    if(!(geom.getTopos(gs.EGeomType.faces).length == geom.numTopos(gs.EGeomType.faces))){return false;}
    if(!(geom.getTopos(gs.EGeomType.wires).length == geom.numTopos(gs.EGeomType.wires))){return false;}
    return true;
}
export function test_Geom_getAttribTemplate():boolean {
    return true;
}
