"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("../libs/uuid/uuid");
/**
 * Generate default materials.
 */
function genDefaultMaterials() {
    const black_line = {
        uuid: uuid_1.create_UUID(),
        type: "LineBasicMaterial",
        color: 0,
        vertexColors: 0,
        side: 2,
        blending: 0,
        depthFunc: 3,
        depthTest: true,
        depthWrite: true,
    };
    const blue_line = {
        uuid: uuid_1.create_UUID(),
        type: "LineBasicMaterial",
        color: 255,
        vertexColors: 0,
        side: 2,
        blending: 0,
        depthFunc: 3,
        depthTest: true,
        depthWrite: true,
    };
    const meshes_mat = {
        uuid: uuid_1.create_UUID(),
        type: "MeshPhongMaterial",
        color: 16777215,
        emissive: 0,
        specular: 16777215,
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
    const meshes_glass_mat = {
        uuid: uuid_1.create_UUID(),
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
    const points_mat = {
        uuid: uuid_1.create_UUID(),
        type: "PointsMaterial",
        color: 16777215,
        size: 2,
        sizeAttenuation: false,
    };
    return [black_line, blue_line, meshes_mat, meshes_glass_mat, points_mat];
}
exports.genDefaultMaterials = genDefaultMaterials;
/**
 * Generate the scene.
 */
function genScene() {
    return {
        metadata: {
            version: 4.5,
            type: "Object",
            generator: "gs-json",
        },
        geometries: [],
        materials: [],
        object: {
            type: "Scene",
            name: "Scene",
            children: [],
        },
    };
}
exports.genScene = genScene;
/**
 * Generate geometry entity from data.
 */
function genGeom(xyzs, indexes, normals) {
    const geom = {
        uuid: uuid_1.create_UUID(),
        type: "BufferGeometry",
        data: {
            attributes: {
                position: {
                    itemSize: 3,
                    type: "Float32Array",
                    array: xyzs,
                    normalized: false,
                },
            },
        },
    };
    if (indexes !== undefined) {
        geom.data.index = {
            type: "Uint16Array",
            array: indexes,
        };
    }
    if (normals !== undefined) {
        geom.data.attributes.normal = {
            itemSize: 3,
            type: "Float32Array",
            array: normals,
            normalized: false,
        };
    }
    return geom;
}
exports.genGeom = genGeom;
/**
 * Generate a group entity. This has nothing to do with gs-json groups.
 */
function genGroup(name) {
    const obj = {
        uuid: uuid_1.create_UUID(),
        type: "Group",
        name: name,
        children: [],
    };
    return obj;
}
exports.genGroup = genGroup;
/**
 * Generate an obj entity.
 */
function genObj(type, name, geom, mat) {
    const obj = {
        uuid: uuid_1.create_UUID(),
        type: type,
        name: name,
        geometry: geom.uuid,
        material: mat.uuid,
    };
    if (type === "Mesh") {
        obj.castShadow = true;
        obj.receiveShadow = true;
    }
    else {
        obj.castShadow = false;
        obj.receiveShadow = false;
    }
    return obj;
}
exports.genObj = genObj;
/**
 * Add a obj entity to the group.
 */
function addObjToGroup(group, obj) {
    group.children.push(obj);
}
exports.addObjToGroup = addObjToGroup;
/**
 * Add an obj entity to the scene.
 */
function addObjToScene(scene, obj) {
    scene.object.children.push(obj);
}
exports.addObjToScene = addObjToScene;
/**
 * Add a group entity to the scene.
 */
function addGroupToScene(scene, group) {
    scene.object.children.push(group);
}
exports.addGroupToScene = addGroupToScene;
/**
 * Add some materials to the scene.
 */
function addMatsToScene(scene, mats) {
    for (const mat of mats) {
        scene.materials.push(mat);
    }
}
exports.addMatsToScene = addMatsToScene;
/**
 * Add a geom entity to the the scene.
 */
function addGeomToScene(scene, geom) {
    scene.geometries.push(geom);
}
exports.addGeomToScene = addGeomToScene;
/**
 * Add a sprite to the scene.
 */
function addSpriteToScene(scene, group, name, labels_xyzs) {
    const sprite = genSprites(name, labels_xyzs);
    sprite.uuid = uuid_1.create_UUID();
    group.children.push(sprite);
    return sprite;
}
exports.addSpriteToScene = addSpriteToScene;
/**
 * Generate a bunch of sprites, from labels and label centroids.
 */
function genSprites(name, labels_xyzs) {
    const group = genGroup(name);
    for (const label_xyz of labels_xyzs) {
        const label = label_xyz.label;
        const xyz = label_xyz.xyz;
        const sprite = {
            type: "Sprite",
            name: label,
            matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, xyz[0], xyz[1], xyz[2], 1],
            visible: false,
        };
        group.children.push(sprite);
    }
    return group;
}
exports.genSprites = genSprites;
//# sourceMappingURL=three_scene.js.map