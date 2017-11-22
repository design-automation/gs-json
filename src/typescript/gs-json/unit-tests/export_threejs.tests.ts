import {} from 'jasmine';
import * as export_threejs from "../export/threejs/export_threejs_tests";

describe('Tests for exportThreejs functions', () => {

	it('test_exportThreejsUrl', () => {
        expect(export_threejs.test_exportThreejsUrl() ).toBe(true);
    });

});