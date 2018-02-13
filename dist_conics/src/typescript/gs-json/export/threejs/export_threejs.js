"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gs = require("../../_export");
//import * as three from "three";
/**
 * This is an example function that reads a file with some gs-json data.
 * It then calls exportThreejsData()
 */
function exportThreejsUrl(url) {
    // For example, the url can be "./base/assets/gs-json/box.gs"
    const xmlhttp = new XMLHttpRequest();
    let data;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            data = JSON.parse(this.responseText);
            const model = new gs.Model(data);
            exportThreejsData(model);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    return true;
}
exports.exportThreejsUrl = exportThreejsUrl;
/**
 * This is an example function that goes through a gs-json file and extracts some entities.
 */
function exportThreejsData(model) {
    for (const p of model.getGeom().getAllPoints()) {
        // Do something here with your points
        // For example, get the position of each point
    }
    for (const obj of model.getGeom().getAllObjs()) {
        // Do something here with your objects
        // For example, get the position of each point
    }
}
exports.exportThreejsData = exportThreejsData;
//# sourceMappingURL=export_threejs.js.map