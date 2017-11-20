import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom,GeomPath} from "./geom";
import {Point,Polyline,Polymesh} from "./entities";
import {Attrib} from "./attribs";
import {Group} from "./groups";

// topo class
/**
* To be completed
*/
export class Topo implements ifs.ITopo{
    private geom:ifs.IGeom;
    private path:ifs.IGeomPath;
    /**
    * to be completed
    * @param
    * @return
    */
    constructor(geom:ifs.IGeom, path:ifs.IGeomPath) {
        this.geom = geom;
        this.path = path;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getObjID():number {
        return this.path.id;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getGeom():ifs.IGeom {
        return this.geom;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getModel():ifs.IModel {
        return this.geom.getModel();
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getGeomType():ifs.EGeomType {
        throw new Error ("Method to be overridden by subclass.");
    }
    // attribs
    /**
    * to be completed
    * @param
    * @return
    */
    public getAttribNames():string[] {
        return this.getModel().getAttribs(this.getGeomType()).map(attrib=>attrib.getName());
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getAttribValue(name:string):any {
        return this.getModel().getAttrib(name, this.getGeomType()).getValue(this.path);
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public setAttribValue(name:string, value:any):any {;
        return this.getModel().getAttrib(name, this.getGeomType()).setValue(this.path, value);
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getGroupNames():string[] {
        throw new Error ("Method not implemented.");
    }
}
// Vertex class 
/**
* Vertex class
*/
export class Vertex extends Topo implements ifs.IVertex {
    /**
    * to be completed
    * @param
    * @return
    */
    public getGeomType():ifs.EGeomType {
        return ifs.EGeomType.vertices;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getPoint():ifs.IPoint {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public next():ifs.IVertex {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public previous():ifs.IVertex {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getEdge():ifs.IEdge {
        throw new Error ("Method not implemented.");
    }
}
// Edge class 
/**
* Edge class
*/
export class Edge extends Topo implements ifs.IEdge {
    /**
    * to be completed
    * @param
    * @return
    */
    public getGeomType():ifs.EGeomType {
        return ifs.EGeomType.edges;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getVertices():ifs.IVertex[] {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public next():ifs.IEdge {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public previous():ifs.IEdge {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public neighbours():ifs.IEdge[] {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getParent():ifs.IWire|ifs.IFace {
        throw new Error ("Method not implemented.");
    }
}
// Wire class 
/**
* Wire class
*/
export class Wire extends Topo implements ifs.IWire {
    /**
    * to be completed
    * @param
    * @return
    */
    public getGeomType():ifs.EGeomType {
        return ifs.EGeomType.wires;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getVertices():ifs.IVertex[] {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getEdges():ifs.IEdge[] {
        throw new Error ("Method not implemented.");
    }
}
// Face class 
export class Face extends Topo implements ifs.IFace {
    /**
    * to be completed
    * @param
    * @return
    */
    public getGeomType():ifs.EGeomType {
        return ifs.EGeomType.faces;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getVertices():ifs.IVertex[] {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getEdges():ifs.IEdge[] {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public neighbours():ifs.IFace[] {
        throw new Error ("Method not implemented.");
    }
}
