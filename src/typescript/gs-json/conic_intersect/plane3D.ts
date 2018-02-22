import {IEllipse, IParabola, IHyperbola, ICircle, IPolyline, IGeom, IPoint, IModel, XYZ, IPlane} from "../ifaces_gs";
import * as arr from "../libs/arr/arr";
import * as three from "three";

// export function plane3D_ellipse(): IPoint[] { throw new Error("Method not implemented");}

export function plane3D_parabola(parabola: IParabola, plane: IPlane): IPoint[] {
    const m: IModel = parabola.getModel();
    const eps: number = 1e-7;
    if(plane.getModel() !== m) {
        throw new Error("Identical models are required for the parabola and the plane");
    }
    // get plane
    const PO: number[] = plane.getOrigin().getPosition();
    const n1: number[] = [plane.getCartesians()[0],plane.getCartesians()[1],plane.getCartesians()[2]];
    // get circle
    const C0: number[] = parabola.getOrigin().getPosition();
    const CA: [XYZ,XYZ,XYZ] = parabola.getAxes();
    const U1: three.Vector3 = new three.Vector3(...CA[0]).setLength(parabola.getRadii()[0]);
    const V1: three.Vector3 = new three.Vector3(...CA[1]).setLength(parabola.getRadii()[1]);
    // const U1: three.Vector3 = new three.Vector3(...CA[0]);
    // const V1: three.Vector3 = new three.Vector3(...CA[1]).setLength(U1.length());
    const _n1: three.Vector3 = new three.Vector3(n1[0],n1[1],n1[2]);
    // calculate t
    const A: number = n1[0]*(C0[0] - PO[0]) + n1[1]*(C0[1] - PO[1]) + n1[2]*(C0[2] - PO[2]);
    const B: number = n1[0]*U1.x + n1[1]*U1.y + n1[2]*U1.z;
    const C: number = n1[0]*V1.x + n1[1]*V1.y + n1[2]*V1.z;
    const _t: number[] = _solve_trigo(A,B,C);
    if (_t === null) {return [];}
    const result: IPoint[] = [];
    for (const t of _t) {
                const point1: three.Vector3 = new three.Vector3(
                    C0[0] + Math.cos(t)*U1.x + Math.sin(t)*V1.x - PO[0],
                    C0[1] + Math.cos(t)*U1.y + Math.sin(t)*V1.y - PO[1],
                    C0[2] + Math.cos(t)*U1.z + Math.sin(t)*V1.z - PO[2],
                    );
                if( Math.abs(_n1.dot(point1)) < eps ) {
                const vec_point1: three.Vector3 = new three.Vector3(
                    Math.cos(t)*U1.x + Math.sin(t)*V1.x,
                    Math.cos(t)*U1.y + Math.sin(t)*V1.y,
                    Math.cos(t)*U1.z + Math.sin(t)*V1.z);
                let angle_point1: number = Math.sign(
                crossVectors(U1,V1).dot(
                crossVectors(U1,vec_point1))) * vec_point1.angleTo(U1) * 180 / Math.PI;
                angle_point1 = (angle_point1 + 10*360) %360;
                if (angle_point1 >= parabola.getAngles()[0] && angle_point1 <= parabola.getAngles()[1]) {
                result.push(m.getGeom().addPoint([
                    C0[0] + Math.cos(t)*U1.x + Math.sin(t)*V1.x,
                    C0[1] + Math.cos(t)*U1.y + Math.sin(t)*V1.y,
                    C0[2] + Math.cos(t)*U1.z + Math.sin(t)*V1.z]));}
                }
                const point2: three.Vector3 = new three.Vector3(
                    C0[0] + Math.cos(t + Math.PI)*U1.x + Math.sin(t + Math.PI)*V1.x - PO[0],
                    C0[1] + Math.cos(t + Math.PI)*U1.y + Math.sin(t + Math.PI)*V1.y - PO[1],
                    C0[2] + Math.cos(t + Math.PI)*U1.z + Math.sin(t + Math.PI)*V1.z - PO[2],
                    );
                if( Math.abs(_n1.dot(point2)) < eps ) {
                const vec_point2: three.Vector3 = new three.Vector3(
                    Math.cos(t + Math.PI)*U1.x + Math.sin(t + Math.PI)*V1.x,
                    Math.cos(t + Math.PI)*U1.y + Math.sin(t + Math.PI)*V1.y,
                    Math.cos(t + Math.PI)*U1.z + Math.sin(t + Math.PI)*V1.z);
                let angle_point2: number = Math.sign(crossVectors(U1,V1).dot(
                crossVectors(U1,vec_point2))) * vec_point2.angleTo(U1) * 180 / Math.PI;
                angle_point2 = (angle_point2 + 10*360) %360;
                if (angle_point2 >= parabola.getAngles()[0] && angle_point2 <= parabola.getAngles()[1]) {
                    result.push(m.getGeom().addPoint([
                    C0[0] + Math.cos(t + Math.PI)*U1.x + Math.sin(t + Math.PI)*V1.x,
                    C0[1] + Math.cos(t + Math.PI)*U1.y + Math.sin(t + Math.PI)*V1.y,
                    C0[2] + Math.cos(t + Math.PI)*U1.z + Math.sin(t + Math.PI)*V1.z]));
                }
        }
    }
    return result;
}

