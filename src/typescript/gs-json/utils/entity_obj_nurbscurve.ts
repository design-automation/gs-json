import {INurbsCurve} from "./ifaces_gs";
import {EObjType} from "./enums";
import {Obj} from "./entity_obj";

/**
 * Class NurbsCurve.
 * A Nurbs Curve consists of one wire and no faces.
 * The wire has a sequence of vertices, which ae the cruve control points.
 * The wire may be open or closed.
 * A NurbsCurve may be part of a group and may have attributes.
 */
export class NurbsCurve  extends Obj implements INurbsCurve {
    /**
     * Get the object type: "polyline".
     * @return Polyline object type.
     */
    public getObjType(): EObjType {
        return EObjType.nurbs_curve;
    }

    /**
     * Checks if the curve is closed.
     * @return Return true if the curve is closed.
     */
    public isClosed(): boolean {
        return this.getWires()[0].isClosed();
    }
}
