import * as gs from "./gs-json";
import * as test_data from "./test_data";
import * as ifs from "./ifaces_gs";
import {Model} from "./model";
import {Arr} from "./arr";

// Entities tests, 1 constructor and 8 methods
export function test_ent_constructor(): boolean {
    // abstract class
    const m: gs.Model = new gs.Model(test_data.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a: ifs.IPoint = geom.addPoint([6,3,8]);
    return true;
}

export function test_ent_getGeom(): boolean {
    const m: gs.Model = new Model();
    // case Point
    let points: ifs.IPoint[] = m.getGeom().getPoints();
    if (!Arr.equal(points, [])) {return false; }
    points = [m.getGeom().addPoint([1, 3, 9])];
    const p2: ifs.IPoint[] = points[0].getGeom().getPoints();
    if (!(p2[0].getPosition() === points[0].getPosition())) {return false; }
    // Works well for the Point case, Polyline and Polymesh need as well
    // to be tested, and getAttribs() need first to be tested (Model).
    // case Polyline, to test later on, GetAttribs need to be checked first.
    // let p3: ifs.IPoint = m.getGeom().addPoint([1, 4, 9]); ;
    // let p4: ifs.IPoint = m.getGeom().addPoint([1, 3, 7]); ;
    // let wire: ifs.IPoint[] = [p2[0], p3, p4];
    // let Pline: ifs.IObj = m.getGeom().addPolyline(wire, false);
    return true;
}

export function test_ent_getID(): boolean {
    const m: gs.Model = new gs.Model();
    const geom: gs.IGeom = m.getGeom();
    const a: ifs.IPoint = geom.addPoint([6,3,8]);
    if( !(a.getID() === 0) ) {return false;}
    return true;
}

export function test_ent_getModel(): boolean {
    const m: gs.Model = new gs.Model();
    const geom: gs.IGeom = m.getGeom();
    const a: ifs.IPoint = geom.addPoint([6,3,8]);
    if(!(a.getModel().getGeom().numPoints() === 1)) {return false;}
    return true;
}

export function test_ent_getAttribNames(): boolean {
    const m: gs.Model = new gs.Model(test_data.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a1: ifs.IPoint = geom.addPoint([6,3,8]);
    if(!(a1.getAttribNames()[0] === "test1")) {return false;}
    const a2: ifs.IObj = geom.getObj(0);
    if(!(a2.getAttribNames()[0] === "obj_id")) {return false;}
    return true;
}

export function test_ent_getAttribValue(): boolean {
    const m: gs.Model = new gs.Model(test_data.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a1: ifs.IPoint = geom.getPoint(0);
    if(!(a1.getAttribValue("test1") === 641.600585938)) {return false;}
    const a2: ifs.IObj = geom.getObj(0);
    if(!(a2.getAttribValue("obj_id") === 1234)) {return false;}
    return true;
}

export function test_ent_setAttribValue(): boolean {
    const m: gs.Model = new gs.Model(test_data.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a1: ifs.IPoint = geom.getPoint(0);
    if(!(a1.getAttribValue("test1") === 641.600585938)) {return false;}
    const a2: ifs.IObj = geom.getObj(0);
    if(!(a2.getAttribValue("obj_id") === 1234)) {return false;}
    a1.setAttribValue("test1",12321);
    a2.setAttribValue("obj_id",12333222321);
    if((a1.getAttribValue("test1") === 641.600585938)) {return false;}
    if((a2.getAttribValue("obj_id") === 1234)) {return false;}
    if(!(a1.getAttribValue("test1") === 12321)) {return false;}
    if(!(a2.getAttribValue("obj_id") === 12333222321)) {return false;}
    return true;
}

export function test_ent_getGroupNames(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: ifs.IObj = geom.getObj(0);
    const p1: ifs.IPoint = geom.getPoint(0);

    const gpr1: ifs.IGroup = m.addGroup("test1");
    gpr1.addObj(0);
    const gpr2: ifs.IGroup = m.addGroup("test2");
    gpr2.addPoint(0);

    if(!Arr.equal(a1.getGroupNames(),["test1"])){return false;}
    if(!Arr.equal(p1.getGroupNames(),["test2"])){return false;}

    // console.log(a1.getGroupNames())
    // console.log(p1.getGroupNames())

    // console.log(a1);
    // console.log(p1);
    // console.log(gpr2);
    // console.log(a1.getGroupNames())
     // == ["test 1"]);
    // console.log(p1.getGroupNames())

     // == ["test 2"]);

    // TO DO
    // console.log(a1.getGroupNames());
    // console.log(geom);
    // console.log(m.getGroups())
    // console.log(m);
    // let model:gs.IModel ;
    // model = new gs.Model(test_data.box_with_groups());
    // model.getGroups();
    // let grp:gs.IGroup = model.getGroup("building_obj");
    // console.log(grp);
    // == ["building_obj"]
    return true;
}

export function test_ent_addToGroup(): boolean {
    let m:gs.IModel = new gs.Model(test_data.box_with_groups());
    let geom:gs.IGeom = m.getGeom();
    let a1:ifs.IObj = geom.getObj(0);
    let gpr1:gs.IGroup = m.addGroup("test1");
    console.log(gpr1.hasObj(0))
    console.log(true);
    if(gpr1.hasObj(0)){return false;}
    a1.addToGroup("test1");
    console.log(gpr1.hasObj(0))
    if(gpr1.hasObj(0)){return false;}
    return true;
}

// Point tests, extends Entities by 4 complementary methods
export function test_point_getGeomType(): boolean {
    const m: gs.IModel = new gs.Model(test_data.box_with_groups());
    const geom: gs.IGeom = m.getGeom();
    const a1: ifs.IPoint = geom.getPoint(0);
    if(!(a1.getGeomType() === gs.EGeomType.points)) {return false;}
    return true;
}

export function test_point_setPosition(): boolean {
    const model: gs.IModel = new gs.Model();
    const point: gs.IPoint = model.getGeom().addPoint([11,22,33]);
    point.setPosition([4,5,6]);
    if((Arr.equal(point.getPosition(),[11,22,33]))) {return false;}
    if(!(Arr.equal(point.getPosition(),[4,5,6]))) {return false;}
    //if(!(Arr.equal(point.getPosition(),null))) {return false;}
    // point.setPosition([1,2]); //what should this do?
    // point.setPosition([1,2,3,4]); //what should this do?
    // point.setPosition([1,,2]); //sparse array
    return true;
}

export function test_point_getPosition(): boolean {
    const model: gs.IModel = new gs.Model();
    const point: gs.IPoint = model.getGeom().addPoint([11, 22, 33]);
    point.setPosition([4, 5, 6]);
    const pos: number[] = point.getPosition();
    return gs.Arr.equal([4, 5, 6], pos);
}

export function test_point_getVertices(): boolean { // To Do
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    // const path1: gs.IPoint = new gs.TopoPath(0, )
    const p1: gs.IPoint = m.getGeom().getPoint(0);
    const global: gs.IVertex[] = []
    
    for(const a of p1.getGeom().getTopos(gs.EGeomType.wires)){for(const b of a.getVertices()){
   // console.log(p1.getGeom().getPoint(p1.getID()).getID())
   // console.log(b.getPoint().getID())
   // console.log(p1.getGeom().getPoint(p1.getID()).getID() == b.getPoint().getID())
   // console.log(b.getTopoPath())
   if(p1.getGeom().getPoint(p1.getID()).getID() == b.getPoint().getID()){global.push(new gs.Vertex(p1.getGeom(), b.getTopoPath()))}
    // if(p1.getGeom().getPoint(p1.getID()).getID() == b.getPoint().getID()){global.push(new gs.Vertex(p1.getGeom(), b.getPath()))}
    // console.log(b.getPoint().getID())}
    }
    }
    
    for(const a of p1.getGeom().getTopos(gs.EGeomType.faces)){for(const b of a.getVertices()){
 // console.log(p1.getGeom().getPoint(p1.getID()).getID() == b.getPoint().getID()) 
    if(p1.getGeom().getPoint(p1.getID()).getID() == b.getPoint().getID()){global.push(new gs.Vertex(p1.getGeom(), b.getTopoPath()))}
// console.log(b.getPoint().getID())}
    }
    }
    console.log(global);
    
        // console.log(p1.getVertices())

//     const objs_data: any = p1.getGeom().getTopos(gs.EGeomType.wires);

//     // console.log(p1.getGeom().numTopos(gs.EGeomType.wires))
//     // console.log(p1.getGeom().numTopos(gs.EGeomType.faces))
    // console.log(p1.getGeom().getTopos(gs.EGeomType.wires))
    // console.log(p1.getGeom().getTopos(gs.EGeomType.faces))

    // for(const a of p1.getGeom().getTopos(gs.EGeomType.wires)){for(const b of a.getVertices()){console.log(b.getPoint().getID())}}
    // for(const a of p1.getGeom().getTopos(gs.EGeomType.faces)){for(const b of a.getVertices()){console.log(b.getPoint().getID())}}

    // for(const a of p1.getGeom().getTopos(gs.EGeomType.faces)){console.log(a.getVertices())}


//     const global: gs.IVertex[] = []

//     // console.log(p1.getGeom().getTopos(gs.EGeomType.wires)[0])

//         for (const a of p1.getGeom().getTopos(gs.EGeomType.wires)){
//             // console.log(k)
//             // console.log(p1.getGeom().getTopos(gs.EGeomType.wires)[k])
//     for(const b in a.getVertices())(            console.log(global.push(b.getPoint()))
//             // global.push(a.getVertices())
// )     }

//         for (const a of p1.getGeom().getTopos(gs.EGeomType.faces)){
//     //         console.log(k)
//     //         console.log(p1.getGeom().getTopos(gs.EGeomType.faces)[k])
//     //         // global.push(a.getVertices())
//             console.log(a)
//      }



    // if(p1.getGeom().numTopos(gs.EGeomType.wires) != 0){
    // // for(const k in Arr.makeSeq(p1.getGeom().numTopos(gs.EGeomType.wires))){
    //     for(let k:number = 0 ; k< p1.getGeom().numTopos(gs.EGeomType.wires); k++){

    //     for (const a of p1.getGeom().getTopos(gs.EGeomType.wires)[k]){global.push(a.getVertices())}
    // }}
    // if(p1.getGeom().numTopos(gs.EGeomType.faces) != 0){
    // for(const k in Arr.makeSeq(p1.getGeom().numTopos(gs.EGeomType.faces))){}
    // }

    // objs_data.push(p1.getGeom().getTopos(gs.EGeomType.faces));
    // console.log(objs_data[0].length)
    // console.log(objs_data[1].length)
    // console.log(objs_data[1][0].getVertices())
    // console.log(objs_data[0][0].getVertices())

    // const global: gs.IVertex[] = []
    // for (const a of objs_data[0]){global.push(a.getVertices())}
    // for (const a of objs_data[1]){global.push(a.getVertices())}
    // console.log(global)
    // console.log(global[0][0].getPoint().getID())

    // console.log(global[0].getPoint().getID())


        // const vertices: ifs.IVertex[] = [];
        // for (const obj_data of objs_data) {
        //     // loop through all wires and extract verts that have same point_id
        //     obj_data[0].forEach((w, w_i) => w.forEach((v, v_i) => (v === this.id) &&
        //         vertices.push(new gs.Vertex(this.geom,
        //             new gs.TopoPath(this.id, gs.EGeomType.wires, w_i, gs.EGeomType.vertices, v_i)))));
        //     // loop through all faces and extract verts that have same point_id
        //     obj_data[1].forEach((f, f_i) => f.forEach((v, v_i) => (v === this.id) &&
        //         vertices.push(new Vertex(this.geom,
        //             new TopoPath(this.id, EGeomType.faces, f_i, EGeomType.vertices, v_i)))));
        // }

        // console.log(vertices);



//    console.log(p1.getGeom().getPointData(p1.getID()))


    // console.log(p1.getGeom().getObjs());
    // console.log(p1.getVertices());

    // console.log(p1)
    // console.log(v)

    // const

    // const v1: gs.IVertex[] = a1.getVertices()
    // console.log(v1);
    // console.log(a1.getVertices())
    // console.log(a1.getGeom().getObjs()) //
    return true;
}

// Object tests, extends Entities by 6 complementary methods
export function test_obj_getGeomType(): boolean {
    const m: gs.IModel = new gs.Model(test_data.box_with_groups());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    if(!(a1.getGeomType() == gs.EGeomType.objs)) {return false;}
    return true;
}

export function test_obj_getVertices(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPath = a1.getVertices()[0][0][0].getTopoPath();
    geom.numTopos(gs.EGeomType.vertices);
    a1.getVertices(); // Looks fine
    return true;
}

export function test_obj_getEdges(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPath = a1.getEdges()[0][0][0].getTopoPath() ;
    geom.numTopos(gs.EGeomType.edges);
    a1.getEdges(); // Looks fine
    return true;
}

export function test_obj_getWires(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPath = a1.getWires()[0].getTopoPath() ;
    geom.numTopos(gs.EGeomType.wires);
    a1.getWires(); // Looks fine
    return true;
}

export function test_obj_getFaces(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPath = a1.getFaces()[0].getTopoPath() ;
    geom.numTopos(gs.EGeomType.faces);
    a1.getFaces(); // Looks fine

    return true;
}

// Polyline test, extend Obj by 1 method
export function test_Polyline_getObjType(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1 = g.addPoint([0,0,0]);
    const p2 = g.addPoint([2,0,0]);
    const p3 = g.addPoint([3,6,0]);
    const p4 = g.addPoint([7,4,9]);
    const pline1: gs.IPolyline = g.addPolyline([p1,p2,p3,p4], true);
    const pline2: gs.IPolyline = g.addPolyline([p1,p2,p3], false);
    if (!(pline1.getObjType() === 100)) {return false;}
    if (!(pline2.getObjType() === 100)) {return false;}

    return true;
}

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

    return true;
}