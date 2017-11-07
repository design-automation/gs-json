import {} from 'jasmine';
import { Math } from './utils/Math';

describe('Simple-Math', () => {

	// passing test
    it('subtracts 2 numbers', () => {
        expect( Math.subtract(2, 4) ).toBe(-2);
    });

    // passing test
    it('adds 2 numbers', () => {
        expect( Math.add(2, 4) ).toBe(6);
    });

    // failing test
    it('multiplies 2 numbers', ()=>{
    	expect( Math.multiply(2, 4) ).toBe(5) ;
    })

});

describe('Complex-Math', () => {

	// passing test
    it('factorial of number ', () => {
        expect( Math.factorial(4) ).toBe(24);
    });


});