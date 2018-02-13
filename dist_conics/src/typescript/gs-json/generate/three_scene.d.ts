import { XYZ } from "../_export";
import * as threei from "../ifaces_three";
/**
 * Generate default materials.
 */
export declare function genDefaultMaterials(): threei.IThreeMaterial[];
/**
 * Generate the scene.
 */
export declare function genScene(): threei.IThreeScene;
/**
 * Generate geometry entity from data.
 */
export declare function genGeom(xyzs: number[], indexes?: number[], normals?: number[]): threei.IThreeBufferedGeom;
/**
 * Generate a group entity. This has nothing to do with gs-json groups.
 */
export declare function genGroup(name: string): threei.IThreeObj;
/**
 * Generate an obj entity.
 */
export declare function genObj(type: string, name: string, geom: threei.IThreeBufferedGeom, mat: threei.IThreeMaterial): threei.IThreeObj;
/**
 * Add a obj entity to the group.
 */
export declare function addObjToGroup(group: threei.IThreeObj, obj: threei.IThreeObj): void;
/**
 * Add an obj entity to the scene.
 */
export declare function addObjToScene(scene: threei.IThreeScene, obj: threei.IThreeObj): void;
/**
 * Add a group entity to the scene.
 */
export declare function addGroupToScene(scene: threei.IThreeScene, group: threei.IThreeObj): void;
/**
 * Add some materials to the scene.
 */
export declare function addMatsToScene(scene: threei.IThreeScene, mats: threei.IThreeMaterial[]): void;
/**
 * Add a geom entity to the the scene.
 */
export declare function addGeomToScene(scene: threei.IThreeScene, geom: threei.IThreeBufferedGeom): void;
/**
 * Add a sprite to the scene.
 */
export declare function addSpriteToScene(scene: threei.IThreeScene, group: threei.IThreeObj, name: string, labels_xyzs: {
    label: string;
    xyz: XYZ;
}[]): threei.IThreeObj;
/**
 * Generate a bunch of sprites, from labels and label centroids.
 */
export declare function genSprites(name: string, labels_xyzs: {
    label: string;
    xyz: XYZ;
}[]): threei.IThreeObj;
