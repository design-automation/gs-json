import {Arr} from "./arr";
import * as gs from "./gs-json";
import * as test_data from "./test_data";

// Point tests, extends Entities by 4 complementary methods
export function test_point_getGeomType(): boolean {
    const m: gs.IModel = new gs.Model(test_data.box_with_groups());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IPoint = geom.getPoint(0);
    if(!(a1.getGeomType() === gs.EGeomType.points)) {return false;}
    return true;
}

export function test_point_setPosition(): boolean {
    const model: gs.IModel = new gs.Model();
    const point: gs.IPoint = model.getGeom().addPoint([11,22,33]);
    point.setPosition([4,5,6]);
    if((Arr.equal(point.getPosition(),[11,22,33]))) {return false;}
    if(!(Arr.equal(point.getPosition(),[4,5,6]))) {return false;}
    // if(!(Arr.equal(point.getPosition(),null))) {return false;}
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
    return Arr.equal([4, 5, 6], pos);
}

export function test_point_getVertices(): boolean {
    const m: gs.IModel = new gs.Model(test_data.open_box());
    const geom: gs.IGeom = m.getGeom();
    const p0: gs.IPoint = m.getGeom().getPoint(0);
    const p1: gs.IPoint = m.getGeom().getPoint(1);
    const p2: gs.IPoint = m.getGeom().getPoint(2);
    const p3: gs.IPoint = m.getGeom().getPoint(3);
    const p4: gs.IPoint = m.getGeom().getPoint(4);
    const p5: gs.IPoint = m.getGeom().getPoint(5);
    const p6: gs.IPoint = m.getGeom().getPoint(6);
    const p7: gs.IPoint = m.getGeom().getPoint(7);
    if(!(p0.getVertices().length === 3)) {return false;}
    if(!(p0.getVertices()[0].getWireOrFace().getTopoPath().ti === 0)) {return false;}
    if(!(p0.getVertices()[0].getTopoPath().si === 0)) {return false;}
    if(!(p0.getVertices()[1].getTopoPath().ti === 0)) {return false;}
    if(!(p0.getVertices()[1].getTopoPath().si === 3)) {return false;}
    if(!(p0.getVertices()[2].getTopoPath().ti === 3)) {return false;}
    if(!(p0.getVertices()[2].getTopoPath().si === 0)) {return false;}
    if(!(p1.getVertices().length === 3)) {return false;}
    if(!(p2.getVertices().length === 3)) {return false;}
    if(!(p3.getVertices().length === 3)) {return false;}
    if(!(p4.getVertices().length === 3)) {return false;}
    if(!(p5.getVertices().length === 3)) {return false;}
    if(!(p6.getVertices().length === 3)) {return false;}
    if(!(p7.getVertices().length === 3)) {return false;}
    return true;
}
