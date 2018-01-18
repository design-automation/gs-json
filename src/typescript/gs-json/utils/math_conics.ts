import * as gs from "./_export";
import * as threex from "./three_utils";
import * as three from "three";

/**
 * Calculate the length of the circle or arc.
 */
export function circleLength(curve: gs.ICircle): number {
    return curve.getRadius()*Math.abs(curve.getAngles()[1]-curve.getAngles()[0])*2*Math.PI/360;
}

/**
 * Calculate the xyz position at parameter t on the circle or arc. The t parameter range is from 0 to 1.
 */
export function circleEvaluate(curve: gs.ICircle, t: number): gs.XYZ {
    // const origin: gs.XYZ = curve.getOrigin().getPosition();
    const alpha: number = (curve.getAngles()[0] + t*(curve.getAngles()[1]-curve.getAngles()[0]))*(2*Math.PI)/360;
    const x: number = curve.getRadius() * Math.cos(alpha);
    const y: number = curve.getRadius() * Math.sin(alpha);
    const U111: three.Vector3 = new three.Vector3(1,0,0);
    const V111: three.Vector3 = new three.Vector3(0,1,0);
    const U1: three.Vector3 = new three.Vector3(
        curve.getVectors()[0][0], curve.getVectors()[0][1], curve.getVectors()[0][2]);
    const V1: three.Vector3 = new three.Vector3(
        curve.getVectors()[1][0], curve.getVectors()[1][1], curve.getVectors()[1][2]);
    const O1O2: three.Vector3 = new three.Vector3(
        curve.getOrigin().getPosition()[0], curve.getOrigin().getPosition()[1], curve.getOrigin().getPosition()[2]);
    const U11: three.Vector3 = new three.Vector3(x,0,0);
    const V11: three.Vector3 = new three.Vector3(0,y,0);
    const O2P: three.Vector3 = threex.addVectors(U11,V11);
    const u1_projection: three.Vector3 = new three.Vector3(U1.x,U1.y,0);
    const alpha_1_cos: number = U1.normalize().dot(u1_projection.normalize());
    const alpha_1_sin: number = U1.normalize().z;
    const o2P_prime: three.Vector3 = new three.Vector3(
        O2P.x*alpha_1_cos - O2P.z*alpha_1_sin,
        O2P.y,
        O2P.z*alpha_1_cos + O2P.x*alpha_1_sin);
    const alpha_2_cos: number = u1_projection.normalize().x;
    const alpha_2_sin: number = u1_projection.normalize().y;
    const o2P_second: three.Vector3 = new three.Vector3(
        o2P_prime.x*alpha_2_cos - o2P_prime.y*alpha_2_sin,
        o2P_prime.y*alpha_2_cos + o2P_prime.x*alpha_2_sin,
        o2P_prime.z);
    const O1P: three.Vector3 = threex.addVectors(O1O2,o2P_second);
    return [O1P.x,O1P.y,O1P.z];
}
/**
 * Calculate a set of xyz position on the circle or arc. The number of points = length / resolution.
 * With resolution from 0.0001 to 0.5, 0.0001 being a higher resolution than 0.5
 */
