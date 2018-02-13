"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = "../gs-json/src/assets/gs-json/";
/**
 * Write all models to disk as json files.
 */
function genThreeModelsWriteFiles() {
    // filesys.writeGsToJSONFile(gm.genModelEmpty(), path + "model_empty.gs");
    // filesys.writeGsToJSONFile(gm.genModelPoints(), path + "model_points.gs");
    // filesys.writeGsToJSONFile(gm.genModelOpenPolyline(), path + "model_open_polyline.gs");
    // filesys.writeGsToJSONFile(gm.genModelClosedPolyline(), path + "model_closed_polyline.gs");
    // filesys.writeGsToJSONFile(gm.genModelBox(), path + "model_box.gs");
    // filesys.writeGsToJSONFile(gm.genModelBoxWithAttribs(), path + "model_box_with_attribs.gs");
    // filesys.writeGsToJSONFile(gm.genModelBoxOpen1(), path + "model_box_open1.gs");
    // filesys.writeGsToJSONFile(gm.genModelBoxOpen2(), path + "model_box_open2.gs");
    // filesys.writeGsToJSONFile(gm.genModelBoxOpen2Disjoint(), path + "model_box_open2_disjoint.gs");
    // filesys.writeGsToJSONFile(gm.genModelTwoBoxesOpen(), path + "model_two_boxes.gs");
    // filesys.writeGsToJSONFile(gm.genModelBoxFarAway(), path + "model_box_far_away.gs");
    // filesys.writeGsToJSONFile(gm.genModelManyBoxes(), path + "model_many_boxes.gs");
    // filesys.writeGsToJSONFile(gm.genModelDifficultPolymesh(), path + "model_difficult_polymesh.gs");
    // filesys.writeGsToJSONFile(gm.genModelInvalidPolymesh(), path + "model_invalid_polymesh.gs");
    // filesys.writeGsToJSONFile(gm.genModelPolyinesBoxes(), path + "model_polylines_boxes.gs");
    // filesys.writeGsToJSONFile(gm.genModelGrid(), path + "model_grid.gs");
    // filesys.writeGsToJSONFile(gm.genModelTorus(), path + "model_torus.gs");
    // //filesys.writeGsToJSONFile(gm.genModelManyTorus(), path + "model_many_torus.gs");
    // filesys.writeGsToJSONFile(gm.genModelCircles(), path + "model_circles.gs");
    // filesys.writeGsToJSONFile(gm.genModelGroups(), path + "model_groups.gs");
    // filesys.writeGsToJSONFile(gm.genModelPlanes(), path + "model_planes.gs");
    // filesys.writeGsToJSONFile(gm.genModelDelPoints(), path + "model_del_points.gs");
    // filesys.writeGsToJSONFile(gm.genModelDelObjs(), path + "model_del_objs.gs");
    // filesys.writeGsToJSONFile(gm.genModelObjWithAttribs(), path + "model_obj_with_attribs.gs");
}
exports.genThreeModelsWriteFiles = genThreeModelsWriteFiles;
/**
 * If this module is being run directly, then files will be written to disk.
 * This will require the TS code to be transpiled to 2015 JS code, first with TSC and then with babel.
 * There is a script that automates this in package.json.
 * Just type "npm run build_models" in the shell.
 */
if (require.main === module) {
    // genThreeModelsWriteFiles();
}
//# sourceMappingURL=gen_gs_test_models.js.map