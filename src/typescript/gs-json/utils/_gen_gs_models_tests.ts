import * as gs from "./_export";

export function test_genModelCircles(): boolean {
    const m: gs.IModel = gs.genModelCircles();
    gs.genThreeOptModel(m);
    return true;
}
