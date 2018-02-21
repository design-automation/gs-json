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

    const _original_angles: [number, number] = angles;
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
    const angle_max: number = Math.atan(x_vec_length/vec_length)*360/(2*Math.PI) %360;
    const angle0_max: number = (270 + angle_max ) %360;
    const angle1_max: number = (270 - angle_max ) %360;
    const domain_angle0: number = 360 - 2*angle_max;
    const angle0: number = ((angles[0] %360) + 360) %360;
    if (angle0 <= 270+angle_max && angle0 >= 270-angle_max) {
        throw new Error ("Revise first angle");}
    let domain_angle1: number;
    if (angle0 < angle1_max) {domain_angle1 = angle1_max - angle0;}
    if (angle0 > angle0_max) {domain_angle1 = 360 - (angle0 - angle0_max);}
    const angle1: number = ((angles[1] %360) + 360) %360;
    if (angle0 < angle1_max) {
        if (angle1 < angle0 || angle1 >= angle1_max) {
            throw new Error ("Revise second angle");}
    }
    if (angle0 > angle0_max) {
        if(angle1 >= angle1_max && angle1 < angle0) {
            throw new Error ("Revise second angle");}
    }
    return [angle0,angle1];
}
