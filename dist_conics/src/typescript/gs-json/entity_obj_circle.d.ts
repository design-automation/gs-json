import { XYZ, ICircle, IPoint } from "./ifaces_gs";
import { EObjType } from "./enums";
import { Obj } from "./entity_obj";
/**
 * Class ConicCurve.
 */
export declare class Circle extends Obj implements ICircle {
    /**
     * Get the object type: "circle".
     * @return ConicCurve object type.
     */
    getObjType(): EObjType;
    /**
     * Get the origin of the ellipse.
     * @return Plane object type.
     */
    getOrigin(): IPoint;
    /**
     * Returns the x and y vectors of this curve. The length of the x vector defines the radius of the circle.
     * @return The x and y vectors.
     */
    getAxes(): [XYZ, XYZ, XYZ];
    /**
     * Returns the x and y vectors of this curve. The length of the x vector defines the radius of the circle.
     * @return The x and y vectors.
     */
    getNormal(): XYZ;
    /**
     * Sets the x and y vectors of this curve. The length of the x vector defines the radius of the circle.
     * @param x_vec Vector, the x axis
     * @param vec vector, in the plane
     */
    setOrientation(x_vec: XYZ, vec: XYZ): void;
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
     * Returns the radius of this circle (the length of the x vector).
     * @return Tthe radius.
     */
    getRadius(): number;
    /**
     * Set the radius of this circle (the length of the x vector).
     * @return The old radius.
     */
    setRadius(radius: number): number;
    /**
     * Checks if the circle is closed.
     * @return True if the polyline is closed.
     */
    isClosed(): boolean;
    /**
     * Get the length of the circle or arc.
     * @return The length.
     */
    length(): number;
    /**
     * Get the length of the circle or arc.
     * @return The length.
     */
    evalParam(t: number): IPoint;
    /**
     * Get a set of equidistant points along the circle or arc.
     * @return An array of points.
     */
    equiPoints(num_points: number): IPoint[];
}
