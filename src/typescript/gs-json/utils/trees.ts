// paths
function treeHasPath(tree: any[], path: number[], i: number): boolean {
    if (tree[path[i]] === undefined) {return false; }
    if (i === path.length - 1) {return tree[path[i]].constructor === Array; }
    return treeHasPath(tree[path[i]], path, i + 1);
}
function treeAddPath(tree: any[], path: number[], i: number): void {
    if (tree[path[i]] === undefined) {tree[path[i]] = []; }
    if (i === path.length - 1) {return; }
    treeAddPath(tree[path[i]], path, i + 1);
}
function treeDelPath(tree: any[], path: number[], i: number): boolean {
    if (tree[path[i]] === undefined) {return false; }
    if (i === path.length - 1) {delete tree[path[i]]; return true; }
    return treeDelPath(tree[path[i]], path, i + 1);
}
// values
function treeHasValue(tree: any[], path: number[], value: any, i: number): boolean {
    if (tree[path[i]] === undefined) {return false; }
    if (i === path.length - 1) {return tree[path[i]] === value; }
    return treeHasValue(tree[path[i]], path, value, i + 1);
}
function treeAddValue(tree: any[], path: number[], value: any, i: number): void {
    if (tree[path[i]] === undefined) {
        if (i === path.length - 1) {tree[path[i]] = value; return; } else {tree[path[i]] = []; }
    }
    treeAddValue(tree[path[i]], path, value, i + 1);
}
function treeDelValue(tree: any[], path: number[], value: any, i: number): boolean {
    if (tree[path[i]] === undefined) {return false; }
    if (i === path.length - 1) {delete tree[path[i]]; return true; }
    return treeDelValue(tree[path[i]], path, value, i + 1);
}
// arrays
function treeFlatten(tree: any[], path: number[], result: any[],
): any[] {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].constructor !== Array) {
            result.push([[...path, i], tree[path[i]]]);
        } else {
            treeFlatten(tree[i], [...path, i], result);
        }
    }
    return result;
}
export class Tree {
    private _tree: any[];
    constructor(data?: any[]) {
        if (data === undefined) {
            this._tree = [];
        } else {
            this._tree = data;
        }
    }
    // paths
    public hasPath(path: number[]): boolean {
        return treeHasPath(this._tree, path, 0);
    }
    public addPath(path: number[]): void {
        treeAddPath(this._tree, path, 0);
    }
    public delPath(path: number[]): boolean {
        return treeDelPath(this._tree, path, 0);
    }
    // values
    public hasValue(path: number[], value: any): boolean {
        return treeHasValue(this._tree, path, value, 0);
    }
    public addValue(path: number[], value: any): void {
        treeAddValue(this._tree, path, value, 0);
    }
    public delValue(path: number[], value: any): boolean {
        return treeDelValue(this._tree, path, value, 0);
    }
    // arrays
    public flatten(): number[][] {
        return treeFlatten(this._tree, [], []);
    }
    public toArray(): any[] {
        return this._tree;
    }
    public fromArray(arr: any[]): void {
        this._tree = arr;
    }
}
