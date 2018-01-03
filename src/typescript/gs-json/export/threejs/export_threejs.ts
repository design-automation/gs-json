import * as gs from "../../utils/gs-json";
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

    for (const p of model.getGeom().getPoints()) {
        // Do something here with your points
        // For example, get the position of each point
        const xyz: number[] = p.getPosition();
    }

    for (const obj of model.getGeom().getObjs()) {
        //const data: gs.IThreeData = obj.getRenderData();
        // Do something here with the daata
        // Create a mesh, if it exists
        // if (data.tri_mesh !== undefined ) {
        //     for (const point of data.tri_mesh.points) {
        //         // geometry.vertices.push(new THREE.Vector3( ...point ));
        //     }
        //     for (const face of data.tri_mesh.faces) {
        //         // geometry.faces.push( new THREE.Face3( ...face ) );
        //     }
        // }
        // if (data.wires !== undefined ) {
        //     for (const wire of data.wires) {
        //         for (const point of wire.points) {
        //             // geometry.vertices.push(new THREE.Vector3( ...point ));
        //         }
        //         if (wire.is_closed) {
        //             // line = new THREE.Line( geometry, material );
        //         } else {
        //             // line_loop = new THREE.LineLoop( geometry, material );
        //         }
        //     }
        // }

    }
}
