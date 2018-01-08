import * as gs from "./gs-json";

/**
 * Calculate the length of the conic curve.
 */
export function length(curve: gs.IConicCurve): number {
    // ypu need to get the a, b, p etc from the curve object.

    // return _length()

    throw new Error("Method not implemented.");
}

//this should not be exported, but I add it so that test can work
export function _length(type: number,
                 a?: number, b?: number, p?: number, angle_1?: number , angle_2?: number): number {

    // [a,b,p,type] are necessary informations for assessing the length
    //    a = curve.getRadii()[0], for instance
    //    b = curve.getRadii()[1], for instance
    //    p = curve.getRadii()[2], for instance
    // type = curve.getConicType(), for instance ( 1-> ellipse,  -1 -> hyperbola, 0 -> parabola )
    // Interacts with getLinesFromConicCurve in three.geom ;
    // const angle_1: number = theta_1; // or angle_1 = curve.getAngles()[0] since this information is stored in Curve
    // const angle_2: number = theta_2; // angle_2 = curve.getAngles()[1]

    let distance: number = 0;
    let e: number = 0;
    const K: number = 1000;
    let theta: number = null;
    let d_th: number = null;

    angle_1 = angle_1 *(2*Math.PI)/360 ;
    angle_2 = angle_2 *(2*Math.PI)/360 ;

    switch(type) {
        case 0: // parabola
            const r1: number = 2*p*Math.sin(angle_1) / (Math.cos(angle_1) * Math.cos(angle_1));
            const r2: number = 2*p*Math.sin(angle_2) / (Math.cos(angle_2) * Math.cos(angle_2));
            const x1: number = r1 * Math.cos(angle_1);
            const x2: number = r2 * Math.cos(angle_2);
            distance = (1/2) * p * ( x2*Math.sqrt(1 + x2*x2) + Math.log( x2 + Math.sqrt(1 + x2*x2) ) )
                - (1/2) * p * ( x1*Math.sqrt(1 + x1*x1) + Math.log( x1 + Math.sqrt(1 + x1*x1) ) );
            return Math.abs(distance);

            case 1: // ellipse
            if(a>b) { e = Math.sqrt( 1 - (b/a)*(b/a) ) ;}
            if(b>a) { e = Math.sqrt( 1 - (a/b)*(a/b) ) ;}
            d_th  = (angle_2 - angle_1)/K ;
            for(let k = 0; k < K ; k++ ) {
                theta = angle_1 + k*(angle_2 - angle_1)/K ;
                distance = distance + d_th * Math.sqrt(1 - e*Math.sin(theta)*e*Math.sin(theta));
            }
            distance = a * distance ;
            return distance;

        case 2: // hyperbola
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
    let xyz: number[] = null ;
    // let L: number = length(curve,0,1,1,1,0,1,0,260);
    // L = length(curve,0,1,1,1,0,t*L,0,260);
    // xyz = [0,0,0];
    // finding xyz for which length equals t percent of the length.
    // Step 1, evaluate the length
    // Sounds OK for Parabola,
    // Hyperbola & Ellipse
    return xyz ;
}
