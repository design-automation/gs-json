import * as gs from "./gs-json";
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
export function circleEvaluate(curve: gs.ICircle, t: number): number[] {
    // Convention: angles stated by increasing order ; [0,360] as opposed to [360,0];
    const L: number = circleLength(curve);
    const r: number = curve.getRadius();
    const alpha: number = (curve.getAngles()[0] + t*(curve.getAngles()[1]-curve.getAngles()[0]))*(2*Math.PI)/360;
    const x: number = r * Math.cos(alpha); // expressed in the plan inferred by (u,v)
    const y: number = r * Math.sin(alpha); // expressed in the plan inferred by (u,v)

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
    ///////////////
    // const U1: three.Vector3 = new three.Vector3(
    //     curve.getVectors()[0][0], curve.getVectors()[0][1], curve.getVectors()[0][2]);
    // const V1: three.Vector3 = new three.Vector3(
    //     curve.getVectors()[1][0], curve.getVectors()[1][1], curve.getVectors()[1][2]);
    // const O1O2: three.Vector3 = new three.Vector3(
    //     curve.getOrigin().getPosition()[0], curve.getOrigin().getPosition()[1], curve.getOrigin().getPosition()[2]);
    // const U11: three.Vector3 = new three.Vector3(
    // U1.x*x/U1.length(),U1.y*x/U1.length(),U1.z*x/U1.length());
    // const V11: three.Vector3 = new three.Vector3(
    // V1.x*y/V1.length(),V1.y*y/V1.length(),V1.z*y/V1.length());
    // const O2P: three.Vector3 = threex.addVectors(U11,V11);
    //////////
    // 2 rotations & 1 translation;
    // rotation 1
    const u1_projection: three.Vector3 = new three.Vector3(U1.x,U1.y,0);
    const alpha_1_cos: number = U1.normalize().dot(u1_projection.normalize());
    const alpha_1_sin: number = U1.normalize().z;
    const o2P_prime: three.Vector3 = new three.Vector3(
        O2P.x*alpha_1_cos - O2P.z*alpha_1_sin,
        O2P.y,
        O2P.z*alpha_1_cos + O2P.x*alpha_1_sin);
    // rotation 2
    const alpha_2_cos: number = u1_projection.normalize().x;
    const alpha_2_sin: number = u1_projection.normalize().y;
    const o2P_second: three.Vector3 = new three.Vector3(
        o2P_prime.x*alpha_2_cos - o2P_prime.y*alpha_2_sin,
        o2P_prime.y*alpha_2_cos + o2P_prime.x*alpha_2_sin,
        o2P_prime.z);

    // console.log("Alpha is " + alpha);
    // console.log("r is " + r);
    //         // console.log("U11 is " +  [U11.x,U11.y,U11.z]);
    //         // console.log("V11 is " +  [V11.x,V11.y,V11.z]);
    // console.log("O2P is " +  [O2P.x,O2P.y,O2P.z]);
    // console.log("Alpha_1 is " + alpha_1_cos + " and " + alpha_1_sin);
    // console.log("o2P_prime is " +  [o2P_prime.x,o2P_prime.y,o2P_prime.z]);
    // console.log("Alpha_2 is " + alpha_2_cos + " and " + alpha_2_sin);
    // console.log("o2P_second is " +  [o2P_second.x,o2P_second.y,o2P_second.z]);
    // translation
    const O1P: three.Vector3 = threex.addVectors(O1O2,o2P_second);
    // const O1P: three.Vector3 = threex.addVectors(O1O2,O2P);
    // console.log("@Evaluate O1P is + " + [O1P.x,O1P.y,O1P.z]  );

    return [O1P.x,O1P.y,O1P.z];
}

/**
 * Calculate a set of xyz position on the circle or arc. The number of points = length / resolution.
 * With resolution from 0.0001 to 0.5, 0.0001 being a higher resolution than 0.5
 */
export function circleGetRenderXYZs(curve: gs.ICircle, resolution: number): number[][] {
    // 2 possible versions, one which calls circleEvaluate,
    // a second one which use circleEvaluate by using let instead of const
    const renderXYZs: number[][] = [];
    // Version 1
    const L: number = circleLength(curve);
    const N: number = Math.ceil(L/resolution);
    for(let k=0;k<N;k++) {
        renderXYZs.push(circleEvaluate(curve,k*resolution));
    }
    return renderXYZs;
//    throw new Error("Not implemented"); // Do this first
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
export function ellipseEvaluate(curve: gs.IEllipse, t: number): number[] {
    // ConicCurve assumed to be an ellipse or circle;
    const vector_x: number[] = curve.getVectors()[0];
    const vector_y: number[] = curve.getVectors()[1];
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
export function ellipseGetRenderXYZs(curve: gs.IEllipse, resolution: number): number[][] {
    throw new Error("Not implemented");
}