export function plane3D_hyperbola(hyperbola: IHyperbola, plane: IPlane): IPoint[] {
    const m: IModel = hyperbola.getModel();
    const eps: number = 1e-7;
    if(plane.getModel() !== m) {
        throw new Error("Identical models are required for the hyperbola and the plane");
    }
    // get plane
    const PO: number[] = plane.getOrigin().getPosition();
    const n1: number[] = [plane.getCartesians()[0],plane.getCartesians()[1],plane.getCartesians()[2]];
    // get circle
    const C0: number[] = hyperbola.getOrigin().getPosition();
    const CA: [XYZ,XYZ,XYZ] = hyperbola.getAxes();
    const U1: three.Vector3 = new three.Vector3(...CA[0]).setLength(hyperbola.getRadii()[0]);
    const V1: three.Vector3 = new three.Vector3(...CA[1]).setLength(hyperbola.getRadii()[1]);
    // const U1: three.Vector3 = new three.Vector3(...CA[0]);
    // const V1: three.Vector3 = new three.Vector3(...CA[1]).setLength(U1.length());
    const _n1: three.Vector3 = new three.Vector3(n1[0],n1[1],n1[2]);
    // calculate t
    const A: number = n1[0]*(C0[0] - PO[0]) + n1[1]*(C0[1] - PO[1]) + n1[2]*(C0[2] - PO[2]);
    const B: number = n1[0]*U1.x + n1[1]*U1.y + n1[2]*U1.z;
    const C: number = n1[0]*V1.x + n1[1]*V1.y + n1[2]*V1.z;
    const _t: number[] = _solve_trigo(A,B,C);
    if (_t === null) {return [];}
    const result: IPoint[] = [];
    for (const t of _t) {
                const point1: three.Vector3 = new three.Vector3(
                    C0[0] + Math.cos(t)*U1.x + Math.sin(t)*V1.x - PO[0],
                    C0[1] + Math.cos(t)*U1.y + Math.sin(t)*V1.y - PO[1],
                    C0[2] + Math.cos(t)*U1.z + Math.sin(t)*V1.z - PO[2],
                    );
                if( Math.abs(_n1.dot(point1)) < eps ) {
                const vec_point1: three.Vector3 = new three.Vector3(
                    Math.cos(t)*U1.x + Math.sin(t)*V1.x,
                    Math.cos(t)*U1.y + Math.sin(t)*V1.y,
                    Math.cos(t)*U1.z + Math.sin(t)*V1.z);
                let angle_point1: number = Math.sign(
                crossVectors(U1,V1).dot(
                crossVectors(U1,vec_point1))) * vec_point1.angleTo(U1) * 180 / Math.PI;
                angle_point1 = (angle_point1 + 10*360) %360;
                if (angle_point1 >= hyperbola.getAngles()[0] && angle_point1 <= hyperbola.getAngles()[1]) {
                result.push(m.getGeom().addPoint([
                    C0[0] + Math.cos(t)*U1.x + Math.sin(t)*V1.x,
                    C0[1] + Math.cos(t)*U1.y + Math.sin(t)*V1.y,
                    C0[2] + Math.cos(t)*U1.z + Math.sin(t)*V1.z]));}
                }
                const point2: three.Vector3 = new three.Vector3(
                    C0[0] + Math.cos(t + Math.PI)*U1.x + Math.sin(t + Math.PI)*V1.x - PO[0],
                    C0[1] + Math.cos(t + Math.PI)*U1.y + Math.sin(t + Math.PI)*V1.y - PO[1],
                    C0[2] + Math.cos(t + Math.PI)*U1.z + Math.sin(t + Math.PI)*V1.z - PO[2],
                    );
                if( Math.abs(_n1.dot(point2)) < eps ) {
                const vec_point2: three.Vector3 = new three.Vector3(
                    Math.cos(t + Math.PI)*U1.x + Math.sin(t + Math.PI)*V1.x,
                    Math.cos(t + Math.PI)*U1.y + Math.sin(t + Math.PI)*V1.y,
                    Math.cos(t + Math.PI)*U1.z + Math.sin(t + Math.PI)*V1.z);
                let angle_point2: number = Math.sign(crossVectors(U1,V1).dot(
                crossVectors(U1,vec_point2))) * vec_point2.angleTo(U1) * 180 / Math.PI;
                angle_point2 = (angle_point2 + 10*360) %360;
                if (angle_point2 >= hyperbola.getAngles()[0] && angle_point2 <= hyperbola.getAngles()[1]) {
                    result.push(m.getGeom().addPoint([
                    C0[0] + Math.cos(t + Math.PI)*U1.x + Math.sin(t + Math.PI)*V1.x,
                    C0[1] + Math.cos(t + Math.PI)*U1.y + Math.sin(t + Math.PI)*V1.y,
                    C0[2] + Math.cos(t + Math.PI)*U1.z + Math.sin(t + Math.PI)*V1.z]));
                }
        }
    }
    return result;
}

