// Some utility functions for arrays
/**
 * A set of static methds for working with arrays.
 */
export class Arr {
    /**
    * Make an array of numbers. All elements in the array will have the same value. 
    * @param length  The length of the new array. If length is 0, then an empty array is returned.
    * @param value    The values in the array.
    * @returns        The resulting array.
    */
    public static make(length:number, value:any):number[] {
        if (length==0) {return [];}
        return Array.apply(0, new Array(length)).map((v,i)=>value);
    }
    /**
    * Make an array of numbers. All elements in the array will be a numerical sequence, 0, 1, 2, 3.... 
    * @param   The length of the new array. If length is 0, then an empty array is returned.
    * @returns The resulting array.
    */
    public static makeSeq(length:number):number[] {
        if (length==0) {return [];}
        return Array.apply(0, new Array(length)).map((v,i)=>i);
    }
    /**
    * Check if two 1D arrays are equal (i.e. that all elements in the array are equal, ==.). 
    * If the arrays are unequal in length, false is returned.
    * Elements in the array can have any value.
    * @param The first array.
    * @param The second array.
    * @returns True or false.
    */
    public static equal(arr1: any[], arr2: any[]): boolean {
        if (arr1 === undefined || arr2 === undefined) {return false;}
        if (arr1 === null && arr2 === null) {return true;} //both are null
        if (arr1 === null || arr2 === null) {return false;} //only one is null
        if (arr1.length != arr2.length) {
            return false;
        }
        for (let i:number=0;i<arr1.length;i++) {
            if (arr1[i] != arr2[i]) {
                return false;
            }
        }
        return true;
    }
    /**
    * Find the index of an element in a 1D array. 
    * The element can be an array (which is not the case for Array.indexOf()).
    * If the element is not found or is undefined, return -1.
    * If the array is null or undefined, return -1.
    * @param The element, can be a value or a 1D array of values. 
    * @returns The index in the array of the first occurance of the element.
    */
    public static indexOf(element:any, arr:any[]):number {
        if (element === undefined || arr === undefined) {return -1;}
        if (arr === null) {return -1;}
        if (!Array.isArray(element)) {return arr.indexOf(element)};
        for (let i:number=0;i<arr.length;i++) {
            if (Array.isArray(arr[i]) && this.equal(element,arr[i])) {
                return i;
            }
        }
        return -1;
    }
    /**
    * Take an nD array and flattens it. 
    * A new array is returned. The input array remains unchanged. 
    * For example, [1,2,[3,4],[5,6]] will become [1,2,3,4,5,6].
    * If the input array is undefined, an empty array is returned.
    * @param The multidimensional array to flatten. 
    * @returns A new 1D array.
    */
    public static flatten(arr:any[]):any[] {
        if (arr === undefined) {return [];}
        return arr.reduce(function (flat, toFlatten) {
            return flat.concat(Array.isArray(toFlatten) ? Arr.flatten(toFlatten) : toFlatten);
        }, []);
    }
    /**
    * Make a copy of an nD array. 
    * A new array is returned. The input array remains unchanged. 
    * If the input array is undefined, an empty array is returned.
    * If the input is s sparse array, then the output will alos be a sparse array.
    * @param The nD array to copy. 
    * @returns The new nD array.
    */
    public static deepCopy(arr:any[]):any[] {
        if (arr === undefined) {return [];}
        let arr2:any[] = [];
        for (let i:number=0;i<arr.length;i++) {
            if (Array.isArray(arr[i])) {
                arr2[i] = (Arr.deepCopy(arr[i]));
            } else {
                if (arr[i] !== undefined) {
                    arr2[i] = (arr[i]);
                }
            }
        }
        return arr2;
    }
    /**
    * Fills an nD array with new values (all the same value). 
    * The input is changed. 
    * If the input array is undefined, an empty array is returned.
    * The input can be a sparse array.
    * @param The nD array to fill. 
    */
    public static deepFill(arr:any[], value:any):void {
        if (arr === undefined) {return;}
        for (let i:number=0;i<arr.length;i++) {
            if (Array.isArray(arr[i])) {
                Arr.deepFill(arr[i], value);
            } else {
                if (arr[i] !== undefined) {
                    arr[i] = value;
                }
            }
        }
    }
    /**
    * Counts the number of values in an nD array . 
    * The input array remains unchanged.  
    * If the input array is undefined, 0 is returned.
    * The input can be a sparse array. Undefined values are ignored.
    For example, for [1,2,,,3], the count will be 3.
    * @param The nD array to count.
    * @return The number of elements in the nD array. 
    */
    public static deepCount(arr:any[]):number {
        if (arr === undefined) {return 0;}
        let a:number = 0 ;
        for (let i:number=0;i<arr.length;i++){
            if (Array.isArray(arr[i])) {
                a = a + Arr.deepCount(arr[i])
            } else {
                if (arr[i] !== undefined) {
                    a = a + 1 ;
                }
            }
        }
        return a ;
    }
}