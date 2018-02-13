import * as gs from "../_export";
/**
 * Generate the model.
 */
export declare function genThreeOptModel(model: gs.IModel): gs.IThreeScene;
/**
 * Generate the model together with some maps.
 */
export declare function genThreeOptModelAndMaps(model: gs.IModel): {
    scene: gs.IThreeScene;
    faces_map: Map<number, gs.ITopoPathData>;
    wires_map: Map<number, gs.ITopoPathData>;
    edges_map: Map<number, gs.ITopoPathData>;
    vertices_map: Map<number, gs.ITopoPathData>;
    points_map: Map<number, number>;
};
