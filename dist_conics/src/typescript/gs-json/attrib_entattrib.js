"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const attrib_1 = require("./attrib");
const entity_point_1 = require("./entity_point");
const entity_obj_cast_1 = require("./entity_obj_cast");
/**
 * EntAttrib class for entities (points and objects).
 * An class that represents a semantic attribute that is attached to a point or object.
 * An instance of this class stores a list of attributes values.
 */
class EntAttrib extends attrib_1.Attrib {
    /**
     * Get all IDs for this attribute. These can be either point IDs or object IDs.
     * @return An array of IDs.
     */
    getIDs() {
        return this._kernel.entAttribGetIDs(this._name, this._geom_type);
    }
    /**
     * Get all entities for this attribute. These can be either points or objects.
     * @return An array of IDs.
     */
    getEnts() {
        const ids = this._kernel.entAttribGetIDs(this._name, this._geom_type);
        switch (this._geom_type) {
            case enums_1.EGeomType.points:
                return ids.map((id) => new entity_point_1.Point(this._kernel, id));
            case enums_1.EGeomType.points:
                return ids.map((id) => entity_obj_cast_1._castToObjType(this._kernel, id));
        }
    }
    /**
     * Get all labels for this attribute.
     * @return An array of labels.
     */
    getLabels() {
        const ids = this._kernel.entAttribGetIDs(this._name, this._geom_type);
        switch (this._geom_type) {
            case enums_1.EGeomType.points:
                return ids.map((v) => "p" + v);
            case enums_1.EGeomType.objs:
                return ids.map((v) => "o" + v);
        }
    }
}
exports.EntAttrib = EntAttrib;
//# sourceMappingURL=attrib_entattrib.js.map