"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arr_1 = require("./arr");
/**
 * Series of tests to verify Array user implemented static methods
 */
function test_make() {
    const a = arr_1.Arr.make(10, 5);
    if (a[0] !== 5) {
        return false;
    }
    if (a[9] !== 5) {
        return false;
    }
    if (a.length !== 10) {
        return false;
    }
    if (arr_1.Arr.make(0, 5).length !== 0) {
        return false;
    }
    if (!arr_1.Arr.equal(arr_1.Arr.make(0, 5), [])) {
        return false;
    }
    return true;
}
exports.test_make = test_make;
function test_makeSeq() {
    const a = arr_1.Arr.makeSeq(4);
    if (a[0] !== 0) {
        return false;
    }
    if (a[1] !== 1) {
        return false;
    }
    if (a[2] !== 2) {
        return false;
    }
    if (a[3] !== 3) {
        return false;
    }
    if (a.length !== 4) {
        return false;
    }
    return true;
}
exports.test_makeSeq = test_makeSeq;
function test_equal() {
    if (!arr_1.Arr.equal([1, 2, 3], [1, 2, 3])) {
        return false;
    }
    if (arr_1.Arr.equal([1, 2, 3], [1, 2])) {
        return false;
    }
    if (arr_1.Arr.equal([1, 2], [1, 2, 3])) {
        return false;
    }
    if (!arr_1.Arr.equal([1.1, 2.2], [1.1, 2.2])) {
        return false;
    }
    if (!arr_1.Arr.equal([], [])) {
        return false;
    }
    if (!arr_1.Arr.equal([null, null], [null, null])) {
        return false;
    }
    if (arr_1.Arr.equal([1, 2, 3], null)) {
        return false;
    }
    if (arr_1.Arr.equal(null, [1, 2, 3])) {
        return false;
    }
    // sparse arrays
    const x = [];
    x[2] = 5;
    const y = [];
    y[2] = 5;
    if (!arr_1.Arr.equal(x, y)) {
        return false;
    }
    return true;
}
exports.test_equal = test_equal;
function test_indexOf() {
    if (arr_1.Arr.indexOf([0, 1, 2, 3], 2) !== 2) {
        return false;
    }
    if (arr_1.Arr.indexOf([0, 1, null, 3], null) !== 2) {
        return false;
    }
    if (arr_1.Arr.indexOf([null], [1, 2]) !== -1) {
        return false;
    }
    if (arr_1.Arr.indexOf([[], [2], [1, 2], [3, 4]], [1, 2]) !== 2) {
        return false;
    }
    if (arr_1.Arr.indexOf([[], [1, null], [2], [1, null], [3, 4]], [1, null]) !== 1) {
        return false;
    }
    if (arr_1.Arr.indexOf([[], [1, null], [2], [1, null], [3, 4]], [1, 3]) !== -1) {
        return false;
    }
    if (arr_1.Arr.indexOf([1, 2, 3], null) !== -1) {
        return false;
    }
    if (arr_1.Arr.indexOf([null, 2, 3], null) !== 0) {
        return false;
    }
    // sparse arrays
    const x = [];
    x[2] = [1, 2];
    if (arr_1.Arr.indexOf(x, [1, 2]) !== 2) {
        return false;
    }
    return true;
}
exports.test_indexOf = test_indexOf;
function test_flatten() {
    if (!arr_1.Arr.equal(arr_1.Arr.flatten([[], [2], [1, 2], [3, 4]]), [2, 1, 2, 3, 4])) {
        return false;
    }
    // sparse arrays
    const x = [];
    x[2] = [1, 2];
    if (arr_1.Arr.equal(arr_1.Arr.flatten(x), [, , 1, 2])) {
        return false;
    }
    return true;
}
exports.test_flatten = test_flatten;
function test_deepCopy() {
    const x = [1, 2, [3, 4, [5, 6, [7, 8]]]];
    let y = arr_1.Arr.deepCopy(x);
    y[2][1] = 100;
    x[2][2][2] = 200;
    if (x[2][1] !== 4) {
        return false;
    }
    if (y[2][1] !== 100) {
        return false;
    }
    if (x[2][2][2] !== 200) {
        return false;
    }
    if (!arr_1.Arr.equal(y[2][2][2], [7, 8])) {
        return false;
    }
    // sparse arrays
    x[5] = 1;
    y = arr_1.Arr.deepCopy(x);
    if (y[5] !== 1) {
        return false;
    }
    return true;
}
exports.test_deepCopy = test_deepCopy;
function test_deepFill() {
    const x = [1, 2, [3, 4, [5, 6, [7, 8]]]];
    arr_1.Arr.deepFill(x, 0);
    if (x[0] !== 0) {
        return false;
    }
    if (!arr_1.Arr.equal(x[2][2][2], [0, 0])) {
        return false;
    }
    // sparse arrays
    x[5] = 1; // x[3] and x[4] are undefined
    arr_1.Arr.deepFill(x, 0);
    if (x[5] !== 0) {
        return false;
    }
    return true;
}
exports.test_deepFill = test_deepFill;
function test_deepCount() {
    const x = [1, 2, [3, 4, [5, 6, [7, 8]]]];
    if (arr_1.Arr.deepCount([]) !== 0) {
        return false;
    }
    if (arr_1.Arr.deepCount([1, 2, 3]) !== 3) {
        return false;
    }
    if (arr_1.Arr.deepCount(x) !== 8) {
        return false;
    }
    // sparse arrays
    x[5] = 1;
    arr_1.Arr.deepFill(x, 0);
    if (arr_1.Arr.deepCount(x) !== 9) {
        return false;
    }
    return true;
}
exports.test_deepCount = test_deepCount;
//# sourceMappingURL=arr_tests.js.map