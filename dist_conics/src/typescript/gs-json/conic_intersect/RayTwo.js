"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
const plane3D = require("./plane3D");
function rayTwo_circle(rayTwo, circle) {
    const v1 = new three.Vector3(circle.getAxes()[0][0], circle.getAxes()[0][1], circle.getAxes()[0][2]);
    const v2 = new three.Vector3(circle.getAxes()[1][0], circle.getAxes()[1][1], circle.getAxes()[1][2]);
    // const r: number = circle.getRadius();
    const r = 1;
    const ellipse = rayTwo.getGeom().addEllipse(circle.getOrigin(), [r * v1.x, r * v1.y, r * v1.z], [r * v2.x, r * v2.y, r * v2.z]);
    const points = rayTwo_ellipse(rayTwo, ellipse);
    rayTwo.getGeom().delObj(ellipse, false);
    return points;
    // const v1: three.Vector3 = new three.Vector3(rayTwo.getVector()[0],
    //                                             rayTwo.getVector()[1],
    //                                             rayTwo.getVector()[2]);
    // const v2: three.Vector3 = new three.Vector3(circle.getAxes()[0][0],
    //                                             circle.getAxes()[0][1],
    //                                             circle.getAxes()[0][2]);
    // const v3: three.Vector3 = new three.Vector3(circle.getAxes()[1][0],
    //                                             circle.getAxes()[1][1],
    //                                             circle.getAxes()[1][2]);
    // let ortho_rC: three.Vector3 = new three.Vector3();
    // const EPS: number = 1e-4;
    // if(orthoVectors(v1,v2).length() > EPS) {ortho_rC = orthoVectors(v1,v2);}
    // if(orthoVectors(v1,v3).length() > EPS) {ortho_rC = orthoVectors(v1,v3);}
    // if(!planesAreCoplanar(circle.getOrigin(), circle.getAxes()[2], rayTwo.getOrigin(),
    //     [ortho_rC.x,ortho_rC.y,ortho_rC.z])) { throw new Error("Entities must be coplanar.");}
    // const plane: IPlane = circle.getGeom().addPlane(rayTwo.getOrigin(), rayTwo.getVector(), circle.getAxes()[2]);
    // const points = plane3D.plane3D_circle2D(circle,plane);
    // circle.getGeom().delObj(plane, false);
    // circle.getGeom().delObj(circle, false);
    // return points;
}
exports.rayTwo_circle = rayTwo_circle;
function rayTwo_ellipse(rayTwo, ellipse) {
    const v1 = new three.Vector3(rayTwo.getVector()[0], rayTwo.getVector()[1], rayTwo.getVector()[2]);
    const v2 = new three.Vector3(ellipse.getAxes()[0][0], ellipse.getAxes()[0][1], ellipse.getAxes()[0][2]);
    const v3 = new three.Vector3(ellipse.getAxes()[1][0], ellipse.getAxes()[1][1], ellipse.getAxes()[1][2]);
    let ortho_rC = new three.Vector3();
    const EPS = 1e-4;
    if (orthoVectors(v1, v2).length() > EPS) {
        ortho_rC = orthoVectors(v1, v2);
    }
    if (orthoVectors(v1, v3).length() > EPS) {
        ortho_rC = orthoVectors(v1, v3);
    }
    if (!planesAreCoplanar(ellipse.getOrigin(), ellipse.getAxes()[2], rayTwo.getOrigin(), [ortho_rC.x, ortho_rC.y, ortho_rC.z])) {
        throw new Error("Entities must be coplanar.");
    }
    const plane = ellipse.getGeom().addPlane(rayTwo.getOrigin(), rayTwo.getVector(), ellipse.getAxes()[2]);
    const points = plane3D.plane3D_ellipse2D(ellipse, plane);
    ellipse.getGeom().delObj(plane, false);
    return points;
}
exports.rayTwo_ellipse = rayTwo_ellipse;
function rayTwo_parabola(rayTwo, parabola) {
    const v1 = new three.Vector3(rayTwo.getVector()[0], rayTwo.getVector()[1], rayTwo.getVector()[2]);
    const v2 = new three.Vector3(parabola.getAxes()[0][0], parabola.getAxes()[0][1], parabola.getAxes()[0][2]);
    const v3 = new three.Vector3(parabola.getAxes()[1][0], parabola.getAxes()[1][1], parabola.getAxes()[1][2]);
    let ortho_rC = new three.Vector3();
    const EPS = 1e-4;
    if (crossVectors(v1, v2).length() > EPS) {
        ortho_rC = crossVectors(v1, v2).normalize();
    }
    if (crossVectors(v1, v3).length() > EPS) {
        ortho_rC = crossVectors(v1, v3).normalize();
    }
    if (!planesAreCoplanar(parabola.getOrigin(), parabola.getAxes()[2], rayTwo.getOrigin(), [ortho_rC.x, ortho_rC.y, ortho_rC.z])) {
        throw new Error("Entities must be coplanar.");
    }
    const plane = parabola.getGeom().addPlane(rayTwo.getOrigin(), rayTwo.getVector(), [ortho_rC.x, ortho_rC.y, ortho_rC.z]);
    const points = plane3D.plane3D_parabola(parabola, plane);
    parabola.getGeom().delObj(plane, false);
    return points;
}
exports.rayTwo_parabola = rayTwo_parabola;
function rayTwo_hyperbola(rayTwo, hyperbola) {
    const v1 = new three.Vector3(rayTwo.getVector()[0], rayTwo.getVector()[1], rayTwo.getVector()[2]);
    const v2 = new three.Vector3(hyperbola.getAxes()[0][0], hyperbola.getAxes()[0][1], hyperbola.getAxes()[0][2]);
    const v3 = new three.Vector3(hyperbola.getAxes()[1][0], hyperbola.getAxes()[1][1], hyperbola.getAxes()[1][2]);
    let ortho_rC = new three.Vector3();
    const EPS = 1e-4;
    if (crossVectors(v1, v2).length() > EPS) {
        ortho_rC = crossVectors(v1, v2).normalize();
    }
    if (crossVectors(v1, v3).length() > EPS) {
        ortho_rC = crossVectors(v1, v3).normalize();
    }
    if (!planesAreCoplanar(hyperbola.getOrigin(), hyperbola.getAxes()[2], rayTwo.getOrigin(), [ortho_rC.x, ortho_rC.y, ortho_rC.z])) {
        throw new Error("Entities must be coplanar.");
    }
    const plane = hyperbola.getGeom().addPlane(rayTwo.getOrigin(), rayTwo.getVector(), [ortho_rC.x, ortho_rC.y, ortho_rC.z]);
    const points = plane3D.plane3D_hyperbola(hyperbola, plane);
    hyperbola.getGeom().delObj(plane, false);
    return points;
}
exports.rayTwo_hyperbola = rayTwo_hyperbola;
const EPS = 1e-9;
function planesAreCoplanar(origin1, normal1, origin2, normal2) {
    const origin1_v = new three.Vector3(...origin1.getPosition());
    const normal1_v = new three.Vector3(...normal1).normalize();
    const origin2_v = new three.Vector3(...origin2.getPosition());
    const normal2_v = new three.Vector3(...normal2).normalize();
    if (Math.abs(dotVectors(subVectors(origin1_v, origin2_v), normal2_v)) > EPS) {
        return false;
    }
    if (Math.abs(1 - Math.abs(normal1_v.dot(normal2_v))) > EPS) {
        return false;
    } // fixed bug
    return true;
}
exports.planesAreCoplanar = planesAreCoplanar;
function dotVectors(v1, v2) {
    return v1.dot(v2);
}
exports.dotVectors = dotVectors;
function subVectors(v1, v2, norm = false) {
    const v3 = new three.Vector3();
    v3.subVectors(v1, v2);
    if (norm) {
        v3.normalize();
    }
    return v3;
}
exports.subVectors = subVectors;
function orthoVectors(vector1, vector2) {
    return crossVectors(vector1, vector2).cross(vector1);
}
exports.orthoVectors = orthoVectors;
function crossVectors(v1, v2, norm = false) {
    const v3 = new three.Vector3();
    v3.crossVectors(v1, v2);
    if (norm) {
        v3.normalize();
    }
    return v3;
}
exports.crossVectors = crossVectors;
//# sourceMappingURL=rayTwo.js.map