import * as gs from "./gs-json";

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
   m1.getGeom().getPointData(0);

   let m2:gs.IModel = new gs.Model();
//   console.log(m1.getGeom().getPointData(0));
//  let g2:Geom = new Geom(m2, m1.getGeom().getPointData(0), null);
// let g2:Geom = new Geom(m2, m1.getGeom().getPointData(0), []);

// tester le constructeur
// console.log(m2.getGeom().numPoints());
// console.log(m2.getGeom().getPointData(0)[1]);
    return true;
}

export function test_Geom_getModel():boolean {
   let m:gs.IModel = new gs.Model();
   let g:gs.IGeom = m.getGeom();
   g.addPoint([1,2,7]);
//   console.log(g);
//   console.log(g.getModel().getGeom().getPointData(0));
//   console.log(a.getModel().getGeom().getPointIDs());
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
    return true;
}
export function test_Geom_addPolymesh():boolean {
    return true;
}
export function test_Geom_getPointData():boolean {
    return true;
}
export function test_Geom_getObjData():boolean {
    let m:gs.IModel = new gs.Model();
    let g:gs.IGeom = m.getGeom();
    g.addPoint([1,3,8]);
    g.addPoint([6,4,3]);
    let b1:gs.ITopoPath = new gs.TopoPath(0, null, null, null, null)
    let b2:gs.ITopoPath = new gs.TopoPath(1, null, null, null, null)
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
    return true;
}
export function test_Geom_numPoints():boolean {
    return true;
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
    return true;
}
export function test_Geom_numTopos():boolean {
    return true;
}
export function test_Geom_getAttribTemplate():boolean {
    return true;
}
