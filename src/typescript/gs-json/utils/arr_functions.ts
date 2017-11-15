// Some utility functions for number arrays
export class Arr {
    public static make(length:number, value:any):number[] {
        return Array.apply(0, new Array(length)).map((v,i)=>value);
    }
    public static equal(arr1: number[], arr2: number[]): boolean {
        if (arr1 === undefined || arr2 === undefined) {return false;}
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
    public static indexOf(arr1:number[], arr2:number[][]):number {
        if (arr1 === undefined || arr2 === undefined) {return -1;}
        for (let i:number=0;i<arr2.length;i++) {
            if (this.equal(arr1,arr2[i])) {
                return i;
            }
        }
        return -1;
    }
    public static flatten(arr:any[]) {
        if (arr === undefined) {return;}
        return arr.reduce(function (flat, toFlatten) {
            return flat.concat(Array.isArray(toFlatten) ? Arr.flatten(toFlatten) : toFlatten);
        }, []);
    }
    public static deepCopy(arr:any[]):any[] {
        if (arr === undefined) {return;}
        let arr2:any[] = [];
        for (let i:number=0;i<arr.length;i++) {
            if (Array.isArray(arr[i])) {
                arr2.push(this.deepCopy(arr[i]));
            } else {
                arr2.push(arr[i]);
            }
        }
        return arr2;
    }
    public static deepFill(arr:any[], value:any):void {
        if (arr === undefined) {return;}
        for (let i:number=0;i<arr.length;i++) {
            if (Array.isArray(arr[i])) {
                this.deepFill(arr[i], value);
            } else {
                arr[i] = value;
            }
        }
    }
    
    public static deepCount(arr:any[]):number {
    let a:number = 0 ;
        for (let i:number=0;i<arr.length;i++){
            if (arr[i].length == undefined ) {
            a = a + 1 ;
                } else {
            a = a + this.deepCount(arr[i])
                        }
        }
    return a ;
    }
}