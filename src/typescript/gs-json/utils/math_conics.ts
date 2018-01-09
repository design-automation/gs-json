import * as gs from "./gs-json";
/**
 * Calculate the length of the conic curve.
 */
export function length(curve: gs.IConicCurve): number {
    // ypu need to get the a, b, p etc from the curve object.

    // return _length()

    throw new Error("Method not implemented.");
}
// this should not be exported, but I add it so that test can work
export function _length(curve: gs.IConicCurve): number {
    const vector_x: number[] = curve.getVectors()[0];
    const vector_y: number[] = curve.getVectors()[1];
    let a: number = null;
    let b: number = null;
    let p: number = null;
    let type: string = null;
    let angle_1: number = curve.getAngles()[0];
    let angle_2: number = curve.getAngles()[1];
    // Specifications proposal of Vector_x (Vx) and Vector_y (Vy):
    // "." : dot product, "*" : cross product
    // We assume (e1,e2,e3) an orthonormal direct basis,
    // and the plan defined by (Vx,Vy) is the same as (e1,e2);

    // Identification of a,b,p and type of the curve
    // (by type we mean ellipse/hyperbola/parabola)
    // Case 1:
    //    Vx.Vy = 0 and (Vx*Vy).e3 > 0 then ellipse with a = norm(Vx), b = norm(Vy) ;
    // Case 2:
    //    Vx.Vy = 0 and (Vx*Vy).e3 < 0 then hyperbola with a = norm(Vx), b = norm(Vy) ;
    // Case 3:
    //    norm(Vx) = norm(Vy) and (Vx*Vy).e3 = 0 and Vx.Vy > 0 then parabola with p = norm(Vx) ;
    if( vector_x[0]*vector_y[0] + vector_x[1]*vector_y[1] === 0
       && (vector_x[0]*vector_y[1] - vector_x[1]*vector_y[0]) > 0
       ) {
       a = Math.sqrt(vector_x[0]*vector_x[0] + vector_x[1]*vector_x[1]);
       b = Math.sqrt(vector_y[0]*vector_y[0] + vector_y[1]*vector_y[1]);
       p = null;
       type = "ellipse/circle";}
    if( vector_x[0]*vector_y[0] + vector_x[1]*vector_y[1] === 0
       && (vector_x[0]*vector_y[1] - vector_x[1]*vector_y[0]) < 0
       ) {
       a = Math.sqrt(vector_x[0]*vector_x[0] + vector_x[1]*vector_x[1]);
       b = Math.sqrt(vector_y[0]*vector_y[0] + vector_y[1]*vector_y[1]);
       p = null;
       type = "hyperbola";}
    if(   vector_x[0]*vector_x[0] + vector_x[1]*vector_x[1]
        - vector_y[0]*vector_y[0] - vector_y[1]*vector_y[1]
        === 0
       && (vector_x[0]*vector_y[1] - vector_x[1]*vector_y[0]) === 0
       && vector_x[0]*vector_y[0] + vector_x[1]*vector_y[1] > 0
       ) {
       a = null;
       b = null;
       p = null;
       type = "parabola";}
    if( type === null) {throw new Error ("Conic Vectors need to follow specification requirements");}
    let distance: number = 0;
    let e: number = 0;
    const K: number = 1000;
    let theta: number = null;
    let d_th: number = null;
    angle_1 = angle_1 *(2*Math.PI)/360 ;
    angle_2 = angle_2 *(2*Math.PI)/360 ;
    switch(type) {
        case "parabola": // parabola
            const r1: number = 2*p*Math.sin(angle_1) / (Math.cos(angle_1) * Math.cos(angle_1));
            const r2: number = 2*p*Math.sin(angle_2) / (Math.cos(angle_2) * Math.cos(angle_2));
            const x1: number = r1 * Math.cos(angle_1);
            const x2: number = r2 * Math.cos(angle_2);
            distance = (1/2) * p * ( x2*Math.sqrt(1 + x2*x2) + Math.log( x2 + Math.sqrt(1 + x2*x2) ) )
                - (1/2) * p * ( x1*Math.sqrt(1 + x1*x1) + Math.log( x1 + Math.sqrt(1 + x1*x1) ) );
            return Math.abs(distance);

            case "ellipse/circle": // ellipse
            if(a>b) { e = Math.sqrt( 1 - (b/a)*(b/a) ) ;}
            if(b>a) { e = Math.sqrt( 1 - (a/b)*(a/b) ) ;}
            if( a === b) { return Math.abs(a*(angle_2 - angle_1));}
            d_th  = (angle_2 - angle_1)/K ;
            for(let k = 0; k < K ; k++ ) {
                theta = angle_1 + k*(angle_2 - angle_1)/K ;
                distance = distance + d_th * Math.sqrt(1 - e*Math.sin(theta)*e*Math.sin(theta));
            }
            distance = a * distance ;
            return distance;
        case "hyperbola": // hyperbola
            e = Math.sqrt(1 + (b/a)*(b/a));
            const theta_min: number = Math.min(angle_1, angle_2);
            const theta_max: number = Math.max(angle_1, angle_2);
            // angle_1 = theta_min *(2*Math.PI)/360 ;
            // theta_2 = theta_max *(2*Math.PI)/360 ;
            d_th = (theta_max - theta_min)*(2*Math.PI)/(360*K) ;
            if(((b/a) - Math.tan(Math.abs(theta_min *(2*Math.PI)/360))) <= 0) {throw new Error("Theta_1 not on curve");}
            if(((b/a) - Math.tan(Math.abs(theta_max *(2*Math.PI)/360))) <= 0) {throw new Error("Theta_2 not on curve");}
            for(let k = 0; k < K ; k++ ) {
                theta = theta_min*(2*Math.PI)/360 + k*(theta_max - theta_min)*(2*Math.PI)/(360*K) ;
                distance = distance +
                d_th * b/(Math.sqrt((e*Math.cos(theta*(2*Math.PI)/360))*(e*Math.cos(theta*(2*Math.PI)/360)) - 1));
            }
            return distance;
    }
}
/**
 * Calculate the xyz position at parameter t. The t parameter range is from 0 to 1.
 */
