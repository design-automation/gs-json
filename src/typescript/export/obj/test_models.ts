import * as gs from "../../gs-json";
import * as gm from "../../generate/gen_test_models";
import * as filesys from "../../libs/filesys/filesys";
import * as export_obj from "./obj";

const path: string = "../gs-json/src/assets/obj/";

function gen(model: gs.IModel, name: string): void {
    filesys.writeTextFile(export_obj.exportObj(model), path + name);
}

/**
 * Write all models
 */
function writeObjFiles(): void {
    gen(gm.genModelEmpty(), "empty.obj");
    gen(gm.genModelPoints(), "points.obj");
    gen(gm.genModelOpenPolyline(), "open_polyline.obj");
    gen(gm.genModelClosedPolyline(), "closed_polyline.obj");
    gen(gm.genModelBox(), "box.obj");
    gen(gm.genModelBoxWithAttribs(), "box_with_attribs.obj");
    gen(gm.genModelBoxOpen1(), "box_open1.obj");
    gen(gm.genModelBoxOpen2(), "box_open2.obj");
    gen(gm.genModelBoxOpen2Disjoint(), "box_open2_disjoint.obj");
    gen(gm.genModelTwoBoxesOpen(), "two_boxes.obj");
    gen(gm.genModelBoxFarAway(), "box_far_away.obj");
    //gen(gm.genModelManyBoxes(), "many_boxes.obj");
    gen(gm.genModelDifficultPolymesh(), "difficult_polymesh.obj");
    gen(gm.genModelInvalidPolymesh(), "invalid_polymesh.obj");
    gen(gm.genModelPolyinesBoxes(), "polylines_boxes.obj");
    gen(gm.genModelGrid(), "grid.obj");
    gen(gm.genModelTorus(), "torus.obj");
    //gen(gm.genModelManyTorus(), "many_torus.obj");
    gen(gm.genModelCircles(), "circles.obj");
    gen(gm.genModelGroups(), "groups.obj");
    gen(gm.genModelPlanes(), "planes.obj");
    gen(gm.genModelDelPoints(), "del_points.obj");
    gen(gm.genModelDelObjs(), "del_objs.obj");
    gen(gm.genModelObjWithAttribs(), "obj_with_attribs.obj");
    gen(gm.genModelsAndMerge(), "models_merge.obj");
}

function debug(): void {
    gen(gm.genModelBox(), "box.obj");
}

/**
 * If this module is being run directly, then files will be written to disk.
 * This will require the TS code to be transpiled to 2015 JS code, first with TSC and then with babel.
 * There is a script that automates this in package.obj.
 * Just type "npm run build_models" in the shell.
 */
if(require.main === module)  {
    writeObjFiles();
}
