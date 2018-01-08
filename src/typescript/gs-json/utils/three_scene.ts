import * as threei from "./ifaces_three";
import {create_UUID} from "./uuid";

/**
 * Generate default materials.
 */
export function genDefaultMaterials(): threei.IThreeMaterial[] {
    const black_line: threei.IThreeLineMaterial = {
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
    const blue_line: threei.IThreeLineMaterial = {
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
    const meshes_mat: threei.IThreeMeshPhongMaterial = {
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
    const meshes_glass_mat: threei.IThreeMeshPhongMaterial = {
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
export function genScene(): threei.IThreeScene {
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
        },
    };
}

/**
 * Generate geometry entity from data.
 */
export function genGeom(xyzs: number[], triangles?: number[], normals?: number[]): threei.IThreeBufferedGeom {
    const geom: threei.IThreeBufferedGeom = {
        uuid: create_UUID(),
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
    if (triangles !== undefined) {
        geom.data.index = {
            type: "Uint16Array",
            array: triangles,
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

/**
 * Generate a group entity. This has nothing to do with gs-json groups.
 */
export function genGroup(name: string): threei.IThreeObj {
    const obj: threei.IThreeObj = {
        uuid: create_UUID(),
        type: "Group",
        name: name,
        children: [],
    };
    return obj;
}

/**
 * Generate an obj entity.
 */
export function genObj(type: string, name: string, geom: threei.IThreeBufferedGeom, mat: threei.IThreeMaterial): threei.IThreeObj {
    const obj: threei.IThreeObj = {
        uuid: create_UUID(),
        type: type,
        name: name,
        geometry: geom.uuid,
        material: mat.uuid,
    };
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
export function addObjToGroup(group: threei.IThreeObj, obj: threei.IThreeObj): void {
    group.children.push(obj);
}

/**
 * Add a group entity to the scene.
 */
export function addGroupToScene(scene: threei.IThreeScene, group: threei.IThreeObj): void {
    scene.object.children.push(group);
}

/**
 * Add some materials to the scene.
 */
export function addMatsToScene(scene: threei.IThreeScene, mats: threei.IThreeMaterial[]): void {
    for (const mat of mats) {
        scene.materials.push(mat);
    }
}

/**
 * Add a geom entity to the the scene.
 */
export function addGeomToScene(scene: threei.IThreeScene, geom: threei.IThreeBufferedGeom): void {
    scene.geometries.push(geom);
}

/**
 * Add a sprite to the scene.
 */
export function addSpriteToScene(scene: threei.IThreeScene, group: threei.IThreeObj, name: string,
                                 labels_xyzs: { label: string, xyz: number[] }[]): threei.IThreeObj {
    const sprite = genSprites(name, labels_xyzs);
    sprite.uuid = create_UUID();
    group.children.push(sprite);
    return sprite;
}

/**
 * Generate a bunch of sprites, from labels and label centroids.
 */
export function genSprites(name: string, labels_xyzs: { label: string, xyz: number[] }[]): threei.IThreeObj {
    const group = genGroup(name);
    for (const label_xyz of labels_xyzs) {
        const label: string = label_xyz.label;
        const xyz: number[] = label_xyz.xyz;
        const sprite: threei.IThreeObj = {
            type: "Sprite",
            name: label,
            matrix: [1,0,0,0,0,1,0,0,0,0,1,0,xyz[0],xyz[1],xyz[2],1],
            visible: false,
        };
        group.children.push(sprite);
    }
    return group;
}
