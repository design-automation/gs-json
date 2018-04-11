"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_obj_polyline_1 = require("./entity_obj_polyline");
const entity_obj_circle_1 = require("./entity_obj_circle");
const entity_obj_ellipse_1 = require("./entity_obj_ellipse");
const entity_obj_polymesh_1 = require("./entity_obj_polymesh");
const entity_obj_plane_1 = require("./entity_obj_plane");
const entity_obj_ray_1 = require("./entity_obj_ray");
const entity_obj_rayTwo_1 = require("./entity_obj_rayTwo");
const entity_obj_parabola_1 = require("./entity_obj_parabola");
const entity_obj_hyperbola_1 = require("./entity_obj_hyperbola");
/**
 * A function to cast obj class to subclass.
 * @param
 * @return
 */
function _castToObjType(_kernel, id) {
    const obj_type = _kernel.objGetType(id);
    switch (obj_type) {
        case 1 /* ray */:
            return new entity_obj_ray_1.Ray(_kernel, id);
        case 2 /* plane */:
            return new entity_obj_plane_1.Plane(_kernel, id);
        case 3 /* circle */:
            return new entity_obj_circle_1.Circle(_kernel, id);
        case 4 /* ellipse */:
            return new entity_obj_ellipse_1.Ellipse(_kernel, id);
        case 100 /* polyline */:
            return new entity_obj_polyline_1.Polyline(_kernel, id);
        case 200 /* polymesh */:
            return new entity_obj_polymesh_1.Polymesh(_kernel, id);
        case 11 /* rayTwo */:
            return new entity_obj_rayTwo_1.RayTwo(_kernel, id);
        case 5 /* parabola */:
            return new entity_obj_parabola_1.Parabola(_kernel, id);
        case 6 /* hyperbola */:
            return new entity_obj_hyperbola_1.Hyperbola(_kernel, id);
        default:
            throw new Error("Object type does not exist.");
        // TODO add more here
    }
}
exports._castToObjType = _castToObjType;
//# sourceMappingURL=entity_obj_cast.js.map