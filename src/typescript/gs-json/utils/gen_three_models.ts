import * as gs from "./gs-json";
import * as fs from "fs";
import * as three from "three";
import * as earcut from "./extras/Earcut";
//import {Earcut} from "./extras/Earcut";
//const earcut = require("./extras/Earcut");
//import * as earcut from module("./extras/Earcut");

/**
 * Utility function for threejs.
 */
function multVectorMatrix(v: three.Vector3, m: three.Matrix4): three.Vector3 {
    const v2: three.Vector3 = v.clone();
    v2.applyMatrix4(m);
    return v2;
}
function makeVectorsFromVertices(vertices: gs.IVertex[]): three.Vector3[] {
    const vectors: three.Vector3[] = [];
    for (const vertex of vertices) {
        const xyz: number[] = vertex.getPoint().getPosition();
        vectors.push(new three.Vector3(xyz[0], xyz[1], xyz[2]));
    }
    return vectors;
}
function subVectors(v1: three.Vector3, v2: three.Vector3): three.Vector3 {
    const v3: three.Vector3 = new three.Vector3();
    return v3.subVectors(v1, v2);
}
function addVectors(v1: three.Vector3, v2: three.Vector3): three.Vector3 {
    const v3: three.Vector3 = new three.Vector3();
    return v3.addVectors(v1, v2);
}
function crossVectors(v1: three.Vector3, v2: three.Vector3): three.Vector3 {
    const v3: three.Vector3 = new three.Vector3();
    return v3.crossVectors(v1, v2);
}
function xformMatrix(o: three.Vector3, x: three.Vector3, y: three.Vector3, z: three.Vector3): three.Matrix4 {
    const m1: three.Matrix4 = new three.Matrix4();
    const o_neg: three.Vector3 = o.clone().negate();
    m1.setPosition(o_neg);
    const m2: three.Matrix4 = new three.Matrix4();
    m2.makeBasis(x, y, z);
    m2.getInverse(m2);
    const m3: three.Matrix4 = new three.Matrix4();
    m3.multiplyMatrices(m2, m1);
    return m3;
}

function makeVertices2D(vertices: gs.IVertex[]): three.Vector3[] {
    const points: three.Vector3[] = makeVectorsFromVertices(vertices);
    const o: three.Vector3 = new three.Vector3();
    for (const v of points) {
        o.add(v);
    }
    o.divideScalar(points.length);
    let vx: three.Vector3;
    let vz: three.Vector3;
    let got_vx = false;
    for (let i=0;i<vertices.length;i++) {
        if (!got_vx) {
            vx =  subVectors(points[i], o).normalize();
            if (vx.lengthSq() !== 0) {got_vx = true;}
        } else {
            vz = crossVectors(vx,subVectors(points[i],o).normalize()).normalize();
            if (vz.lengthSq() !== 0) {break;}
        }
        if (i === vertices.length - 1) {throw new Error("Trinagulation found bad face.");}
    }
    const vy: three.Vector3 =  crossVectors(vz, vx);
    const m: three.Matrix4 = xformMatrix(o, vx, vy, vz);
    const points_2d: three.Vector3[] = points.map((v) => multVectorMatrix(v,m));
    // console.log(o, vx, vy, vz);
    // console.log(points_2d);
    return points_2d;
}
function triangulate2D(vertices: gs.IVertex[], verts_indexes:  number[]): number[] {
    const points_2d: three.Vector3[] = makeVertices2D(vertices);
    const flat_vert_xyzs: number[] = gs.Arr.flatten(points_2d.map((v) => [v.x, v.y]));
    const tri_indexes: number[] = earcut.Earcut.triangulate(flat_vert_xyzs);
    return tri_indexes.map((v) => verts_indexes[v]);
}

/**
 * Write a file.
 */
function genModelWriteToJSONFile(model: gs.IThreeScene, filename: string): boolean {
    fs.writeFile("./src/assets/three/" + filename, JSON.stringify(model, null, 4), (err) => {
        if (err) {
            console.log("Error writing file: " + filename);
            console.error(err);
            return false;
        }
        console.log("File has been created: " + filename);
    });
    return true;
}

