"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const threeg = require("./three_geom");
const threes = require("./three_scene");
/**
 * Add stuff to scene.
 */
function add(scene, three_type, description, data, material) {
    const buff_geom = threes.genGeom(data.xyzs_flat, data.indexes);
    threes.addGeomToScene(scene, buff_geom);
    threes.addObjToScene(scene, threes.genObj(three_type, description, buff_geom, material));
}
/**
 * Add all objects faces to the scene and generate one big threejs mesh out of it.
 */
function createFaces(scene, objects, material) {
    const data = threeg.getDataFromAllFaces(objects);
    if (data !== null) {
        add(scene, "Mesh", "All faces", data, material);
        return data.reverse_map;
    }
    return null;
}
/**
 * Add all objects edges to the scene and create one big line segment soup out of it.
 */
function createWires(scene, objects, material) {
    const data = threeg.getDataFromAllWires(objects);
    if (data !== null) {
        add(scene, "LineSegments", "All wires", data, material);
        return data.reverse_map;
    }
    return null;
}
/**
 * Add all objects edges to the scene and create one big line segment soup out of it.
 */
function createEdges(scene, objects, material) {
    const data = threeg.getDataFromAllEdges(objects);
    if (data !== null) {
        add(scene, "LineSegments", "All edges", data, material);
        return data.reverse_map;
    }
    return null;
}
/**
 * Add all objects vertices to the scene and create one big vertex soup out of it.
 */
function createVertices(scene, objects, material) {
    const data = threeg.getDataFromAllVertices(objects);
    if (data !== null) {
        add(scene, "Points", "All vertices", data, material);
        return data.reverse_map;
    }
    return null;
}
/**
 * Add all other lines to the scene and create one big line segment soup out of it.
 */
function createOtherLines(scene, objects, material) {
    const data = threeg.getDataAllOtherLines(objects);
    if (data !== null) {
        add(scene, "LineSegments", "Other lines", data, material);
    }
}
/**
 * Add all points to the scene and create one big point soup out of it.
 */
function createPoints(scene, points, material) {
    //  create xyzs gs.Array
    const data = threeg.getDataFromAllPoints(points);
    if (data !== null) {
        add(scene, "Points", "All points", data, material);
        return data.reverse_map;
    }
    return null;
}
/**
 * Generate the model.
 */
function genThreeOptModel(model) {
    // check that this is model, this is required for Mobius
    if (model.constructor.name !== "Model") {
        throw new Error("Invalid model.");
    }
    // create scene
    const scene = threes.genScene();
    const mats = threes.genDefaultMaterials();
    threes.addMatsToScene(scene, mats);
    // TODO add the points only once using threejs interleaved buffer
    // add the objects
    const objs = model.getGeom().getAllObjs();
    const faces_map = createFaces(scene, objs, mats[2]);
    const wires_map = createWires(scene, objs, mats[1]);
    const edges_map = createEdges(scene, objs, mats[0]);
    const vertices_map = createVertices(scene, objs, mats[4]);
    // add points
    const all_points = model.getGeom().getAllPoints();
    const points_map = createPoints(scene, all_points, mats[4]);
    // other
    createOtherLines(scene, objs, mats[0]);
    // return the scene with object and points
    return scene;
}
exports.genThreeOptModel = genThreeOptModel;
/**
 * Generate the model together with some maps.
 */
function genThreeOptModelAndMaps(model) {
    if (model.constructor.name !== "Model") {
        throw new Error("Invalid model.");
    }
    const scene = threes.genScene();
    const mats = threes.genDefaultMaterials();
    threes.addMatsToScene(scene, mats);
    // TODO add the points only once using threejs interleaved buffer
    // add the objects
    const objs = model.getGeom().getAllObjs();
    const faces_map = createFaces(scene, objs, mats[2]);
    const wires_map = createWires(scene, objs, mats[1]);
    const edges_map = createEdges(scene, objs, mats[0]);
    const vertices_map = createVertices(scene, objs, mats[4]);
    // add points
    const all_points = model.getGeom().getAllPoints();
    const points_map = createPoints(scene, all_points, mats[4]);
    // other
    createOtherLines(scene, objs, mats[0]);
    // return the scene with object and points
    return { scene, faces_map, wires_map, edges_map, vertices_map, points_map };
}
exports.genThreeOptModelAndMaps = genThreeOptModelAndMaps;
//# sourceMappingURL=three_generate.js.map