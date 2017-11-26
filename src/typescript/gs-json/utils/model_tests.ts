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

export function test_Model_constructor():boolean {
    let model:gs.IModel 
    model = new gs.Model(test_data.box);
    //model with no attribs
    if (model.getGeom().numObjs() != 1) {return false;}
    if (model.getGeom().numPoints() != 8) {return false;}
    if (model.getGeom().getObj(0).numFaces() != 5) {return false;}
    if (! gs.Arr.equal(
        model.getGeom().getObj(0).getFaces()[4].getVertices().
            map((v,i)=>v.getPoint().getID()), [5, 6, 7, 4])) {return false;}
    //model with attribs
    model = new gs.Model(test_data.box_with_attribs);
    let attribs:gs.IAttrib[] = model.getAttribs(gs.EGeomType.vertices);
    if (attribs[0].getName() != "test2") {return false;}
    if (model.getGeom().getObj(0).getFaces()[0].getAttribValue("test3") != 2.0) {return false;}
    //model with groups
    model = new gs.Model(test_data.box_with_groups);
    model.getGroups();
    let grp:gs.IGroup = model.getGroup("building_obj");
    return true;
}
export function test_Model_getGeom():boolean {
    let m:gs.Model = new gs.Model();
    m.getGeom();
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
    let m:gs.Model = new gs.Model();
    m.addGroup("first_group");
    m.getGroup("first_group");
    m.getGroup("non_existent_group");
    return true;
}
export function test_Model_addGroup():boolean {
    let m:gs.Model = new gs.Model();
    m.addGroup("First_Group");
    m.addGroup("Second_Group");
    m.addGroup("Third_Group");
    m.delGroup("Second_Group");
    return true;
}

export function test_Model_hasGroup():boolean {
    let m:gs.Model = new gs.Model();
    m.addGroup("First_Group");
    if (!m.hasGroup("First_Group")) {return false;}
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