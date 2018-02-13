import { XYZ, IEllipse, IPoint } from "./ifaces_gs";
import { EObjType } from "./enums";
import { Obj } from "./entity_obj";
/**
 * Class ConicCurve.
 */
export declare class Ellipse extends Obj implements IEllipse {
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
     * Returns the x and y radii of this curve.
     * @return The x and y radii.
     */
    getRadii(): [number, number];
    /**
     * Checks if the ellipse is closed.
     * @return True if the polyline is closed.
     */
    isClosed(): boolean;
    /**
     * Get a set of equidistant points along the ellipse or arc.
     * @return An array of points.
     */
    equiPoints(num_points: number): IPoint[];
}
