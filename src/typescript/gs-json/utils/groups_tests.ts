import * as gs from "./gs-json";

export function test_xxx():boolean {
    return true;
}


export function test_group_methods():boolean{
let Model_1:gs.Model = new gs.Model();
    Model_1.addGroup("First_Group");
    Model_1.addGroup("Second_Group");
    Model_1.addGroup("Third_Group");
    Model_1.delGroup("Second_Group");
    Model_1.getGroup("Third_Group").setName("Third, renamed as Second");
    Model_1.getGroups(); // Get Groups show two names per group
    return true;
}


// Testing methods the Groups Class, composed of 1 constructor and 17 methods
export function test_Groups_constructor():boolean{
	return true;
}
export function test_Groups_getName():boolean{
	return true;
}
export function test_Groups_setName():boolean{
	return true;
}
export function test_Groups_getParentGroup():boolean{
	return true;
}
export function test_Groups_getChildGroups():boolean{
	return true;
}
export function test_Groups_setParentGroup():boolean{
	return true;
}
export function test_Groups_removeParentGroup():boolean{
	return true;
}
export function test_Groups_getPointIDs():boolean{
	return true;
}
export function test_Groups_addPoint():boolean{
	return true;
}
export function test_Groups_addPoints():boolean{
	return true;
}
export function test_Groups_removePoint():boolean{
	return true;
}
export function test_Groups_removePoints():boolean{
	return true;
}
export function test_Groups_getObjIDs():boolean{
	return true;
}
export function test_Groups_addObj():boolean{
	return true;
}
export function test_Groups_addObjs():boolean{
	return true;
}
export function test_Groups_removeObj():boolean{
	return true;
}
export function test_Groups_removeObjs():boolean{
	return true;
}
export function test_Groups_getPropeties():boolean{
	return true;
}