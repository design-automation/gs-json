"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const attrib_1 = require("./attrib");
const topo_sub_1 = require("./topo_sub");
/**
 * TopoAttrib class for topos (vertices, edges, wires, and faces).
 * Semantic attributes that are attached to points or objects.
 * An instance of this class stores a list of attributes values.
 */
class TopoAttrib extends attrib_1.Attrib {
    /**
     * Get all paths for this attribute.
     * @return An array of paths.
     */
    getPaths() {
        return this._kernel.topoAttribGetPaths(this._name, this._geom_type);
    }
    /**
     * Get all topos for this attribute.
     * @return An array of paths.
     */
    getTopos() {
        const paths = this._kernel.topoAttribGetPaths(this._name, this._geom_type);
        switch (this._geom_type) {
            case enums_1.EGeomType.vertices:
                return paths.map((path) => new topo_sub_1.Vertex(this._kernel, path));
            case enums_1.EGeomType.edges:
                return paths.map((path) => new topo_sub_1.Edge(this._kernel, path));
            case enums_1.EGeomType.wires:
                return paths.map((path) => new topo_sub_1.Wire(this._kernel, path));
            case enums_1.EGeomType.faces:
                return paths.map((path) => new topo_sub_1.Face(this._kernel, path));
        }
    }
    /**
     * Get all labels for this attribute.
     * @return An array of labels.
     */
    getLabels() {
        switch (this._geom_type) {
            case enums_1.EGeomType.vertices:
                return this.getPaths().map((path) => "o" + path.id + ":" + ["w", "f"][path.tt] + path.ti + ":v" + path.si);
            case enums_1.EGeomType.edges:
                return this.getPaths().map((path) => "o" + path.id + ":" + ["w", "f"][path.tt] + path.ti + ":e" + path.si);
            case enums_1.EGeomType.wires:
                return this.getPaths().map((path) => "o" + path.id + ":w" + path.ti);
            case enums_1.EGeomType.faces:
                return this.getPaths().map((path) => "o" + path.id + ":f" + path.ti);
        }
    }
}
exports.TopoAttrib = TopoAttrib;
//# sourceMappingURL=attrib_topoattrib.js.map