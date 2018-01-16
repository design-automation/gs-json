import * as gs from "./_export";
import * as fs from "fs";

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
 * Write all models to disk as json files.
 */
export function genGsModelsWriteFiles(): void {
    genModelWriteToJSONFile(gs.genThreeModel(gs.genModelEmpty()), "model_empty.json");
    genModelWriteToJSONFile(gs.genThreeModel(gs.genModelPoints()), "model_points.json");
    genModelWriteToJSONFile(gs.genThreeModel(gs.genModelOpenPolyline()), "model_open_polyline.json");
    genModelWriteToJSONFile(gs.genThreeModel(gs.genModelClosedPolyline()), "model_closed_polyline.json");
    genModelWriteToJSONFile(gs.genThreeModel(gs.genModelBox()), "model_box.json");
    genModelWriteToJSONFile(gs.genThreeModel(gs.genModelBoxWithAttribs()), "model_box_with_attribs.json");
    genModelWriteToJSONFile(gs.genThreeModel(gs.genModelBoxOpen1()), "model_box_open1.json");
    genModelWriteToJSONFile(gs.genThreeModel(gs.genModelBoxOpen2()), "model_box_open2.json");
    genModelWriteToJSONFile(gs.genThreeModel(gs.genModelBoxOpen2Disjoint()), "model_box_open2_disjoint.json");
    genModelWriteToJSONFile(gs.genThreeModel(gs.genModelTwoBoxesOpen()), "model_two_boxes.json");
    genModelWriteToJSONFile(gs.genThreeModel(gs.genModelBoxFarAway()), "model_box_far_away.gs");
    //genModelWriteToJSONFile(gs.genThreeModel(gs.genModelManyBoxes()), "model_many_boxes.gs");
    genModelWriteToJSONFile(gs.genThreeModel(gs.genModelDifficultPolymesh()), "model_difficult_polymesh.json");
    genModelWriteToJSONFile(gs.genThreeModel(gs.genModelInvalidPolymesh()), "model_invalid_polymesh.json");
    genModelWriteToJSONFile(gs.genThreeModel(gs.genModelPolyinesBoxes()), "model_polylines_boxes.json");
    genModelWriteToJSONFile(gs.genThreeModel(gs.genModelGrid()), "model_grid.json");
    genModelWriteToJSONFile(gs.genThreeModel(gs.genModelTorus()), "model_torus.json");
    //genModelWriteToJSONFile(gs.genThreeModel(gs.genModelManyTorus()), "model_many_torus.gs");

    //OPTIMISED
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelEmpty()), "model_empty_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelPoints()), "model_points_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelOpenPolyline()), "model_open_polyline_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelClosedPolyline()), "model_closed_polyline_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelBox()), "model_box_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelBoxWithAttribs()), "model_box_with_attribs_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelBoxOpen1()), "model_box_open1_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelBoxOpen2()), "model_box_open2_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelBoxOpen2Disjoint()), "model_box_open2_disjoint_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelTwoBoxesOpen()), "model_two_boxes_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelBoxFarAway()), "model_box_far_away_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelManyBoxes()), "model_many_boxes_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelDifficultPolymesh()), "model_difficult_polymesh_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelInvalidPolymesh()), "model_invalid_polymesh_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelPolyinesBoxes()), "model_polylines_boxes_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelGrid()), "model_grid_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelTorus()), "model_torus_opt.json");
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelManyTorus()), "model_many_torus_opt.json");
}

export function debug(): void {
    genModelWriteToJSONFile(gs.genThreeOptModel(gs.genModelBox()), "model_box_opt.json");
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

