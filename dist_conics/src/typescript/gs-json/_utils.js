"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Corrects the angles in a circle
 * @param
 * @return
 */
function checkCircleAngles(angles) {
    if (angles === undefined || angles === null) {
        return undefined;
    }
    // fix angle 0
    if (Math.abs(angles[0]) > 360) {
        angles[0] = angles[0] % 360;
    }
    if (angles[0] < 0) {
        angles[0] = 360 + angles[0];
    }
    // fix angle 1
    if (Math.abs(angles[1]) > 360) {
        angles[1] = angles[1] % 360;
    }
    if (angles[1] < 0) {
        angles[1] = 360 + angles[1];
    }
    // return the fixed angles
    return angles;
}
exports.checkCircleAngles = checkCircleAngles;
/**
 * Corrects the angles in an ellipse
 * @param
 * @return
 */
function checkEllipseAngles(angles) {
    if (angles === undefined || angles === null) {
        return undefined;
    }
    // fix angle 0
    if (Math.abs(angles[0]) > 360) {
        angles[0] = angles[0] % 360;
    }
    if (angles[0] < 0) {
        angles[0] = 360 + angles[0];
    }
    // fix angle 1
    if (Math.abs(angles[1]) > 360) {
        angles[1] = angles[1] % 360;
    }
    if (angles[1] < 0) {
        angles[1] = 360 + angles[1];
    }
    // return the fixed angles
    return angles;
}
exports.checkEllipseAngles = checkEllipseAngles;
/**
 * Corrects the angles in a parabola
 * @param
 * @return
 */
function checkParabolaAngles(angles) {
    if (angles === undefined || angles === null) {
        return undefined;
    }
    let angle0 = ((angles[0] % 360) + 360) % 360;
    const angle1 = ((angles[1] % 360) + 360) % 360;
    if (angle0 > angle1) {
        angle0 = angle0 - 360;
    }
    if (angle0 < -90) {
        throw new Error("Revise first angle");
    }
    if (angle1 > 270) {
        throw new Error("Revise second angle");
    }
    return [angle0, angle1];
}
exports.checkParabolaAngles = checkParabolaAngles;
/**
 * Corrects the angles in a hyperbola
 * @param
 * @return
 */
function checkHyperbolaAngles(angles) {
    if (angles === undefined || angles === null) {
        return undefined;
    }
    const angle_0 = ((angles[0] % 360) + 360) % 360;
    const angle_1 = ((angles[1] % 360) + 360) % 360;
    if (angle_0 > angle_1) {
        throw new Error("Check Hyperbola angles, those should in increasing order");
    }
    return [angle_0, angle_1];
}
exports.checkHyperbolaAngles = checkHyperbolaAngles;
//# sourceMappingURL=_utils.js.map