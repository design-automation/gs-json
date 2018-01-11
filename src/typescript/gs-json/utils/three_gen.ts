import * as gs from "./gs-json";
import * as fs from "fs";
import * as three from "three";
import * as threeg from "./three_geom";
import * as threes from "./three_scene";

/**
 * Add Ray
 */
function addRay(scene: gs.IThreeScene, ray: gs.IRay, materials: gs.IThreeMaterial[]): void {
    const group: gs.IThreeObj = threes.genGroup(ray.getID() + "_ConicCurve");
    threes.addGroupToScene(scene, group);
    const geom: gs.IThreeBufferedGeom = threes.genGeom(threeg.getLinesFromRay(ray)[0]);
    threes.addGeomToScene(scene, geom);
    threes.addObjToGroup(group, threes.genObj("Line", "Ray", geom, materials[0]));
    threes.addSpriteToScene(scene, group, "Vertices", threeg.getSpritesFromVertices(ray));
    threes.addSpriteToScene(scene, group, "Objs", [threeg.getSpriteFromObj(ray)]);
}

/**
 * Add Plane
 */
function addPlane(scene: gs.IThreeScene, plane: gs.IPlane, materials: gs.IThreeMaterial[]): void {
    const group: gs.IThreeObj = threes.genGroup(plane.getID() + "_ConicCurve");
    threes.addGroupToScene(scene, group);
    const geom: gs.IThreeBufferedGeom = threes.genGeom(threeg.getLinesFromPlane(plane)[0]);
    threes.addGeomToScene(scene, geom);
    threes.addObjToGroup(group, threes.genObj("Line", "Plane", geom, materials[0]));
    threes.addSpriteToScene(scene, group, "Vertices", threeg.getSpritesFromVertices(plane));
    threes.addSpriteToScene(scene, group, "Objs", [threeg.getSpriteFromObj(plane)]);
}

/**
 * Add Circle
 */
function addCircle(scene: gs.IThreeScene, circle: gs.ICircle, materials: gs.IThreeMaterial[]): void {
    const group: gs.IThreeObj = threes.genGroup(circle.getID() + "_Circle");
    threes.addGroupToScene(scene, group);
    const geom: gs.IThreeBufferedGeom = threes.genGeom(threeg.getLinesFromCircle(circle, 0.1)[0]);
    threes.addGeomToScene(scene, geom);
    if (circle.isClosed()) {
        threes.addObjToGroup(group, threes.genObj("LineLoop", "Circle", geom, materials[0]));
    } else {
        threes.addObjToGroup(group, threes.genObj("Line", "Arc", geom, materials[0]));
    }
    threes.addSpriteToScene(scene, group, "Vertices", threeg.getSpritesFromVertices(circle));
    threes.addSpriteToScene(scene, group, "Objs", [threeg.getSpriteFromObj(circle)]);
}

/**
 * Add Ellipse
 */
function addEllipse(scene: gs.IThreeScene, ellipse: gs.IEllipse, materials: gs.IThreeMaterial[]): void {
    const group: gs.IThreeObj = threes.genGroup(ellipse.getID() + "_Ellipse");
    threes.addGroupToScene(scene, group);
    const geom: gs.IThreeBufferedGeom = threes.genGeom(threeg.getLinesFromEllipse(ellipse, 0.1)[0]);
    threes.addGeomToScene(scene, geom);
    if (ellipse.isClosed()) {
        threes.addObjToGroup(group, threes.genObj("LineLoop", "Ellipse", geom, materials[0]));
    } else {
        threes.addObjToGroup(group, threes.genObj("Line", "EllipticArc", geom, materials[0]));
    }
    threes.addSpriteToScene(scene, group, "Vertices", threeg.getSpritesFromVertices(ellipse));
    threes.addSpriteToScene(scene, group, "Objs", [threeg.getSpriteFromObj(ellipse)]);
}

/**
 * Add polyline
 */
