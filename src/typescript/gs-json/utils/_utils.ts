/**
 * to be completed
 * @param
 * @return
 */
export function checkCircleAngles(angles: [number, number]): [number, number] {
    if (angles === undefined || angles === null) {return undefined;}
    if (angles[0] < 0) {angles[0] = Math.abs(angles[0]);} else if (angles[0] > 360) {angles[0] = angles[0]%360;}
    if (angles[1] < 0) {angles[1] = Math.abs(angles[1]);} else if (angles[1] > 360) {angles[1] = angles[0]%360;}
    if (angles[0] > angles[1]) {angles.reverse();}
    return angles;
}
