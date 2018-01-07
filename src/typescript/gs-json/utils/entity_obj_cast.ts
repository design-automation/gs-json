import {IObj, IRay, IPlane, IConicCurve, IPolyline, IPolymesh, INurbsCurve} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {EObjType} from "./enums";
import {Point} from "./entity_point";
import {Polyline} from "./entity_obj_polyline";
import {ConicCurve} from "./entity_obj_coniccurve";
import {NurbsCurve} from "./entity_obj_nurbscurve";
import {Polymesh} from "./entity_obj_polymesh";
import {Plane} from "./entity_obj_plane";
import {Ray} from "./entity_obj_ray";

/**
 * A function to cast obj class to subclass.
 * @param
 * @return
 */
export function _castToObjType(_kernel: Kernel, id: number): IRay|IPlane|IPolyline|IPolymesh|IConicCurve {
    const obj_type = _kernel.objGetType(id);
    switch (obj_type) {
        case EObjType.ray:
            return new Ray(_kernel, id);
        case EObjType.plane:
            return new Plane(_kernel, id);
        case EObjType.polyline:
            return new Polyline(_kernel, id);
        case EObjType.polymesh:
            return new Polymesh(_kernel, id);
        case EObjType.conic_curve:
            return new ConicCurve(_kernel, id);
        default:
            throw new Error("Object type does not exist.");
        // TODO add more here
    }
}
