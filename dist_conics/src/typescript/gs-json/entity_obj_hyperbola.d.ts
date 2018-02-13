import { XYZ, IHyperbola, IPoint } from "./ifaces_gs";
import { EObjType } from "./enums";
import { Obj } from "./entity_obj";
/**
 * Class ConicCurve.
 */
export declare class Hyperbola extends Obj implements IHyperbola {
    /**
     * Get the object type: "hyperbola".
     * @return ConicCurve object type.
     */
    getObjType(): EObjType;
    /**
     * Get the origin of the hyperbola.
     * @return Plane object type.
     */
    getOrigin(): IPoint;
    /**
     * Returns the x and y vectors of this curve.
     * @return The x and y vectors.
     */
    getAxes(): [XYZ, XYZ, XYZ];
    /**
     * Returns the x and y vectors of this curve. The length of the x vector
     * defines the a,b parameters of the hyperbola.
     * @return The x and y vectors.
     */
    getVectors(): XYZ[];
    /**
     * Sets the x and y vectors of this curve. The length of the x,y vectors
     * defines the a,b parameters of the hyperbola.
     * @return The x and y vectors.
     */
    setVectors(x_vec: XYZ, y_vec: XYZ): void;
    /**
     * Returns the Alpha and Beta angles of this curve.
     * @return The Alpha and Beta angles.
     */
    getAngles(): [number, number];
    /**
     * Returns the Alpha and Beta angles of this curve.
     * @return The Alpha and Beta angles.
     */
    setAngles(angles: [number, number]): void;
    /**
     * Returns the radii of this curve (the lengths of the x,y vectors).
     * @return The radii.
     */
    getRadii(): [number, number];
    /**
     * Get the length of the circle or arc.
     * @return The length.
     */
    length(): number;
    /**
     * Get a point located at t% of the hyperbola length.
     * @return A Point.
     */
    evalParam(t: number): IPoint;
    /**
     * Get a set of equidistant points along the arc of hyperbola.
     * @return An array of points.
     */
    equiPoints(num_points: number): IPoint[];
}
