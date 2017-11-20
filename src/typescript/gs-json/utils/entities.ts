import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom, GeomPath} from "./geom";
import {Topo} from "./topos";
import {Attrib} from "./attribs";
import {Group} from "./groups";

//Ent, superclass of points and objects
abstract class Ent {
    protected geom:ifs.IGeom;
    protected id:number;
    protected path:GeomPath;
    constructor(geom:ifs.IGeom, id:number) {
        this.geom = geom;
        this.id = id;
        this.path = new GeomPath(this.id);
    }
    public getGeom():ifs.IGeom {
        return this.geom;
    }
    public getID():number {
        return this.id;
    }
    public getModel():ifs.IModel {
        return this.geom.getModel();
    }
    public getGeomType():ifs.EGeomType {
        throw new Error ("Method to be overridden by subclass.");
    }
    //attribs
    public getAttribNames():string[] {
        return this.getModel().getAttribs(this.getGeomType()).map(attrib=>attrib.getName());
    }
    public getAttribValue(name:string):any {
        return this.getModel().getAttrib(name, this.getGeomType()).getValue(this.path);
    }
    public setAttribValue(name:string, value:any):any {
        return this.getModel().getAttrib(name, this.getGeomType()).setValue(this.path, value);
    }
    //groups
    public getGroupNames():string[] {
        throw new Error ("Method not implemented.");
    }
}
// Point class
export class Point extends Ent implements ifs.IPoint{
    public getGeomType():ifs.EGeomType {
        return ifs.EGeomType.points;
    }
    public setPosition(xyz:number[]):number[] {
        return this.geom.setPointPosition(this.id, xyz);
    }
    public getPosition():number[] {
        return this.geom.getPointPosition(this.id);
    }
    public getVertices():ifs.IVertex[] {
        throw new Error ("Method not implemented.");
    }
}
// Obj class
abstract class Obj extends Ent implements ifs.IObj{
    public getGeomType():ifs.EGeomType {
        return ifs.EGeomType.objs;
    }
    public getObjType():ifs.EObjType {
        throw new Error ("Method to be overridden by subclass.");
    }
    // Get the topo
    public getVertices():ifs.IVertex[] {
        throw new Error ("Method not implemented.");
    }
    public getEdges():ifs.IEdge[] {
        throw new Error ("Method not implemented.");
    }
    public getWires():ifs.IWire[] {
        throw new Error ("Method not implemented.");
    }
    public getFaces():ifs.IFace[] {
        throw new Error ("Method not implemented.");
    }
}
export class Polyline  extends Obj implements ifs.IPolyline{
    public getObjType():ifs.EObjType {
        return ifs.EObjType.polyline;
    }
} 
export class Polymesh extends Obj implements ifs.IPolymesh{
    public getObjType():ifs.EObjType {
        return ifs.EObjType.polymesh;
    }
} 