/**
 * Create a UUID for threejs entities.
 */
function create_UUID(): string {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

/**
 * Generate default materials.
 */
function genDefaultMaterials(): gs.IThreeMaterial[] {
    const black_line: gs.IThreeLineMaterial = {
        uuid: create_UUID(),
        type: "LineBasicMaterial",
        color: 0,
        vertexColors: 0,
        side: 2,
        blending: 0,
        depthFunc: 3,
        depthTest: true,
        depthWrite: true,
    };
    const blue_line: gs.IThreeLineMaterial = {
        uuid: create_UUID(),
        type: "LineBasicMaterial",
        color: 255,
        vertexColors: 0,
        side: 2,
        blending: 0,
        depthFunc: 3,
        depthTest: true,
        depthWrite: true,
    };
    const meshes_mat: gs.IThreeMeshPhongMaterial = {
        uuid: create_UUID(),
        type: "MeshPhongMaterial",
        color: 16777215, // white
        emissive: 0,
        specular: 16777215, // white
        shininess: 10,
        vertexColors: 0,
        side: 2,
        blending: 0,
        depthFunc: 3,
        depthTest: true,
        depthWrite: true,
        transparent: false,
        wireframe: false,
        flatShading: true,
    };
    const meshes_glass_mat: gs.IThreeMeshPhongMaterial = {
        uuid: create_UUID(),
        type: "MeshPhongMaterial",
        color: 0,
        emissive: 0,
        specular: 16777215,
        shininess: 40,
        vertexColors: 0,
        side: 1,
        blending: 0,
        depthFunc: 3,
        depthTest: true,
        depthWrite: true,
        transparent: true,
        opacity: 0.5,
        wireframe: false,
        flatShading: true,
    };
    return [black_line, blue_line, meshes_mat, meshes_glass_mat];
}

/**
 * Generate the scene.
 */
function genScene(): gs.IThreeScene {
    return {
        metadata: {
            version: 4.5,
            type: "Object",
            generator: "gs-json",
        },
        geometries: [],
        materials:[],
        object: {
            type: "Scene",
            name: "Scene",
            children: [],
        }
    }
}

/**
 * Generate geometry entity from data.
 */
function genGeom(xyzs: number[], triangles?: number[], normals?: number[]): gs.IThreeBufferedGeom {
    const geom: gs.IThreeBufferedGeom = {
        uuid: create_UUID(),
        type: "BufferGeometry",
        data: {
            attributes: {
                position: {
                    itemSize: 3,
                    type: "Float32Array",
                    array: xyzs,
                    normalized: false,
                }
            }
        },
    }
    if (triangles !== undefined) {
        geom.data.index = {
            type: "Uint16Array",
            array: triangles,
        }
    }
    if (normals !== undefined) {
        geom.data.attributes.normal = {
            itemSize: 3,
            type: "Float32Array",
            array: normals,
            normalized: false,
        }
    }
    return geom;
}

/**
 * Generate a group entity. This has nothing to do with gs-json groups.
 */
function genGroup(name: string): gs.IThreeObj {
    const obj: gs.IThreeObj = {
        uuid: create_UUID(),
        type: "Group",
        name: name,
        children: [],
    }
    return obj;
}

/**
 * Generate an obj entity.
 */
function genObj(type: string, name: string, geom: gs.IThreeBufferedGeom, mat: gs.IThreeMaterial): gs.IThreeObj {
    const obj: gs.IThreeObj = {
        uuid: create_UUID(),
        type: type,
        name: name,
        geometry: geom.uuid,
        material: mat.uuid,
    }
    if (type === "Mesh") {
        obj.castShadow = true;
        obj.receiveShadow = true;
    } else {
        obj.castShadow = false;
        obj.receiveShadow = false;
    }
    return obj;
}

/**
 * Add a obj entity to the group.
 */
function addObjToGroup(group: gs.IThreeObj, obj: gs.IThreeObj): void {
    group.children.push(obj);
}

/**
 * Add a group entity to the scene.
 */
function addGroupToScene(scene: gs.IThreeScene, group: gs.IThreeObj): void {
    scene.object.children.push(group);
}

/**
 * Add some materials to the scene.
 */
function addMatsToScene(scene: gs.IThreeScene, mats: gs.IThreeMaterial[]): void {
    for (const mat of mats) {
        scene.materials.push(mat);
    }
}

/**
 * Add a geom entity to the the scene.
 */
function addGeomToScene(scene: gs.IThreeScene, geom: gs.IThreeBufferedGeom): void {
    scene.geometries.push(geom);
}

/**
 * Add a sprite to the scene.
 */
function addSpriteToScene(scene: gs.IThreeScene, group: gs.IThreeObj, name: string,
                          labels_xyzs: {label: string, xyz: number[]}[]): gs.IThreeObj {
    const sprite = genSprites(name, labels_xyzs);
    sprite.uuid = create_UUID();;
    group.children.push(sprite);
    return sprite;
}

/**
 * Generate a bunch of sprites, from labels and label centroids.
 */
function genSprites(name: string, labels_xyzs: {label: string, xyz: number[]}[]): gs.IThreeObj {
    const group = genGroup(name);
    for (const label_xyz of labels_xyzs) {
        const label: string = label_xyz.label;
        const xyz: number[] = label_xyz.xyz;
        const sprite: gs.IThreeObj = {
            type: "Sprite",
            name: label,
            matrix: [1,0,0,0,0,1,0,0,0,0,1,0,xyz[0],xyz[1],xyz[2],1],
            visible: false,
        }
        group.children.push(sprite);
    }
    return group;
}

/**
 * Vertex sprites.
 */
function getSpritesFromVertices(obj: gs.IObj): {label: string, xyz: number[]}[] {
    const vertices: gs.IVertex[] = gs.Arr.flatten(obj.getVertices());
    const sprites_data: {label: string, xyz: number[]}[] = [];
    for (const vertex of vertices) {
        sprites_data.push({label: vertex.getLabel(), xyz: vertex.getLabelCentroid()});
    }
    return sprites_data;
}

/**
 * Edge sprites.
 */
function getSpritesFromEdges(obj: gs.IObj): {label: string, xyz: number[]}[] {
    const edges: gs.IEdge[] = gs.Arr.flatten(obj.getEdges());
    const sprites_data: {label: string, xyz: number[]}[] = [];
    for (const edge of edges) {
        sprites_data.push({label: edge.getLabel(), xyz: edge.getLabelCentroid()});
    }
    return sprites_data;
}

/**
 * Wire sprites.
 */
function getSpritesFromWires(obj: gs.IObj): {label: string, xyz: number[]}[] {
    const wires: gs.IWire[] = gs.Arr.flatten(obj.getWires());
    const sprites_data: {label: string, xyz: number[]}[] = [];
    for (const wire of wires) {
        sprites_data.push({label: wire.getLabel(), xyz: wire.getLabelCentroid()});
    }
    return sprites_data;
}

/**
 * Face sprites.
 */
function getSpritesFromFaces(obj: gs.IObj): {label: string, xyz: number[]}[] {
    const faces: gs.IFace[] = gs.Arr.flatten(obj.getFaces());
    const sprites_data: {label: string, xyz: number[]}[] = [];
    for (const face of faces) {
        sprites_data.push({label: face.getLabel(), xyz: face.getLabelCentroid()});
    }
    return sprites_data;
}

/**
 * Get sprites data fro Obj.
 */
function getSpriteFromObj(obj: gs.IObj): {label: string, xyz: number[]} {
    const faces: gs.IFace[] = gs.Arr.flatten(obj.getFaces());
    return {label: obj.getLabel(), xyz: obj.getLabelCentroid()}
}

/**
 * Get lines data from obj wires.
 */
function getLinesFromWires(obj: gs.IObj): number[][] {
    const wires: gs.IWire[] = obj.getWires();
    const xyzs: number[][] = [];
    for (const wire of wires) {
        xyzs.push(gs.Arr.flatten(wire.getVertices().map((v) => v.getPoint().getPosition())));
    }
    return xyzs;
}

/**
 * Get line segment data from obj unique edges.
 */
export function getLineSegmentsFromEdges(obj: gs.IObj): number[] {
    const edges: gs.IEdge[][][] = obj.getEdges();
    //create an array of wire paths, so they can be excluded
    const wire_edges: gs.IEdge[] = gs.Arr.flatten(edges[0])
    const edge_paths: string[] = [];
    for (const edge of wire_edges) {
        const points: gs.IPoint[] = edge.getVertices().map((v) => v.getPoint());
        const ids = points.map((v) => v.getID()).sort();
        edge_paths.push(ids[0] + "_" + ids[1]);
    }
    //get all unique face edges
    const edge_xyzs: number[][] = [];
    for (const edge of gs.Arr.flatten(edges[1])) {
        const points: gs.IPoint[] = edge.getVertices().map((v) => v.getPoint());
        const ids = points.map((v) => v.getID()).sort();
        const path: string = ids[0] + "_" + ids[1];
        if (edge_paths.indexOf(path) === -1) {
            edge_paths.push(path);
            edge_xyzs.push(points[0].getPosition());
            edge_xyzs.push(points[1].getPosition());
        }
    }
    return gs.Arr.flatten(edge_xyzs);
}

/**
 * Ge mesh data from obj faces.
 */
function getMeshFromFaces(obj: gs.IObj): {xyzs: number[], indexes: number[], normals: number[]} {
    const points: gs.IPoint[] = obj.getPointsSet();
    const faces: gs.IFace[] = obj.getFaces();
    //  create xyzs gs.Array
    const xyzs: number[][] = points.map((v) => v.getPosition());
    //  create triangles data
    const id_to_i: Map<number, number> = new Map();
    points.forEach((v,i) => id_to_i.set(v.getID(), i));
    let traingles: number[][] = [];
    for (const face of faces) {
        const verts: gs.IVertex[] = face.getVertices();
        const verts_indexes: number[] = verts.map((v) => id_to_i.get(v.getPoint().getID()));
        if (verts.length === 3) {
            traingles.push(verts_indexes);
        } else if (verts.length > 3) {
            traingles.push(triangulate2D(verts, verts_indexes));
            // traingles.push([verts_indexes[0], verts_indexes[1], verts_indexes[2]]);
            // traingles.push([verts_indexes[0], verts_indexes[2], verts_indexes[3]]); //TODO this is a temporary fix
        }
    }
    // calc normals

    //TODO
    return {xyzs: gs.Arr.flatten(xyzs), indexes: gs.Arr.flatten(traingles), normals: []};
}

/**
 * Add polymesh
 */
function addPolymesh(scene: gs.IThreeScene, polymesh: gs.IPolymesh, materials: gs.IThreeMaterial[]): void {
    const group: gs.IThreeObj = genGroup(polymesh.getID() + "_Polymesh");
    addGroupToScene(scene, group);
    const data:{xyzs: number[], indexes: number[], normals: number[]} = getMeshFromFaces(polymesh);
    const mesh_geom: gs.IThreeBufferedGeom = genGeom(data.xyzs, data.indexes);
    addGeomToScene(scene, mesh_geom);
    addObjToGroup(group, genObj("Mesh", "Polymesh Faces", mesh_geom, materials[2]));
    for (const line of getLinesFromWires(polymesh)) {
        const line_geom: gs.IThreeBufferedGeom = genGeom(line);
        addGeomToScene(scene, line_geom);
        addObjToGroup(group, genObj("LineLoop", "Polymesh Wires", line_geom, materials[1]));
    }
    const edge_geom: gs.IThreeBufferedGeom = genGeom(getLineSegmentsFromEdges(polymesh));
    addGeomToScene(scene, edge_geom);
    addObjToGroup(group, genObj("LineSegments", "Polymesh Face Edges", edge_geom, materials[0]));
    addSpriteToScene(scene, group, "Vertices", getSpritesFromVertices(polymesh));
    addSpriteToScene(scene, group, "Edges", getSpritesFromEdges(polymesh));
    addSpriteToScene(scene, group, "Wires", getSpritesFromWires(polymesh));
    addSpriteToScene(scene, group, "Faces", getSpritesFromFaces(polymesh));
    addSpriteToScene(scene, group, "Edges", [getSpriteFromObj(polymesh)]);
}

/**
 * Add polyline
 */
function addPolyline(scene: gs.IThreeScene, polyline: gs.IPolyline, materials: gs.IThreeMaterial[]): void {
    const group: gs.IThreeObj = genGroup(polyline.getID() + "_Polyline");
    addGroupToScene(scene, group);
    const geom: gs.IThreeBufferedGeom = genGeom(getLinesFromWires(polyline)[0]);
    addGeomToScene(scene, geom);
    if (polyline.isClosed()) {
        addObjToGroup(group, genObj("LineLoop", "Polyline", geom, materials[0]));
    } else {
        addObjToGroup(group, genObj("Line", "Polyline", geom, materials[0]));
    }
    addSpriteToScene(scene, group, "Vertices", getSpritesFromVertices(polyline));
    addSpriteToScene(scene, group, "Edges", getSpritesFromEdges(polyline));
    addSpriteToScene(scene, group, "Edges", [getSpriteFromObj(polyline)]);
}

/**
 *
 */
export function genThreeModel(model: gs.IModel): gs.IThreeScene {
    const scene: gs.IThreeScene = genScene();
    const mats: gs.IThreeMaterial[] = genDefaultMaterials();
    addMatsToScene(scene, mats);
    for (const obj of model.getGeom().getObjs()) {
        switch (obj.getObjType()) {
            case gs.EObjType.polyline:
                addPolyline(scene, obj as gs.IPolyline, mats);
                break;
            case gs.EObjType.polymesh:
                addPolymesh(scene, obj as gs.IPolymesh, mats);
                break;
            default:
                // code...
                break;
        }
    }
    return scene;
}

/**
 * Write all models to disk as json files.
 */
export function genGsModelsWriteFiles(): void {
    genModelWriteToJSONFile(genThreeModel(gs.genModelEmpty()), "model_empty.json");
    genModelWriteToJSONFile(genThreeModel(gs.genModelPoints()), "model_points.json");
    genModelWriteToJSONFile(genThreeModel(gs.genModelOpenPolyline()), "model_open_polyline.json");
    genModelWriteToJSONFile(genThreeModel(gs.genModelClosedPolyline()), "model_closed_polyline.json");
    genModelWriteToJSONFile(genThreeModel(gs.genModelBox()), "model_box.json");
    genModelWriteToJSONFile(genThreeModel(gs.genModelBoxWithAttribs()), "model_box_with_attribs.json");
    genModelWriteToJSONFile(genThreeModel(gs.genModelBoxOpen1()), "model_box_open1.json");
    genModelWriteToJSONFile(genThreeModel(gs.genModelBoxOpen2()), "model_box_open2.json");
    genModelWriteToJSONFile(genThreeModel(gs.genModelBoxOpen2Disjoint()), "model_box_open2_disjoint.json");
    genModelWriteToJSONFile(genThreeModel(gs.genModelTwoBoxesOpen()), "model_two_boxes.json");
    genModelWriteToJSONFile(genThreeModel(gs.genModelDifficultPolymesh()), "model_difficult_polymesh.json");
    genModelWriteToJSONFile(genThreeModel(gs.genModelInvalidPolymesh()), "model_invalid_polymesh.json");
    genModelWriteToJSONFile(genThreeModel(gs.genModelPolyinesBoxes()), "model_polylines_boxes.json");
    genModelWriteToJSONFile(genThreeModel(gs.genModelGrid()), "model_grid.json");
    genModelWriteToJSONFile(genThreeModel(gs.genModelTorus()), "model_torus.json");
}
/**
 * If this module is being run directly, then files will be written to disk.
 * This will require the TS code to be transpiled to 2015 JS code, first with TSC and then with babel.
 * There is a script that automates this in package.json.
 * Just type "npm run build_models" in the shell.
 */
if(require.main === module)  {
    genGsModelsWriteFiles();
}

