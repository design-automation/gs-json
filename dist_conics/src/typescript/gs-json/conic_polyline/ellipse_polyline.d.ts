import { IEllipse, IPolyline, XYZ } from "../ifaces_gs";
export declare function ellipse_polyline(ellipse: IEllipse): IPolyline;
export declare function ellipse_length(curve: IEllipse, subdivision: number): number;
export declare function ellipse_find_angle(curve: IEllipse, length: number, subdivision: number): number;
export declare function ellipse_evaluate(curve: IEllipse, t: number, subdivision: number): XYZ;
export declare function ellipse_renderXYZ(curve: IEllipse, resolution: any): XYZ[];
export declare function ellipse_polyline_renderXYZ(curve: IEllipse): IPolyline;