export function circleGetRenderXYZs(curve: gs.ICircle, resolution: number): gs.XYZ[] {
    const origin: gs.XYZ = curve.getOrigin().getPosition();
    const r: number = curve.getRadius();
    const angles: number[] = curve.getAngles();
    const L: number = 2*Math.PI*r;
    const N: number = Math.floor(L/resolution);
    const renderingXYZs: gs.XYZ[] = [];
    const renderXYZs: gs.XYZ[] = [];
    const O1: three.Vector3 = new three.Vector3(0,0,0);
    const e1: three.Vector3 = new three.Vector3(1,0,0);
    const e2: three.Vector3 = new three.Vector3(0,1,0);
    const e3: three.Vector3 = new three.Vector3(0,0,1);
    const C1: three.Vector3 = new three.Vector3(
    curve.getOrigin().getPosition()[0],curve.getOrigin().getPosition()[1],curve.getOrigin().getPosition()[2]);
    const U1: three.Vector3 = new three.Vector3(...curve.getVectors()[0]).normalize();
    const V1: three.Vector3 = new three.Vector3(...curve.getVectors()[1]).normalize();
    const W1: three.Vector3 = threex.crossVectors(U1,V1,true);
    const C1O1: three.Vector3 = threex.subVectors(O1,C1,false);
    const vec_O_1: three.Vector3 = new three.Vector3(
    C1O1.dot(U1),C1O1.dot(V1),C1O1.dot(W1));
    const x1: three.Vector3 = new three.Vector3(
    e1.dot(U1),e1.dot(V1),e1.dot(W1));
    const y1: three.Vector3 = new three.Vector3(
    e2.dot(U1),e2.dot(V1),e2.dot(W1));
    let z1: three.Vector3 = new three.Vector3();
    z1 = z1.crossVectors(x1,y1);
    const m1: three.Matrix4 = new three.Matrix4();
    const o_neg: three.Vector3 = vec_O_1.clone().negate();
    m1.setPosition(o_neg);
    let m2: three.Matrix4 = new three.Matrix4();
    m2 = m2.makeBasis(x1.normalize(), y1.normalize(), z1.normalize());
    m2 = m2.getInverse(m2);
    const m3: three.Matrix4 = new three.Matrix4();
    const rotation1: three.Matrix4 = m3.multiplyMatrices(m2, m1);
    const O1C1: three.Vector3 = threex.subVectors(C1,O1,false);
    const init_vec_O_1: three.Vector3 = new three.Vector3(
    O1C1.dot(e1),O1C1.dot(e2),O1C1.dot(e3));
    const init_x1: three.Vector3 = new three.Vector3(
    U1.dot(e1),U1.dot(e2),U1.dot(e3));
    const init_y1: three.Vector3 = new three.Vector3(
    V1.dot(e1), V1.dot(e2), V1.dot(e3));
    let init_z1: three.Vector3 = new three.Vector3();
    init_z1 = z1.crossVectors(x1,y1);
    const init_m1: three.Matrix4 = new three.Matrix4();
    const init_o_neg: three.Vector3 = init_vec_O_1.clone().negate();
    init_m1.setPosition(init_o_neg);
    let init_m2: three.Matrix4 = new three.Matrix4();
    init_m2 = init_m2.makeBasis(init_x1.normalize(),
    init_y1.normalize(), init_z1.normalize());
    init_m2 = init_m2.getInverse(init_m2);
    const init_m3: three.Matrix4 = new three.Matrix4();
    const init_rotation1: three.Matrix4 = init_m3.multiplyMatrices(init_m2, init_m1);
    const a: three.Vector3 = threex.multVectorMatrix(C1,init_rotation1);
    for(let k=0;k<N;k++) {
    const t: number = k/(N - 1);
    const alpha: number = (angles[0] + t*(angles[1]-angles[0]))*(2*Math.PI)/360;
    renderingXYZs.push([r * Math.cos(alpha), r * Math.sin(alpha),0]);}
    const results: three.Vector3[] = [];
    for (const point of renderingXYZs) {results.push(new three.Vector3(point[0],point[1],point[2]));}
    const results_c1: three.Vector3[] = [];
    for (const point of results) {results_c1.push(threex.multVectorMatrix(point,rotation1));}
    for(const point of results_c1) {renderXYZs.push([point.x,point.y,point.z]);}
    return renderXYZs;
}
/**
 * Calculate the length of the conic curve.
 */