export function plane3D_ellipse2D(ellipse: IEllipse, plane: IPlane): IPoint[] {
    const m: IModel = ellipse.getModel();
    const eps: number = 1e-7;
    if(plane.getModel() !== m) {
        throw new Error("Identical models are required for the ellipse and the plane");
    }
    const PO: number[] = plane.getOrigin().getPosition();
    const n1: number[] = [plane.getCartesians()[0],plane.getCartesians()[1],plane.getCartesians()[2]];
    const C0: number[] = ellipse.getOrigin().getPosition();
    const CA: [XYZ,XYZ,XYZ] = ellipse.getAxes();
    const U1: three.Vector3 = new three.Vector3(...CA[0]).setLength(ellipse.getRadii()[0]);
    const V1: three.Vector3 = new three.Vector3(...CA[1]).setLength(ellipse.getRadii()[1]);
    const _n1: three.Vector3 = new three.Vector3(n1[0],n1[1],n1[2]);
    const A: number = n1[0]*(C0[0] - PO[0]) + n1[1]*(C0[1] - PO[1]) + n1[2]*(C0[2] - PO[2]);
    const B: number = n1[0]*U1.x + n1[1]*U1.y + n1[2]*U1.z;
    const C: number = n1[0]*V1.x + n1[1]*V1.y + n1[2]*V1.z;
    const _t: number[] = _solve_trigo(A,B,C);
    if (_t === null) {return [];}
    const result: IPoint[] = [];
    const results_plane_ellipse: three.Vector3[] = [];

    for (const t of _t) {
                const point1: three.Vector3 = new three.Vector3(
                    C0[0] + Math.cos(t)*U1.x + Math.sin(t)*V1.x - PO[0],
                    C0[1] + Math.cos(t)*U1.y + Math.sin(t)*V1.y - PO[1],
                    C0[2] + Math.cos(t)*U1.z + Math.sin(t)*V1.z - PO[2],
                    );
                if( Math.abs(_n1.dot(point1)) < eps ) {
                const vec_point1: three.Vector3 = new three.Vector3(
                    Math.cos(t)*U1.x + Math.sin(t)*V1.x,
                    Math.cos(t)*U1.y + Math.sin(t)*V1.y,
                    Math.cos(t)*U1.z + Math.sin(t)*V1.z);
                let angle_point1: number = Math.sign(
                crossVectors(U1,V1).dot(
                crossVectors(U1,vec_point1))) * vec_point1.angleTo(U1) * 180 / Math.PI;
                angle_point1 = (angle_point1 + 10*360) %360;
                results_plane_ellipse.push(new three.Vector3(
                    C0[0] + Math.cos(t)*U1.x + Math.sin(t)*V1.x,
                    C0[1] + Math.cos(t)*U1.y + Math.sin(t)*V1.y,
                    C0[2] + Math.cos(t)*U1.z + Math.sin(t)*V1.z));
               }
                const point2: three.Vector3 = new three.Vector3(
                    C0[0] + Math.cos(t + Math.PI)*U1.x + Math.sin(t + Math.PI)*V1.x - PO[0],
                    C0[1] + Math.cos(t + Math.PI)*U1.y + Math.sin(t + Math.PI)*V1.y - PO[1],
                    C0[2] + Math.cos(t + Math.PI)*U1.z + Math.sin(t + Math.PI)*V1.z - PO[2],
                    );
                if( Math.abs(_n1.dot(point2)) < eps ) {
                const vec_point2: three.Vector3 = new three.Vector3(
                    Math.cos(t + Math.PI)*U1.x + Math.sin(t + Math.PI)*V1.x,
                    Math.cos(t + Math.PI)*U1.y + Math.sin(t + Math.PI)*V1.y,
                    Math.cos(t + Math.PI)*U1.z + Math.sin(t + Math.PI)*V1.z);
                let angle_point2: number = Math.sign(crossVectors(U1,V1).dot(
                crossVectors(U1,vec_point2))) * vec_point2.angleTo(U1) * 180 / Math.PI;
                angle_point2 = (angle_point2 + 10*360) %360;
                results_plane_ellipse.push(new three.Vector3(
                    C0[0] + Math.cos(t + Math.PI)*U1.x + Math.sin(t + Math.PI)*V1.x,
                    C0[1] + Math.cos(t + Math.PI)*U1.y + Math.sin(t + Math.PI)*V1.y,
                    C0[2] + Math.cos(t + Math.PI)*U1.z + Math.sin(t + Math.PI)*V1.z));
                }
        }

    const results_plane_ellipse_copy: three.Vector3[] =[];
    for (let point  of results_plane_ellipse) {
        const data: number[] = arr.Arr.deepCopy([point.x, point.y, point.z]);
        results_plane_ellipse_copy.push(new three.Vector3(data[0],data[1],data[2]));
        }
    const original_angles_1: number[] = arr.Arr.deepCopy(ellipse.getAngles());
    const C1: three.Vector3 = new three.Vector3(...ellipse.getOrigin().getPosition());
    let angles1: [number, number] = ellipse.getAngles();
    if (angles1 === undefined) {angles1 = [0,360];}
    for(const point of results_plane_ellipse_copy) {
        const c1_to_point: three.Vector3 = new three.Vector3(point.x - C1.x,point.y - C1.y,point.z - C1.z);
        let angle_1: number = U1.angleTo(c1_to_point) * 180/Math.PI;
        if( crossVectors(U1, c1_to_point).dot(crossVectors(U1,V1)) < 0 ) {angle_1 = 360 - angle_1;}
        angle_1 =  ((angle_1 %360) + 360) %360;
        angles1[0] =  ((angles1[0] %360) + 360) %360;
        angles1[1] =  ((angles1[1] %360) + 360) %360;
        if(original_angles_1[0] !== original_angles_1[1] && angles1[1] === angles1[0]) {
        angles1[1] = angles1[1] + 360;}
        let ok: boolean = true;
        if(angles1[1] > angles1[0]) {
            if( (angle_1 < angles1[0] && angle_1 >= 0 ) || (angle_1 > angles1[1] && angle_1 <= 360)) {
                ok = false;
            }
        }
        if(angles1[0] > angles1[1]) {
            if( angle_1 > angles1[1] && angle_1 < angles1[0] ) {ok = false;
            }
        }
        if(ok) {result.push(m.getGeom().addPoint([point.x,point.y,point.z]));}
        }
    return result;
}

