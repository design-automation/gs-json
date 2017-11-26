import * as ifs from "./ifaces_gs";
import {Arr} from "./arr";
import {IModelData, IAttribData, IGroupData, ISkinData} from "./ifaces_json";
import {EGeomType, EDataType, EObjType, mapStringToGeomType, attribTypeStrings, mapStringToDataType} from "./enums";
import {Geom, GeomPath} from "./geom";
import {Vertex, Edge, Wire, Face} from "./topos";
import {Attrib} from "./attribs";
import {Group} from "./groups";
/**
 * Class Ent.
 * An abstrcat class that is the superclass for all geometric entities, both Point and Obj.
 * An entity may be part of a group and may have attributes. 
 */
abstract class Ent {
    protected geom:ifs.IGeom;
    protected id:number;
    /**
    * Creates an instance of one of the subclasses of Ent.
    * The entity must already exists in the geometry. 
    * Do not use this constructor if you want to add a new entity to the geometry.
    * For that, you should use one of the 'add' methods in the geometry class.
    * @param geom The Geom object to which the point belongs.
    * @param id The ID of the entity. This ID must already exist in the geometry.
    * @return The Ent object.
    */
    constructor(geom:ifs.IGeom, id:number) {
        this.geom = geom;
        this.id = id;
    }
    /**
    * Get the geometry object to which this entity belongs.
    * @return The Geom object.
    */
    public getGeom():ifs.IGeom {
        return this.geom;
    }
    /**
    * Get the ID number of this entity.
    * @return The entity ID number.
    */
    public getID():number {
        return this.id;
    }
    /**
    * Get the model object to which this entity belongs.
    * @return The model object.
    */    
    public getModel():ifs.IModel {
        return this.geom.getModel();
    }
    /**
    * Get the geometry type for this entity. 
    * This method mst be overridden by the sub-classes.
    * @return The geometry type.
    */    
    public getGeomType():EGeomType {
        //Do not implement this method.
        throw new Error ("Method to be overridden by subclass.");
    }
    /**
    * Get the attribute names for this entity.
    * @return The array of attribute names.
    */    
    public getAttribNames():string[] {
        return this.getModel().
            getAttribs(this.getGeomType()).
                map(attrib=>attrib.getName());
    }
    /**
    * Get an attribute value for this entity.
    * @param name The attribute name.
    * @return The attribute value.
    */
    public getAttribValue(name:string):any {
        return this.getModel().
            getAttrib(name, this.getGeomType()).
                getValue(new GeomPath(this.id));
    }
    /**
    * Set an attribute value for this entity.
    * @param name The attribute name.
    * @param value The new attribute value.
    * @return The old attribute value.
    */
    public setAttribValue(name:string, value:any):any {
        return this.getModel().
            getAttrib(name, this.getGeomType()).
                setValue(new GeomPath(this.id), value);
    }
    /**
    * Get the group names for all the groups for which this entity is a member.
    * @return The array of group names.
    */
    public getGroupNames():string[] {
        return this.getModel().getGroups().
            filter((v)=>this.getID() in v.getObjIDs()).
                map((v,i)=>v.getName());
    }
    /**
    * Add this entity to a group.
    * @param name The group name.
    * @return True if the entity was added, False is the entity was already in the group.
    */
    public addToGroup(name:string):boolean {
        switch (this.getGeomType()) {
            case EGeomType.points:
                return this.getModel().getGroup(name).addPoint(this.id);
            case EGeomType.objs:
                return this.getModel().getGroup(name).addObj(this.id);
        }
        
    }
}
/**
* Class Point.
* A point with x,y,z coordinates.
* A point may be part of a group and may have attributes. 
*/
export class Point extends Ent implements ifs.IPoint{
    /**
    * Get the geometry type for this entity.
    * This method overrides the method in the Ent class.
    * @return The geometry type.
    */
    public getGeomType():EGeomType {
        return EGeomType.points;
    }
    /**
    * Set the cartesian x,y,z coordinates of a point.
    * @param xyz Cartesian coordinates
    * @return Arrays of pre-defined coordinates
    */
    public setPosition(xyz:number[]):number[] {
        return this.geom.setPointPosition(this.id, xyz);
    }
    /**
    * Get the cartesian x,y,z coordinates of a point.
    * @return Returns an array that contains the x,y,z coordinates
    */
    public getPosition():number[] {
        return this.geom.getPointPosition(this.id);
    }
    /**
    * Get all the vertices linked to a point or a set of points.
    * @return Returns the array of vertices.
    */    
    public getVertices():ifs.IVertex[] {
        let objs_data:any = this.geom.getObjData();
        let vertices:ifs.IVertex[] = [];
        for (let obj_data of objs_data) {
            //loop through all wires and extract verts that have same point_id
            obj_data[0].forEach((w,w_i)=>w.forEach((v,v_i)=>(v == this.id) && 
                vertices.push(new Vertex(this.geom, 
                    new GeomPath(this.id,EGeomType.wires,w_i,EGeomType.vertices,v_i)))));
            //loop through all faces and extract verts that have same point_id
            obj_data[1].forEach((f,f_i)=>f.forEach((v,v_i)=>(v == this.id) && 
                vertices.push(new Vertex(this.geom, 
                    new GeomPath(this.id,EGeomType.faces,f_i,EGeomType.vertices,v_i)))));
        }
        return vertices;
    }
}
/**
* Abstract class Obj.
* The superclass for all geometric objects, 
* including Polyline and Polymesh.
*/
abstract class Obj extends Ent implements ifs.IObj{
    /**
    * Get the geometry type.
    * This method overrides the method in the Ent class.
    * @return The geometry type.
    */
    public getGeomType():EGeomType {
        return EGeomType.objs;
    }
    /**
    * Get the object type.
    * This method will be overridden by subclasses.
    * @return The object type.
    */
    public getObjType():EObjType {
        throw new Error ("Method to be overridden by subclass.");
    }

