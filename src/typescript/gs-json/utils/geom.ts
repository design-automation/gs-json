import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Entity,Point,Obj,Polyline,Polymesh} from "./entities";
import {Topo} from "./topos";
import {Attrib, Path} from "./attribs";
import {Group} from "./groups";

// Geometry 
export class Geom implements ifs.IGeom {
    private model:ifs.IModel;
    private geometry_data:any[];
    constructor(model:ifs.IModel, geometry_data?:any[]) {
        this.model = model;
        if (geometry_data) {
            this.geometry_data = geometry_data;
        } else {
            this.geometry_data = [];
        }
    }
    public getModel():ifs.IModel {
        return this.model;
    }
    //Points
    public getPointIDs(obj_type?:ifs.EObjType):number[] {
        if (obj_type) {
            let geom_filtered:any[] = this.geometry_data.filter((n)=>n!=undefined);
            geom_filtered = geom_filtered.filter((n)=>n[2][0]==obj_type).map((v,i)=>[v[0],v[1]]);
            geom_filtered = Arr.flatten(geom_filtered);
            return geom_filtered;
            //return new Set(geom_filtered).values(); //<<<<<<<<<<<<<<<<<TODO
        }
        return Arr.makeSeq(this.numPoints());
    }
    public getPoints(obj_type?:ifs.EObjType):ifs.IPoint[] {
        return this.getPointIDs(obj_type).map((v,i)=>this.getPoint(v));
    }
    public getPoint(point_id:number):ifs.IPoint {
        return new Point(this, new Path(point_id, ifs.ETopoType.points));
    }
    public delPoint(point_id:number):boolean {
        console.log("not implemented");
        return null;
        //this is actually a rather complex method
        //del anythin that uses this point
        //for the point attributes, we need to del the attribute in the values_map
        //this all has to be done very carefully so that our array pointers do not get out of sync
    }
    //Objs
    public getObjIDs(obj_type?:ifs.EObjType):number[] {
        let geom_filtered:any[] = this.geometry_data.filter((n)=>n!=undefined);
        if (obj_type) {
            geom_filtered = geom_filtered.filter((n)=>n[2][0]==obj_type);
        }
        return geom_filtered.map((v,i)=>i);
    }
    public getObjs(obj_type?:ifs.EObjType):ifs.IObj[] {
        return this.getObjIDs(obj_type).map((v,i)=>this.getObj(v));
    }
    public getObj(obj_id:number):ifs.IObj {
        let obj:ifs.IObj = new Obj(this, obj_id);
        switch (obj.getType()) {
            case ifs.EObjType.polyline:
                return obj as ifs.IPolyline
            case ifs.EObjType.polymesh:
                return obj as ifs.IPolymesh
        }
    }
    public delObj(obj_id:number):boolean{
        return delete this.geometry_data[obj_id];
    }
    //Topo components, get a list of paths point to specific topo components in teh geometry
    public getTopoPaths(topo_type:ifs.ETopoType, obj_type?:ifs.EObjType):ifs.IPath[] {
        let geom_filtered:any[] = this.geometry_data.filter((n)=>n!=undefined);
        if (obj_type) {
            geom_filtered = geom_filtered.filter((n)=>n[2][0]==obj_type);
        }
        let path_arr:ifs.IPath[] = [];
        switch (topo_type) {
            case ifs.ETopoType.vertices:
                for (let i=0;i<geom_filtered.length;i++) {
                    let wires_data:number[][] = geom_filtered[i][0];
                    
                    for (let j=0;j<wires_data.length;j++) {
                        let wire_data:number[] = geom_filtered[j];
                        for (let k=0;k<wire_data.length;k++) {
                            path_arr.push(new Path(i, ifs.ETopoType.wires, j, topo_type, k));
                        }
                    }
                    let faces_data:number[][] = geom_filtered[i][1];
                    for (let j=0;j<faces_data.length;j++) {
                        let face_data:number[] = geom_filtered[j];
                        for (let k=0;k<face_data.length;k++) {
                            path_arr.push(new Path(i, ifs.ETopoType.faces, j, topo_type, k));
                        }
                    }
                }
                break;
            case ifs.ETopoType.edges:
                for (let i=0;i<geom_filtered.length;i++) {
                    let wires_data:number[][] = geom_filtered[i][0];
                    
                    for (let j=0;j<wires_data.length;j++) {
                        let wire_data:number[] = geom_filtered[j];
                        for (let k=0;k<wire_data.length - 1;k++) {
                            path_arr.push(new Path(i, ifs.ETopoType.wires, j, topo_type, k));
                        }
                    }
                    let faces_data:number[][] = geom_filtered[i][1];
                    for (let j=0;j<faces_data.length;j++) {
                        let face_data:number[] = geom_filtered[j];
                        for (let k=0;k<face_data.length - 1;k++) {
                            path_arr.push(new Path(i, ifs.ETopoType.faces, j, topo_type, k));
                        }
                    }
                }
                break;
            case ifs.ETopoType.wires:
                for (let i=0;i<geom_filtered.length;i++) {
                    let wires_data:number[][] = geom_filtered[i][0];
                    for (let j=0;j<wires_data.length;j++) {
                        path_arr.push(new Path(i, topo_type, j));
                    }
                }
                break;
            case ifs.ETopoType.faces:
                for (let i=0;i<geom_filtered.length;i++) {
                    let faces_data:number[][] = geom_filtered[i][1];
                    for (let j=0;j<faces_data.length;j++) {
                        path_arr.push(new Path(i, topo_type, j));
                    }
                }
                break;
            case ifs.ETopoType.shells:
                geom_filtered = geom_filtered.filter((n)=>n[1].length > 0);
                for (let i=0;i<geom_filtered.length;i++) {
                    path_arr.push(new Path(i, topo_type));
                }
                break;
        }
        return path_arr;
    }
    public getTopos(topo_type:ifs.ETopoType, obj_type?:ifs.EObjType):ifs.ITopo[] {
        console.log("not implemented");
        return null;
    }
    public getTopo(topo_path:ifs.IPath):ifs.ITopo {
        console.log("not implemented");
        return null;
    }
    //Template is an array full of zeros, but with the right structure for the attribute data
    public getTopoTemplate(topo_type:ifs.ETopoType):any[] {
        switch (topo_type) {
            case ifs.ETopoType.vertices:
                return this.geometry_data.
                    map((v,i)=>[
                        [v[0].map((v2,i2)=>Arr.make(v2.length, 0))],
                        [v[1].map((v2,i2)=>Arr.make(v2.length, 0))]]);
            case ifs.ETopoType.edges:
                return this.geometry_data.
                    map((v,i)=>[
                        [v[0].map((v2,i2)=>Arr.make(v2.length-1, 0))],
                        [v[1].map((v2,i2)=>Arr.make(v2.length-1, 0))]]);
            case ifs.ETopoType.wires:
                return this.geometry_data.
                    map((v,i)=>
                        [v[0].map((v2,i2)=>Arr.make(v2.length, 0))]);
            case ifs.ETopoType.faces:
                return this.geometry_data.
                    map((v,i)=>
                        [v[1].map((v2,i2)=>Arr.make(v2.length, 0))]);
            case ifs.ETopoType.shells:
                console.log("not implemented"); //TODO
                return null;
        }
    }
    //Counters
    public numObjs(obj_type?:ifs.EObjType):number {
        return this.getObjIDs(obj_type).length;
    }
    public numPoints(obj_type?:ifs.EObjType):number {
        if (obj_type) {return this.getPointIDs(obj_type).length;} 
        let positions:ifs.IAttrib = this.getModel().getAttrib("position", ifs.ETopoType.points);
        if (positions) {return positions.count()};
        return 0;
    }
    public numTopos(topo_type:ifs.ETopoType):number {
        return Arr.deepCount(this.getTopoTemplate(topo_type));
    }
}
