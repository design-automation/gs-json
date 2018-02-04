import {IObj, IEntAttrib, ITopoAttrib} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {EGeomType} from "./enums";
import {EntAttrib} from "./attrib_entattrib";
import {TopoAttrib} from "./attrib_topoattrib";

/**
 * A function to cast obj class to subclass.
 * @param
 * @return
 */
export function _castToAttribType(_kernel: Kernel, geom_type: EGeomType, name: string): IEntAttrib|ITopoAttrib {
    switch (geom_type) {
        case EGeomType.points: case EGeomType.objs:
            return new EntAttrib(_kernel, name, geom_type);
        default: // topo attribs
            return new TopoAttrib(_kernel, name, geom_type);
    }
}

export function _castToAttribTypes(_kernel: Kernel, geom_type: EGeomType, names: string[]): IEntAttrib[]|ITopoAttrib[] {
    switch (geom_type) {
        case EGeomType.points: case EGeomType.objs:
            return names.map((name) => new EntAttrib(_kernel, name, geom_type));
        default: // topo attribs
            return names.map((name) => new TopoAttrib(_kernel, name, geom_type));
    }
}
