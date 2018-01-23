import * as gs from "./_export";

export function test_genModelCircles(): boolean {
    const m: gs.IModel = gs.genModelCircles();
    const three = gs.genThreeOptModelAndMaps(m);
    return true;
}

export function test_genModelOpenPolyline(): boolean {
    const m: gs.IModel = gs.genModelOpenPolyline();
    const three = gs.genThreeOptModelAndMaps(m);
    // console.log(m, three);
    return true;
}
