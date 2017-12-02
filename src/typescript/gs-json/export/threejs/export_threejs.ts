import * as gs from "../../utils/gs-json";

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
    for (const p of model.getGeom().getPoints()) {
        // Do something here with your points
        // For example, get the position of each point
        const xyz: number[] = p.getPosition();
    }
    for (const polyline of model.getGeom().getObjs(gs.EObjType.polymesh)) {
        // Do something here with your polylines
        // For example, get the wires and faces
        const wires: gs.IWire[] = polyline.getWires();
        for (const wire of wires) {
            const is_closed: boolean = wire.isClosed();
            const point_IDs: number[] = wire.getVertices().map((v, i) => v.getPoint().getID());
            // Do something here.
        }
    }
    for (const polymesh of model.getGeom().getObjs(gs.EObjType.polymesh)) {
        // Do something here with your polymeshes.
        // For example, get the wires and faces
        const wires: gs.IWire[] = polymesh.getWires();
        for (const wire of wires) {
            const is_closed: boolean = wire.isClosed();
            const point_IDs: number[] = wire.getVertices().map((v, i) => v.getPoint().getID());
            // Do something here.
        }
        const faces: gs.IFace[] = polymesh.getFaces();
        for (const face of faces) {
            const point_IDs: number[] = face.getVertices().map((v, i) => v.getPoint().getID());
            // Do something here.
        }

    }
}
