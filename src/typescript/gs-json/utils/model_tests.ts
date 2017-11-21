import * as gsj from "./gs-json"
import * as test_data from "./test_data";

export function test_setData2 (url:string):boolean {
	let xmlhttp = new XMLHttpRequest();
	let data: gsj.IModelData;
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
    let model:gsj.IModel = new gsj.Model();
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
    let model:gsj.IModel = new gsj.Model();
    model.setData(test_data.box);
    if (model.getGeom().numObjs() != 5) {return false;}
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