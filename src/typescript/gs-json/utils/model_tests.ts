import * as gs from "./gs-json";
import * as test_data from "./test_data";

export function test_setData2 (url:string):boolean {
	let xmlhttp = new XMLHttpRequest();
	let data: gs.IModelData;
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        data = JSON.parse(this.responseText);
	    }
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	return true;
}

export function test_constructor():boolean {
    let model:gs.IModel = new gs.Model();
    if (!model) {return false;}
    return true;
}
export function test_Model_constructor():boolean {
    return true;
}
export function test_Model_getGeom():boolean {
    return true;
}
export function test_Model_setData():boolean {
    let model:gs.IModel = new gs.Model();
    //model with no attribs
    model.setData(test_data.box);
    if (model.getGeom().numObjs() != 1) {return false;}
    if (model.getGeom().numPoints() != 8) {return false;}
    if (model.getGeom().getObj(0).numFaces() != 5) {return false;}
    if (! gs.Arr.equal(
        model.getGeom().getObj(0).getFaces()[4].getVertices().
            map((v,i)=>v.getPoint().getID()), [5, 6, 7, 4])) {return false;}
    //model with attribs
    model.setData(test_data.box_with_attribs);
    let attribs:gs.IAttrib[] = model.getAttribs(gs.EGeomType.vertices);
    if (attribs[0].getName() != "test2") {return false;}
    if (model.getGeom().getObj(0).getFaces()[0].getAttribValue("test3") != 2.0) {return false;}
    return true;
}
export function test_Model_getAttribs():boolean {
    return true;
}
export function test_Model_getAttrib():boolean {
    return true;
}
export function test_Model_addAttrib():boolean {
    return true;
}
export function test_Model_delAttrib():boolean {
    return true;
}
export function test_Model_getGroups():boolean {
    return true;
}
export function test_Model_getGroup():boolean {
    return true;
}
export function test_Model_addGroup():boolean {
    return true;
}
export function test_Model_delGroup():boolean {
    return true;
}
export function test_Model_purgePoints():boolean {
    return true;
}
export function test_Model_purgeNulls():boolean {
    return true;
}
export function test_Model_validateModel():boolean {
    return true;
}