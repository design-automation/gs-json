import * as gm from "./gen_test_models";
import * as filesys from "../libs/filesys/filesys";
import * as tg from "./three_generate";

const path: string = "../gs-json/src/assets/three/";

/**
 * Write all models to disk as json files.
 */
export function genGsModelsWriteFiles(): void {

    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelEmpty()), path + "model_empty.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelPoints()), path + "model_points.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelOpenPolyline()), path + "model_open_polyline.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelClosedPolyline()), path + "model_closed_polyline.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelBox()), path + "model_box.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelBoxWithAttribs()), path + "model_box_with_attribs.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelBoxOpen1()), path + "model_box_open1.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelBoxOpen2()), path + "model_box_open2.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelBoxOpen2Disjoint()), path + "model_box_open2_disjoint.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelTwoBoxesOpen()), path + "model_two_boxes.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelBoxFarAway()), path + "model_box_far_away.json");
    //filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelManyBoxes()), path + "model_many_boxes.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelDifficultPolymesh()), path + "model_difficult_polymesh.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelInvalidPolymesh()), path + "model_invalid_polymesh.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelPolyinesBoxes()), path + "model_polylines_boxes.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelGrid()), path + "model_grid.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelTorus()), path + "model_torus.json");
    //filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelManyTorus()), path + "model_many_torus.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelCircles()), path + "model_circles.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelGroups()), path + "model_groups.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelPlanes()), path + "model_planes.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelDelPoints()), path + "model_del_points.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelDelObjs()), path + "model_del_objs.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelObjWithAttribs()), path + "model_obj_with_attribs.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelsAndMerge()), path + "model_and_merge.json");
}

export function debug(): void {
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelBox()), path + "model_box.json");
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
