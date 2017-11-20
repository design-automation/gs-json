import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom,GeomPath} from "./geom";
import {Point,Polyline,Polymesh} from "./entities";
import {Attrib} from "./attribs";
import {Group} from "./groups";

/**
* Topo class
*/
abstract class Topo implements ifs.ITopo{
    protected geom:ifs.IGeom;
    protected path:ifs.IGeomPath;
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
        //Do not implement this method.
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
        let point_id:number = this.geom.getData(this.path) as number;
        switch (this.path.tt) {
            case ifs.EGeomType.wires:
                return new Point(this.geom, point_id);
            case ifs.EGeomType.faces:
                return new Point(this.geom, point_id);
        }
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public next():ifs.IVertex {
        let vertex_index:number = this.path.si+1;
        if (vertex_index > this.getParent().numVertices()-1) {
            if (!this.getParent().isClosed()) {return null;}
            vertex_index = 0;
        }
        return new Vertex(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, this.path.st, vertex_index));
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public previous():ifs.IVertex {
        let vertex_index:number = this.path.si-1;
        if (vertex_index < 0) {
            if (!this.getParent().isClosed()) {return null;}
            vertex_index = this.getParent().numVertices() - 1;
        }
        return new Vertex(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, this.path.st, vertex_index));
    }
    /**
    * Return the edge for which this vertex is the start vertex. 
    * @param
    * @return
    */
    public getEdge():ifs.IEdge {
        let edge_index:number = this.path.si;
        if (edge_index > this.getParent().numEdges()-1) {
            if (!this.getParent().isClosed()) {return null;}
            edge_index = 0;
        }
        return new Edge(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, ifs.EGeomType.edges, edge_index));
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getParent():ifs.IWire|ifs.IFace {
        switch (this.path.tt) {
            case ifs.EGeomType.wires:
                return new Wire(this.geom, new GeomPath(this.path.id, this.path.tt, this.path.ti));
            case ifs.EGeomType.faces:
                return new Face(this.geom, new GeomPath(this.path.id, this.path.tt, this.path.ti));
        }
    }
}
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
        let vertex_index:number = this.path.si+1;
        if (vertex_index > this.getParent().numVertices()-1) {
            vertex_index = 0;
        }
        return [
            new Vertex(this.geom, 
                new GeomPath(this.path.id, this.path.tt, ifs.EGeomType.vertices, this.path.si)),
            new Vertex(this.geom, 
                new GeomPath(this.path.id, this.path.tt, ifs.EGeomType.vertices, vertex_index))
        ]
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public next():ifs.IEdge {
        let edge_index:number = this.path.si+1;
        if (edge_index > this.getParent().numEdges()-1) {
            if (!this.getParent().isClosed()) {return null;}
            edge_index = 0;
        }
        return new Edge(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, this.path.st, edge_index));
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public previous():ifs.IEdge {
        let edge_index:number = this.path.si+1;
        if (edge_index < 0) {
            if (!this.getParent().isClosed()) {return null;}
            edge_index = this.getParent().numEdges()-1;
        }
        return new Edge(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, this.path.st, edge_index));
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getParent():ifs.IWire|ifs.IFace {
        switch (this.path.tt) {
            case ifs.EGeomType.wires:
                return new Wire(this.geom, new GeomPath(this.path.id, this.path.tt, this.path.ti));
            case ifs.EGeomType.faces:
                return new Face(this.geom, new GeomPath(this.path.id, this.path.tt, this.path.ti));
        }
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public neighbours():ifs.IEdge[] {
        throw new Error ("Method not implemented.");
    }
}
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
        return Arr.makeSeq(this.numVertices()).map((v,i)=>new Vertex(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, ifs.EGeomType.vertices, v)));
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getEdges():ifs.IEdge[] {
        return Arr.makeSeq(this.numEdges()).map((v,i)=>new Edge(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, ifs.EGeomType.edges, v)));
    }
    /**
    * Return the number of vertices in this wire.
    * @param
    * @return 
    */
    public numVertices():number {
        let points:number[] = this.geom.getData(this.path) as number[];
        if (points[0] == points[points.length - 1]) { //is closed
            return points.length - 1;
        } else {
            return points.length;
        }
    }
    /**
    * Return the number of edged in this wire.
    * @param
    * @return 
    */
    public numEdges():number {
        return this.geom.getData(this.path).length - 1;
    }
    /**
    * Return true if this wire is closed.
    * @param
    * @return 
    */
    public isClosed():boolean {
        let points:number[] = this.geom.getData(this.path) as number[];
        return (points[0] == points[points.length - 1]);
    }
}
/**
* Face class
*/
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
        return Arr.makeSeq(this.numVertices()).map((v,i)=>new Vertex(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, ifs.EGeomType.vertices, v)));
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getEdges():ifs.IEdge[] {
        return Arr.makeSeq(this.numEdges()).map((v,i)=>new Edge(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, ifs.EGeomType.edges, v)));
    }
    /**
    * Return the number of vertices in this face.
    * This is the same as numEdges().
    * @param
    * @return 
    */
    public numVertices():number {
        return this.geom.getData(this.path).length - 1;
    }
    /**
    * Return the number of edged in this face.
    * This is the same as numVertices().
    * @param
    * @return 
    */
    public numEdges():number {
        return this.geom.getData(this.path).length - 1;
    }
    /**
    * Return true, since a face is always closed.
    * @param
    * @return 
    */
    public isClosed():boolean {
        return true;
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
