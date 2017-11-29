import {Arr} from "./arr";
import * as ifs from "./ifaces_gs";
import {TTreeData, IModelData, IAttribData, IGroupData, ISkinData} from "./ifaces_json";
import {EGeomType, EDataType, EObjType, mapGeomTypeToNumber} from "./enums";
import {TopoTree} from "./topo_trees";;
import {Geom} from "./geom";
import {Point,Polyline,Polymesh} from "./entities";
import {Vertex, Edge, Wire, Face, TopoPath} from "./topos";
import {Attrib} from "./attribs";
/**
* Group class.
*/
export class Group implements ifs.IGroup {
    private _model:ifs.IModel;
    private _name:string;
    private _parent:string;
    private _points:number[]; 
    private _topos:TopoTree;
    private _objs:number[];
    private _props:Map<string,any>;
    /**
    * Creates an instance of the Group class.
    * The group data must already exists in the model. 
    * Do not use this constructor if you want to add a new group to the model.
    * Instead, you should use the "addGroup()" methdod in the model class.
    * @param model The Model object in which this attribute will be created.
    * @param data The attribute data in the model.
    * @return The Group object.
    */
    constructor(model:ifs.IModel, data:IGroupData) {
        this._model = model;
        if (data == undefined) {
            throw new Error("Data must be defined.")
        }
        if (data.name != undefined) {
            this._name = data.name;
        } else {
            throw new Error("Attribute name must be defined.")
        }
        if (data.parent != undefined) {
            this._parent = data.parent; 
        } else {
            this._parent = null;
        }
        if (data.points != undefined) {
            this._points = data.points; 
        } else {
            this._points = [];
        }
        if (data.topos != undefined) {
            this._topos = new TopoTree(model, data.topos); 
        } else {
            this._topos = new TopoTree(model);
        }
        if (data.objs != undefined) {
            this._objs = data.objs; 
        } else {
            this._objs = [];
        }
        if (data.props != undefined) {
            this._props = new Map(data.props); 
        } else {
            this._props = new Map();
        }
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getName():string {
        return this._name;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public setName(name:string):string {
        let old_name:string = this._name;
        this._model.setGroupName(old_name, name);
        this._name = name;
        return old_name;
    }

    /**
    * This method allows to access a private property of type TopoTree of the class Group
    * @return The topo tree, of type TopoTree
    */
    public getTopoTree():TopoTree {  //TODO this should not be needed, maybe only for testing?
        return this._topos;
    }
    //Groups
    /**
    * to be completed
    * @param
    * @return
    */
    public getParentGroup():string {
        return this._parent;
    }  
    /**
    * to be completed
    * @param
    * @return
    */
    public setParentGroup(name:string):string{
        let old_parent_name:string = this._parent;
        this._parent = name;
        return old_parent_name;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public removeParentGroup():string{
        let old_parent_name:string = this._parent;
        this._parent = null;
        return old_parent_name;
    }
    /**
    * to be completed
    * @param
    * @return
    */ 
    public getChildGroups():string[] {
        return this._model.getGroups().filter((v)=>v.getParentGroup() == this._name).map((v,i)=>v.getName());
    }

    //Objs
    /**
    * to be completed
    * @param
    * @return
    */
    public getObjIDs(obj_type?:EObjType):number[] {
        if (obj_type == undefined) {return this._objs;}
        return this._objs.filter((v)=>
            this._model.getGeom().getObj(v).getObjType() == obj_type);
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public addObj(id:number):boolean {
        if (id in this._objs) {return false;
            } else{this._objs.push(id); } //double check, I still have duplicates
        return true;
    }
    /**
    * to be completed
    * 
    * @param
    * @return Returns true if all obj IDs were added, false otherwise. 
    */
    public addObjs(ids:number[]):boolean {
        let ok:boolean = true;
        for (let id of ids) {
            ok = this.addObj(id);
        }
        return ok;
    }
    /**
    * to be completed
    * @param
    * @return
    */    
    public removeObj(id:number):boolean {
        let index = this._objs.indexOf(id);
        if (index == -1) {return false;}
        this._objs.splice(index, 1);
        return true;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public removeObjs(ids:number[]):boolean {
        let ok:boolean = true;
        for (let id of ids) {
            ok = this.removeObj(id);
        }
        return ok;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public hasObj(id:number):boolean{
        let index = this._objs.indexOf(id);
        if (index == -1) {return false;}
        return true;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getTopos(geom_type?:EGeomType):ifs.ITopo[]{
        return this._topos.getTopos(geom_type);
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public addTopo(topo:ifs.ITopo):void{
        this._topos.addTopo(topo);
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public addTopos(topos:ifs.ITopo[]):void{
        topos.forEach((v,i)=>this.addTopo(v));
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public removeTopo(topo:ifs.ITopo):boolean{
        return this._topos.removeTopo(topo);
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public removeTopos(topos:ifs.ITopo[]):boolean{
        let ok:boolean = true;
        for (let topo of topos) {
            if (!this.removeTopo(topo)) {ok = false;}
        }
        return ok;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public hasTopo(topo:ifs.ITopo):boolean{
        return this._topos.hasTopo(topo);
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public topoToArray():TTreeData{
        return this._topos.toArray();
    }


    //Points in this group
    /**
    * to be completed
    * @param
    * @return
    */
    public getPointIDs():number[] {
        return this._points;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public addPoint(id:number):boolean {
        if (id in this._points) {return false;}
        this._points.push(id);
        return true;
    }
    /**
    * to be completed
    * @param
    * @return
    */    
    public addPoints(ids:number[]):boolean {
        let ok:boolean = true;
        for (let id of ids) {
            if (!this.addPoint(id)) {ok = false;}
        }
        return ok;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public removePoint(id:number):boolean {
        let index = this._points.indexOf(id);
        if (index == -1) {return false;}
        this._points.splice(index, 1);
        return true;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public removePoints(ids:number[]):boolean {
        let ok:boolean = true;
        for (let id of ids) {
            if (!this.removePoint(id)) {ok = false;}
        }
        return ok;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public hasPoint(id:number):boolean{
        let index = this._points.indexOf(id);
        if (index == -1) {return false;}
        return true;
    }
    //Properties
    /**
    * to be completed
    * @param
    * @return
    */
    public getProps():Map<string, any> {
        return this._props;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public setProps(new_Map:Map<string, any>):Map<string, any> {
        this._props = new_Map ;
        return this._props;
    }
}