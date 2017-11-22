import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom,GeomPath} from "./geom";
import {Point,Polyline,Polymesh} from "./entities";
import {Attrib} from "./attribs";
import {Group} from "./groups";
/**
* Topo class.
 * An abstrcat class that is the superclass for all topological components:
 * vertices, edges, wires, and faces.
*/
export abstract class Topo implements ifs.ITopo{
    protected geom:ifs.IGeom;
    protected path:ifs.IGeomPath;
    /**
    * Creates an instance of one of the subclasses of Topo.
    * The entity must already exists in the geometry. 
    * In general, you do not need to create topological components.
    * Topology will be created for you when you create geometric objects.
    * @param
    * @return
    */
    constructor(geom:ifs.IGeom, path:ifs.IGeomPath) {
        this.geom = geom;
        this.path = path;
    }
    /**
    * Get the ID of the object to which this topological component belongs. 
    * @return number The object ID number.
    */
    public getObjID():number {
        return this.path.id;
    }
    /**
    * Get the geometry object to which this topological component belongs.
    * @return ifs.IGeom The Geom object.
    */
    public getGeom():ifs.IGeom {
        return this.geom;
    }
    /**
    * Get the model object to which this topological component belongs.
    * @return ifs.IModel The model object.
    */
    public getModel():ifs.IModel {
        return this.geom.getModel();
    }
    /**
    * Get the geometry type for this topological component. 
    * This method mst be overridden by the sub-classes.
    * @return EGeomType The geometry type.
    */
    public getGeomType():ifs.EGeomType {
        //Do not implement this method.
        throw new Error ("Method to be overridden by subclass.");
    }
    /**
    * Get the attribute names for this topological component.
    * @return string[] The array of attribute names.
    */
    public getAttribNames():string[] {
        return this.getModel().getAttribs(this.getGeomType()).map(attrib=>attrib.getName());
    }
    /**
    * Get an attribute value for this topological component.
    * @param name The attribute name.
    * @return any The attribute value.
    */
    public getAttribValue(name:string):any {
        return this.getModel().getAttrib(name, this.getGeomType()).getValue(this.path);
    }
    /**
    * Set an attribute value for this topological component.
    * @param name The attribute name.
    * @param value The new attribute value.
    * @return any The old attribute value.
    */
    public setAttribValue(name:string, value:any):any {;
        return this.getModel().getAttrib(name, this.getGeomType()).setValue(this.path, value);
    }
    /**
    * Get the group names for all the groups for which this topological component is a member.
    * @return string[] The array of group names.
    */
    public getGroupNames():string[] {
        return this.getModel().getGroups().
            filter((v)=>this.path.id in v.getObjIDs()).
                map((v,i)=>v.getName());
    }
}
/**
* Vertex class.
*/
export class Vertex extends Topo implements ifs.IVertex {
    /**
    * Get the geometry type: "vertices".
    * This method overrides the method in the Topo class.
    * @return ifs.EObjType The topo type.
    */
    public getGeomType():ifs.EGeomType {
        return ifs.EGeomType.vertices;
    }
    /**
    * Get the point associated with this vertex.
    * @return ifs.IPoint The point object.
    */
    public getPoint():ifs.IPoint {
        let point_id:number = this.geom.getObjData(this.path) as number;
        switch (this.path.tt) {
            case ifs.EGeomType.wires:
                return new Point(this.geom, point_id);
            case ifs.EGeomType.faces:
                return new Point(this.geom, point_id);
        }
    }
    /**
    * Get the edge for which this is the start vertex.
    * @return ifs.IEdge The edge object.
    */
    public getEdge():ifs.IEdge {
        let edge_index:number = this.path.si;
        if (edge_index > this.getWireOrFace().numEdges()-1) {
            if (!this.getWireOrFace().isClosed()) {return null;}
            edge_index = 0;
        }
        return new Edge(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, ifs.EGeomType.edges, edge_index));
    }
    /**
    * Get the wire or face to which this vertex belongs.
    * @return ifs.IWire|ifs.IFac The wire or face object.
    */
    public getWireOrFace():ifs.IWire|ifs.IFace {
        switch (this.path.tt) {
            case ifs.EGeomType.wires:
                return new Wire(this.geom, new GeomPath(this.path.id, this.path.tt, this.path.ti));
            case ifs.EGeomType.faces:
                return new Face(this.geom, new GeomPath(this.path.id, this.path.tt, this.path.ti));
        }
    }
    /**
    * Find the next vertex in the sequence of vertices in the wire or face.
    * @return ifs.IVertex The next vertex object.
    */
    public next():ifs.IVertex {
        let vertex_index:number = this.path.si+1;
        if (vertex_index > this.getWireOrFace().numVertices()-1) {
            if (!this.getWireOrFace().isClosed()) {return null;}
            vertex_index = 0;
        }
        return new Vertex(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, this.path.st, vertex_index));
    }
    /**
    * Find the previous vertex in the sequence of vertices in the wire or face.
    * @return ifs.IVertex The previous vertex object.
    */
    public previous():ifs.IVertex {
        let vertex_index:number = this.path.si-1;
        if (vertex_index < 0) {
            if (!this.getWireOrFace().isClosed()) {return null;}
            vertex_index = this.getWireOrFace().numVertices() - 1;
        }
        return new Vertex(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, this.path.st, vertex_index));
    }
    /**
    * Within the parent object, find all vertices with the same point.
    * Returns an array containing two sub-arrays.
    * 1) The wire vertices, and 2) the face vertices.
    * @return ifs.IVertex[][] An array containing the two sub-arrays of vertices. 
    */
    public verticesSharedPoint():ifs.IVertex[][] {
        let point_id:number = this.geom.getObjData(this.path);
        let obj_data:any = this.geom.getObjData(new GeomPath(this.path.id));
        //loop through all wires and extract verts that have same point_id
        let wire_vertices:ifs.IVertex[] = [];
        obj_data[0].forEach((w,w_i)=>w.forEach((v,v_i)=>
            (v==point_id) //same point id
                && (!(w_i==this.path.ti&&v_i==this.path.si)) //avoid dup
                && wire_vertices.push(new Vertex(this.geom, 
                    new GeomPath(this.path.id,ifs.EGeomType.wires,w_i,this.path.st,v_i)))));
        //loop through all faces and extract verts that have same point_id
        let face_vertices:ifs.IVertex[] = [];
        obj_data[1].forEach((f,f_i)=>f.forEach((v,v_i)=>
            (v==point_id) //same point id
                && (!(f_i==this.path.ti&&v_i==this.path.si)) //avoid dup
                && face_vertices.push(new Vertex(this.geom, 
                    new GeomPath(this.path.id,ifs.EGeomType.faces,f_i,this.path.st,v_i)))));
        return [wire_vertices,face_vertices];
    }
    /**
    * Within the parent object, find all vertices with the same point position.
    * Returns an array containing two sub-arrays.
    * 1) The wire vertices, and 2) the face vertices.
    * @return ifs.IVertex[][] An array containing the two sub-arrays of vertices. 
    */
    public verticesSamePosition():ifs.IVertex[][] {
        let point_id:number = this.geom.getObjData(this.path);
        let obj_data:any = this.geom.getObjData(new GeomPath(this.path.id));
        //loop through all wires and extract verts that have same position
        let wire_vertices:ifs.IVertex[] = [];
        obj_data[0].forEach((w,w_i)=>w.forEach((v,v_i)=>
            (this.geom.getPointData(v)[0] == this.geom.getPointData(point_id)[0]) //same pos
                && (!(w_i==this.path.ti&&v_i==this.path.si)) //avoid dup
                && wire_vertices.push(new Vertex(this.geom, 
                    new GeomPath(this.path.id,ifs.EGeomType.wires,w_i,this.path.st,v_i)))));
        //loop through all faces and extract verts that have same position
        let face_vertices:ifs.IVertex[] = [];
        obj_data[1].forEach((f,f_i)=>f.forEach((v,v_i)=>
            (this.geom.getPointData(v)[0] == this.geom.getPointData(point_id)[0]) //same pos
                && (!(f_i==this.path.ti&&v_i==this.path.si)) //avoid dup
                && face_vertices.push(new Vertex(this.geom, 
                    new GeomPath(this.path.id,ifs.EGeomType.faces,f_i,this.path.st,v_i)))));
        return [wire_vertices,face_vertices];//TODO remove dups
    }
}
/**
* Edge class.
*/
export class Edge extends Topo implements ifs.IEdge {
    /**
    * Get the geometry type: "edges".
    * This method overrides the method in the Topo class.
    * @return ifs.EObjType The topo type.
    */
    public getGeomType():ifs.EGeomType {
        return ifs.EGeomType.edges;
    }
    /**
    * Get the two vertices for this edge.
    * @return ifs.IVertex[] An array of two edges.
    */
    public getVertices():ifs.IVertex[] {
        let vertex_index:number = this.path.si+1;
        if (vertex_index > this.getWireOrFace().numVertices()-1) {
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
    * Get the wire or face to which this edge belongs.
    * @return ifs.IWire|ifs.IFace The wire or face.
    */
    public getWireOrFace():ifs.IWire|ifs.IFace {
        switch (this.path.tt) {
            case ifs.EGeomType.wires:
                return new Wire(this.geom, new GeomPath(this.path.id, this.path.tt, this.path.ti));
            case ifs.EGeomType.faces:
                return new Face(this.geom, new GeomPath(this.path.id, this.path.tt, this.path.ti));
        }
    }
    /**
    * Find the next edge in the sequence of edges in the wire or face.
    * @return ifs.IVertex The next edge object.
    */
    public next():ifs.IEdge {
        let edge_index:number = this.path.si+1;
        if (edge_index > this.getWireOrFace().numEdges()-1) {
            if (!this.getWireOrFace().isClosed()) {return null;}
            edge_index = 0;
        }
        return new Edge(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, this.path.st, edge_index));
    }
    /**
    * Find the previous edge in the sequence of edges in the wire or face.
    * @return ifs.IVertex The previous edge object.
    */
    public previous():ifs.IEdge {
        let edge_index:number = this.path.si+1;
        if (edge_index < 0) {
            if (!this.getWireOrFace().isClosed()) {return null;}
            edge_index = this.getWireOrFace().numEdges()-1;
        }
        return new Edge(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, this.path.st, edge_index));
    }
    /**
    * Within the parent object, find all edges with the same two points as this edge.
    * The order of the points is ignored.
    * Returns an array containing two sub-arrays.
    * 1) The wire edges, and 2) the face edges.
    * @return ifs.IVertex[][] An array containing the two sub-arrays of edges. 
    */
    public edgesSharedPoints():ifs.IEdge[][] {
        let point_id_0:number = this.geom.getObjData(this.path) as number;
        let vertex_index:number = this.path.si+1;
        if (vertex_index > this.getWireOrFace().numVertices()-1) {
            vertex_index = 0;
        }
        let point_id_1:number = this.geom.getObjData(
            new GeomPath(this.path.id, this.path.tt, this.path.ti, this.path.st, vertex_index)) as number;
        let points:number[] = [point_id_0, point_id_1].sort();
        let obj_data:any = this.geom.getObjData(new GeomPath(this.path.id));
        //loop through all wires and extract verts that have same point_id
        let wire_edges:ifs.IEdge[] = [];
        obj_data[0].forEach((w,w_i)=>w.forEach((v,v_i)=>
            Arr.equal([v, obj_data[v_i+1]].sort(), points) && 
                wire_edges.push(new Edge(this.geom, 
                    new GeomPath(this.path.id,ifs.EGeomType.wires,w_i,this.path.st,v_i)))));
        //loop through all faces and extract verts that have same point_id
        let face_edges:ifs.IEdge[] = [];
        obj_data[1].forEach((f,f_i)=>f.forEach((v,v_i)=>
            Arr.equal([v, obj_data[v_i+1]].sort(), points) && 
                face_edges.push(new Edge(this.geom, 
                    new GeomPath(this.path.id,ifs.EGeomType.faces,f_i,this.path.st,v_i)))));
        return [wire_edges,face_edges];//TODO remove the edge itdelf from the list
    }
}
/**
* Wire class
*/
export class Wire extends Topo implements ifs.IWire {
    /**
    * Get the geometry type: "wires".
    * This method overrides the method in the Topo class.
    * @return ifs.EObjType The topo type.
    */
    public getGeomType():ifs.EGeomType {
        return ifs.EGeomType.wires;
    }
    /**
    * Get the vertices for this wire.
    * @return ifs.IVertex[] An array of vertices.
    */
    public getVertices():ifs.IVertex[] {
        return Arr.makeSeq(this.numVertices()).map((v,i)=>new Vertex(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, ifs.EGeomType.vertices, v)));
    }
    /**
    * Get the edges for this wire.
    * @return ifs.IVertex[] An array of edges.
    */
    public getEdges():ifs.IEdge[] {
        return Arr.makeSeq(this.numEdges()).map((v,i)=>new Edge(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, ifs.EGeomType.edges, v)));
    }
    /**
    * Get the number of vertices in this wire.
    * @return number The number of vertices.
    */
    public numVertices():number {
        let points:number[] = this.geom.getObjData(this.path) as number[];
        if (points[points.length - 1] == -1) { //is closed
            return points.length - 1;
        }
        return points.length;
    }
    /**
    * Get the number of edges in this wire.
    * @return number The number of edges.
    */
    public numEdges():number {
        return this.geom.getObjData(this.path).length - 1;
    }
    /**
    * Return true if this wire is closed.
    * @return boolean 
    */
    public isClosed():boolean {
        let points:number[] = this.geom.getObjData(this.path) as number[];
        return (points[points.length - 1] == -1);
    }
}
/**
* Face class
*/
export class Face extends Topo implements ifs.IFace {
    /**
    * Get the geometry type: "faces".
    * This method overrides the method in the Topo class.
    * @return ifs.EObjType The topo type.
    */
    public getGeomType():ifs.EGeomType {
        return ifs.EGeomType.faces;
    }
    /**
    * Get the vertices for this wire.
    * @return ifs.IVertex[] An array of vertices.
    */
    public getVertices():ifs.IVertex[] {
        return Arr.makeSeq(this.numVertices()).map((v,i)=>new Vertex(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, ifs.EGeomType.vertices, v)));
    }
    /**
    * Get the edges for this wire.
    * @return ifs.IVertex[] An array of edges.
    */
    public getEdges():ifs.IEdge[] {
        return Arr.makeSeq(this.numEdges()).map((v,i)=>new Edge(this.geom, 
            new GeomPath(this.path.id, this.path.tt, this.path.ti, ifs.EGeomType.edges, v)));
    }
    /**
    * Get the number of vertices in this face.
    * This is the same as numEdges().
    * @return number The number of vertices.
    */
    public numVertices():number {
        return this.geom.getObjData(this.path).length - 1;
    }
    /**
    * Get the number of edged in this face.
    * This is the same as numVertices().
    * @return number The number of edges.
    */
    public numEdges():number {
        return this.geom.getObjData(this.path).length - 1;
    }
    /**
    * Return true, since a face is always closed.
    * @return boolean ture
    */
    public isClosed():boolean {
        return true;
    }
    /**
    * Within the parent object, find all faces that share at least n points.
    * @return ifs.IFace[] An array of faces.
    */
    public facesSharedPoints(num_shared_points?:number):ifs.IFace[] {
        throw new Error ("Method not implemented.");
    }
}
