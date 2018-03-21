import * as three from "three";
import * as gs from "../../gs-json";

/**
 * Export the obj string
 */
export function exportObj(model: gs.IModel): string {
    // check that this is a model
    if (model.constructor.name !== "Model") {throw new Error("Invalid model.");}
    // create data string to store obj data
    let obj_str: string = "";
    // add points, and create a map
    const id_ix_map: Map<number, number> = new Map();
    const points: gs.IPoint[] = model.getGeom().getAllPoints();
    for (const [i, point] of points.entries()) {
        const xyz: gs.XYZ = point.getPosition();
        obj_str += "v " + xyz.join(" ") + " 1.0\n";
        id_ix_map.set(point.getID(), i + 1);
    }
    // add polymeshes
    const pmeshes: gs.IPolymesh[] = model.getGeom().findObjs(gs.EObjType.polymesh) as gs.IPolymesh[];
    for (const pmesh of pmeshes) {
        const groups: string[] = pmesh.getGroups().map((g) => g.getName());
        obj_str += "g " + groups.join(" ") + " o" + pmesh.getID() + "\n";
        for (const face of pmesh.getFaces()) {
            const point_ids: number[] = face.getVertices().map((v) => v.getPoint().getID());
            const point_ixs: number[] = point_ids.map((id) => id_ix_map.get(id));
            obj_str += "f " + point_ixs.join(" ") + "\n";
        }
    }
    // add polylines
    const plines: gs.IPolyline[] = model.getGeom().findObjs(gs.EObjType.polyline) as gs.IPolyline[];
    for (const pline of plines) {
        const groups: string[] = pline.getGroups().map((g) => g.getName());
        obj_str += "g " + groups.join(" ") + " o" + pline.getID() + "\n";
        const point_ids: number[] = pline.getPointsArr().map((p) => p.getID());
        const point_ixs: number[] = point_ids.map((id) => id_ix_map.get(id));
        obj_str += "l " + point_ixs.join(" ") + "\n";
    }
    // return the obj string
    return obj_str;
}
