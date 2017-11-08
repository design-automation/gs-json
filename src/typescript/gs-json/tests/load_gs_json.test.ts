import {} from 'jasmine';
import * as model_tests from "../utils/model_tests";


//load an object
describe('Load object', () => {
	// passing test
    it('load an object', () => {
        expect( model_tests.test_load_object() ).toBe(true);
    });

});

//loop through file names and test loading of the gs-json data
describe('Load gs files from assets folder', () => {
	let names:string[] = ["box", "box_split_points", "box_with_attribs", "grid", "mixed", "pig", "polyline", "torus"];
	//tests
	for (let name of names) {
	    it("load " + name + ".gs", () => {
	        expect( model_tests.test_load_file("./base/assets/gs-json/" + name +".gs") ).toBe(true);
	    });
	}	
});

