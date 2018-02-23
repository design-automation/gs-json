"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
function rayTwo_polyline(ray2) {
    const points = [];
    const vect_ray2 = new three.Vector3(ray2.getVector()[0], ray2.getVector()[1], ray2.getVector()[2]).normalize();
    for (let k = 0; k < 50; k++) {
        points.push(ray2.getGeom().addPoint([
            ray2.getOrigin().getPosition()[0] + (-50 + k) * vect_ray2.x,
            ray2.getOrigin().getPosition()[1] + (-50 + k) * vect_ray2.y,
            ray2.getOrigin().getPosition()[2] + (-50 + k) * vect_ray2.z
        ]));
    }
    ;
    for (let k = 0; k < 50; k++) {
        points.push(ray2.getGeom().addPoint([
            ray2.getOrigin().getPosition()[0] + (k) * vect_ray2.x,
            ray2.getOrigin().getPosition()[1] + (k) * vect_ray2.y,
            ray2.getOrigin().getPosition()[2] + (k) * vect_ray2.z
        ]));
    }
    ;
    const polyline = ray2.getGeom().addPolyline(points, false);
    return polyline;
}
exports.rayTwo_polyline = rayTwo_polyline;
//# sourceMappingURL=rayTwo_polyline.js.map