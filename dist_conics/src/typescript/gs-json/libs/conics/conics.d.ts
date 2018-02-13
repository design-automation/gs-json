import * as gs from "../../_export";
/**
 * Calculate a set of xyz position on the circle/arc ir ellipse/arc. The number of points = length / resolution.
 * With resolution from 0.0001 to 0.5, 0.0001 being a higher resolution than 0.5
 */
export declare function getRenderXYZs(obj: gs.IObj, resolution: number): gs.XYZ[];
/**
 * Calculate the length of the circle or arc.
 */
export declare function circleLength(circle: gs.ICircle): number;
/**
 * Calculate the xyz position at parameter t on the circle or arc. The t parameter range is from 0 to 1.
 */
export declare function circleEvaluate(circle: gs.ICircle, t: number): gs.XYZ;
/**
 * Calculate a set of xyz position on the circle or arc. The number of points = length / resolution.
 * With resolution from 0.0001 to 0.5, 0.0001 being a higher resolution than 0.5
 */
export declare function circleGetRenderXYZs(circle: gs.ICircle, resolution: number): gs.XYZ[];
/**
 * Calculate the length of the conic curve.
 */
export declare function ellipseLength(curve: gs.IEllipse): number;
/**
 * Calculate the xyz position at parameter t. The t parameter range is from 0 to 1.
 */
export declare function ellipseEvaluate(curve: gs.IEllipse, t: number): gs.XYZ;
/**
 * Calculate a set of xyz position on the ellipse. The number of points = length / resolution.
 */
export declare function ellipseGetRenderXYZs(curve: gs.IEllipse, resolution: number): gs.XYZ[];
/**
 * Calculate a set of xyz positions on the Parabola. The number of points = diff_angles() / resolution.
 */
export declare function parabolaGetRenderXYZs(curve: gs.IParabola, resolution: number): gs.XYZ[];
/**
 * Calculate a set of xyz positions on the Hyperbola. The number of points = diff_angles() / resolution.
 */
export declare function hyperbolaGetRenderXYZs(curve: gs.IHyperbola, resolution: number): gs.XYZ[];
