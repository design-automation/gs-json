import * as ifs from "../utils/interfaces";
import {Model} from "../utils/model";
import {Geom} from "./geom";
import {Entity,Point,Obj,Polyline,Polymesh} from "./entities";
import {Topo} from "./topos";
import {Attrib, Path} from "./attribs";
import {Group} from "./groups";

export function test_xxx():boolean {
    return true;
}


export function test_group_methods():boolean{
let Model_1:Model = new Model();
    Model_1.addGroup("First_Group");
    Model_1.addGroup("Second_Group");
    Model_1.addGroup("Third_Group");
    Model_1.delGroup("Second_Group");
    Model_1.getGroup("Third_Group").setName("Third, renamed as Second");
    Model_1.getGroups(); // Get Groups show two names per group
    return true
}