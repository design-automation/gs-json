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
    const angle0: number = ((angles[0] %360) + 360) %360;
    if (angle0 === 270) {throw new Error ("Revise first angle");}
    let angle1: number = ((angles[1] %360) + 360) %360;
    if(angle0>angle1) {angle1 = angle1 + 360;}
    if(angle1 > 270 + 360) {throw new Error ("Revise second angle");}
    return [angle0,angle1];
}
/**
 * Corrects the angles in a hyperbola
 * @param
 * @return
 */
export function checkHyperbolaAngles(angles: [number, number],
                                     x_vec_length: number, vec_length: number): [number, number] {
    if (angles === undefined || angles === null) {return undefined;}
    const angle_max: number = Math.atan(x_vec_length / vec_length) * 360/(2*Math.PI);
    const angle0: number = ((angles[0] %360) + 360) %360;
    if (angle0 >= 270-angle_max && angle0 <= 270+angle_max) {throw new Error ("Revise first angle");}
    let angle1: number = ((angles[1] %360) + 360) %360;
    if(angle0>angle1) {angle1 = angle1 + 360;}
    if(angle1 >= 270-angle_max + 360) {throw new Error ("Revise second angle");}
    return [angle0,angle1];
}
