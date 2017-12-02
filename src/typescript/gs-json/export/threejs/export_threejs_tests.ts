import * as gs from "./export_threejs";

export function test_exportThreejsUrl(): boolean {
    gs.exportThreejsUrl("./base/assets/gs-json/box.gs");
    return true;
}
