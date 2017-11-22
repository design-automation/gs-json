import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Point,Polyline,Polymesh} from "./entities";
import {Topo, Vertex, Edge, Wire, Face} from "./topos";
import {Attrib} from "./attribs";
import {Group} from "./groups";

// Geometry 
/**
* Class Geom
*/
export class Geom implements ifs.IGeom {
    private model:ifs.IModel;
    private points_data:[number[],number[][]];
    private objs_data:any[];
    /**
    * to be completed
    * @param
    * @return
    */
    constructor(model:ifs.IModel, points_data?:[number[],number[][]], objs_data?:any[]) {
        this.model = model;
        if (points_data) {
            this.points_data = points_data;
        } else {
            this.points_data = [[],[null]];
        }
        if (objs_data) {
            this.objs_data = objs_data;
        } else {
            this.objs_data = [];
        }
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getModel():ifs.IModel {
    return this.model;
    }

    // public addPoint(xyz:number[]):ifs.IPoint {
    //     let point:Point = new Point(this, this.numPoints());
    //     //append a point to the points array
    //     this.points_data[0].push(0);//points to null
    //     point.setPosition(xyz);

    //     this.points_data[0].push(this.points_data[0].length);
    //     this.points_data[1].push(xyz);
    //     return point;
    // }

    //Creation
    /**
    * to be completed
    * @param
    * @return
    */
    public addPoint(xyz:number[]):void {
        this.points_data[0].push(this.points_data[0].length);
        this.points_data[1].push(xyz);
    }

    /**
    * to be completed
    * @param
    * @return
    */
    // public addPolyline(wire_points:ifs.IPoint[]):ifs.IObj {
    //     throw new Error ("Method not implemented.");
    // }

    public addPolyline(wire_points:ifs.IPoint[]):void {
        for (let k:number = 0 ; k < wire_points.length ; k++){
            this.objs_data[0].push([wire_points[k].getPosition(),[], ifs.EObjType.polyline]);
        }
    }


    /**
    * to be completed
    * @param
    * @return
    */
    public addPolymesh(wire_points:ifs.IPoint[], face_points:ifs.IFace[]):ifs.IObj {
        throw new Error ("Method not implemented.");
    }

    /**
    * Low level method to return the data associated with a point. 
    * This method should only be used by experts.
    * The data  for an object consists of an array with two values:
    * 1) The point position index, and 2) the point position.
    * @param obj_id The object ID. 
    * @return The object data.
    */
    public getPointData(id:number):any[] {
        return [this.points_data[0][id], this.points_data[1][this.points_data[0][id]]];
    }
    /**
    * Low level method to return the data associated with an object. 
    * This method should only be used by experts.
    * The data  for an object consists of three arrays: [[wires],[faces],[parameters]].
    * The wires and faces arrays each contain lists of point IDs.
    * The path may extract a subset of this data. 
    * @param obj_id The object ID. 
    * @return The object data.
    */
    public getObjData(path?:ifs.IGeomPath):any {
        try {
        //if (path.st) { //vertices or edges
            switch (path.st) {
                case ifs.EGeomType.vertices:
                    switch (path.tt) {
                        case ifs.EGeomType.wires:
                            return this.objs_data[path.id][0][path.ti][path.si];
                        case ifs.EGeomType.faces:
                            return this.objs_data[path.id][1][path.ti][path.si];
                    }
                case ifs.EGeomType.edges:
                    switch (path.tt) {
                        case ifs.EGeomType.wires:
                            return [
                                this.objs_data[path.id][0][path.ti][path.si],
                                this.objs_data[path.id][0][path.ti][path.si+1],
                            ];
                        case ifs.EGeomType.faces:
                            return [
                                this.objs_data[path.id][1][path.ti][path.si],
                                this.objs_data[path.id][1][path.ti][path.si+1],
                            ];
                    }
            }
        //} else if (path.tt) { //wires or faces
            switch (path.tt) {
                case ifs.EGeomType.wires:
                    if (path.ti != undefined) {
                        return this.objs_data[path.id][0][path.ti];
                    }
                    return this.objs_data[path.id][0];
                case ifs.EGeomType.faces:
                    if (path.ti != undefined) {
                        return this.objs_data[path.id][1][path.ti];
                    }
                    return this.objs_data[path.id][1];
            }
        //} else { //objects
            return this.objs_data[path.id];
        //}
        } catch (ex) {
            throw new Error("Geom.getObjData():Could not find geometry with path: " + path as string);
        }
    }
    //Points
    /**
    * to be completed
    * @param
    * @return
    */
    public getPointIDs(obj_type?:ifs.EObjType):number[] {
        if (obj_type) {
            let geom_filtered:any[] = this.objs_data.filter((n)=>n!=undefined);
            geom_filtered = geom_filtered.filter((n)=>n[2][0]==obj_type).map((v,i)=>[v[0],v[1]]);//mpt sure if this works
            return Array.from(new Set(Arr.flatten(geom_filtered)));
        }
        return Arr.makeSeq(this.numPoints());
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getPoints(obj_type?:ifs.EObjType):ifs.IPoint[] {
        return this.getPointIDs(obj_type).map((v,i)=>this.getPoint(v));
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getPoint(point_id:number):ifs.IPoint {
        return new Point(this, point_id);
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public delPoint(point_id:number):boolean {
        throw new Error ("Method not implemented.");
        //this is actually a rather complex method
        //del anythin that uses this point
        //for the point attributes, we need to del the attribute in the values_map
        //this all has to be done very carefully so that our array pointers do not get out of sync
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public numPoints(obj_type?:ifs.EObjType):number {
        if (obj_type) {return this.getPointIDs(obj_type).length;} 
        return this.points_data[0].length; //works also for sparse arrays
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public setPointPosition(point_id:number, xyz:number[]):number[] {
        let old_xyz:number[] = this.points_data[1][this.points_data[0][point_id]];
        if (Arr.equal(xyz, old_xyz)) {return old_xyz;}
        let value_index:number = Arr.indexOf(xyz, this.points_data[1]);
        if (value_index == -1) {
            value_index = this.points_data[1].length;
            this.points_data[1].push(xyz);
        }
        this.points_data[0][point_id] = value_index;
        return old_xyz;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getPointPosition(point_id:number,):number[] {
        return this.points_data[1][this.points_data[0][point_id]];
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getObjIDs(obj_type?:ifs.EObjType):number[] {
        let geom_filtered:any[] = this.objs_data.filter((n)=>n!=undefined);
        if (obj_type) {
            geom_filtered = geom_filtered.filter((n)=>n[2][0]==obj_type);
        }
        return geom_filtered.map((v,i)=>i);
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getObjs(obj_type?:ifs.EObjType):ifs.IObj[] {
        return this.getObjIDs(obj_type).map((v,i)=>this.getObj(v));
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getObj(obj_id:number):ifs.IObj {
        try {
            switch (this.objs_data[obj_id][2][0]) {
                case ifs.EObjType.polyline:
                    return new Polyline(this, obj_id);
                case ifs.EObjType.polymesh:
                    return new Polymesh(this, obj_id);
            }
        } catch (ex) {
            return null;  //catch index our of bounds errors
        }
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public delObj(obj_id:number):boolean{
        return delete this.objs_data[obj_id];
        //TODO: delete the obj from all the attribute arrays
        //TODO: update the group arrays if they contain this object
        //TODO: what about the points? Do we keep them or delete them as well?
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public numObjs(obj_type?:ifs.EObjType):number {
        if (obj_type) {return this.getObjIDs(obj_type).length;} 
        return this.objs_data.length; //works also for sparse arrays
    }
    // Topo
    /**
    * to be completed
    * @param
    * @return
    */
    private _getVEPathsFromWF(path_arr:ifs.IGeomPath[], obj_id:number, wf_data:any[], w_or_f:number, v_or_e:number):void {
        let wf_type = [ifs.EGeomType.wires,ifs.EGeomType.faces][w_or_f] as ifs.EGeomType.wires|ifs.EGeomType.faces;
        let ve_type = [ifs.EGeomType.vertices,ifs.EGeomType.edges][v_or_e] as ifs.EGeomType.vertices|ifs.EGeomType.edges;
        //loop through all the wire or faces, and create paths for all the vertices or edges
        for (let wf_index=0;wf_index<wf_data.length;wf_index++) {
            for (let ve_index=0;ve_index<wf_data[wf_index].length - v_or_e;ve_index++) {
                path_arr.push(new GeomPath(Number(obj_id),wf_type, wf_index, ve_type, ve_index));
            }
        }
    }
    /**
    * to be completed
    * @param
    * @return
    */
    private _getVEPathsFromObjsData(objs_data:any[], v_or_e:number):ifs.IGeomPath[] {
        let path_arr:ifs.IGeomPath[] = [];
        //loop through all the objects
        for (let obj_id in objs_data) {//TODO: check this works with sparse arrays
            let w_data:number[][] = objs_data[obj_id][0];
            this._getVEPathsFromWF(path_arr, Number(obj_id), w_data, 0, v_or_e);
            let f_data:number[][] = objs_data[obj_id][1];
            this._getVEPathsFromWF(path_arr, Number(obj_id), f_data, 1, v_or_e);
        }
        return path_arr;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    private _getWFPathsFromObjsData(objs_data:any[], w_or_f:number):ifs.IGeomPath[] {
        let wf_type = [ifs.EGeomType.wires,ifs.EGeomType.faces][w_or_f] as ifs.EGeomType.faces|ifs.EGeomType.wires;
        let path_arr:ifs.IGeomPath[] = [];
        //loop through all the objects, and create paths for wires or faces
        for (let obj_id in objs_data) {//TODO: check this works with sparse arrays
            let wf_data:number[][] = objs_data[obj_id][w_or_f];//wf_choice is 0 or 1, wires or faces
            for (let wf_index=0;wf_index<wf_data.length;wf_index++) {
                path_arr.push(new GeomPath(Number(obj_id),wf_type, wf_index));
            }
        }
        return path_arr;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    private _getPaths(geom_type:ifs.EGeomType):ifs.IGeomPath[] {
        let objs_data:any[] = this.objs_data.filter((n)=>n!=undefined);
        switch (geom_type) {
            case ifs.EGeomType.vertices:
                return this._getVEPathsFromObjsData(objs_data, 0);
            case ifs.EGeomType.edges:
                return this._getVEPathsFromObjsData(objs_data, 1);
            case ifs.EGeomType.wires:
                return this._getWFPathsFromObjsData(objs_data, 0);
            case ifs.EGeomType.faces:
                return this._getWFPathsFromObjsData(objs_data, 1);
        }
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getTopos(geom_type:ifs.EGeomType):ifs.ITopo[] {
        switch (geom_type) {
            case ifs.EGeomType.vertices:
        return this._getPaths(geom_type).map((v,i)=>new Vertex(this,v));

            case ifs.EGeomType.edges:
        return this._getPaths(geom_type).map((v,i)=>new Edge(this,v));

            case ifs.EGeomType.wires:
        return this._getPaths(geom_type).map((v,i)=>new Wire(this,v));

            case ifs.EGeomType.faces:
        return this._getPaths(geom_type).map((v,i)=>new Face(this,v));
        }
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public numTopos(geom_type:ifs.EGeomType):number {
        return this._getPaths(geom_type).length;    
    }
    //Template is an array full of zeros, but with the right structure for the attribute data
    /**
    * to be completed
    * @param
    * @return
    */
    public getAttribTemplate(geom_type:ifs.EGeomType):any[] {
        switch (geom_type) {
            case ifs.EGeomType.objs:
                return Arr.make(this.numObjs(), 0);
            case ifs.EGeomType.faces:
                return this.objs_data.map((v,i)=>
                        [v[1].map((v2,i2)=>Arr.make(v2.length, 0))]);
            case ifs.EGeomType.wires:
                return this.objs_data.map((v,i)=>
                        [v[0].map((v2,i2)=>Arr.make(v2.length, 0))]);
            case ifs.EGeomType.edges:
                return this.objs_data.map((v,i)=>[
                        [v[0].map((v2,i2)=>Arr.make(v2.length-1, 0))],
                        [v[1].map((v2,i2)=>Arr.make(v2.length-1, 0))]]);
            case ifs.EGeomType.vertices:
                return this.objs_data.map((v,i)=>[
                        [v[0].map((v2,i2)=>Arr.make(v2.length, 0))],
                        [v[1].map((v2,i2)=>Arr.make(v2.length, 0))]]);
            case ifs.EGeomType.points:
                return Arr.make(this.numPoints(), 0);
        }
    }
}
// Path
    /**
    * to be completed
    */
export class GeomPath implements ifs.IGeomPath {
    id:number;                    //obj id or point id
    tt:ifs.EGeomType.faces|ifs.EGeomType.wires = null;      //topo type
    ti:number = null;             //topo index
    st:ifs.EGeomType.vertices|ifs.EGeomType.edges = null;   //sub topo-type
    si:number = null;             //sub topo-index
    //for example, new Path([ifs.ETopoType.obj, 22], )
    /**
    * to be completed
    * @param
    * @return
    */
    constructor(id:number, 
            tt?:ifs.EGeomType.faces|ifs.EGeomType.wires, ti?:number, 
            st?:ifs.EGeomType.vertices|ifs.EGeomType.edges, si?:number) {
        this.id = id;
        if (tt) {
            this.tt = tt;
            this.ti = ti;
            if (st) {
                this.st = st;
                this.si = si;
            }
        }
    }
    public equals(path:ifs.IGeomPath) {
        return this.toString() == path.toString();
    }
    public toString() {
        return "Obj:" + this.id + "/" + ifs.attribTypeStrings[this.tt] + ":" + this.ti + "/" + ifs.attribTypeStrings[this.st] + ":" + this.si;
    }
}