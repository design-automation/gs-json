import * as gs from "../gs-json";
import * as filesys from "../libs/filesys/filesys";
import * as gm from "./gen_test_models";

const path: string = "../gs-json/src/assets/gs-json/";

function gen(model: gs.IModel, name: string): void {
    filesys.writeGsToJSONFile(model, path + name);
}

/**
 * Write all models to disk as json files.
 */
function writeThreeFiles(): void {
    gen(gm.genModelEmpty(), "empty.gs");
    gen(gm.genModelPoints(), "points.gs");
    gen(gm.genModelOpenPolyline(), "open_polyline.gs");
    gen(gm.genModelClosedPolyline(), "closed_polyline.gs");
    gen(gm.genModelBox(), "box.gs");
    gen(gm.genModelBoxWithAttribs(), "box_with_attribs.gs");
    gen(gm.genModelBoxOpen1(), "box_open1.gs");
    gen(gm.genModelBoxOpen2(), "box_open2.gs");
    gen(gm.genModelBoxOpen2Disjoint(), "box_open2_disjoint.gs");
    gen(gm.genModelTwoBoxesOpen(), "two_boxes.gs");
    gen(gm.genModelBoxFarAway(), "box_far_away.gs");
    gen(gm.genModelManyBoxes(), "many_boxes.gs");
    gen(gm.genModelDifficultPolymesh(), "difficult_polymesh.gs");
    gen(gm.genModelInvalidPolymesh(), "invalid_polymesh.gs");
    gen(gm.genModelPolyinesBoxes(), "polylines_boxes.gs");
    gen(gm.genModelGrid(), "grid.gs");
    gen(gm.genModelTorus(), "torus.gs");
    //gen(gm.genModelManyTorus(), "many_torus.gs");
    gen(gm.genModelCircles(), "circles.gs");
    gen(gm.genModelGroups(), "groups.gs");
    gen(gm.genModelPlanes(), "planes.gs");
    gen(gm.genModelDelPoints(), "del_points.gs");
    gen(gm.genModelDelObjs(), "del_objs.gs");
    gen(gm.genModelObjWithAttribs(), "obj_with_attribs.gs");
    gen(gm.genModelsAndMerge(), "models_merge.gs");
}

/**
 * If this module is being run directly, then files will be written to disk.
 * This will require the TS code to be transpiled to 2015 JS code, first with TSC and then with babel.
 * There is a script that automates this in package.json.
 * Just type "npm run build_models" in the shell.
 */
if(require.main === module)  {
    writeThreeFiles();
}
