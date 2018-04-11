"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("./kernel");
const enums_1 = require("./enums");
const attrib_entattrib_1 = require("./attrib_entattrib");
const attrib_topoattrib_1 = require("./attrib_topoattrib");
const groups_1 = require("./groups");
/**
 * Model Class
 */
class Model {
    /**
     * Creates a new model.
     * @param
     * @return
     */
    constructor(data) {
        this._kernel = new kernel_1.Kernel(this, data);
    }
    //  Geom ---------------------------------------------------------------------------------------
    /**
     * Get the geom objct from the model.
     * @return
     */
    getGeom() {
        return this._kernel.getGeom();
    }
    //  Attributes ---------------------------------------------------------------------------------
    /**
     * Find all attributes in the model for a geom_type.
     * @param
     * @return
     */
    findAttribs(geom_type) {
        const attribs_data = this._kernel.modelFindAttribs(geom_type);
        switch (geom_type) {
            case enums_1.EGeomType.points:
            case enums_1.EGeomType.objs:
                const ent_attribs = [];
                for (const data of attribs_data) {
                    ent_attribs.push(new attrib_entattrib_1.EntAttrib(this._kernel, data.name, geom_type));
                }
                return ent_attribs;
            default: // topo attribs
                const topo_attribs = [];
                for (const data of attribs_data) {
                    topo_attribs.push(new attrib_topoattrib_1.TopoAttrib(this._kernel, data.name, geom_type));
                }
                return topo_attribs;
        }
    }
    /**
     * Returns all attributes in the model. A nested array is return containing
     * an array of entity attributes, and
     * an array of topo attributes
     * @param
     * @return
     */
    getAllAttribs() {
        return [this.getAllEntAttribs(), this.getAllTopoAttribs()];
    }
    /**
     * Returns one entity attribute in the model, or null if it does not exist.
     * @param
     * @return
     */
    getEntAttrib(name, geom_type) {
        if (geom_type !== enums_1.EGeomType.points && geom_type !== enums_1.EGeomType.objs) {
            return null;
        }
        if (this._kernel.modelHasAttrib(name, geom_type)) {
            return new attrib_entattrib_1.EntAttrib(this._kernel, name, geom_type);
        }
        return null;
    }
    /**
     * Returns all entity attributes in the model.
     * @param
     * @return
     */
    getAllEntAttribs() {
        const ent_attribs = [];
        for (const attrib_data of this._kernel.modelGetAllEntAttribs()) {
            const geom_type = enums_1.mapStringToGeomType.get(attrib_data.geom_type);
            ent_attribs.push(new attrib_entattrib_1.EntAttrib(this._kernel, attrib_data.name, geom_type));
        }
        return ent_attribs;
    }
    /**
     * Add a new entity attribute to the model.
     * If the attribute already exists, then return the existing attribute.
     * @param
     * @return
     */
    addEntAttrib(name, geom_type, data_type) {
        name = name.replace(/\s/g, "_");
        if (geom_type !== enums_1.EGeomType.points && geom_type !== enums_1.EGeomType.objs) {
            return null;
        }
        this._kernel.modelAddAttrib(name, geom_type, data_type);
        return this.getEntAttrib(name, geom_type);
    }
    /**
     * Returns one entity attribute in the model, or null if it does not exist.
     * @param
     * @return
     */
    getTopoAttrib(name, geom_type) {
        if (geom_type === enums_1.EGeomType.points || geom_type === enums_1.EGeomType.objs) {
            return null;
        }
        if (this._kernel.modelHasAttrib(name, geom_type)) {
            return new attrib_topoattrib_1.TopoAttrib(this._kernel, name, geom_type);
        }
        return null;
    }
    /**
     * Returns all topo attributes in the model.
     * @param
     * @return
     */
    getAllTopoAttribs() {
        const topo_attribs = [];
        for (const attrib_data of this._kernel.modelGetAllTopoAttribs()) {
            const geom_type = enums_1.mapStringToGeomType.get(attrib_data.geom_type);
            topo_attribs.push(new attrib_topoattrib_1.TopoAttrib(this._kernel, attrib_data.name, geom_type));
        }
        return topo_attribs;
    }
    /**
     * Add a new topo attribute to the model.
     * If the attribute already exists, then return the existing attribute.
     * @param
     * @return
     */
    addTopoAttrib(name, geom_type, data_type) {
        name = name.replace(/\s/g, "_");
        if (geom_type === enums_1.EGeomType.points || geom_type === enums_1.EGeomType.objs) {
            return null;
        }
        this._kernel.modelAddAttrib(name, geom_type, data_type);
        return this.getTopoAttrib(name, geom_type);
    }
    /**
     * Delete an attribute from the model. Return ture if successful, false otherwise.
     * @param
     * @return
     */
    delAttrib(attrib) {
        return this._kernel.modelDelAttrib(attrib.getName(), attrib.getGeomType());
    }
    /**
     * Checks if the model has an attribute.
     * @param
     * @return
     */
    hasAttrib(attrib) {
        return this._kernel.modelHasAttrib(attrib.getName(), attrib.getGeomType());
    }
    /**
     * Rename an attribute.
     * @param
     * @return
     */
    setAttribName(attrib, new_name) {
        return this._kernel.attribSetName(attrib.getName(), new_name, attrib.getGeomType());
    }
    //  Groups -------------------------------------------------------------------------------------
    /**
     * Get all the groups in a model.
     * @param
     * @return
     */
    getAllGroups() {
        const groups_data = this._kernel.modelGetAllGroups();
        return groups_data.map((v) => new groups_1.Group(this._kernel, v.name));
    }
    /**
     * Get one group from the model.
     * @param
     * @return
     */
    getGroup(name) {
        const data = this._kernel.modelGetGroup(name);
        if (data === undefined) {
            return null;
        }
        return new groups_1.Group(this._kernel, data.name);
    }
    /**
     * Add a group to the model.
     * If the parent name is given and does not exist, then an error will be thrown.
     * @param
     * @return
     */
    addGroup(name, parent) {
        if (parent !== undefined) {
            this._kernel.modelAddGroup(name, parent.getName());
        }
        else {
            this._kernel.modelAddGroup(name);
        }
        return this.getGroup(name);
    }
    /**
     * Delete a group i the model. Returns true if successful.
     * @param
     * @return
     */
    delGroup(group) {
        return this._kernel.modelDelGroup(group.getName());
    }
    /**
     * Checks if the group exists in the model.
     * @param
     * @return
     */
    hasGroup(group) {
        return this._kernel.modelHasGroup(group.getName());
    }
    /**
     * Renames the group.
     * @param
     * @return
     */
    setGroupName(group, new_name) {
        return this._kernel.groupSetName(group.getName(), new_name);
    }
    //  Model --------------------------------------------------------------------------------------
    /**
     * Removes empty elements in sparse arrays.
     * @param
     * @return
     */
    purge() {
        this._kernel.modelPurge();
    }
    /**
     * Run some checks
     * @param
     * @return
     */
    validate() {
        return this._kernel.modelValidate();
    }
    /**
     *  Save the model as  file
     * @param
     * @return
     */
    toJSON() {
        return this._kernel.modelToJSON();
    }
    /**
     *  Save the model as  file
     * @param
     * @return
     */
    toString() {
        let rep = "";
        rep += "Num Points:" + this.getGeom().numPoints() + "\n";
        rep += "Num Objects:" + this.getGeom().numObjs() + "\n";
        for (const obj of this.getGeom().getAllObjs()) {
            rep += "   " + obj.toString() + "\n";
        }
        const attribs = this.getAllAttribs();
        rep += "Num Entity Attribs:" + attribs[0].length + "\n";
        for (const attrib of attribs[0]) {
            rep += "   " + attrib.toString() + "\n";
        }
        rep += "Num Topo Attribs:" + attribs[1].length + "\n";
        for (const attrib of attribs[1]) {
            rep += "   " + attrib.toString() + "\n";
        }
        const groups = this.getAllGroups();
        rep += "Num Groups:" + groups.length + "\n";
        for (const group of groups) {
            rep += "   " + group.toString() + "\n";
        }
        return rep;
    }
}
exports.Model = Model;
//# sourceMappingURL=model.js.map