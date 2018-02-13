/**
 * A set of static methods for working with arrays of simple types.
 * The arrays can be nested, but they do not contain any objects.
 */
export declare class Arr {
    /**
     * Make an array of numbers. All elements in the array will have the same value.
     * @param length The length of the new array. If length is 0, then an empty array is returned.
     * @param value The values in the array.
     * @returns The resulting array.
     */
    static make(length: number, value: any): number[];
    /**
     * Make an array of numbers. All elements in the array will be a numerical sequence, 0, 1, 2, 3....
     * @param length  The length of the new array. If length is 0, then an empty array is returned.
     * @returns The resulting array.
     */
    static makeSeq(length: number): number[];
    /**
     * Check if two nD arrays are equal (i.e. that all elements in the array are equal, ===.).
     * If the arrays are unequal in length, false is returned.
     * Elements in the array can have any value.
     * @param arr1 The first value.
     * @param arr2 The second values.
     * @returns True or false.
     */
    static equal(arr1: any, arr2: any): boolean;
    /**
     * Find the position of the first occurrence of a specified value in an array.
     * The value can be an array (which is not the case for Array.indexOf()).
     * If the value is not found or is undefined, return -1.
     * If the array is null or undefined, return -1.
     * @param value The value, can be a value or a 1D array of values.
     * @returns The index in the array of the first occurance of the value.
     */
    static indexOf(arr: any[], value: any): number;
    /**
     * Replace all occurrences of a specified value in an array.
     * The input array is changed.
     * The value can be an array.
     * If the value is not found or is undefined, return -1.
     * @param old_value The old value to replace.
     * @param new_value The new value.
     * @param arr The array.
     */
    static replace(arr: any[], old_value: any, new_value: any): void;
    /**
     * Take an nD array and flattens it.
     * A new array is returned. The input array remains unchanged.
     * For example, [1, 2, [3, 4], [5, 6]] will become [1, 2, 3, 4, 5, 6].
     * If the input array is undefined, an empty array is returned.
     * @param arr The multidimensional array to flatten.
     * @returns A new 1D array.
     */
    static flatten(arr: any[], depth?: number): any[];
    /**
     * Make a copy of an nD array.
     * If the input is not an array, then just return the same thing.
     * A new array is returned. The input array remains unchanged.
     * If the input array is undefined, an empty array is returned.
     * If the input is s sparse array, then the output will alos be a sparse array.
     * @param arr The nD array to copy.
     * @returns The new nD array.
     */
    static deepCopy(arr: any[]): any[];
    /**
     * Fills an nD array with new values (all the same value).
     * The input array is changed.
     * If the input array is undefined, an empty array is returned.
     * The input can be a sparse array.
     * @param arr The nD array to fill.
     * @param value The value to insert into the array.
     */
    static deepFill(arr: any[], value: any): void;
    /**
     * Counts the number of values in an nD array .
     * The input array remains unchanged.
     * If the input array is undefined, 0 is returned.
     * The input can be a sparse array. Undefined values are ignored.
     * For example, for [1, 2, , , 3], the count will be 3.
     * @param arr The nD array to count.
     * @return The number of elements in the nD array.
     */
    static deepCount(arr: any[]): number;
}
