import * as gs from "./gs-json";
import * as three_utils from "./three_utils";
import * as three from "three";
import {Arr} from "./arr";

 // Matrices ======================================================================================================
export function test_multVectorMatrix() {
    return true;
}
export function test_multXYZMatrix() {
    return true;
}
export function test_xformMatrix() {
    const o: three.Vector3 = new three.Vector3(1,2,3);
    const x: three.Vector3 = new three.Vector3(1,0,0);
    const y: three.Vector3 = new three.Vector3(0,1,0);
    const z: three.Vector3 = new three.Vector3(0,0,1);
    const result: three.Matrix4 = three_utils.xformMatrix(o,x,y,z);
    if(!Arr.equal([-1,-2,-3],[result.elements[12],result.elements[13],result.elements[14]])) {return false;}
    return true ;
}
