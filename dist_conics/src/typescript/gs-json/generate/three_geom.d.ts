import * as gs from "../_export";
export interface IThreeData {
    xyzs_flat: number[];
    indexes: number[];
    reverse_map: Map<string | number, gs.ITopoPathData | number>;
}
/**
 * Get the points for the obj
 */
export declare function getPointsFromObjs(objs: gs.IObj[]): {
    xyzs: gs.XYZ[];
    id_map: Map<number, number>;
};
/**
 * Get mesh data from multiple objs.
 */
export declare function getDataFromAllFaces(objs: gs.IObj[]): IThreeData;
/**
 * Get line segments data from wires.
 */
export declare function getDataFromAllWires(objs: gs.IObj[]): IThreeData;
/**
 * Get line segment data from edges.
 */
export declare function getDataFromAllEdges(objs: gs.IObj[]): IThreeData;
/**
 * Get vertex data.
 */
export declare function getDataFromAllVertices(objs: gs.IObj[]): IThreeData;
/**
 * Get vertex data.
 */
export declare function getDataAllOtherLines(objs: gs.IObj[]): IThreeData;
/**
 * Get point data.
 */
export declare function getDataFromAllPoints(points: gs.IPoint[]): IThreeData;