export function plane3D_circle2D(circle: ICircle, plane: IPlane): IPoint[] {
    const m: IModel = circle.getModel();
    if(plane.getModel() !== m) {
        throw new Error("Identical models are required for the circle and the plane");
    }
    const CA: [XYZ,XYZ,XYZ] = circle.getAxes();
    const U1: three.Vector3 = new three.Vector3(...CA[0]).setLength(circle.getRadius());
    const V1: three.Vector3 = new three.Vector3(...CA[1]).setLength(circle.getRadius());
  
    const ellipse: IEllipse = m.getGeom().addEllipse(circle.getOrigin(), [U1.x,U1.y,U1.z], [V1.x,V1.y,V1.z], circle.getAngles());
    const result: IPoint[] = plane3D_ellipse2D(ellipse,plane);
    m.getGeom().delObj(ellipse, false);

    return result;

    // circle.getAxes();

    // const PO: number[] = plane.getOrigin().getPosition();
    // const n1: number[] = [plane.getCartesians()[0],plane.getCartesians()[1],plane.getCartesians()[2]];
    // const C0: number[] = circle.getOrigin().getPosition();
    // const CA: [XYZ,XYZ,XYZ] = circle.getAxes();
    // const U1: three.Vector3 = new three.Vector3(...CA[0]).setLength(circle.getRadius());
    // const V1: three.Vector3 = new three.Vector3(...CA[1]).setLength(circle.getRadius());
    // const _n1: three.Vector3 = new three.Vector3(n1[0],n1[1],n1[2]);
    // const A: number = n1[0]*(C0[0] - PO[0]) + n1[1]*(C0[1] - PO[1]) + n1[2]*(C0[2] - PO[2]);
    // const B: number = n1[0]*U1.x + n1[1]*U1.y + n1[2]*U1.z;
    // const C: number = n1[0]*V1.x + n1[1]*V1.y + n1[2]*V1.z;
    // const _t: number[] = _solve_trigo(A,B,C);
    // if (_t === null) {return [];}
    // const result: IPoint[] = [];
    // const results_plane_circle: three.Vector3[] = [];

    // for (const t of _t) {
    //             const point1: three.Vector3 = new three.Vector3(
    //                 C0[0] + Math.cos(t)*U1.x + Math.sin(t)*V1.x - PO[0],
    //                 C0[1] + Math.cos(t)*U1.y + Math.sin(t)*V1.y - PO[1],
    //                 C0[2] + Math.cos(t)*U1.z + Math.sin(t)*V1.z - PO[2],
    //                 );
    //             if( Math.abs(_n1.dot(point1)) < eps ) {
    //             const vec_point1: three.Vector3 = new three.Vector3(
    //                 Math.cos(t)*U1.x + Math.sin(t)*V1.x,
    //                 Math.cos(t)*U1.y + Math.sin(t)*V1.y,
    //                 Math.cos(t)*U1.z + Math.sin(t)*V1.z);
    //             let angle_point1: number = Math.sign(
    //             crossVectors(U1,V1).dot(
    //             crossVectors(U1,vec_point1))) * vec_point1.angleTo(U1) * 180 / Math.PI;
    //             angle_point1 = (angle_point1 + 10*360) %360;
    //             results_plane_circle.push(new three.Vector3(
    //                 C0[0] + Math.cos(t)*U1.x + Math.sin(t)*V1.x,
    //                 C0[1] + Math.cos(t)*U1.y + Math.sin(t)*V1.y,
    //                 C0[2] + Math.cos(t)*U1.z + Math.sin(t)*V1.z));
    //            }
    //             const point2: three.Vector3 = new three.Vector3(
    //                 C0[0] + Math.cos(t + Math.PI)*U1.x + Math.sin(t + Math.PI)*V1.x - PO[0],
    //                 C0[1] + Math.cos(t + Math.PI)*U1.y + Math.sin(t + Math.PI)*V1.y - PO[1],
    //                 C0[2] + Math.cos(t + Math.PI)*U1.z + Math.sin(t + Math.PI)*V1.z - PO[2],
    //                 );
    //             if( Math.abs(_n1.dot(point2)) < eps ) {
    //             const vec_point2: three.Vector3 = new three.Vector3(
    //                 Math.cos(t + Math.PI)*U1.x + Math.sin(t + Math.PI)*V1.x,
    //                 Math.cos(t + Math.PI)*U1.y + Math.sin(t + Math.PI)*V1.y,
    //                 Math.cos(t + Math.PI)*U1.z + Math.sin(t + Math.PI)*V1.z);
    //             let angle_point2: number = Math.sign(crossVectors(U1,V1).dot(
    //             crossVectors(U1,vec_point2))) * vec_point2.angleTo(U1) * 180 / Math.PI;
    //             angle_point2 = (angle_point2 + 10*360) %360;
    //             results_plane_circle.push(new three.Vector3(
    //                 C0[0] + Math.cos(t + Math.PI)*U1.x + Math.sin(t + Math.PI)*V1.x,
    //                 C0[1] + Math.cos(t + Math.PI)*U1.y + Math.sin(t + Math.PI)*V1.y,
    //                 C0[2] + Math.cos(t + Math.PI)*U1.z + Math.sin(t + Math.PI)*V1.z));
    //             }
    //     }

    // const results_plane_circle_copy: three.Vector3[] =[];
    // for (let point  of results_plane_circle) {
    //     const data: number[] = arr.Arr.deepCopy([point.x, point.y, point.z]);
    //     results_plane_circle_copy.push(new three.Vector3(data[0],data[1],data[2]));
    //     }
    // const original_angles_1: number[] = arr.Arr.deepCopy(circle.getAngles());
    // const C1: three.Vector3 = new three.Vector3(...circle.getOrigin().getPosition());
    // let angles1: [number, number] = circle.getAngles();
    // if (angles1 === undefined) {angles1 = [0,360];}
    // for(const point of results_plane_circle_copy) {
    //     const c1_to_point: three.Vector3 = new three.Vector3(point.x - C1.x,point.y - C1.y,point.z - C1.z);
    //     let angle_1: number = U1.angleTo(c1_to_point) * 180/Math.PI;
    //     if( crossVectors(U1, c1_to_point).dot(crossVectors(U1,V1)) < 0 ) {angle_1 = 360 - angle_1;}
    //     angle_1 =  ((angle_1 %360) + 360) %360;
    //     angles1[0] =  ((angles1[0] %360) + 360) %360;
    //     angles1[1] =  ((angles1[1] %360) + 360) %360;
    //     if(original_angles_1[0] !== original_angles_1[1] && angles1[1] === angles1[0]) {
    //     angles1[1] = angles1[1] + 360;}
    //     let ok: boolean = true;
    //     if(angles1[1] > angles1[0]) {
    //         if( (angle_1 < angles1[0] && angle_1 >= 0 ) || (angle_1 > angles1[1] && angle_1 <= 360)) {
    //             ok = false;
    //         }
    //     }
    //     if(angles1[0] > angles1[1]) {
    //         if( angle_1 > angles1[1] && angle_1 < angles1[0] ) {ok = false;
    //         }
    //     }
    //     if(ok) {
    //         result.push(m.getGeom().addPoint([point.x,point.y,point.z]));
    //     }
    //     }
    // return result;
}

export function crossVectors(v1: three.Vector3, v2: three.Vector3, norm: boolean = false): three.Vector3 {
    const v3: three.Vector3 = new three.Vector3();
    v3.crossVectors(v1, v2);
    if (norm) {v3.normalize();}
    return v3;
}
export function _solve_trigo(A: number, B: number, C: number): number[] {
  const num1: number = -A;
  const den1: number = Math.sqrt(B*B + C*C);
  const num2: number = B;
  const den2: number = C;
  if(C===0) {
    if(B=== 0) {return null;}
    if(Math.abs(A/B)>1) {return null;}
    return [(-Math.acos(-A/B)) % (2*Math.PI), (Math.acos(-A/B)) % (2*Math.PI)];
  }
  if(Math.abs(num1/den1)>1) {return null;}
  const t1: number = Math.asin(num1/den1) - Math.atan(num2/den2);
  const t2: number = Math.PI - Math.atan(num2/den2) - Math.asin(num1/den1);
  return [t1 % (2*Math.PI),t2 % (2*Math.PI)];
}
