import { IEllipse, IParabola, IHyperbola, IPoint, IPlane } from "../ifaces_gs";
import * as three from "three";
export declare function plane3D_parabola(parabola: IParabola, plane: IPlane): IPoint[];
export declare function plane3D_hyperbola(hyperbola: IHyperbola, plane: IPlane): IPoint[];
export declare function plane3D_ellipse(ellipse: IEllipse, plane: IPlane): IPoint[];
export declare function crossVectors(v1: three.Vector3, v2: three.Vector3, norm?: boolean): three.Vector3;
export declare function _solve_trigo(A: number, B: number, C: number): number[];
