"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
const three_utils = require("./threex");
const arr_1 = require("../arr/arr");
// Matrices ======================================================================================================
function test_multVectorMatrix() {
    return true;
}
exports.test_multVectorMatrix = test_multVectorMatrix;
function test_multXYZMatrix() {
    return true;
}
exports.test_multXYZMatrix = test_multXYZMatrix;
function test_xformMatrix() {
    const o = new three.Vector3(1, 2, 3);
    const x = new three.Vector3(1, 0, 0);
    const y = new three.Vector3(0, 1, 0);
    const z = new three.Vector3(0, 0, 1);
    const result = three_utils.xformMatrix(o, x, y, z);
    if (!arr_1.Arr.equal([-1, -2, -3], [result.elements[12], result.elements[13], result.elements[14]])) {
        return false;
    }
    return true;
}
exports.test_xformMatrix = test_xformMatrix;
//# sourceMappingURL=threex_tests.js.map