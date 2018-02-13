"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_obj_1 = require("./entity_obj");
const topo_sub_1 = require("./topo_sub");
/**
 * Class Polyline.
 * A polyline consists of one wire and no faces.
 * The wire has a sequence of vertices.
 * The wire may be open or closed.
 * A polyline may be part of a group and may have attributes.
 */
class Polyline extends entity_obj_1.Obj {
    /**
     * Get the object type: "polyline".
     * @return Polyline object type.
     */
    getObjType() {
        return 100 /* polyline */;
    }
    /**
     * Checks if the polyline is closed.
     * @return Return true if the polyline is closed.
     */
    isClosed() {
        return this.getWires()[0].isClosed();
    }
    /**
     * Sets if the polyline is closed.
     * @param is_closed Ture if closed, false if open.
     * @return Return the old value for is_closed.
     */
    setIsClosed(is_closed) {
        const path = this.getWires()[0].getTopoPath();
        return this._kernel.topoSetIsClosed(path, is_closed);
    }
    /**
     * Returns the number of vertices in this polyline.
     * @return Return the number of vertices.
     */
    numVertices() {
        return this.getWires()[0].numVertices();
    }
    /**
     * Returns the number of edges in this polyline.
     * @return Return the number of edges.
     */
    numEdges() {
        return this.getWires()[0].numEdges();
    }
    /**
     * Insert an extra vertex.
     * @return The new vertex.
     */
    insertVertex(edge, point) {
        if (edge.getObjID() !== this._id) {
            throw new Error("Edge must belong to polyline.");
        }
        const path = edge.getTopoPath();
        this._kernel.edgeSplit(path, point.getID());
        const new_edge_path = this._kernel.edgeSplit(path, point.getID());
        return new topo_sub_1.Vertex(this._kernel, new_edge_path);
    }
    /**
     * Add n extra vertex to the start or end.
     * @return The new vertex.
     */
    addVertex(point, to_start) {
        const path = this.getWires()[0].getTopoPath();
        this._kernel.topoAddVertex(path, point.getID(), to_start);
        const new_vertex_path = this._kernel.edgeSplit(path, point.getID());
        return new topo_sub_1.Vertex(this._kernel, new_vertex_path);
    }
    /**
     * Delete a vertex.
     * @return The next vertex that replaces it, or null if it was teh last vertex of an open polyline.
     */
    delVertex(vertex) {
        throw new Error("Method not implemented.");
    }
}
exports.Polyline = Polyline;
//# sourceMappingURL=entity_obj_polyline.js.map