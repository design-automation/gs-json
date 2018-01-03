import {EObjType} from "./enums";

//Examples https://github.com/mrdoob/three.js/tree/master/examples/models/json
// See also the editor https://threejs.org/editor/

//  MATERIALS ================================================================================================

//export type TThreeMaterial = (IThreeLineMaterial|IThreeMeshPhongMaterial);

export interface IThreeMaterial {
    uuid: string;
    type: string;
}

export interface IThreeLineMaterial extends IThreeMaterial {
    color: number;
    vertexColors: number;
    side: number;
    blending: number;
    depthFunc: number;
    depthTest: boolean;
    depthWrite: boolean;

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
    opacity?: number;
    wireframe: boolean;
    flatShading: boolean;
    map?: string; //texture map UUID
}

export interface IThreeMeshBasicMaterial extends IThreeMeshMaterial {
    type: "MeshBasicMaterial";
}

export interface IThreeMeshDepthMaterial extends IThreeMeshMaterial {
    type: "MeshDepthMaterial";
}

export interface IThreeMeshNormalMaterial extends IThreeMeshMaterial {
    type: "MeshNormalMaterial";
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



//  GEOMETRY =================================================================================================

export interface IThreeBufferedGeom {
    uuid?: string;
    type: "BufferGeometry";
    data: {
        attributes: {
            position: {
                itemSize: number;
                type: "Float32Array";
                array: number[];
                normalized: boolean;
            },
            normal?: {
                itemSize: number;
                type: "Float32Array";
                array: number[];
                normalized: boolean;
            }
        }
        index?: {
            type: "Uint16Array";
            array: number[];
        }
    }
}

export interface IThreeObj {
    uuid?: string;
    name?: string;
    type: string; // Mesh
    castShadow?: boolean;
    receiveShadow?: boolean;
    visible?: boolean;
    userData?: any;
    geometry?: string;
    matrix?: number[];
    material?: string|string[];
    children?: IThreeObj[];
}

export interface IThreeMetadata {
    version: number; // 4.5
    type: "Object";
    generator: "gs-json";
}

export interface IThreeScene {
    metadata: IThreeMetadata;
    geometries?: IThreeBufferedGeom[];
    object?: IThreeObj;
    materials: IThreeMaterial[];
}


//  ==========================================================================================================
