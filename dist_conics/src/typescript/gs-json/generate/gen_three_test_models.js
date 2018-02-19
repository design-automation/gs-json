"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gm = require("./gen_test_models");
const filesys = require("../libs/filesys/filesys");
const tg = require("./three_generate");
const path = "../gs-json/src/assets/three/";
/**
 * Write all models to disk as json files.
 */
function genGsModelsWriteFiles() {
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelEmpty()), path + "model_empty_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelPoints()), path + "model_points_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelOpenPolyline()), path + "model_open_polyline_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelClosedPolyline()), path + "model_closed_polyline_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelBox()), path + "model_box_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelBoxWithAttribs()), path + "model_box_with_attribs_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelBoxOpen1()), path + "model_box_open1_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelBoxOpen2()), path + "model_box_open2_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelBoxOpen2Disjoint()), path + "model_box_open2_disjoint_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelTwoBoxesOpen()), path + "model_two_boxes_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelBoxFarAway()), path + "model_box_far_away_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelManyBoxes()), path + "model_many_boxes_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelDifficultPolymesh()), path + "model_difficult_polymesh_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelInvalidPolymesh()), path + "model_invalid_polymesh_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelPolyinesBoxes()), path + "model_polylines_boxes_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelGrid()), path + "model_grid_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelTorus()), path + "model_torus_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelManyTorus()), path + "model_many_torus_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelCircles()), path + "model_circles_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelGroups()), path + "model_groups.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelPlanes()), path + "model_planes_opt.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelDelPoints()), path + "model_del_points.json");
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelDelObjs()), path + "model_del_objs.json");
}
exports.genGsModelsWriteFiles = genGsModelsWriteFiles;
function debug() {
    // filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModelBox()), path + "model_box_opt.json");
}
exports.debug = debug;
/**
 * If this module is being run directly, then files will be written to disk.
 * This will require the TS code to be transpiled to 2015 JS code, first with TSC and then with babel.
 * There is a script that automates this in package.json.
 * Just type "npm run build_models" in the shell.
 */
if (require.main === module) {
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModel_3DConic_Ellipse()), path + "model_genModel_3DConic_Ellipse.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModel_3DConic_Parabola()), path + "model_genModel_3DConic_Parabola.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModel_3DConic_Hyperbola()), path + "model_genModel_3DConic_Hyperbola.json");
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(gm.genModel_3DConic_RayTwo()), path + "model_genModel_3DConic_RayTwo.json");
}
//# sourceMappingURL=gen_three_test_models.js.map