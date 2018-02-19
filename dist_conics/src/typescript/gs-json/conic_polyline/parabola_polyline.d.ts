import { IParabola, IPolyline, XYZ } from "../ifaces_gs";
export declare function parabola_polyline(parabola: IParabola): IPolyline;
export declare function Function_F(x: number): number;
export declare function parabola_length(curve: IParabola): number;
export declare function parabola_find_angle(curve: IParabola, length: number): number;
export declare function parabola_evaluate(curve: IParabola, t: number): XYZ;
export declare function parabola_renderXYZ(curve: IParabola, resolution: any): XYZ[];
export declare function parabola_polyline_renderXYZ(curve: IParabola): IPolyline;
