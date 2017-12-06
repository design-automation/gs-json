import * as ifs from "./ifaces_gs";
import {Arr} from "./arr";
import {IGeomData} from "./ifaces_json";
import {EGeomType, EObjType} from "./enums";
import {Point, Polyline, Polymesh} from "./entities";
import {Vertex, Edge, Wire, Face, TopoPath} from "./topos";

/**
 * Class Geom
 */
export class Geom implements ifs.IGeom {
    private _model: ifs.IModel;
    private _points: [number[], number[][]];
    private _objs: any[];
    /**
     * to be completed
     * @param
     * @return
     */
    constructor(model: ifs.IModel, data: IGeomData) {
        this._model = model;
        if (data.points !== undefined) {
            this._points = data.points;
        } else {
            this._points = [[], [null]];
        }
        if (data.objs !== undefined) {
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
    public getModel(): ifs.IModel {
        return this._model;
    }

    // Creation
    /**
     * Adds a new point to the model at position xyz.
     * @param cartesian xyz coordinates are required to create a point
     * @return a instance of type Point is returned
     */
    public addPoint(xyz: number[]): ifs.IPoint {
        const new_id: number = this.numPoints();
        // create the point
        this._points[0].push(0); // add a point to the points list
        this.setPointPosition(new_id, xyz);
        // update point attributes
        for (let attrib of this._model.getAttribs(EGeomType.points)) {
            attrib = attrib as ifs.IEntAttrib;
            attrib.addValue(new_id);
        }
        return new Point(this, new_id);
    }

    /**
     * Adds a new polyline to the model that passes through a sequence of points.
     * @param wire_points, which is a collection of Points
     * @return Object of type Polyline
     */
    public addPolyline(wire_points: ifs.IPoint[], is_closed: boolean): ifs.IPolyline {
        if (wire_points.length < 2) {throw new Error("Too few points for creating a polyline."); }
        const new_id: number = this.numObjs();
        const wire_ids: number[] = wire_points.map((v, i) => v.getID());
        // create the pline
        if (is_closed) {wire_ids.push(-1); }
        this._objs.push([[wire_ids], [], [100]]); // add the obj
        // update all attributes
        for (const attrib of this._model.getAttribs()) {
            attrib.addObjValues(new_id);
        }
        // return the new pline
        return new Polyline(this, new_id);
    }
    /**
     * to be completed
     * @param
     * @return Object of type Polymesh
     */
    public addPolymesh(face_points: ifs.IPoint[][]): ifs.IPolymesh {
        for (const f of face_points) {
            if (f.length < 3) {throw new Error("Too few points for creating a face."); }
        }
        const new_id: number = this.numObjs();
        const face_ids: number[][] = face_points.map((f) => f.map((v) => v.getID()));
        const wire_ids: number[][] = this._findPolymeshWires(face_ids);
        face_ids.forEach((f) => f.push(-1));
        wire_ids.forEach((w) => w.push(-1));
        this._objs.push([wire_ids, face_ids, [100]]); // add the obj
        // update all attributes
        for (const attrib of this._model.getAttribs()) {
            attrib.addObjValues(new_id);
        }
        // return the new pline
        return new Polymesh(this, new_id);
    }

    /**
     * Low level method to return the data associated with a point.
     * This method should only be used by experts.
     * The data  for an object consists of an array with two values:
     * 1) The point position index, and 2) the point position.
     * @param obj_id The object ID.
     * @return The object data.
     */
    public getPointData(id: number): any[] {
        return [this._points[0][id], this._points[1][this._points[0][id]]];
    }
    /**
     * Low level method to return the data associated with an object.
     * This method should only be used by experts.
     * The data  for an object consists of three arrays: [[wires], [faces], [parameters]].
     * The wires and faces arrays each contain lists of point IDs.
     * The path may extract a subset of this data.
     * @param obj_id The object ID.
     * @return The object data.
     */

public getObjData(path?: ifs.ITopoPath): any {
try {
        // if (path.st) { // vertices or edges
        switch (path.st) {
            case EGeomType.vertices:
                switch (path.tt) {
                    case EGeomType.wires:
                    if(this._objs[path.id][0][path.ti][path.si] == undefined){throw new Error("Geom.getObjData(): Could not find geometry with path: " + path as string);}                    
                    if(this._objs[path.id][0][path.ti][path.si] == -1){throw new Error("Geom.getObjData(): Could not find geometry with path: " + path as string);}                    
                    return this._objs[path.id][0][path.ti][path.si];
                    case EGeomType.faces:
                    if(this._objs[path.id][1][path.ti][path.si] == undefined){throw new Error("Geom.getObjData(): Could not find geometry with path: " + path as string);}                    
                    if(this._objs[path.id][1][path.ti][path.si] == -1){throw new Error("Geom.getObjData(): Could not find geometry with path: " + path as string);}                    
                    return this._objs[path.id][1][path.ti][path.si];
                                }        
            case EGeomType.edges:
                switch (path.tt) {
                    case EGeomType.wires:
                    if(this._objs[path.id][0][path.ti][path.si + 1] == undefined){throw new Error("Geom.getObjData(): Could not find geometry with path: " + path as string);}
                   if(this._objs[path.id][0][path.ti][path.si + 1] == -1){return [this._objs[path.id][0][path.ti][path.si],this._objs[path.id][0][path.ti][0],];}                    
                    return [this._objs[path.id][0][path.ti][path.si],this._objs[path.id][0][path.ti][path.si + 1],];
                    case EGeomType.faces:                    
                    if(this._objs[path.id][1][path.ti][path.si + 1] == undefined){throw new Error("Geom.getObjData(): Could not find geometry with path: " + path as string);}                    
                   if(this._objs[path.id][1][path.ti][path.si + 1] == -1){return [this._objs[path.id][1][path.ti][path.si],this._objs[path.id][1][path.ti][0],];}                   
                    return [this._objs[path.id][1][path.ti][path.si],this._objs[path.id][1][path.ti][path.si + 1],];
                                }
                        }
        // } else if (path.tt) { // wires or faces
        switch (path.tt) {
                case EGeomType.wires:
                if (path.ti !== undefined) {
                    if(this._objs[path.id][0][path.ti] == undefined){throw new Error("Geom.getObjData(): Could not find geometry with path: " + path as string);}                    
                    return this._objs[path.id][0][path.ti];
                }
                    return this._objs[path.id][0];
                case EGeomType.faces:
                if (path.ti !== undefined) {
                    if(this._objs[path.id][1][path.ti] == undefined){throw new Error("Geom.getObjData(): Could not find geometry with path: " + path as string);}                    
                    return this._objs[path.id][1][path.ti];
                }
                    return this._objs[path.id][1];
                }
        // } else { // objects

        if(this._objs[path.id] == undefined){throw new Error("Geom.getObjData(): Could not find geometry with path: " + path as string);}
        return this._objs[path.id];
        // }
}catch (ex) {throw new Error("Geom.getObjData(): Could not find geometry with path: " + path as string);}
}





////////////////
///// Copy Paste
////////////////
    // public getObjData(path?: ifs.ITopoPath): any {
    //     try {
    //     // if (path.st) { // vertices or edges
    //         switch (path.st) {
    //             case EGeomType.vertices:
    //                 switch (path.tt) {
    //                     case EGeomType.wires:
    //                         return this._objs[path.id][0][path.ti][path.si];
    //                     case EGeomType.faces:
    //                         return this._objs[path.id][1][path.ti][path.si];
    //                 }
    //             case EGeomType.edges:
    //                 switch (path.tt) {
    //                     case EGeomType.wires:
    //                         return [
    //                             this._objs[path.id][0][path.ti][path.si],
    //                             this._objs[path.id][0][path.ti][path.si + 1],
    //                        ];
    //                     case EGeomType.faces:
    //                         return [
    //                             this._objs[path.id][1][path.ti][path.si],
    //                             this._objs[path.id][1][path.ti][path.si + 1],
    //                        ];
    //                 }
    //         }
    //     // } else if (path.tt) { // wires or faces
    //         switch (path.tt) {
    //             case EGeomType.wires:
    //                 if (path.ti !== undefined) {
    //                     return this._objs[path.id][0][path.ti];
    //                 }
    //                 return this._objs[path.id][0];
    //             case EGeomType.faces:
    //                 if (path.ti !== undefined) {
    //                     return this._objs[path.id][1][path.ti];
    //                 }
    //                 return this._objs[path.id][1];
    //         }
    //     // } else { // objects
    //         if(this._objs[path.id] == undefined){throw new Error("Geom.getObjData(): Could not find geometry with path: " + path as string);}
    //         return this._objs[path.id];
    //     // }
    //     } catch (ex) {
    //         throw new Error("Geom.getObjData(): Could not find geometry with path: " + path as string);
    //     }
    // }













    // Points
    /**
     * to be completed
     * @param
     * @return
     */
    public getPointIDs(obj_type?: EObjType): number[] {
        if (obj_type) {
            let geom_filtered: any[] = this._objs.filter((n) => n !== undefined);
            geom_filtered = geom_filtered.filter((n) =>
                n[2][0] === obj_type).map((v, i) => [v[0], v[1]]); // mpt sure if this works
            return Array.from(new Set(Arr.flatten(geom_filtered)));
        }
        return Arr.makeSeq(this.numPoints());
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public getPoints(obj_type?: EObjType): ifs.IPoint[] {
        return this.getPointIDs(obj_type).map((v, i) => this.getPoint(v));
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public getPoint(point_id: number): ifs.IPoint {
        return new Point(this, point_id);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public delPoint(point_id: number): boolean {
        // delete the point from the geometry array
        if (this._points[point_id] === undefined) {return false; }
        delete this._points[point_id];
        // delete the point from any geometrc objects

        // TODO decide how to do this

        throw new Error("WARNING: implementation incomplete.");

        // delete attribute values for this point
        // for (let attrib of this._model.getAttribs(EGeomType.points)) {
        //     attrib = attrib as ifs.IEntAttrib;
        //     attrib.delValue(point_id);
        // }
        // // delete this point from any groups
        // for (const group of this._model.getGroups()) {
        //     group.removePoint(point_id);
        // }













    }
    /**
     * to be completed
     * @param
     * @return
     */
    public numPoints(obj_type?: EObjType): number {
        if (obj_type) {return this.getPointIDs(obj_type).length; }
        return this._points[0].length; // works also for sparse arrays
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public setPointPosition(point_id: number, xyz: number[]): number[] {
        const old_xyz: number[] = this._points[1][this._points[0][point_id]];
        if (Arr.equal(xyz, old_xyz)) {return old_xyz; }
        let value_index: number = Arr.indexOf(xyz, this._points[1]);
        if (value_index === -1) {
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
    public getPointPosition(point_id: number): number[] {
        return this._points[1][this._points[0][point_id]];
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public getObjIDs(obj_type?: EObjType): number[] {
        let geom_filtered: any[] = this._objs.filter((n) => n !== undefined);
        if (obj_type) {
            geom_filtered = geom_filtered.filter((n) => n[2][0] === obj_type);
        }
        return geom_filtered.map((v, i) => i);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public getObjs(obj_type?: EObjType): ifs.IObj[] {
        return this.getObjIDs(obj_type).map((v, i) => this.getObj(v));
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public getObj(obj_id: number): ifs.IObj {
        try {
            switch (this._objs[obj_id][2][0]) {
                case EObjType.polyline:
                    return new Polyline(this, obj_id);
                case EObjType.polymesh:
                    return new Polymesh(this, obj_id);
            }
        } catch (ex) {
            return null;  // catch index our of bounds errors
        }
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public delObj(obj_id: number, keep_points: boolean= true): boolean {
        if (this._objs[obj_id] === undefined) {return false; }
        // delete the obj from the geometry array
        delete this._objs[obj_id];
        // delete attribute values for this object
        for (const attrib of this._model.getAttribs()) {
            attrib.delObjValues(obj_id);
        }
        // delete this obj from any groups
        for (const group of this._model.getGroups()) {
            group.removeObj(obj_id);
        }
        // delete the points
        if (!keep_points) {
            this.getObj(obj_id).getPointIDsSet().forEach((p, i) => this.delPoint(p));
        }
        return true;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public numObjs(obj_type?: EObjType): number {
        if (obj_type) {return this.getObjIDs(obj_type).length; }
        return this._objs.length; // works also for sparse arrays
    }

    /**
     * This methods acts on geometric instances and allows to set an object position that has an identification number
     * @param obj_id requires a number, which corresponds to the object identifier
     * @param obj_data requires the data format, which is an array of type any
     * @return returns the first object data in the object data
     */
    public setObjPosition(obj_id: number, obj_data: any[]): any[] {
        const old_any: any[] = this._objs[0][0];
        if (Arr.equal(obj_data, old_any)) {return old_any; }

        let value_index: number = Arr.indexOf(obj_data, this._objs[0]);
        if (value_index === -1) { // we create, in case a similar object is not present in the data frame
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
    public getObjPosition(obj_id: number ): any[] {
        return this._objs[0][obj_id];
    }

    // Topo
    /**
     * to be completed
     * @param
     * @return
     */
    public getTopos(geom_type: EGeomType): ifs.ITopo[] {
        switch (geom_type) {
            case EGeomType.vertices:
                return this._getPaths(geom_type).map((p) => new Vertex(this, p));
            case EGeomType.edges:
                return this._getPaths(geom_type).map((p) => new Edge(this, p));
            case EGeomType.wires:
                return this._getPaths(geom_type).map((p) => new Wire(this, p));
            case EGeomType.faces:
                return this._getPaths(geom_type).map((p) => new Face(this, p));
        }
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public numTopos(geom_type: EGeomType): number {
        // return this._getPaths(geom_type).length;
        switch (geom_type) {
            case EGeomType.vertices:
                return this._objs.map((o) => [
                    ...o[0].map((w) => w.filter((wi) => (wi !== -1)).length),
                    ...o[1].map((f) => f.filter((fi) => (fi !== -1)).length),
                ].reduce((a,b) => a + b)).reduce((a,b) => a + b);
            case EGeomType.edges:
                return this._objs.map((o) => [
                    ...o[0].map((w) => w.length - 1),
                    ...o[1].map((f) => f.length - 1),
                ].reduce((a,b) => a + b)).reduce((a,b) => a + b);
            case EGeomType.wires:
                return this._objs.map((o) => o[0].length).reduce((a,b) => a + b);
            case EGeomType.faces:
                return this._objs.map((o) => o[1].length).reduce((a,b) => a + b);
        }
    }
    // Template is an array full of zeros, but with the right structure for the attribute data
    /**
     * to be completed
     * @param
     * @return
     */
    public getAttribTemplate(geom_type: EGeomType): any[] {
        switch (geom_type) {
            case EGeomType.objs:
                return Arr.make(this.numObjs(), 0);
            case EGeomType.faces:
                return this._objs.map((o) =>
                        [o[1].map((f) => Arr.make(f.length, 0))]);
            case EGeomType.wires:
                return this._objs.map((o) =>
                        [o[0].map((w) => Arr.make(w.length, 0))]);
            case EGeomType.edges:
                return this._objs.map((o) => [
                    o[0].map((w) => Arr.make(w.length - 1, 0)),
                    o[1].map((f) => Arr.make(f.length - 1, 0)),
                ]);
            case EGeomType.vertices:
                return this._objs.map((o) => [
                    o[0].map((w) => Arr.make(w.filter((wi) => (wi !== -1)).length, 0)),
                    o[1].map((f) => Arr.make(f.filter((fi) => (fi !== -1)).length, 0)),
                ]);
            case EGeomType.points:
                return Arr.make(this.numPoints(), 0);
        }
    }

    // Private methods

    /**
     * to be completed
     * @param
     * @return Object of type Polymesh
     */
    private _findPolymeshWires(face_ids: number[][]): number[][] {
        const wire_ids: number[][] = [];
        const edges: number[][] = [];
        for (const f of face_ids) {
            for (let i = 0; i < f.length; i++) {
                const v1 = f[i];
                let i2 = i + 1;
                if (i2 === f.length) {i2 = 0; }
                const v2 = f[i2];
                edges.push([v1, v2]);
            }
        }
        const naked_edges: number[][] = [];
        for (const e of edges) {
            if (Arr.indexOf([e[1], e[0]], edges) === -1) {naked_edges.push(e); }
        }
        if (naked_edges.length === 0) {
            return [];
        }
        const sorted_naked_edges: number[][][] = [[naked_edges[0]]];
        const already_used: number[][] = [naked_edges[0]];
        for (const _ of naked_edges) {
            const current_wire_edges: number[][] = sorted_naked_edges[sorted_naked_edges.length - 1];
            const start: number = current_wire_edges[0][0];
            const end: number = current_wire_edges[current_wire_edges.length - 1][1];
            if (start === end) {
                for (const e of naked_edges) {
                    if (Arr.indexOf(e, already_used) === -1) {
                        sorted_naked_edges.push([e]);
                        already_used.push(e);
                        break;
                    }
                }
            } else {
                for (const e of naked_edges) {
                    if (e[0] === end) {
                        current_wire_edges.push(e);
                        already_used.push(e);
                        break;
                    }
                }
            }
        }
        const naked_wires: number[][] = sorted_naked_edges.map((w) => Arr.flatten(w.map((e) => e[0])));
        return naked_wires;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    private _getVEPathsFromWF(path_arr: ifs.ITopoPath[], obj_id: number,
                              wf_data: any[], w_or_f: number, v_or_e: number): void {
        const wf_type =
            [EGeomType.wires, EGeomType.faces][w_or_f] as EGeomType.wires|EGeomType.faces;
        const ve_type =
            [EGeomType.vertices, EGeomType.edges][v_or_e] as EGeomType.vertices|EGeomType.edges;
        // loop through all the wire or faces, and create paths for all the vertices or edges
        for (let wf_index = 0; wf_index < wf_data.length; wf_index++) {
            for (let ve_index = 0; ve_index < wf_data[wf_index].length - v_or_e; ve_index++) {
                if (wf_data[wf_index][ve_index] !== -1) {
                    path_arr.push(new TopoPath(Number(obj_id), wf_type, wf_index, ve_type, ve_index));
                }
            }
        }
    }
    /**
     * to be completed
     * @param
     * @return
     */
    private _getVEPathsFromObjsData(objs_data: any[], v_or_e: number): ifs.ITopoPath[] {
        const path_arr: ifs.ITopoPath[] = [];
        // loop through all the objects
        for (const obj_id in objs_data) {// TODO: check this works with sparse arrays
            const w_data: number[][] = objs_data[obj_id][0];
            this._getVEPathsFromWF(path_arr, Number(obj_id), w_data, 0, v_or_e);
            const f_data: number[][] = objs_data[obj_id][1];
            this._getVEPathsFromWF(path_arr, Number(obj_id), f_data, 1, v_or_e);
        }
        return path_arr;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    private _getWFPathsFromObjsData(objs_data: any[], w_or_f: number): ifs.ITopoPath[] {
        const wf_type = [EGeomType.wires, EGeomType.faces][w_or_f] as EGeomType.faces|EGeomType.wires;
        const path_arr: ifs.ITopoPath[] = [];
        // loop through all the objects, and create paths for wires or faces
        for (const obj_id in objs_data) {// TODO: check this works with sparse arrays
            const wf_data: number[][] = objs_data[obj_id][w_or_f]; // wf_choice is 0 or 1, wires or faces
            for (let wf_index = 0; wf_index < wf_data.length; wf_index++) {
                path_arr.push(new TopoPath(Number(obj_id), wf_type, wf_index));
            }
        }
        return path_arr;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    private _getPaths(geom_type: EGeomType): ifs.ITopoPath[] {
        const objs_data: any[] = this._objs.filter((n) => n !== undefined);
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
}
