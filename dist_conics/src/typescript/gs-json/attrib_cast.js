"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const attrib_entattrib_1 = require("./attrib_entattrib");
const attrib_topoattrib_1 = require("./attrib_topoattrib");
/**
 * A function to cast obj class to subclass.
 * @param
 * @return
 */
function _castToAttribType(_kernel, geom_type, name) {
    switch (geom_type) {
        case enums_1.EGeomType.points:
        case enums_1.EGeomType.objs:
            return new attrib_entattrib_1.EntAttrib(_kernel, name, geom_type);
        default:// topo attribs
            return new attrib_topoattrib_1.TopoAttrib(_kernel, name, geom_type);
    }
}
exports._castToAttribType = _castToAttribType;
function _castToAttribTypes(_kernel, geom_type, names) {
    switch (geom_type) {
        case enums_1.EGeomType.points:
        case enums_1.EGeomType.objs:
            return names.map((name) => new attrib_entattrib_1.EntAttrib(_kernel, name, geom_type));
        default:// topo attribs
            return names.map((name) => new attrib_topoattrib_1.TopoAttrib(_kernel, name, geom_type));
    }
}
exports._castToAttribTypes = _castToAttribTypes;
//# sourceMappingURL=attrib_cast.js.map