"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topo_1 = require("./topo");
const enums_1 = require("./enums");
const entity_point_1 = require("./entity_point");
/**
 * Vertex class.
 */
class Vertex extends topo_1.Topo {
    /**
     * Get the geometry type: "vertices".
     * This method overrides the method in the Topo class.
     * @return The topo type.
     */
    getGeomType() {
        return enums_1.EGeomType.vertices;
    }
    /**
     * Get a compact string representation of the geometry path for this topological component, dtsrting with
     * the obj ID.
     * @return The geometry path str.
     */
    getTopoPathStr() {
        const w_or_f = ["w", "f"][this._path.tt];
        return "o" + this.getObjID() + ":" + w_or_f + this._path.ti + ":v" + this._path.si;
    }
    /**
     * Get the centroid of this topo. This is used for attaching labels.
     * @return The xyz of the centroid.
     */
    getLabelCentroid() {
        return this.getPoint().getPosition();
    }
    /**
     * Get the point associated with this vertex.
     * @return The point object.
     */
    getPoint() {
        const id = this._kernel.vertexGetPoint(this._path);
        return new entity_point_1.Point(this._kernel, id);
    }
    /**
     * Get the edge for which this is the start vertex.
     * @return The edge object.
     */
    getEdge() {
        const path = this._kernel.vertexGetEdge(this._path);
        return new Edge(this._kernel, path);
    }
    /**
     * Get the wire or face to which this vertex belongs.
     * @return The wire or face object.
     */
    getWireOrFace() {
        const path = this._kernel.vertexGetTopo(this._path);
        if (path.tt === 0) {
            return new Wire(this._kernel, path);
        }
        else {
            return new Face(this._kernel, path);
        }
    }
    /**
     * Find the next vertex in the sequence of vertices in the wire or face.
     * @return The next vertex object.
     */
    next() {
        const path = this._kernel.vertexNext(this._path);
        if (path === null) {
            return null;
        }
        return new Vertex(this._kernel, path);
    }
    /**
     * Find the previous vertex in the sequence of vertices in the wire or face.
     * @return The previous vertex object.
     */
    previous() {
        const path = this._kernel.vertexPrevious(this._path);
        if (path === null) {
            return null;
        }
        return new Vertex(this._kernel, path);
    }
    /**
     * Within the parent object, find all vertices with the same point.
     * Returns an array containing two sub-arrays.
     * 1) The wire vertices, and 2) the face vertices.
     * @return An array containing the two sub-arrays of vertices.
     */
    verticesSharedPoint() {
        const paths = this._kernel.geomFindVerticesSharedPoint(this._path);
        return [
            paths[0].map((path) => new Vertex(this._kernel, path)),
            paths[1].map((path) => new Vertex(this._kernel, path)),
        ];
    }
    /**
     * Within the parent object, find all vertices with the same point position.
     * Returns an array containing two sub-arrays.
     * 1) The wire vertices, and 2) the face vertices.
     * @return An array containing the two sub-arrays of vertices.
     */
    verticesSamePosition() {
        const paths = this._kernel.geomFindVerticesSamePosition(this._path);
        return [
            paths[0].map((path) => new Vertex(this._kernel, path)),
            paths[1].map((path) => new Vertex(this._kernel, path)),
        ];
    }
}
exports.Vertex = Vertex;
/**
 * Edge class.
 */
class Edge extends topo_1.Topo {
    /**
     * Get the geometry type: "edges".
     * This method overrides the method in the Topo class.
     * @return The topo type.
     */
    getGeomType() {
        return enums_1.EGeomType.edges;
    }
    /**
     * Get a compact string representation of the geometry path for this topological component, dtsrting with
     * the obj ID.
     * @return The geometry path str.
     */
    getTopoPathStr() {
        const w_or_f = ["w", "f"][this._path.tt];
        return "o" + this.getObjID() + ":" + w_or_f + this._path.ti + ":e" + this._path.si;
    }
    /**
     * Get the centroid of this topo. This is used for attaching labels.
     * @return The xyz of the centroid.
     */
    getLabelCentroid() {
        const xyzs = this.getVertices().map((v) => v.getPoint().getPosition());
        let centroid = [0, 0, 0];
        for (const xyz of xyzs) {
            centroid[0] += xyz[0];
            centroid[1] += xyz[1];
            centroid[2] += xyz[2];
        }
        return [centroid[0] / 2, centroid[1] / 2, centroid[2] / 2];
    }
    /**
     * Get the two vertices for this edge.
     * @return An array of two edges.
     */
    getVertices() {
        const paths = this._kernel.edgeGetVertices(this._path);
        return paths.map((path) => new Vertex(this._kernel, path));
    }
    /**
     * Get the wire or face to which this edge belongs.
     * @return The wire or face.
     */
    getWireOrFace() {
        const path = this._kernel.edgeGetTopo(this._path);
        if (path.tt === 0) {
            return new Wire(this._kernel, path);
        }
        else {
            return new Face(this._kernel, path);
        }
    }
    /**
     * Find the next edge in the sequence of edges in the wire or face.
     * @return The next edge object.
     */
    next() {
        const path = this._kernel.edgeNext(this._path);
        if (path === null) {
            return null;
        }
        return new Edge(this._kernel, path);
    }
    /**
     * Find the previous edge in the sequence of edges in the wire or face.
     * @return The previous edge object.
     */
    previous() {
        const path = this._kernel.edgePrevious(this._path);
        if (path === null) {
            return null;
        }
        return new Edge(this._kernel, path);
    }
    /**
     * Within the parent object, find all edges with the same two points as this edge.
     * The order of the points is ignored.
     * Returns an array containing two sub-arrays.
     * 1) The wire edges, and 2) the face edges.
     * @return An array containing the two sub-arrays of edges.
     */
    edgesSharedPoints() {
        const paths = this._kernel.geomFindEdgesSharedPoints(this._path);
        return [
            paths[0].map((path) => new Edge(this._kernel, path)),
            paths[1].map((path) => new Edge(this._kernel, path)),
        ];
    }
}
exports.Edge = Edge;
/**
 * Wire class
 */
