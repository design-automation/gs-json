import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom,GeomPath} from "./geom";
import {Point,Polyline,Polymesh} from "./entities";
import {Attrib} from "./attribs";
import {Group} from "./groups";

// topo class
export class Topo implements ifs.ITopo{
    private geom:ifs.IGeom;
    private path:ifs.IGeomPath;
    constructor(geom:ifs.IGeom, path:ifs.IGeomPath) {
        this.geom = geom;
        this.path = path;
    }
    public getObjID():number {
        return this.path.id;
    }
    public getGeom():ifs.IGeom {
        return this.geom;
    }
    public getModel():ifs.IModel {
        return this.geom.getModel();
    }
    public getGeomType():ifs.EGeomType {
        throw new Error ("Method to be overridden by subclass.");
    }
    // attribs
    public getAttribNames():string[] {
        return this.getModel().getAttribs(this.getGeomType()).map(attrib=>attrib.getName());
    }
    public getAttribValue(name:string):any {
        return this.getModel().getAttrib(name, this.getGeomType()).getValue(this.path);
    }
    public setAttribValue(name:string, value:any):any {;
        return this.getModel().getAttrib(name, this.getGeomType()).setValue(this.path, value);
    }
    public getGroupNames():string[] {
        throw new Error ("Method not implemented.");
    }
}
// Vertex class 
export class Vertex extends Topo implements ifs.IVertex {
    public getGeomType():ifs.EGeomType {
        return ifs.EGeomType.vertices;
    }
    public getPoint():ifs.IPoint {
        throw new Error ("Method not implemented.");
    }
    public next():ifs.IVertex {
        throw new Error ("Method not implemented.");
    }
    public previous():ifs.IVertex {
        throw new Error ("Method not implemented.");
    }
    public getEdge():ifs.IEdge {
        throw new Error ("Method not implemented.");
    }
}
// Edge class 
export class Edge extends Topo implements ifs.IEdge {
    public getGeomType():ifs.EGeomType {
        return ifs.EGeomType.edges;
    }
    public getVertices():ifs.IVertex[] {
        throw new Error ("Method not implemented.");
    }
    public next():ifs.IEdge {
        throw new Error ("Method not implemented.");
    }
    public previous():ifs.IEdge {
        throw new Error ("Method not implemented.");
    }
    public neighbours():ifs.IEdge[] {
        throw new Error ("Method not implemented.");
    }
    public getParent():ifs.IWire|ifs.IFace {
        throw new Error ("Method not implemented.");
    }
}
// Wire class 
export class Wire extends Topo implements ifs.IWire {
    public getGeomType():ifs.EGeomType {
        return ifs.EGeomType.wires;
    }
    public getVertices():ifs.IVertex[] {
        throw new Error ("Method not implemented.");
    }
    public getEdges():ifs.IEdge[] {
        throw new Error ("Method not implemented.");
    }
}
// Face class 
export class Face extends Topo implements ifs.IFace {
    public getGeomType():ifs.EGeomType {
        return ifs.EGeomType.faces;
    }
    public getVertices():ifs.IVertex[] {
        throw new Error ("Method not implemented.");
    }
    public getEdges():ifs.IEdge[] {
        throw new Error ("Method not implemented.");
    }
    public neighbours():ifs.IFace[] {
        throw new Error ("Method not implemented.");
    }
}
