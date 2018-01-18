import * as gs from "./_export";
import * as fs from "fs";
import * as three from "three";
import * as threeg from "./three_geom";
import * as threes from "./three_scene";

/**
 * Add mesh to scene.
 */
function add(scene: gs.IThreeScene,
        three_type: string, description: string, data: threeg.IThreeData, material: gs.IThreeMaterial): void {
    const mesh_geom: gs.IThreeBufferedGeom = threes.genGeom(data.xyzs_flat, data.indexes);
    threes.addGeomToScene(scene, mesh_geom);
    threes.addObjToScene(scene, threes.genObj(three_type, description, mesh_geom, material));
}

/**
 * Add all polymeshes to the scene and generate one big threejs mesh out of it.
 */
function createFaces(scene: gs.IThreeScene, polymeshes: gs.IPolymesh[], material: gs.IThreeMaterial):
        Map<number, gs.ITopoPathData> {
    const data: threeg.IThreeData = threeg.getDataFromAllFaces(polymeshes);
    if (data !== null) {
        add(scene, "Mesh", "All faces", data, material);
        return data.reverse_map as Map<number, gs.ITopoPathData>;
    }
    return null;
}

/**
 * Add all polymeshes edges to the scene and create one big edge soup out of it.
 */
function createEdges(scene: gs.IThreeScene, polymeshes: gs.IPolymesh[], material: gs.IThreeMaterial):
        Map<number, gs.ITopoPathData> {
    const data: threeg.IThreeData = threeg.getDataFromAllEdges(polymeshes);
    if (data !== null) {
        add(scene, "LineSegments", "All edges", data, material);
        return data.reverse_map as Map<number, gs.ITopoPathData>;
    }
    return null;
}

/**
 * Add all polymeshes edges to the scene and create one big wire soup out of it.
 */
function createWires(scene: gs.IThreeScene, objects: gs.IObj[], material: gs.IThreeMaterial):
        Map<number, gs.ITopoPathData> {
    const data: threeg.IThreeData = threeg.getDataFromAllWires(objects);
    if (data !== null) {
        add(scene, "LineSegments", "All wires", data, material);
        return data.reverse_map as Map<number, gs.ITopoPathData>;
    }
    return null;
}

/**
 * Add all points to the scene and create one big point soup out of it.
 */
function createPoints(scene: gs.IThreeScene, points: gs.IPoint[], material: gs.IThreeMaterial): void {
    //  create xyzs gs.Array
    const xyzs: gs.XYZ[] = points.map((point) => point.getPosition());
    const xyzs_flat: number[] = gs.Arr.flatten(xyzs);
    const points_geom: gs.IThreeBufferedGeom = threes.genGeom(xyzs_flat);
    //add(scene, "Points", "All points", data, material);
    threes.addGeomToScene(scene, points_geom);
    threes.addObjToScene(scene, threes.genObj("Points", "All points", points_geom, material));
}

/**
 * Generate the model.
 */
export function genThreeOptModel(model: gs.IModel): gs.IThreeScene {
    if (model.constructor.name !== "Model") {throw new Error("Invalid model.");}
    const scene: gs.IThreeScene = threes.genScene();
    const mats: gs.IThreeMaterial[] = threes.genDefaultMaterials();
    threes.addMatsToScene(scene, mats);
    // TODO add the points only once using threejs interleaved buffer

    // add the objects
    const pmeshes: gs.IPolymesh[] = model.getGeom().getAllObjs()
        .filter((o) => o.getObjType() === gs.EObjType.polymesh);
    const faces_map: Map<number, gs.ITopoPathData> = createFaces(scene, pmeshes, mats[2]);
    const edges_map: Map<number, gs.ITopoPathData> = createEdges(scene, pmeshes, mats[0]);
    const wires_map: Map<number, gs.ITopoPathData> = createWires(scene, model.getGeom().getAllObjs(), mats[1]);
    createPoints(scene, model.getGeom().getAllPoints(), mats[4]);
    // return the final scene
    //console.log(faces_map);
    //console.log(edges_map);
    //console.log(wires_map);
    return scene;
}

/**
 * Generate the model.
 */
export function genThreeOptModelAndMaps(model: gs.IModel):
        {scene: gs.IThreeScene, faces_map: Map<number, gs.ITopoPathData>,
            wires_map: Map<number, gs.ITopoPathData>, edges_map: Map<number, gs.ITopoPathData>} {
    if (model.constructor.name !== "Model") {throw new Error("Invalid model.");}
    const scene: gs.IThreeScene = threes.genScene();
    const mats: gs.IThreeMaterial[] = threes.genDefaultMaterials();
    threes.addMatsToScene(scene, mats);
    // TODO add the points only once using threejs interleaved buffer

    // add the objects
    const pmeshes: gs.IPolymesh[] = model.getGeom().getAllObjs()
        .filter((o) => o.getObjType() === gs.EObjType.polymesh);
    const faces_map: Map<number, gs.ITopoPathData> = createFaces(scene, pmeshes, mats[2]);
    const edges_map: Map<number, gs.ITopoPathData> = createEdges(scene, pmeshes, mats[0]);
    const wires_map: Map<number, gs.ITopoPathData> = createWires(scene, model.getGeom().getAllObjs(), mats[1]);
    createPoints(scene, model.getGeom().getAllPoints(), mats[4]);
    return {scene, faces_map, wires_map, edges_map};
}
