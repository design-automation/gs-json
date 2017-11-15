import * as ifs from "../utils/interfaces";
import {Arr} from "./arr";
import {Model} from "../utils/model";
import {Geom} from "./geom";
import {Entity,Point,Obj,Polyline,Polymesh} from "./entities";
import {Topo} from "./topos";
import {Attrib, Path} from "./attribs";
import {Group} from "./groups";

export function test_setPointPosition():boolean {
    let model:ifs.IModel = new Model();
    let point:ifs.IPoint = model.createPoint([11,22,33]);
    point.setPosition([4,5,6]);
    let pos = point.getPosition();
    return Arr.equal([4,5,6], pos);
}