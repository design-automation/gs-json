import * as gs from "../gs-json";
import * as gm from "../generate/gen_test_models";
import * as filesys from "../libs/filesys/filesys";
import * as tg from "./three_generate";

const path: string = "../gs-json/src/assets/three/";

function gen(model: gs.IModel, name: string): void {
    filesys.writeThreeToJSONFile(tg.genThreeOptModel(model), path + name);
}

/**
 * Write all models to disk as json files.
 */
function writeGSFiles(): void {
    gen(gm.genModelEmpty(), "empty.json");
    gen(gm.genModelPoints(), "points.json");
    gen(gm.genModelOpenPolyline(), "open_polyline.json");
    gen(gm.genModelClosedPolyline(), "closed_polyline.json");
    gen(gm.genModelBox(), "box.json");
    gen(gm.genModelBoxWithAttribs(), "box_with_attribs.json");
    gen(gm.genModelBoxOpen1(), "box_open1.json");
    gen(gm.genModelBoxOpen2(), "box_open2.json");
    gen(gm.genModelBoxOpen2Disjoint(), "box_open2_disjoint.json");
    gen(gm.genModelTwoBoxesOpen(), "two_boxes.json");
    gen(gm.genModelBoxFarAway(), "box_far_away.json");
    //gen(gm.genModelManyBoxes(), "many_boxes.json");
    gen(gm.genModelDifficultPolymesh(), "difficult_polymesh.json");
    gen(gm.genModelInvalidPolymesh(), "invalid_polymesh.json");
    gen(gm.genModelPolyinesBoxes(), "polylines_boxes.json");
    gen(gm.genModelGrid(), "grid.json");
    gen(gm.genModelTorus(), "torus.json");
    //gen(gm.genModelManyTorus(), "many_torus.json");
    gen(gm.genModelPlanes(), "planes.json");
    gen(gm.genModelDelPoints(), "del_points.json");
    gen(gm.genModelDelObjs(), "del_objs.json");
    gen(gm.genModelObjWithAttribs(), "obj_with_attribs.json");
    gen(gm.genModelsAndMerge(), "models_merge.json");
}

function debug(): void {
    gen(gm.genModelBox(), "box.json");
}

/**
 * If this module is being run directly, then files will be written to disk.
 * This will require the TS code to be transpiled to 2015 JS code, first with TSC and then with babel.
 * There is a script that automates this in package.json.
 * Just type "npm run build_models" in the shell.
 */
if(require.main === module)  {
    writeGSFiles();
}
