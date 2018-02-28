import { IParabola, IPoint } from "../ifaces_gs";
import * as three from "three";
export declare function parabola_parabola(parabola1: IParabola, parabola2: IParabola): IPoint[];
export declare function vectorFromPointsAtoB(a: IPoint, b: IPoint, norm?: boolean): three.Vector3;
export declare function subVectors(v1: three.Vector3, v2: three.Vector3, norm?: boolean): three.Vector3;
