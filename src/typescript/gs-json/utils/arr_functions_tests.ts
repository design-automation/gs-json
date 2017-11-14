import {Arr} from "./arr_functions";

export function test_arr_make():boolean {
	let a:number[] = Arr.make(10, 5);
	if (a[0] != 5) {return false;}
	if (a[9] != 5) {return false;}
	if (a.length != 10) {return false;}
	return true;
}

export function test_arr_equal():boolean {
	if (!Arr.equal([1,2,3],[1,2,3])) {return false;}
	if (Arr.equal([1,2,3], [1,2])) {return false;}
	if (Arr.equal([1,2], [1,2,3])) {return false;}
	if (!Arr.equal([1.1,2.2], [1.1,2.2])) {return false;}
	if (!Arr.equal([], [])) {return false}
	if (!Arr.equal([null,null], [null,null])) {return false}
	return true;
}

export function test_arr_indexOf():boolean {
	console.log(Arr.indexOf([1,2],[[],[2],[1,2],[3,4]]));
	if (Arr.indexOf([1,2],[[],[2],[1,2],[3,4]]) != 2) {return false;}
	if (Arr.indexOf([1,null],[[],[1,null],[2],[1,null],[3,4]]) != 1) {return false;}
	if (Arr.indexOf([1,3],[[],[1,null],[2],[1,null],[3,4]]) != -1) {return false;}
	return true;
}

export function test_arr_flatten():boolean {
	console.log(Arr.indexOf([1,2],[[],[2],[1,2],[3,4]]));
	if (!Arr.equal(Arr.flatten([[],[2],[1,2],[3,4]]), [2,1,2,3,4])) {return false;}
	return true;
}

export function test_arr_deepCopy():boolean {
	let x:any[] = [1,2,[3,4,[5,6,[7,8]]]];
	let y:any[] = Arr.deepCopy(x);
	y[2][1] = 100;
 	console.log(Arr.indexOf([1,2],[[],[2],[1,2],[3,4]]));
	if (x[2][1] != 4) {return false;}
	return true;
}