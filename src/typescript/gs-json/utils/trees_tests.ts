import {Tree} from "./trees";

export function test_Tree_constructor(): boolean {
    const t: Tree = new Tree();
    return true;
}

export function test_Tree_addPath(): boolean {
    const t: Tree = new Tree();
    t.addPath([7, 2, 3]);
    t.addPath([4, 5, 6, 22, 4, 5]);
    t.addPath([2, 2, 2, 2]);
    return true;
}
export function test_Tree_hasPath(): boolean {
    const t: Tree = new Tree();
    t.addPath([7, 2]);
    if (!t.hasPath([7, 2])) {return false; }
    if (t.hasPath([7, 2, 4])) {return false; }
    if (t.hasPath([2, 2, 3])) {return false; }
    return true;
}
export function test_Tree_delPath(): boolean {
    const t: Tree = new Tree();
    t.addPath([7, 2]);
    t.delPath([7, 2]);
    if (t.hasPath([7, 2])) {return false; }
    return true;
}

export function test_Tree_addValue(): boolean {
    const t: Tree = new Tree();
    t.addValue([7, 2, 3], 66);
    t.addValue([2, 2, 2, 2], 2);
    return true;
}
export function test_Tree_hasValue(): boolean {
    const t: Tree = new Tree();
    t.addValue([7, 2], 5);
    if (!t.hasValue([7, 2], 5)) {return false; }
    if (t.hasValue([7, 2, 4], 5)) {return false; }
    if (t.hasValue([7, 2], 6)) {return false; }
    return true;
}
export function test_Tree_delValue(): boolean {
    const t: Tree = new Tree();
    t.addValue([7, 2], 5);
    t.delValue([7, 2], 5);
    if (t.hasValue([7, 2], 5)) {return false; }
    return true;
}
