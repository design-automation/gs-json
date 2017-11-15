import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom} from "./geom";
import {Topo} from "./topos";
import {Attrib, Path} from "./attribs";
import {Group} from "./groups";

//Entity, superclass of points and objects
export class Entity {
    protected geom:ifs.IGeom;
    constructor(geom:ifs.IGeom) {
        this.geom = geom;
    }
    public getGeom():ifs.IGeom {
        return this.geom;
    }
    public getModel():ifs.IModel {
        return this.geom.getModel();
    }
}
// Point class
export class Point extends Entity implements ifs.IPoint{
    private path: ifs.IPath;
    constructor(geom:ifs.IGeom, path?: ifs.IPath) {
        super(geom);
        if (path) {
            this.path = path;
        } else {
            //make the point id equal to the list length
            this.path = new Path(geom.numPoints(), ifs.ETopoType.points);
            //add one more item to all point attribs
            for(let attrib of this.getModel().getAttribs(ifs.ETopoType.points)) {
                attrib.setValue(this.path, null);
            }
        }
    }
    public getPath():ifs.IPath {
        return this.path;
    }
    public setPosition(xyz:number[]):number[] {
        return this.setAttribValue("position", xyz);
    }
    public getPosition():number[] {
        return this.getAttribValue("position");
    }
    public getAttribNames():string[] {
        return this.getModel().getAttribs(ifs.ETopoType.points).map(attrib=>attrib.getName());
    }
    public setAttribValue(name:string, value:any):any {
        return this.getModel().getAttrib(name, ifs.ETopoType.points).setValue(this.path, value);
    }
    public getAttribValue(name:string):any {
        return this.getModel().getAttrib(name, ifs.ETopoType.points).getValue(this.path);
    }
    public getVertices():ifs.IVertex[] {
        console.log("not implemented");
        return null;
    }
}
// Obj class
export class Obj extends Entity implements ifs.IObj{
    private obj_id:number;
    constructor(geom:ifs.IGeom, obj_id:number) {
        super(geom);
        this.obj_id = obj_id; 
    }
    public getID():number {
        console.log("not implemented");
        return this.obj_id;
    }
    public getVertices():ifs.IVertex[] {
        console.log("not implemented");
        return [];
    }
    public getEdges():ifs.IEdge[] {
        console.log("not implemented");
        return [];
    }
    public getWires():ifs.IWire[] {
        console.log("not implemented");
        return [];
    }
    public getFaces():ifs.IFace[] {
        console.log("not implemented");
        return [];
    }
    public getShells():ifs.IShell[] {
        console.log("not implemented");
        return [];
    }
    public getType():ifs.EObjType {
        console.log("not implemented");
        return null;
    }
    public isPolyline():boolean {
        console.log("not implemented");
        return false;
    }
    public isPolymesh():boolean {
        console.log("not implemented");
        return false;
    }
}
export class Polyline  extends Obj implements ifs.IPolyline{} 
export class Polymesh extends Obj implements ifs.IPolymesh{} 



