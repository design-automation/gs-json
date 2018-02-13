import { IRay, IPlane, ICircle, IEllipse, IPolyline, IPolymesh, IParabola, IHyperbola } from "./ifaces_gs";
import { Kernel } from "./kernel";
/**
 * A function to cast obj class to subclass.
 * @param
 * @return
 */
export declare function _castToObjType(_kernel: Kernel, id: number): IRay | IPlane | ICircle | IEllipse | IPolyline | IPolymesh | IRay | IParabola | IHyperbola;
