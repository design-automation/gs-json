import * as gs from "./_export";
import * as td from "./test_data";

export function test_Face_getGeomType(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; // (0, gs.EGeomType.faces, 0);
    // const f: gs.IFace = new gs.Face(k, path);
    // if(gs.mapGeomTypeToString.get(f.getGeomType()) !== "faces") {return false;}
    return true;
}

export function test_Face_getVertices(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; // (0, gs.EGeomType.faces, 0);
    // const f: gs.IFace = new gs.Face(k, path);
    // const v: gs.IVertex[] = f.getVertices();
    // if(gs.mapGeomTypeToString.get(v[0].getWireOrFace().getGeomType()) !== "faces") {return false;}
    // if(gs.mapGeomTypeToString.get(v[1].getWireOrFace().getGeomType()) !== "faces") {return false;}
    // if(gs.mapGeomTypeToString.get(v[2].getWireOrFace().getGeomType()) !== "faces") {return false;}
    // if(gs.mapGeomTypeToString.get(v[3].getWireOrFace().getGeomType()) !== "faces") {return false;}
    return true;
}

export function test_Face_getEdges(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; // (0, gs.EGeomType.faces, 0);
    // const f: gs.IFace = new gs.Face(k, path);
    // const e: gs.IEdge[] = f.getEdges();
    // if(gs.mapGeomTypeToString.get(e[0].getWireOrFace().getGeomType()) !== "faces") {return false;}
    // if(gs.mapGeomTypeToString.get(e[1].getWireOrFace().getGeomType()) !== "faces") {return false;}
    // if(gs.mapGeomTypeToString.get(e[2].getWireOrFace().getGeomType()) !== "faces") {return false;}
    // if(gs.mapGeomTypeToString.get(e[3].getWireOrFace().getGeomType()) !== "faces") {return false;}
    return true;
}

export function test_Face_numVertices(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; // (0, gs.EGeomType.faces, 0);
    // const f: gs.IFace = new gs.Face(k, path);
    // if(!(f.numVertices() === 4)) {return false;}
    return true;
}

export function test_Face_numEdges(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; // (0, gs.EGeomType.faces, 0);
    // const f: gs.IFace = new gs.Face(k, path);
    // if(!(f.numEdges() === 4)) {return false;}
    return true;
}

export function test_Face_isClosed(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; // (0, gs.EGeomType.faces, 0);
    // const f: gs.IFace = new gs.Face(k, path);
    // if(!f.isClosed()) {return false;}
    return true;
}

export function test_Face_facesSharedPoints(): boolean {
    // METHOD NOT IMPLEMENTED YET
    // const k1: Kernel = new Kernel(td.open_box());
    // const path1: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; //(0, gs.EGeomType.faces, 0);
    // const f1: gs.IFace = new gs.Face(k1, path1);
    // if(!(f1.facesSharedPoints(1).length === 3)) {return false;}

    // const k2: Kernel = new Kernel(td.Random_Closed());
    // const path00: gs.ITopoPathData = {id: 0, tt: 1, ti: 0}; //(0, gs.EGeomType.faces, 0);
    // const f00: gs.IFace = new gs.Face(k2, path00);
    // const path01: gs.ITopoPathData = {id: 0, tt: 1, ti: 1}; //(0, gs.EGeomType.faces, 1);
    // const f01: gs.IFace = new gs.Face(k2, path01);
    // const path02: gs.ITopoPathData = {id: 0, tt: 1, ti: 2}; //(0, gs.EGeomType.faces, 2);
    // const f02: gs.IFace = new gs.Face(k2, path02);
    // const path03: gs.ITopoPathData = {id: 0, tt: 1, ti: 3}; //(0, gs.EGeomType.faces, 3);
    // const f03: gs.IFace = new gs.Face(k2, path03);
    // const path04: gs.ITopoPathData = {id: 0, tt: 1, ti: 4}; //(0, gs.EGeomType.faces, 4);
    // const f04: gs.IFace = new gs.Face(k2, path04);
    // const path05: gs.ITopoPathData = {id: 0, tt: 1, ti: 5}; //(0, gs.EGeomType.faces, 5);
    // const f05: gs.IFace = new gs.Face(k2, path05);
    // const path06: gs.ITopoPathData = {id: 0, tt: 1, ti: 6}; //(0, gs.EGeomType.faces, 6);
    // const f06: gs.IFace = new gs.Face(k2, path06);
    // const path07: gs.ITopoPathData = {id: 0, tt: 1, ti: 7}; //(0, gs.EGeomType.faces, 7);
    // const f07: gs.IFace = new gs.Face(k2, path07);
    // const path08: gs.ITopoPathData = {id: 0, tt: 1, ti: 8}; //(0, gs.EGeomType.faces, 8);
    // const f08: gs.IFace = new gs.Face(k2, path08);

    // if(!(f00.facesSharedPoints().length === 6)) {return false;}
    // if(!(f01.facesSharedPoints().length === 7)) {return false;}
    // if(!(f02.facesSharedPoints().length === 8)) {return false;}

    // if(!(f00.facesSharedPoints(1).length === 6)) {return false;}
    // if(!(f01.facesSharedPoints(1).length === 7)) {return false;}
    // if(!(f02.facesSharedPoints(1).length === 8)) {return false;}
    // if(!(f03.facesSharedPoints(1).length === 8)) {return false;}
    // if(!(f04.facesSharedPoints(1).length === 8)) {return false;}
    // if(!(f05.facesSharedPoints(1).length === 8)) {return false;}
    // if(!(f06.facesSharedPoints(1).length === 8)) {return false;}
    // if(!(f07.facesSharedPoints(1).length === 7)) {return false;}
    // if(!(f08.facesSharedPoints(1).length === 6)) {return false;}

    // if(!(f00.facesSharedPoints(5).length === 2)) {return false;}
    // if(!(f01.facesSharedPoints(5).length === 3)) {return false;}
    // if(!(f02.facesSharedPoints(5).length === 4)) {return false;}
    // if(!(f03.facesSharedPoints(5).length === 4)) {return false;}
    // if(!(f04.facesSharedPoints(5).length === 4)) {return false;}
    // if(!(f05.facesSharedPoints(5).length === 4)) {return false;}
    // if(!(f06.facesSharedPoints(5).length === 4)) {return false;}
    // if(!(f07.facesSharedPoints(5).length === 3)) {return false;}
    // if(!(f08.facesSharedPoints(5).length === 2)) {return false;}

    // if(!(f06.facesSharedPoints(6).length === 2)) {return false;}
    // if(!(f07.facesSharedPoints(6).length === 2)) {return false;}
    // if(!(f08.facesSharedPoints(6).length === 1)) {return false;}

    return true;
}