    // Get the topo
    /**
    * Get the vertices for this object. If the vertex_type is not specified, then 
    * vertices for both wires and faces are returned. 
    * @return The array of vertices.
    */
    public getVertices(vertex_type?:EGeomType.wires|EGeomType.faces):ifs.IVertex[][][] {
        let w_vertices:ifs.IVertex[][] = [];
        if (vertex_type == undefined || vertex_type == EGeomType.wires) {
            this.getWires().forEach((v,i)=>w_vertices.push(v.getVertices()));
        }
        let f_vertices:ifs.IVertex[][] = [];
        if (vertex_type == undefined || vertex_type == EGeomType.faces) {
            this.getFaces().forEach((v,i)=>f_vertices.push(v.getVertices()));
        }
        return [w_vertices, f_vertices];
    }
    /**
    * Get the edges for this object. If the edge_type is not specified, then 
    * edges for both wires and faces are returned. 
    * @return The array of edges.
    */
    public getEdges(edge_type?:EGeomType.wires|EGeomType.faces):ifs.IEdge[][][] {
        let w_edges:ifs.IEdge[][] = [];
        if (edge_type == undefined || edge_type == EGeomType.wires) {
            this.getWires().forEach((v,i)=>w_edges.push(v.getEdges()));
        }
        let f_edges:ifs.IEdge[][] = [];
        if (edge_type == undefined || edge_type == EGeomType.faces) {
            this.getFaces().forEach((v,i)=>f_edges.push(v.getEdges()));
        }
        return [w_edges, f_edges];
    }
    /**
    * Get the wires for this object.
    * @return The array of wires.
    */
    public getWires():ifs.IWire[] {
        return Arr.makeSeq(this.numWires()).map((v,i)=>new Wire(this.geom, 
            new GeomPath(this.id, EGeomType.wires, v)));
    }
    /**
    * Get the faces for this object.
    * @return The array of faces.
    */
    public getFaces():ifs.IFace[] {
        return Arr.makeSeq(this.numFaces()).map((v,i)=>new Face(this.geom, 
            new GeomPath(this.id, EGeomType.faces, v)));
    }
    /**
    * Get the number of wires for this object.
    * @return The number of wires.
    */
    public numWires():number {
        return this.geom.getObjData(new GeomPath(this.id, EGeomType.wires)).length;
    }    
    /**
    * Get the number of faces for this object.
    * @return The number of faces.
    */
    public numFaces():number {
        return this.geom.getObjData(new GeomPath(this.id, EGeomType.faces)).length;
    }

    /**
    * to be completed
    * @param
    * @return
    */
    public getTemplate(geom_type:EGeomType):any[] {
        throw new Error("not implemented");
        // switch (geom_type) {
        //     case EGeomType.points:
        //         // code...
        //         break;
            
        //     default:
        //         // code...
        //         break;
        // }

    }
}
/**
* Class Polyline.
* A polyline consists of one wire and no faces.
* The wire has a sequence of vertices. 
* The wire may be open or closed.
* A polyline may be part of a group and may have attributes.
*/ 
export class Polyline  extends Obj implements ifs.IPolyline{
    /**
    * @param 
    * @return
    */
    public setPosition(wire_points:ifs.IPoint[]):any[]{
        return this.geom.setObjPosition(this.id, this.geom.getObjData());
    }
    /**
    * Get the object type: "polyline".
    * @return Polyline is returned as an object type.
    */
    public getObjType():EObjType {
        return EObjType.polyline;
    }
}

/**
* Class Polymesh.
* A polymesh is defined by a set of polygonal faces. 
* These faces may have arbitrary number of vertices, 
* may be concave or convex, and may be planar or non-planar. 
* All faces are expected to be connected to one anoter, so that there are no disjoint parts.
* The polymesh will have closed wires along all its naked edges.
* The polymesh may include one or more holes.
* The holes will result in additional naked edges, each with their own wire.
* A polymesh may be part of a group and may have attributes.
*/ 
export class Polymesh extends Obj implements ifs.IPolymesh{
    /**
    * @param 
    * @return
    */
    public setPosition(wire_points:ifs.IPoint[], face_points:ifs.IFace[]):any[]{
        let tab:number[][];
        for(let k:number =0; k<wire_points.length; k++){
            tab[0][k] = wire_points[k].getID();
            tab[1][k] = face_points[k].getObjID();          
        }
        tab[3][0] = EObjType.polymesh;
        return this.geom.setObjPosition(this.id, tab);
    }
    /**
    * Get the object type: "polymesh".
    * @return The polymesh as an object type.
    */
    public getObjType():EObjType {
        return EObjType.polymesh;
    }
}