export function ellipseLength(curve: gs.IEllipse): number {
    // ConicCurve assumed to be an ellipse or circle;
    const vector_x: number[] = curve.getVectors()[0];
    const vector_y: number[] = curve.getVectors()[1];
    // Initial vector_x and vector_y require to be (almost) orthogonal
    const threshold: number = 1e-6;
    if(Math.abs(vector_x[0]*vector_y[0] + vector_x[1]*vector_y[1] + vector_x[2]*vector_y[2]) >= threshold) {
        throw new Error("Orthogonal vectors are required for that Ellipse / Conic length calculation");
    }
    const a: number = Math.sqrt(vector_x[0]*vector_x[0] + vector_x[1]*vector_x[1] + vector_x[2]*vector_x[2]);
    const b: number = Math.sqrt(vector_y[0]*vector_y[0] + vector_y[1]*vector_y[1] + vector_y[2]*vector_y[2]);
    const u: number[] = [a,0];
    const v: number[] = [0,b];
    const angle_1: number = curve.getAngles()[0]*(2*Math.PI)/360;
    const angle_2: number = curve.getAngles()[1]*(2*Math.PI)/360;
    // Radians, although input angles are expected in Degrees
    if( Math.abs(a-b) < threshold) { return a*Math.abs(angle_2 - angle_1);}
    // Range [x1,x2] for length calculation would provide 2 circle arcs,
    // Whereas Angle_1 / Angle_2 provide a unique circle arc.
    let eccentricity: number = null ;
    if(a>b) { eccentricity = Math.sqrt( 1 - (b/a)*(b/a) ) ;}
    if(b>a) { eccentricity = Math.sqrt( 1 - (a/b)*(a/b) ) ;}
    const K: number = 1000;
    let theta: number = null;
    const d_th: number  = (angle_2 - angle_1)/K ;
    let distance: number = 0;
    for(let k = 0; k < K ; k++ ) {
        theta = angle_1 + k*(angle_2 - angle_1)/K ;
        distance = distance + d_th *
            Math.sqrt(1 - eccentricity * Math.sin(theta) * eccentricity * Math.sin(theta));
        // distance along the curve assessed and updated at each timestep;
    }
    distance = Math.max(a,b) * distance ;
    return distance;
}

/**
 * Calculate the xyz position at parameter t. The t parameter range is from 0 to 1.
 */
export function ellipseEvaluate(curve: gs.IEllipse, t: number): gs.XYZ {
    // ConicCurve assumed to be an ellipse or circle;
    const vector_x: gs.XYZ = curve.getVectors()[0];
    const vector_y: gs.XYZ = curve.getVectors()[1];
    // Initial vector_x and vector_y require to be (almost) orthogonal
    const threshold: number = 1e-6;
    if(Math.abs(vector_x[0]*vector_y[0] + vector_x[1]*vector_y[1] + vector_x[2]*vector_y[2])
        >= threshold) { throw new Error("Orthogonal vectors are required for that Ellipse / Conic length calculation");}
    const a: number = Math.sqrt(vector_x[0]*vector_x[0] + vector_x[1]*vector_x[1] + vector_x[2]*vector_x[2]);
    const b: number = Math.sqrt(vector_y[0]*vector_y[0] + vector_y[1]*vector_y[1] + vector_y[2]*vector_y[2]);
    const u: number[] = [a,0];
    const v: number[] = [0,b];
    const z_uv: number[] = [0,0,u[0]*v[1] - u[1]*v[0]]; // cross product
    const angle_1: number = curve.getAngles()[0]*(2*Math.PI)/360;
    const angle_2: number = curve.getAngles()[1]*(2*Math.PI)/360;
    const l: number = ellipseLength(curve);
    let epsilon: number = 1 ;
    let theta: number = null ;
    const K: number = 1000 ;  // Does this not depend on the length of the ellipse?
    let x: number = null;
    let y: number = null;
    let r: number = null;
    let theta_t: number = null;
    const param: number = b*b/a;
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    let curve_theta: gs.IEllipse = null ;
    for(let k = 0; k < K; k++) { // This loops 1000 x 1000 times !
        while( epsilon >= 0) {
            theta = (angle_1 + k * (angle_2 - angle_1)/K);
            curve_theta = g.addEllipse(curve.getOrigin(),curve.getVectors()[0],
                curve.getVectors()[1],[curve.getAngles()[0],theta]);  // Why is this adding ellipses to the model?
            epsilon = t*l - ellipseLength(curve_theta);
            if(epsilon < 0) {theta_t = theta;}
        }
    }
    let eccentricity: number = null;
    if(a>b) { eccentricity = Math.sqrt( 1 - (b/a)*(b/a) ) ;}
    if(b>a) { eccentricity = Math.sqrt( 1 - (a/b)*(a/b) ) ;}
    r = param / (1 + eccentricity*Math.cos(theta_t));
    x = r * Math.cos(theta_t); // expressed in the plan inferred by (u,v)
    y = r * Math.sin(theta_t); // expressed in the plan inferred by (u,v)
    const U1: three.Vector3 = new three.Vector3(
        curve.getVectors()[0][0], curve.getVectors()[0][1], curve.getVectors()[0][2]);
    const V1: three.Vector3 = new three.Vector3(
        curve.getVectors()[1][0], curve.getVectors()[1][1], curve.getVectors()[1][2]);
    U1.normalize();
    V1.normalize();
    const O1O2: three.Vector3 = new three.Vector3(
        curve.getOrigin()[0], curve.getOrigin()[1], curve.getOrigin()[2]);
    const O2P: three.Vector3 = threex.addVectors(U1.multiplyScalar(x),V1.multiplyScalar(y));
    const O1P: three.Vector3 = threex.addVectors(O1O2,O2P);
    return [O1P.x,O1P.y,O1P.z]; // Should work..
}

