import * as gs from "../../utils/gs-json";

/**
* This is an example function that reads a file with some gs-json data.
* It then calls exportThreejsData() 
*/
export function exportThreejsUrl(url:string):boolean {
	//For example, the url can be "./base/assets/gs-json/box.gs"
	let xmlhttp = new XMLHttpRequest();
	let data: gs.IModelData;
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        data = JSON.parse(this.responseText);
	        let model:gs.IModel = new gs.Model();
	        model.setData(data);
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

export function exportThreejsData(model:gs.IModel):void {
	for (let p of model.getGeom().getPoints()) {
		//Do something here with your points
		//For example, get the position of each point
		let xyz:number[] = p.getPosition();
	}
	for (let polyline of model.getGeom().getObjs(gs.EObjType.polymesh)) {
		//Do something here with your polylines
		//For example, get the wires and faces
		let wires:gs.IWire[] = polyline.getWires();
		for (let wire of wires) {
			let is_closed:boolean = wire.isClosed();
			let point_IDs:number[] = wire.getVertices().map((v,i)=>v.getPoint().getID());
			//Do something here.
		}
	}
	for (let polymesh of model.getGeom().getObjs(gs.EObjType.polymesh)) {
		//Do something here with your polymeshes.
		//For example, get the wires and faces
		let wires:gs.IWire[] = polymesh.getWires();
		for (let wire of wires) {
			let is_closed:boolean = wire.isClosed();
			let point_IDs:number[] = wire.getVertices().map((v,i)=>v.getPoint().getID());
			//Do something here.
		}
		let faces:gs.IFace[] = polymesh.getFaces();
		for (let face of faces) {
			let point_IDs:number[] = face.getVertices().map((v,i)=>v.getPoint().getID());
			//Do something here.
		}

	}
}