class Wire extends topo_1.Topo {
    /**
     * Get the geometry type: "wires".
     * This method overrides the method in the Topo class.
     * @return The topo type.
     */
    getGeomType() {
        return enums_1.EGeomType.wires;
    }
    /**
     * Get a compact string representation of the geometry path for this topological component, dtsrting with
     * the obj ID.
     * @return The geometry path str.
     */
    getTopoPathStr() {
        return "o" + this.getObjID() + ":w" + this._path.ti;
    }
    /**
     * Get the centroid of this topo. This is used for attaching labels.
     * @return The xyz of the centroid.
     */
    getLabelCentroid() {
        const xyzs = this.getVertices().map((v) => v.getPoint().getPosition());
        let centroid = [0, 0, 0];
        for (const xyz of xyzs) {
            centroid[0] += xyz[0];
            centroid[1] += xyz[1];
            centroid[2] += xyz[2];
        }
        const num_vertices = xyzs.length;
        return [centroid[0] / num_vertices, centroid[1] / num_vertices, centroid[2] / num_vertices];
    }
    /**
     * Get the vertices for this wire.
     * @return An array of vertices.
     */
    getVertices() {
        const paths = this._kernel.topoGetVertices(this._path);
        return paths.map((path) => new Vertex(this._kernel, path));
    }
    /**
     * Get the edges for this wire.
     * @return An array of edges.
     */
    getEdges() {
        const paths = this._kernel.topoGetEdges(this._path);
        return paths.map((path) => new Edge(this._kernel, path));
    }
    /**
     * Get the number of vertices in this wire.
     * @return The number of vertices.
     */
    numVertices() {
        return this._kernel.topoNumVertices(this._path);
    }
    /**
     * Get the number of edges in this wire.
     * @return The number of edges.
     */
    numEdges() {
        return this._kernel.topoNumEdges(this._path);
    }
    /**
     * Return true if this wire is closed.
     * @return boolean
     */
    isClosed() {
        return this._kernel.topoIsClosed(this._path);
    }
    /**
     * Within the parent object, find all wires that share at least n points.
     * @return An array of wires.
     */
    wiresSharedPoints(num_shared_points) {
        const paths = this._kernel.geomFindTopoSharedPoints(this._path);
        return paths.map((path) => new Wire(this._kernel, path));
    }
}
exports.Wire = Wire;
/**
 * Face class
 */
class Face extends topo_1.Topo {
    /**
     * Get the geometry type: "faces".
     * This method overrides the method in the Topo class.
     * @return The topo type.
     */
    getGeomType() {
        return enums_1.EGeomType.faces;
    }
    /**
     * Get a compact string representation of the geometry path for this topological component, dtsrting with
     * the obj ID.
     * @return The geometry path str.
     */
    getTopoPathStr() {
        return "o" + this.getObjID() + ":f" + this._path.ti;
    }
    /**
     * Get the centroid of this topo. This is used for attaching labels.
     * @return The xyz of the centroid.
     */
    getLabelCentroid() {
        const xyzs = this.getVertices().map((v) => v.getPoint().getPosition());
        let centroid = [0, 0, 0];
        for (const xyz of xyzs) {
            centroid[0] += xyz[0];
            centroid[1] += xyz[1];
            centroid[2] += xyz[2];
        }
        const num_vertices = xyzs.length;
        return [centroid[0] / num_vertices, centroid[1] / num_vertices, centroid[2] / num_vertices];
    }
    /**
     * Get the vertices for this wire.
     * @return An array of vertices.
     */
    getVertices() {
        const paths = this._kernel.topoGetVertices(this._path);
        return paths.map((path) => new Vertex(this._kernel, path));
    }
    /**
     * Get the edges for this wire.
     * @return An array of edges.
     */
    getEdges() {
        const paths = this._kernel.topoGetEdges(this._path);
        return paths.map((path) => new Edge(this._kernel, path));
    }
    /**
     * Get the number of vertices in this face.
     * This is the same as numEdges().
     * @return The number of vertices.
     */
    numVertices() {
        return this._kernel.topoNumVertices(this._path);
    }
    /**
     * Get the number of edged in this face.
     * This is the same as numVertices().
     * @return The number of edges.
     */
    numEdges() {
        return this._kernel.topoNumEdges(this._path);
    }
    /**
     * Return true, since a face is always closed.
     * @return boolean
     */
    isClosed() {
        return true;
    }
    /**
     * Within the parent object, find all faces that share at least n points.
     * @return An array of faces.
     */
    facesSharedPoints(num_shared_points) {
        const paths = this._kernel.geomFindTopoSharedPoints(this._path);
        return paths.map((path) => new Face(this._kernel, path));
    }
}
exports.Face = Face;
//# sourceMappingURL=topo_sub.js.map