function addPolyline(scene: gs.IThreeScene, polyline: gs.IPolyline, materials: gs.IThreeMaterial[]): void {
    const group: gs.IThreeObj = threes.genGroup(polyline.getID() + "_Polyline");
    threes.addGroupToScene(scene, group);
    const geom: gs.IThreeBufferedGeom = threes.genGeom(threeg.getLinesFromWires(polyline)[0]);
    threes.addGeomToScene(scene, geom);
    if (polyline.isClosed()) {
        threes.addObjToGroup(group, threes.genObj("LineLoop", "Polyline", geom, materials[0]));
    } else {
        threes.addObjToGroup(group, threes.genObj("Line", "Polyline", geom, materials[0]));
    }
    threes.addSpriteToScene(scene, group, "Vertices", threeg.getSpritesFromVertices(polyline));
    threes.addSpriteToScene(scene, group, "Edges", threeg.getSpritesFromEdges(polyline));
    threes.addSpriteToScene(scene, group, "Objs", [threeg.getSpriteFromObj(polyline)]);
}

/**
 * Add polymesh
 */
function addPolymesh(scene: gs.IThreeScene, polymesh: gs.IPolymesh, materials: gs.IThreeMaterial[]): void {
    const group: gs.IThreeObj = threes.genGroup(polymesh.getID() + "_Polymesh");
    threes.addGroupToScene(scene, group);
    const data:{ xyzs_flat: number[], indexes: number[]} = threeg.getMeshFromFaces(polymesh);
    const mesh_geom: gs.IThreeBufferedGeom = threes.genGeom(data.xyzs_flat, data.indexes);
    threes.addGeomToScene(scene, mesh_geom);
    threes.addObjToGroup(group, threes.genObj("Mesh", "Polymesh Faces", mesh_geom, materials[2]));
    for (const line of threeg.getLinesFromWires(polymesh)) {
        const line_geom: gs.IThreeBufferedGeom = threes.genGeom(line);
        threes.addGeomToScene(scene, line_geom);
        threes.addObjToGroup(group, threes.genObj("LineLoop", "Polymesh Wires", line_geom, materials[1]));
    }
    const edge_geom: gs.IThreeBufferedGeom = threes.genGeom(threeg.getLineSegmentsFromEdges(polymesh));
    threes.addGeomToScene(scene, edge_geom);
    threes.addObjToGroup(group, threes.genObj("LineSegments", "Polymesh Face Edges", edge_geom, materials[0]));
    threes.addSpriteToScene(scene, group, "Vertices", threeg.getSpritesFromVertices(polymesh));
    threes.addSpriteToScene(scene, group, "Edges", threeg.getSpritesFromEdges(polymesh));
    threes.addSpriteToScene(scene, group, "Wires", threeg.getSpritesFromWires(polymesh));
    threes.addSpriteToScene(scene, group, "Faces", threeg.getSpritesFromFaces(polymesh));
    threes.addSpriteToScene(scene, group, "Objs", [threeg.getSpriteFromObj(polymesh)]);
}

/**
 * Generate the model.
 */
export function genThreeModel(model: gs.IModel): gs.IThreeScene {
    if (model.constructor.name !== "Model") {throw new Error("Invalid model.");}
    const scene: gs.IThreeScene = threes.genScene();
    const mats: gs.IThreeMaterial[] = threes.genDefaultMaterials();
    threes.addMatsToScene(scene, mats);
    for (const obj of model.getGeom().getAllObjs()) {
        switch (obj.getObjType()) {
            case gs.EObjType.ray:
                addRay(scene, obj as gs.IRay, mats);
                break;
            case gs.EObjType.plane:
                addPlane(scene, obj as gs.IPlane, mats);
                break;
            case gs.EObjType.circle:
                addCircle(scene, obj as gs.ICircle, mats);
                break;
            case gs.EObjType.ellipse:
                addEllipse(scene, obj as gs.IEllipse, mats);
                break;
            case gs.EObjType.polyline:
                addPolyline(scene, obj as gs.IPolyline, mats);
                break;
            case gs.EObjType.polymesh:
                addPolymesh(scene, obj as gs.IPolymesh, mats);
                break;
            default:
                console.log("Ignoring geometry of type: ", obj.getObjType());
        }
    }
    return scene;
}
