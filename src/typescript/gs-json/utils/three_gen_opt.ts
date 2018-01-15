import * as gs from "./_export";
import * as fs from "fs";
import * as three from "three";
import * as threeg from "./three_geom";
import * as threes from "./three_scene";

/**
 * Add all polymeshes to the scene and generate one big threejs mesh out of it.
 */
function createMesh(scene: gs.IThreeScene, polymeshes: gs.IPolymesh[], material: gs.IThreeMaterial): void {
    const data:{ xyzs_flat: number[], indexes: number[]} = threeg.getMeshFromAllMeshes(polymeshes);
    const mesh_geom: gs.IThreeBufferedGeom = threes.genGeom(data.xyzs_flat, data.indexes);
    threes.addGeomToScene(scene, mesh_geom);
    threes.addObjToScene(scene, threes.genObj("Mesh", "All Faces", mesh_geom, material));
}

/**
 * Add all polymeshes edges to the scene and create one pig edge soup out of it.
 */
function createEdges(scene: gs.IThreeScene, polymeshes: gs.IPolymesh[], material: gs.IThreeMaterial): void {
    const edge_geom: gs.IThreeBufferedGeom = threes.genGeom(threeg.getLineSegmentsFromAllEdges(polymeshes));
    threes.addGeomToScene(scene, edge_geom);
    threes.addObjToScene(scene, threes.genObj("LineSegments", "All Edges", edge_geom, material));
}

/**
 * Add all polymeshes edges to the scene and create one pig edge soup out of it.
 */
function createWires(scene: gs.IThreeScene, objects: gs.IObj[], material: gs.IThreeMaterial): void {
    const edge_geom: gs.IThreeBufferedGeom = threes.genGeom(threeg.getLineSegmentsFromAllWires(objects));
    threes.addGeomToScene(scene, edge_geom);
    threes.addObjToScene(scene, threes.genObj("LineSegments", "All Wires", edge_geom, material));
}

/**
 * Generate the model.
 */
export function genThreeOptModel(model: gs.IModel): gs.IThreeScene {
    if (model.constructor.name !== "Model") {throw new Error("Invalid model.");}
    const scene: gs.IThreeScene = threes.genScene();
    const mats: gs.IThreeMaterial[] = threes.genDefaultMaterials();
    threes.addMatsToScene(scene, mats);
    const pmeshes: gs.IPolymesh[] = model.getGeom().getAllObjs()
        .filter((o) => o.getObjType() === gs.EObjType.polymesh);
    createMesh(scene, pmeshes, mats[2]);
    createEdges(scene, pmeshes, mats[0]);
    createWires(scene, model.getGeom().getAllObjs(), mats[1]);
    return scene;
}
