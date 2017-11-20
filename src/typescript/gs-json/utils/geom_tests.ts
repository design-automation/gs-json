import * as gsj from "./gs-json";

export function test_xxx():boolean {
    return true;
}

export function test_createPoint():boolean {
    let model:gsj.IModel = new gsj.Model();
    model.getGeom().addPoint([1,2,3]);
    console.log(model.getGeom().numPoints());
    if (model.getGeom().numPoints() != 1) {return false;}
    return true;
}