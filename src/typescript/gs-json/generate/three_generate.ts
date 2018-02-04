import * as three from "three";
import * as gs from "../_export";
import * as threeg from "./three_geom";
import * as threes from "./three_scene";

/**
 * Add stuff to scene.
 */
function add(scene: gs.IThreeScene,
        three_type: string, description: string, data: threeg.IThreeData, material: gs.IThreeMaterial): void {
    const buff_geom: gs.IThreeBufferedGeom = threes.genGeom(data.xyzs_flat, data.indexes);
    threes.addGeomToScene(scene, buff_geom);
    threes.addObjToScene(scene, threes.genObj(three_type, description, buff_geom, material));
}

/**
 * Add all objects faces to the scene and generate one big threejs mesh out of it.
 */
function createFaces(scene: gs.IThreeScene, objects: gs.IObj[], material: gs.IThreeMaterial):
        Map<number, gs.ITopoPathData> {
    const data: threeg.IThreeData = threeg.getDataFromAllFaces(objects);
    if (data !== null) {
        add(scene, "Mesh", "All faces", data, material);
        return data.reverse_map as Map<number, gs.ITopoPathData>;
    }
    return null;
}

/**
 * Add all objects edges to the scene and create one big line segment soup out of it.
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
 * Add all objects edges to the scene and create one big line segment soup out of it.
 */
function createEdges(scene: gs.IThreeScene, objects: gs.IObj[], material: gs.IThreeMaterial):
        Map<number, gs.ITopoPathData> {
    const data: threeg.IThreeData = threeg.getDataFromAllEdges(objects);
    if (data !== null) {
        add(scene, "LineSegments", "All edges", data, material);
        return data.reverse_map as Map<number, gs.ITopoPathData>;
    }
    return null;
}

/**
 * Add all objects vertices to the scene and create one big vertex soup out of it.
 */
function createVertices(scene: gs.IThreeScene, objects: gs.IObj[], material: gs.IThreeMaterial):
        Map<number, gs.ITopoPathData> {
    const data: threeg.IThreeData = threeg.getDataFromAllVertices(objects);
    if (data !== null) {
        add(scene, "Points", "All vertices", data, material);
        return data.reverse_map as Map<number, gs.ITopoPathData>;
    }
    return null;
}

/**
 * Add all other lines to the scene and create one big line segment soup out of it.
 */
function createOtherLines(scene: gs.IThreeScene, objects: gs.IObj[], material: gs.IThreeMaterial): void {
    const data: threeg.IThreeData = threeg.getDataAllOtherLines(objects);
    if (data !== null) {
        add(scene, "LineSegments", "Other lines", data, material);
    }
}

/**
 * Add all points to the scene and create one big point soup out of it.
 */
function createPoints(scene: gs.IThreeScene, points: gs.IPoint[], material: gs.IThreeMaterial):
        Map<number, number> {
    //  create xyzs gs.Array
    const data: threeg.IThreeData = threeg.getDataFromAllPoints(points);
    if (data !== null) {
        add(scene, "Points", "All points", data, material);
        return data.reverse_map as Map<number, number>;
    }
    return null;
}

/**
 * Generate the model.
 */
export function genThreeOptModel(model: gs.IModel): gs.IThreeScene {
    // check that this is model, this is required for Mobius
    if (model.constructor.name !== "Model") {throw new Error("Invalid model.");}

    // create scene
    const scene: gs.IThreeScene = threes.genScene();
    const mats: gs.IThreeMaterial[] = threes.genDefaultMaterials();
    threes.addMatsToScene(scene, mats);

    // TODO add the points only once using threejs interleaved buffer

    // add the objects
    const objs: gs.IObj[] = model.getGeom().getAllObjs();
    const faces_map: Map<number, gs.ITopoPathData> = createFaces(scene, objs, mats[2]);
    const wires_map: Map<number, gs.ITopoPathData> = createWires(scene, objs, mats[1]);
    const edges_map: Map<number, gs.ITopoPathData> = createEdges(scene, objs, mats[0]);
    const vertices_map: Map<number, gs.ITopoPathData> = createVertices(scene, objs, mats[4]);

    // add points
    const all_points: gs.IPoint[] = model.getGeom().getAllPoints();
    const points_map: Map<number, number> = createPoints(scene, all_points, mats[4]);

    // other
    createOtherLines(scene, objs, mats[0]);

    // return the scene with object and points
    return scene;
}

/**
 * Generate the model together with some maps.
 */
export function genThreeOptModelAndMaps(model: gs.IModel): {scene: gs.IThreeScene,
                                                            faces_map: Map<number, gs.ITopoPathData>,
                                                            wires_map: Map<number, gs.ITopoPathData>,
                                                            edges_map: Map<number, gs.ITopoPathData>,
                                                            vertices_map: Map<number, gs.ITopoPathData>,
                                                            points_map: Map<number, number>} {

    if (model.constructor.name !== "Model") {throw new Error("Invalid model.");}
    const scene: gs.IThreeScene = threes.genScene();
    const mats: gs.IThreeMaterial[] = threes.genDefaultMaterials();
    threes.addMatsToScene(scene, mats);

    // TODO add the points only once using threejs interleaved buffer

    // add the objects
    const objs: gs.IObj[] = model.getGeom().getAllObjs();
    const faces_map: Map<number, gs.ITopoPathData> = createFaces(scene, objs, mats[2]);
    const wires_map: Map<number, gs.ITopoPathData> = createWires(scene, objs, mats[1]);
    const edges_map: Map<number, gs.ITopoPathData> = createEdges(scene, objs, mats[0]);
    const vertices_map: Map<number, gs.ITopoPathData> = createVertices(scene, objs, mats[4]);

    // add points
    const all_points: gs.IPoint[] = model.getGeom().getAllPoints();
    const points_map: Map<number, number> = createPoints(scene, all_points, mats[4]);

    // other
    createOtherLines(scene, objs, mats[0]);

    // return the scene with object and points
    return {scene, faces_map, wires_map, edges_map, vertices_map, points_map};
}
