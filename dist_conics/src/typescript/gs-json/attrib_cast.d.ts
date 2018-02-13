import { IEntAttrib, ITopoAttrib } from "./ifaces_gs";
import { Kernel } from "./kernel";
import { EGeomType } from "./enums";
/**
 * A function to cast obj class to subclass.
 * @param
 * @return
 */
export declare function _castToAttribType(_kernel: Kernel, geom_type: EGeomType, name: string): IEntAttrib | ITopoAttrib;
export declare function _castToAttribTypes(_kernel: Kernel, geom_type: EGeomType, names: string[]): IEntAttrib[] | ITopoAttrib[];