/**
 * Calculate a set of xyz position on the ellipse. The number of points = length / resolution.
 */
export function ellipseGetRenderXYZs(curve: gs.IEllipse, resolution: number): gs.XYZ[] {
    const O: number[] = curve.getOrigin().getPosition();
    const a: number = curve.getVectors()[0].length;
    const b: number = curve.getVectors()[1].length;
    const L: number = Math.PI * Math.sqrt(2*(a*a + b*b) - (a-b)*(a-b)/2);

    if(a>=b) {
    const c: number = Math.sqrt(a*a - b*b);
    const a_vec: number[] = curve.getVectors()[0];
    const b_vec: number[] = curve.getVectors()[1];
    const param: number = b*b/a;
    const e: number = Math.sqrt(1 - b*b/(a*a));
    // Direct Orthonormal Basis of reference
    const O1: three.Vector3 = new three.Vector3(0,0,0);
    const e1: three.Vector3 = new three.Vector3(1,0,0);
    const e2: three.Vector3 = new three.Vector3(0,1,0);
    const e3: three.Vector3 = new three.Vector3(0,0,1);
    // Ellispe Direct Orthonormal Basis
    const C1: three.Vector3 = new three.Vector3(curve.getOrigin().getPosition()[0]);
    const U1: three.Vector3 = new three.Vector3(a_vec[0],a_vec[1],a_vec[2]).normalize();
    const V1: three.Vector3 = new three.Vector3(b_vec[0],b_vec[1],b_vec[2]).normalize();
    const W1: three.Vector3 = threex.crossVectors(U1,V1,true);
    // Rotation Matrix expressed in the reference direct orthonormal basis
        // Ellipse 1
    const O1C1: three.Vector3 = threex.subVectors(C1,O1,false);
    const vec_O_1: three.Vector3 = new three.Vector3(
        O1C1.dot(e1),
        O1C1.dot(e2),
        O1C1.dot(e3),
        );
    const x1: three.Vector3 = new three.Vector3(
        U1.dot(e1),
        U1.dot(e2),
        U1.dot(e3),
        );
    const y1: three.Vector3 = new three.Vector3(
        V1.dot(e1),
        V1.dot(e2),
        V1.dot(e3),
        );
//  const rotation1: three.Matrix4 = threex.xformMatrix(vec_O_1,x1,y1);
    const m1: three.Matrix4 = new three.Matrix4();
    const o_neg: three.Vector3 = vec_O_1.clone().negate();
    m1.setPosition(o_neg);
    const m2: three.Matrix4 = new three.Matrix4();
    m2.makeBasis(x1.normalize(), y1.normalize(), x1.normalize().crossVectors(x1.normalize(),y1.normalize()));
    m2.getInverse(m2);
    const rotation1: three.Matrix4 = new three.Matrix4();
    rotation1.multiplyMatrices(m2, m1);

    const XYZ: gs.XYZ[] = [];
    let r: number = null;
    // const L: number = ellipseLength(curve);

    const l: number = L * resolution;
    let theta: number = 0;
    let d_theta: number = 0;

    for (let k = 0; k<Math.floor(1/resolution);k++) {
        theta = theta + k*d_theta;
        r = param / (1 + e*Math.cos(theta));
        d_theta = l/r;
        XYZ.push([r * Math.cos(theta)+c,r * Math.sin(theta),0]);
    }

    // Retransforming into original coordinates system
    const results: three.Vector3[] = [];
    for (const point of XYZ) {
        results.push(new three.Vector3(point[0],point[1],point[2]));
    }
    const results_e1: three.Vector3[] = [];
    for (const point of results) {
        results_e1.push(threex.multVectorMatrix(point,rotation1));
    }
    const points: gs.XYZ[] = [];
    for(const point of results_e1) {
        points.push([point[0],point[1],point[2]]);
    }
    return points;
    }

    if(b>a) {
    const c: number = Math.sqrt(b*b - a*a);
    const a_vec: number[] = curve.getVectors()[0];
    const b_vec: number[] = curve.getVectors()[1];
    const param: number = b*b/a;
    const e: number = Math.sqrt(1 - a*a/(b*b));
    // Direct Orthonormal Basis of reference
    const O1: three.Vector3 = new three.Vector3(0,0,0);
    const e1: three.Vector3 = new three.Vector3(1,0,0);
    const e2: three.Vector3 = new three.Vector3(0,1,0);
    const e3: three.Vector3 = new three.Vector3(0,0,1);
    // Ellispe Direct Orthonormal Basis
    const C1: three.Vector3 = new three.Vector3(curve.getOrigin().getPosition()[0]);
    const U1: three.Vector3 = new three.Vector3(a_vec[0],a_vec[1],a_vec[2]).normalize();
    const V1: three.Vector3 = new three.Vector3(b_vec[0],b_vec[1],b_vec[2]).normalize();
    const W1: three.Vector3 = threex.crossVectors(U1,V1,true);
    // Rotation Matrix expressed in the reference direct orthonormal basis
        // Ellipse 1
    const O1C1: three.Vector3 = threex.subVectors(C1,O1,false);
    const vec_O_1: three.Vector3 = new three.Vector3(
        O1C1.dot(e1),
        O1C1.dot(e2),
        O1C1.dot(e3),
        );
    const x1: three.Vector3 = new three.Vector3(
        U1.dot(e1),
        U1.dot(e2),
        U1.dot(e3),
        );
    const y1: three.Vector3 = new three.Vector3(
        V1.dot(e1),
        V1.dot(e2),
        V1.dot(e3),
        );
//  const rotation1: three.Matrix4 = threex.xformMatrix(vec_O_1,x1,y1);
    const m1: three.Matrix4 = new three.Matrix4();
    const o_neg: three.Vector3 = vec_O_1.clone().negate();
    m1.setPosition(o_neg);
    const m2: three.Matrix4 = new three.Matrix4();
    m2.makeBasis(x1.normalize(), y1.normalize(), x1.normalize().crossVectors(x1.normalize(),y1.normalize()));
    m2.getInverse(m2);
    const rotation1: three.Matrix4 = new three.Matrix4();
    rotation1.multiplyMatrices(m2, m1);

    const XYZ: gs.XYZ[] = [];
    let r: number = null;
    // const L: number = ellipseLength(curve);
    const l: number = L * resolution;
    let theta: number = 0;
    let d_theta: number = 0;

    for (let k = 0; k<Math.floor(1/resolution);k++) {
        theta = theta + k*d_theta;
        r = param / (1 + e*Math.cos(theta));
        d_theta = l/r;
        XYZ.push([r * Math.cos(theta - (Math.PI/2) ),r * Math.sin(theta - (Math.PI/2) ) + c,0]);
    }

    // Retransforming into original coordinates system
    const results: three.Vector3[] = [];
    for (const point of XYZ) {
        results.push(new three.Vector3(point[0],point[1],point[2]));
    }
    const results_e1: three.Vector3[] = [];
    for (const point of results) {
        results_e1.push(threex.multVectorMatrix(point,rotation1));
    }
    const points: gs.XYZ[] = [];
    for(const point of results_e1) {
        points.push([point[0],point[1],point[2]]);
    }
    return points;
    }

}
