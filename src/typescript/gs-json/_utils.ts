/**
 * Corrects the angles in a circle
 * @param
 * @return
 */
export function checkCircleAngles(angles: [number, number]): [number, number] {
    if (angles === undefined || angles === null) {return undefined;}
    // fix angle 0
    if (Math.abs(angles[0]) > 360) {
        angles[0] = angles[0] % 360;
    }
    if (angles[0] < 0) {
        angles[0] = 360  + angles[0];
    }
    // fix angle 1
    if (Math.abs(angles[1]) > 360) {
        angles[1] = angles[1] % 360;
    }
    if (angles[1] < 0) {
        angles[1] = 360  + angles[1];
    }
    // return the fixed angles
    return angles;
}
/**
 * Corrects the angles in an ellipse
 * @param
 * @return
 */
export function checkEllipseAngles(angles: [number, number]): [number, number] {
    if (angles === undefined || angles === null) {return undefined;}
    // fix angle 0
    if (Math.abs(angles[0]) > 360) {
        angles[0] = angles[0] % 360;
    }
    if (angles[0] < 0) {
        angles[0] = 360  + angles[0];
    }
    // fix angle 1
    if (Math.abs(angles[1]) > 360) {
        angles[1] = angles[1] % 360;
    }
    if (angles[1] < 0) {
        angles[1] = 360  + angles[1];
    }
    // return the fixed angles
    return angles;
}
/**
 * Corrects the angles in a parabola
 * @param
 * @return
 */
export function checkParabolaAngles(angles: [number, number]): [number, number] {
    if (angles === undefined || angles === null) {return undefined;}
    return [((angles[0] % 360) + 360) % 360,((angles[1] % 360) + 360) % 360];
}
/**
 * Corrects the angles in a hyperbola
 * @param
 * @return
 */
export function checkHyperbolaAngles(angles: [number, number]): [number, number] {
    if (angles === undefined || angles === null) {return undefined;}
    return [((angles[0] % 360) + 360) % 360,((angles[1] % 360) + 360) % 360];
}
