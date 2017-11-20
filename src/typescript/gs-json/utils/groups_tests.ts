import * as gsj from "./gs-json";

export function test_xxx():boolean {
    return true;
}


export function test_group_methods():boolean{
let Model_1:gsj.Model = new gsj.Model();
    Model_1.addGroup("First_Group");
    Model_1.addGroup("Second_Group");
    Model_1.addGroup("Third_Group");
    Model_1.delGroup("Second_Group");
    Model_1.getGroup("Third_Group").setName("Third, renamed as Second");
    Model_1.getGroups(); // Get Groups show two names per group
    return true;
}