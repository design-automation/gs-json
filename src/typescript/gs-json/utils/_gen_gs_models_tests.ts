import * as gs from "./_export";

export function test_genModelCircles(): boolean {
    const m: gs.IModel = gs.genModelCircles();
    const result = gs.genThreeOptModelAndMaps(m);
    console.log(result);
    return true;
}
