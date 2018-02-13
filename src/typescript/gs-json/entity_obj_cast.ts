import {IObj, IRay, IPlane, ICircle, IEllipse, IPolyline, IPolymesh, IRayTwo, IParabola, IHyperbola} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {EObjType} from "./enums";
import {Point} from "./entity_point";
import {Polyline} from "./entity_obj_polyline";
import {Circle} from "./entity_obj_circle";
import {Ellipse} from "./entity_obj_ellipse";
import {Polymesh} from "./entity_obj_polymesh";
import {Plane} from "./entity_obj_plane";
import {Ray} from "./entity_obj_ray";
import {RayTwo} from "./entity_obj_rayTwo";
import {Parabola} from "./entity_obj_parabola";
import {Hyperbola} from "./entity_obj_hyperbola";

/**
 * A function to cast obj class to subclass.
 * @param
 * @return
 */
export function _castToObjType(_kernel: Kernel, id: number):
                 IRay|IPlane|ICircle|IEllipse|IPolyline|IPolymesh|IRay|IParabola|IHyperbola {
    const obj_type = _kernel.objGetType(id);
    switch (obj_type) {
        case EObjType.ray:
            return new Ray(_kernel, id);
        case EObjType.plane:
            return new Plane(_kernel, id);
        case EObjType.circle:
            return new Circle(_kernel, id);
        case EObjType.ellipse:
            return new Ellipse(_kernel, id);
        case EObjType.polyline:
            return new Polyline(_kernel, id);
        case EObjType.polymesh:
            return new Polymesh(_kernel, id);
        case EObjType.rayTwo:
            return new RayTwo(_kernel,id);
        case EObjType.parabola:
            return new Parabola(_kernel,id);
        case EObjType.hyperbola:
            return new Hyperbola(_kernel,id);
        default:
            throw new Error("Object type does not exist.");
        // TODO add more here
    }
}
