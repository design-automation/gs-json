export interface IThreeGeometry {
    uuid: string;
    type: "Geometry";
    data: {
        vertices: number[];
        faces: number;
        normals: number[];
        uvs: [number[]];
    };
}
export interface IThreeBufferedGeometry {
    uuid: string;
    type: "BufferedGeometry";
    data: {
        attributes: {
            poistion: {
                itemSize: number;
                type: "Float32Array";
                array: number[];
                normalized: boolean;
            };
        };
        index: {
            type: "Uint16Array";
            array: number[];
        };
        boundingSphere: {
            center: number[];
            radius: number;
        };
    };
}
export interface IThreeTextureMap {
    uuid: string;
    name: string;
    mapping: number;
    repeat: [number, number];
    offset: [number, number];
    center: [number, number];
    rotation: number;
    wrap: [number, number];
    minFilter: number;
    magFilter: number;
    anisotropy: number;
    flipY: true;
    image: string;
}
export interface IThreeMaterial {
    uuid: string;
    name: string;
}
export interface IThreeMeshMaterial extends IThreeMaterial {
    color: number;
    vertexColors: number;
    side: number;
    blending: number;
    depthFunc: number;
    depthTest: boolean;
    depthWrite: boolean;
    transparent: boolean;
    wireframe: boolean;
    flatShading: boolean;
    map: string;
}
export interface IThreeMeshBasicMaterial extends IThreeMeshMaterial {
    type: "MeshBasicMaterial";
}
export interface IThreeMeshDepthMaterial extends IThreeMeshMaterial {
    type: "MeshDepthMaterial";
}
export interface IThreeMeshNormalMaterial extends IThreeMeshMaterial {
    type: "MeshNormalMaterial";
    flatShading: boolean;
}
export interface IThreeMeshLambertMaterial extends IThreeMeshMaterial {
    type: "MeshLambertMaterial";
    emissive: number;
    transparent: boolean;
}
export interface IThreeMeshPhongMaterial extends IThreeMeshMaterial {
    type: "MeshPhongMaterial";
    emissive: number;
    specular: number;
    shininess: number;
}
export interface IThreeMeshPhysicalMaterial extends IThreeMeshMaterial {
    type: "MeshPhysicalMaterial";
    emissive: number;
    specular: number;
    shininess: number;
    roughness: number;
    metalness: number;
    clearCoat: number;
    clearCoatRoughness: number;
}
export interface IThreeObj {
    uuid: string;
    name: string;
    type: string;
    castShadow: true;
    receiveShadow: true;
    visible: false;
    userData: any;
    matrix: number[];
    geometry: string;
    material: string | string[];
    children: IThreeObj;
}
export interface IThreeData {
    metadata: {
        version: number;
        type: "Object";
        generator: "gs-json";
    };
    geometries: (IThreeGeometry | IThreeBufferedGeometry)[];
    materials: IThreeMaterial[];
    object: IThreeObj;
}
