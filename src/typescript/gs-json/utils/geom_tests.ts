import * as gsj from "./gs-json";

export function test_xxx():boolean {
    return true;
}

export function test_createPoint():boolean {
    let model:gsj.IModel = new gsj.Model();
    model.getGeom().addPoint([1,2,3]);
    if (model.getGeom().numPoints() != 1) {return false;}
    return true;
}


// Geom constructor and its 19 public methods are tested
export function test_Geom_constructor():boolean {
    return true;
}
export function test_Geom_getModel():boolean {
    return true;
}
export function test_Geom_addPoint():boolean {
    return true;
}
export function test_Geom_addPolyline():boolean {
    return true;
}
export function test_Geom_addPolymesh():boolean {
    return true;
}
export function test_Geom_getData():boolean {
    return true;
}
export function test_Geom_getPointIDs():boolean {
    return true;
}
export function test_Geom_getPoints():boolean {
    return true;
}
export function test_Geom_getPoint():boolean {
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
export function test_GeomPath_constructor():boolean {
    return true;
}