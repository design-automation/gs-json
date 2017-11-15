import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom} from "./geom";
import {Entity,Point,Obj,Polyline,Polymesh} from "./entities";
import {Attrib, Path} from "./attribs";
import {Group} from "./groups";

// topo class
export class Topo implements ifs.ITopo{
    private geom:ifs.IGeom;
    private path:ifs.IPath;
    constructor(geom:ifs.IGeom, path:ifs.IPath) {
        this.geom = geom;
        this.path = path;
    }
    public getGeom():ifs.IGeom {
        return this.geom;
    }
    public getModel():ifs.IModel {
        return this.geom.getModel();
    }
    public getID():number {
        return this.path.id;
    }
    public getObj():ifs.IObj {
        return new Obj(this.geom, this.path.id);
    }
    public getPath():ifs.IPath {
        return this.path;
    }
    public getAttribNames():string[] {
        return this.getModel().getAttribs(this.path.topo_type).map(attrib=>attrib.getName());
    }
    public setAttribValue(name:string, value:any):any {;
        return this.getModel().getAttrib(name, this.path.topo_type).setValue(this.path, value);
    }
    public getAttribValue(name:string):any {
        return this.getModel().getAttrib(name, this.path.topo_type).getValue(this.path);
    }
    public getGroups():string[] {
        console.log("not implemented");
        return [];
    }
}
// Vertex class 
export class Vertex extends Topo implements ifs.IVertex {
    public getPoint():ifs.IPoint {
        console.log("not implemented");
        return null;
    }
    public next():ifs.IVertex {
        console.log("not implemented");
        return null;
    }
    public previous():ifs.IVertex {
        console.log("not implemented");
        return null;
    }
    public getEdge():ifs.IEdge {
        console.log("not implemented");
        return null;
    }
}
// Edge class 
export class Edge extends Topo implements ifs.IEdge {
    public getVertices():ifs.IVertex[] {
        console.log("not implemented");
        return null;
    }
    public next():ifs.IEdge {
        console.log("not implemented");
        return null;
    }
    public previous():ifs.IEdge {
        console.log("not implemented");
        return null;
    }
    public neighbours():ifs.IEdge[] {
        console.log("not implemented");
        return null;
    }
    public getParent():ifs.IWire|ifs.IFace {
        console.log("not implemented");
        return null;
    }
}
// Wire class 
export class Wire extends Topo implements ifs.IWire {
    public getVertices():ifs.IVertex[] {
        console.log("not implemented");
        return null;
    }
    public getEdges():ifs.IEdge[] {
        console.log("not implemented");
        return null;
    }
    public getShell():ifs.IShell {
        console.log("not implemented");
        return null;
    }
}
// Face class 
export class Face extends Topo implements ifs.IFace {
    public getVertices():ifs.IVertex[] {
        console.log("not implemented");
        return null;
    }
    public getEdges():ifs.IEdge[] {
        console.log("not implemented");
        return null;
    }
    public neighbours():ifs.IFace[] {
        console.log("not implemented");
        return null;
    }
    public getShell():ifs.IShell {
        console.log("not implemented");
        return null;
    }
}
// Shell class 
export class Shell extends Topo implements ifs.IShell {
    public getWires():ifs.IWire[] {
        console.log("not implemented");
        return null;
    }
    public getFaces():ifs.IFace[] {
        console.log("not implemented");
        return null;
    }
}