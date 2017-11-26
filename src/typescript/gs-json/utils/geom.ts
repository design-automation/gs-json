import * as ifs from "./ifaces_gs";
import {Arr} from "./arr";
import {IModelData, IGeomData, IAttribData, IGroupData, ISkinData} from "./ifaces_json";
import {EGeomType, EDataType, EObjType, mapStringToGeomType, attribTypeStrings, mapStringToDataType} from "./enums";
import {Point,Polyline,Polymesh} from "./entities";
import {Topo, Vertex, Edge, Wire, Face} from "./topos";
import {Attrib} from "./attribs";
import {Group} from "./groups";

// Geometry 
/**
* Class Geom
*/
export class Geom implements ifs.IGeom {
    private _model:ifs.IModel;
    private _points:[number[],number[][]];
    private _objs:any[];
    /**
    * to be completed
    * @param
    * @return
    */
    constructor(model:ifs.IModel, data:IGeomData) {
        this._model = model;
        if (data.points != undefined) {
            this._points = data.points;
        } else {
            this._points = [[],[null]];
        }
        if (data.objs != undefined) {
            this._objs = data.objs;
        } else {
            this._objs = [];
        }
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getModel():ifs.IModel {
    return this._model;
    }

    //Creation
    /**
    * The purpose of this method consists in creating a Point in the Geometry.
    * The geometry class has two private properties which include points_data.
    * points_data array gathers pointers and cartesian xyz coordinates.
    * The addPoint creates a point of coordinates xyz, and modifies the points_data array
    * by pointing to an already existing xyz value or by creating it if not referenced.
    * @param cartesian xyz coordinates are required to create a point
    * @return a instance of type Point is returned
    */
    public addPoint(xyz:number[]):ifs.IPoint {
        let point:Point = new Point(this, this.numPoints()); // create the point and its ID (which actually is defined by points_data[0].length)
        // now, the point is created, we allocation a xyz position into that instance.
        this._points[0].push(0);//points to null
        point.setPosition(xyz); // switches the old_xyz (points_data[1][0] to the new xyz by pointing it if existing or creating it if not.
        //update point attributes
        return point;
    }

    /**
    * The purpose of this method is similar to addPoint except that
    * it takes as input a collection of Point as opposed to a single Point.
    * @param wire_points, which is a collection of Points
    * @return Object of type Polyline
    */
    public addPolyline(wire_points:ifs.IPoint[]):ifs.IPolyline {
        let pline:ifs.IPolyline = new Polyline(this, this.numObjs());
        this._objs[0].push(0);//points to null
        pline.setPosition(wire_points);
        //update all attributes except points
        //for (let attribute of this._model.getAttribs()) {
            //attribute.add(pline.getTemplate(attribute.getGeomType()))
        //}
        return pline;
    }

    /**
    * to be completed
    * @param
    * @return Object of type Polymesh
    */
    public addPolymesh(wire_points:ifs.IPoint[], face_points:ifs.IFace[]):ifs.IPolymesh {//double arrays
        let pmesh:ifs.IPolymesh = new Polymesh(this, this.numObjs());
        this._objs[0].push(0);//points to null
        pmesh.setPosition(wire_points, face_points);
        //update all attributes except points
        return pmesh;
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
        return [this._points[0][id], this._points[1][this._points[0][id]]];
    }
    /**
    * Low level method to return the data associated with an object. 
    * 0This method should only be used by experts.
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
                case EGeomType.vertices:
                    switch (path.tt) {
                        case EGeomType.wires:
                            return this._objs[path.id][0][path.ti][path.si];
                        case EGeomType.faces:
                            return this._objs[path.id][1][path.ti][path.si];
                    }
                case EGeomType.edges:
                    switch (path.tt) {
                        case EGeomType.wires:
                            return [
                                this._objs[path.id][0][path.ti][path.si],
                                this._objs[path.id][0][path.ti][path.si+1],
                            ];
                        case EGeomType.faces:
                            return [
                                this._objs[path.id][1][path.ti][path.si],
                                this._objs[path.id][1][path.ti][path.si+1],
                            ];
                    }
            }
        //} else if (path.tt) { //wires or faces
            switch (path.tt) {
                case EGeomType.wires:
                    if (path.ti != undefined) {
                        return this._objs[path.id][0][path.ti];
                    }
                    return this._objs[path.id][0];
                case EGeomType.faces:
                    if (path.ti != undefined) {
                        return this._objs[path.id][1][path.ti];
                    }
                    return this._objs[path.id][1];
            }
        //} else { //objects
            return this._objs[path.id];
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
    public getPointIDs(obj_type?:EObjType):number[] {
        if (obj_type) {
            let geom_filtered:any[] = this._objs.filter((n)=>n!=undefined);
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
    public getPoints(obj_type?:EObjType):ifs.IPoint[] {
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
    public numPoints(obj_type?:EObjType):number {
        if (obj_type) {return this.getPointIDs(obj_type).length;} 
        return this._points[0].length; //works also for sparse arrays
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public setPointPosition(point_id:number, xyz:number[]):number[] {
        let old_xyz:number[] = this._points[1][this._points[0][point_id]];
        if (Arr.equal(xyz, old_xyz)) {return old_xyz;}
        let value_index:number = Arr.indexOf(xyz, this._points[1]);
        if (value_index == -1) {
            value_index = this._points[1].length;
            this._points[1].push(xyz);
        }
        this._points[0][point_id] = value_index;
        return old_xyz;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getPointPosition(point_id:number):number[] {
        return this._points[1][this._points[0][point_id]];
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getObjIDs(obj_type?:EObjType):number[] {
        let geom_filtered:any[] = this._objs.filter((n)=>n!=undefined);
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
    public getObjs(obj_type?:EObjType):ifs.IObj[] {
        return this.getObjIDs(obj_type).map((v,i)=>this.getObj(v));
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getObj(obj_id:number):ifs.IObj {
        try {
            switch (this._objs[obj_id][2][0]) {
                case EObjType.polyline:
                    return new Polyline(this, obj_id);
                case EObjType.polymesh:
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
        return delete this._objs[obj_id];
        //TODO: delete the obj from all the attribute arrays
        //TODO: update the group arrays if they contain this object
        //TODO: what about the points? Do we keep them or delete them as well?
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public numObjs(obj_type?:EObjType):number {
        if (obj_type) {return this.getObjIDs(obj_type).length;} 
        return this._objs.length; //works also for sparse arrays
    }

    /**
    * This methods acts on geometric instances and allows to set an object position that has an identification number
    * @param obj_id requires a number, which corresponds to the object identifier
    * @param obj_data requires the data format, which is an array of type any
    * @return returns the first object data in the object data
    */
    public setObjPosition(obj_id:number, obj_data:any[]):any[]{
        let old_any:any[] = this._objs[0][0];
        if (Arr.equal(obj_data, old_any)) {return old_any;}

        let value_index:number = Arr.indexOf(obj_data, this._objs[0]);
        if (value_index == -1) { //we create, in case a similar object is not present in the data frame
            value_index = this._objs[0].length;
            this._objs[0][0].push(obj_data);
        }
        return old_any;
    }

    /**
    * This method reads a private property of a geometric instanciated object which is called object data.
    * The object data contains a collection of objects which is accessible through an identification number.
    * @param Identification number of the object
    * @return Returns the description of the identified object
    */
    public getObjPosition(obj_id:number,):any[]{
        return this._objs[0][obj_id];
    }

    // Topo
    /**
    * to be completed
    * @param
    * @return
    */
    private _getVEPathsFromWF(path_arr:ifs.IGeomPath[], obj_id:number, wf_data:any[], w_or_f:number, v_or_e:number):void {
        let wf_type = [EGeomType.wires,EGeomType.faces][w_or_f] as EGeomType.wires|EGeomType.faces;
        let ve_type = [EGeomType.vertices,EGeomType.edges][v_or_e] as EGeomType.vertices|EGeomType.edges;
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
        let wf_type = [EGeomType.wires,EGeomType.faces][w_or_f] as EGeomType.faces|EGeomType.wires;
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
    private _getPaths(geom_type:EGeomType):ifs.IGeomPath[] {
        let objs_data:any[] = this._objs.filter((n)=>n!=undefined);
        switch (geom_type) {
            case EGeomType.vertices:
                return this._getVEPathsFromObjsData(objs_data, 0);
            case EGeomType.edges:
                return this._getVEPathsFromObjsData(objs_data, 1);
            case EGeomType.wires:
                return this._getWFPathsFromObjsData(objs_data, 0);
            case EGeomType.faces:
                return this._getWFPathsFromObjsData(objs_data, 1);
        }
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getTopos(geom_type:EGeomType):ifs.ITopo[] {
        switch (geom_type) {
            case EGeomType.vertices:
        return this._getPaths(geom_type).map((v,i)=>new Vertex(this,v));

            case EGeomType.edges:
        return this._getPaths(geom_type).map((v,i)=>new Edge(this,v));

            case EGeomType.wires:
        return this._getPaths(geom_type).map((v,i)=>new Wire(this,v));

            case EGeomType.faces:
        return this._getPaths(geom_type).map((v,i)=>new Face(this,v));
        }
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public numTopos(geom_type:EGeomType):number {
        return this._getPaths(geom_type).length;    
    }
    //Template is an array full of zeros, but with the right structure for the attribute data
    /**
    * to be completed
    * @param
    * @return
    */
    public getAttribTemplate(geom_type:EGeomType):any[] {
                    console.log(this.numPoints());
        switch (geom_type) {
            case EGeomType.objs:
                return Arr.make(this.numObjs(), 0);
            case EGeomType.faces:
                return this._objs.map((v,i)=>
                        [v[1].map((v2,i2)=>Arr.make(v2.length, 0))]);
            case EGeomType.wires:
                return this._objs.map((v,i)=>
                        [v[0].map((v2,i2)=>Arr.make(v2.length, 0))]);
            case EGeomType.edges:
                return this._objs.map((v,i)=>[
                        [v[0].map((v2,i2)=>Arr.make(v2.length-1, 0))],
                        [v[1].map((v2,i2)=>Arr.make(v2.length-1, 0))]]);
            case EGeomType.vertices:
                return this._objs.map((v,i)=>[
                        [v[0].map((v2,i2)=>Arr.make(v2.length, 0))],
                        [v[1].map((v2,i2)=>Arr.make(v2.length, 0))]]);
            case EGeomType.points:
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
    tt:EGeomType.faces|EGeomType.wires = null;      //topo type
    ti:number = null;             //topo index
    st:EGeomType.vertices|EGeomType.edges = null;   //sub topo-type
    si:number = null;             //sub topo-index
    //for example, new Path([ifs.ETopoType.obj, 22], )
    /**
    * to be completed
    * @param
    * @return
    */
    constructor(id:number, 
            tt?:EGeomType.faces|EGeomType.wires, ti?:number, 
            st?:EGeomType.vertices|EGeomType.edges, si?:number) {
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
        return "Obj:" + this.id + "/" + attribTypeStrings[this.tt] + ":" + this.ti + "/" + attribTypeStrings[this.st] + ":" + this.si;
    }
}