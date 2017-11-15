import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom} from "./geom";
import {Entity,Point,Obj,Polyline,Polymesh} from "./entities";
import {Topo} from "./topos";
import {Group} from "./groups";

// Path to some attrib attached to a topo in the geometry
export class Path implements ifs.IPath {
    id:number; //obj or point
    topo_type:ifs.ETopoType; //shells, faces, wires, points
    topo_num:number;
    topo_subtype:ifs.ETopoType; //edges, vertices
    topo_subnum:number;
    constructor(id:number,
            topo_type?:ifs.ETopoType, topo_num?:number,
            topo_subtype?:ifs.ETopoType, topo_subnum?:number) {
        this.id = id;
        this.topo_type = topo_type;
        this.topo_num = topo_num;
        this.topo_subtype = topo_subtype;
        this.topo_subnum = topo_subnum;
    }
    public getType():ifs.ETopoType {
        if (this.topo_subtype) {
            return this.topo_subtype;
        } else {
            return this.topo_type;
        }
    }
}
// Attrib class
export class Attrib implements ifs.IAttrib {
    private model:ifs.IModel;
    private name:string;
    private topo_type:ifs.ETopoType;
    private data_type:ifs.EDataType;
    private values_map:any[];
    private values:any[];
    constructor(model:ifs.IModel, name:string, topo_type:ifs.ETopoType, data_type:ifs.EDataType, values_map?:any[], values?:any[]) {
        this.model = model;
        this.name = name;
        this.topo_type = topo_type;
        this.data_type = data_type;
        if (values_map) {
            this.values_map = values_map;
        } else {
            if (this.topo_type == ifs.ETopoType.points) {
                this.values_map = Arr.make(this.model.getGeom().numPoints(), 0);
            } else {
                this.values_map = Arr.deepCopy(this.model.getGeom().getTopoTemplate(this.topo_type));
            }
        }
        if (values) {
            this.values = values;
        } else {
            this.values = [null];//first value is always null
        }
    }
    public getName():string {
        return this.name;
    }
    public setName(name:string):string {
        let old_name:string = this.name;
        this.name = name;
        return old_name;
    }
    public getTopoType():ifs.ETopoType {
        return this.topo_type;
    }
    public getDataType():ifs.EDataType {
        return this.data_type;
    }
    //Attrib Values
    public getValue(path:ifs.IPath):any {
        let index:number;
        if (this.topo_type == ifs.ETopoType.points || this.topo_type == ifs.ETopoType.shells) {
            index = this.values_map[path.id] as number;
        } else if (this.topo_type == ifs.ETopoType.vertices || this.topo_type == ifs.ETopoType.edges) { 
            index = this.values_map[path.id][path.topo_num][path.topo_subnum] as number; 
        } else if (this.topo_type == ifs.ETopoType.wires || this.topo_type == ifs.ETopoType.faces){
            index = this.values_map[path.id][path.topo_num] as number;
        } 
        return this.values[index];
    }
    public setValue(path:ifs.IPath, value:any):any {
        let index:number = Arr.indexOf(value, this.values);
        if (index == -1) {
            index = this.values.push(value) - 1;
        }
        let old_value:any;
        if (this.topo_type == ifs.ETopoType.points || this.topo_type == ifs.ETopoType.shells) {
            old_value = this.values_map[path.id];
            this.values_map[path.id] = index;
        } else if (this.topo_type == ifs.ETopoType.vertices || this.topo_type == ifs.ETopoType.edges) { 
            old_value = this.values_map[path.id][path.topo_num][path.topo_subnum]
            this.values_map[path.id][path.topo_num][path.topo_subnum] = index;
        } else if (this.topo_type == ifs.ETopoType.wires || this.topo_type == ifs.ETopoType.faces){
            old_value = this.values_map[path.id][path.topo_num];
            this.values_map[path.id][path.topo_num] = index;
        }
        return old_value;
    }
    public count():number  {
        return this.values_map.length;
    }
}