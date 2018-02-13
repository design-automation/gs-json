"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_obj_1 = require("./entity_obj");
/**
 * Class Polymesh.
 * A polymesh is defined by a set of polygonal faces.
 * These faces may have arbitrary number of vertices,
 * may be concave or convex, and may be planar or non-planar.
 * All faces are expected to be connected to one anoter, so that there are no disjoint parts.
 * The polymesh will have closed wires along all its naked edges.
 * The polymesh may include one or more holes.
 * The holes will result in additional naked edges, each with their own wire.
 * A polymesh may be part of a group and may have attributes.
 */
class Polymesh extends entity_obj_1.Obj {
    /**
     * Get the object type: "polymesh".
     * @return The polymesh object type.
     */
    getObjType() {
        return 200 /* polymesh */;
    }
    /**
     * Checks if the polymesh is closed.
     * @return Return true if the polymesh is closed.
     */
    isClosed() {
        return this.numWires() === 0;
    }
}
exports.Polymesh = Polymesh;
//# sourceMappingURL=entity_obj_polymesh.js.map