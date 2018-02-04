import * as gs from "../../_export";
//import * as three from "three";

/**
 * This is an example function that reads a file with some gs-json data.
 * It then calls exportThreejsData()
 */
export function exportThreejsUrl(url: string): boolean {
    // For example, the url can be "./base/assets/gs-json/box.gs"
    const xmlhttp = new XMLHttpRequest();
    let data: gs.IModelData;
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            data = JSON.parse(this.responseText);
            const model: gs.IModel = new gs.Model(data);
            exportThreejsData(model);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    return true;
}
/**
 * This is an example function that goes through a gs-json file and extracts some entities.
 */
export function exportThreejsData(model: gs.IModel): void {

    for (const p of model.getGeom().getAllPoints()) {
        // Do something here with your points
        // For example, get the position of each point

    }

    for (const obj of model.getGeom().getAllObjs()) {
        // Do something here with your objects
        // For example, get the position of each point

    }
}