export function evaluate(curve: gs.IConicCurve, t: number): number[] {

    // return _evaluate()

    throw new Error("Method not implemented.");

}
export function _evaluate(curve: gs.IConicCurve, t: number): number[] {
    const vector_x: number[] = curve.getVectors()[0];
    const vector_y: number[] = curve.getVectors()[1];
    let a: number = null;
    let b: number = null;
    let p: number = null;
    let type: string = null;
    const angle_1: number = curve.getAngles()[0];
    const angle_2: number = curve.getAngles()[1];
    // Specifications proposal of Vector_x (Vx) and Vector_y (Vy):
    // "." : dot product, "*" : cross product
    // We assume (e1,e2,e3) an orthonormal direct basis,
    // and the plan defined by (Vx,Vy) is the same as (e1,e2);

    // Identification of a,b,p and type of the curve
    // (by type we mean ellipse/hyperbola/parabola)
    // Case 1:
    //    Vx.Vy = 0 and (Vx*Vy).e3 > 0 then ellipse with a = norm(Vx), b = norm(Vy) ;
    // Case 2:
    //    Vx.Vy = 0 and (Vx*Vy).e3 < 0 then hyperbola with a = norm(Vx), b = norm(Vy) ;
    // Case 3:
    //    norm(Vx) = norm(Vy) and (Vx*Vy).e3 = 0 and Vx.Vy > 0 then parabola with p = norm(Vx) ;
    if( vector_x[0]*vector_y[0] + vector_x[1]*vector_y[1] === 0
       && (vector_x[0]*vector_y[1] - vector_x[1]*vector_y[0]) > 0
       ) {
       a = Math.sqrt(vector_x[0]*vector_x[0] + vector_x[1]*vector_x[1]);
       b = Math.sqrt(vector_y[0]*vector_y[0] + vector_y[1]*vector_y[1]);
       p = null;
       type = "ellipse/circle";}
    if( vector_x[0]*vector_y[0] + vector_x[1]*vector_y[1] === 0
       && (vector_x[0]*vector_y[1] - vector_x[1]*vector_y[0]) < 0
       ) {
       a = Math.sqrt(vector_x[0]*vector_x[0] + vector_x[1]*vector_x[1]);
       b = Math.sqrt(vector_y[0]*vector_y[0] + vector_y[1]*vector_y[1]);
       p = null;
       type = "hyperbola";}
    if(   vector_x[0]*vector_x[0] + vector_x[1]*vector_x[1]
        - vector_y[0]*vector_y[0] - vector_y[1]*vector_y[1]
        === 0
       && (vector_x[0]*vector_y[1] - vector_x[1]*vector_y[0]) === 0
       && vector_x[0]*vector_y[0] + vector_x[1]*vector_y[1] > 0
       ) {
       a = null;
       b = null;
       p = null;
       type = "parabola";}
    if( type === null) {throw new Error ("Conic Vectors need to follow specification requirements");}
    const l: number = _length(curve);
    let epsilon: number = null ;
    let theta: number = null ;
    const K: number = 1000 ;
    let x: number = null;
    let y: number = null;
    let r: number = null;
    let theta_t: number = null;
    let eccentricity: number = null;
    const param: number = b*b/a;
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    let curve_theta: gs.IConicCurve = null ;

    for(let k = 0; k < K; k++) {
        theta = (angle_1 + k * (angle_2 - angle_1)/K);
        curve_theta = g.addConicCurve(curve.getOrigin(),curve.getVectors()[0],
            curve.getVectors()[1],[curve.getAngles()[0],theta]);
        epsilon = t*l - _length(curve_theta);
        if(epsilon < 0) {theta_t = theta;}
    }
    switch(type) {
        case 0:
            r = 2*p*Math.sin(theta_t*(2*Math.PI)/360) / (Math.cos(theta_t*(2*Math.PI)/360)
             * Math.cos(theta_t*(2*Math.PI)/360));
            x = r * Math.cos(theta_t*(2*Math.PI)/360);
            y = 2*p*x*x;
            return [x,y,0];
        case 1:
            eccentricity = Math.sqrt( 1 - (b/a) * (b/a));
            r = param / (1 + eccentricity*Math.cos(theta));
            x = r * Math.cos(theta);
            y = r * Math.sin(theta);
            return [x,y,0];
        case -1:
            eccentricity = Math.sqrt( 1 + (b/a) * (b/a));
            r = param / (1 + eccentricity*Math.cos(theta));
            x = r * Math.cos(theta);
            y = r * Math.sin(theta);
            y = b*b*(1 - (x/a)*(x/a));
            return [x,y,0];
    }
}
