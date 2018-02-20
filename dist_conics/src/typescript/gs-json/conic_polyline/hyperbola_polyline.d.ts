import { IHyperbola, IPolyline, XYZ } from "../ifaces_gs";
export declare function hyperbola_polyline(hyperbola: IHyperbola): IPolyline;
export declare function hyperbola_length(curve: IHyperbola, subdivision: number): number;
export declare function hyperbola_find_angle(curve: IHyperbola, length: number, subdivision: number): number;
export declare function hyperbola_evaluate(curve: IHyperbola, t: number, subdivision: number): XYZ;
export declare function hyperbola_renderXYZ(curve: IHyperbola, resolution: any): XYZ[];
export declare function hyperbola_polyline_renderXYZ(curve: IHyperbola): IPolyline;
