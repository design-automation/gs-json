"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arr_1 = require("./libs/arr/arr");
const enums_1 = require("./enums");
const geom_1 = require("./geom");
const topo_trees_1 = require("./topo_trees");
const three = require("three");
const uuid_1 = require("./libs/uuid/uuid");
const threex = require("./libs/threex/threex");
/**
 * Kernel Class
 * This class controls all acces to the data and ensures that the data remains consistent.
 * No other class should have any direct access to this data.
 */
class Kernel {
    /**
     * Construct a new model. If data is provided, the model will be populated with this data.
     * @param
     * @return
     */
    constructor(model, data) {
        this._model = model;
        this._geom = new geom_1.Geom(this);
        this._attribs = new Map();
        this._attribs.set(enums_1.EGeomType.points, new Map());
        this._attribs.set(enums_1.EGeomType.objs, new Map());
        this._attribs.set(enums_1.EGeomType.vertices, new Map());
        this._attribs.set(enums_1.EGeomType.edges, new Map());
        this._attribs.set(enums_1.EGeomType.wires, new Map());
        this._attribs.set(enums_1.EGeomType.faces, new Map());
        this._groups = new Map();
        this._topos_trees = new Map();
        // Set the data
        if (data && data.metadata !== undefined) {
            this._metadata = data.metadata;
        }
        else {
            this._metadata = { filetype: "gs-json", version: "0.1.8", uuid: uuid_1.create_UUID() };
        }
        // Geom points
        if (data && data.geom !== undefined && data.geom.points !== undefined) {
            data.geom.points[0].forEach((p, i) => (p === null) && delete data.geom.points[0][i]);
            this._points = data.geom.points;
        }
        else {
            this._points = [[], [null]];
        }
        // Geom objs
        if (data && data.geom !== undefined && data.geom.objs !== undefined) {
            data.geom.objs.forEach((o, i) => (o === null) && delete data.geom.objs[i]);
            this._objs = data.geom.objs;
        }
        else {
            this._objs = [];
        }
        // Attributes
        if (data && data.attribs && data.attribs.points !== undefined) {
            for (const attrib_data of data.attribs.points) {
                attrib_data.values[0].forEach((d, i) => (d === null) && delete attrib_data.values[0][i]);
                this._attribs.get(enums_1.EGeomType.points).set(attrib_data.name, attrib_data);
            }
        }
        if (data && data.attribs && data.attribs.objs !== undefined) {
            for (const attrib_data of data.attribs.objs) {
                attrib_data.values[0].forEach((d, i) => (d === null) && delete attrib_data.values[0][i]);
                this._attribs.get(enums_1.EGeomType.objs).set(attrib_data.name, attrib_data);
            }
        }
        if (data && data.attribs && data.attribs.vertices !== undefined) {
            for (const attrib_data of data.attribs.vertices) {
                attrib_data.values[0].forEach((d, i) => (d === null) && delete attrib_data.values[0][i]);
                this._attribs.get(enums_1.EGeomType.vertices).set(attrib_data.name, attrib_data);
            }
        }
        if (data && data.attribs && data.attribs.edges !== undefined) {
            for (const attrib_data of data.attribs.edges) {
                attrib_data.values[0].forEach((d, i) => (d === null) && delete attrib_data.values[0][i]);
                this._attribs.get(enums_1.EGeomType.edges).set(attrib_data.name, attrib_data);
            }
        }
        if (data && data.attribs && data.attribs.wires !== undefined) {
            for (const attrib_data of data.attribs.wires) {
                attrib_data.values[0].forEach((d, i) => (d === null) && delete attrib_data.values[0][i]);
                this._attribs.get(enums_1.EGeomType.wires).set(attrib_data.name, attrib_data);
            }
        }
        if (data && data.attribs && data.attribs.faces !== undefined) {
            for (const attrib_data of data.attribs.faces) {
                attrib_data.values[0].forEach((d, i) => (d === null) && delete attrib_data.values[0][i]);
                this._attribs.get(enums_1.EGeomType.faces).set(attrib_data.name, attrib_data);
            }
        }
        // Groups
        if (data && data.attribs && data.groups !== undefined) {
            for (const group_data of data.groups) {
                if (group_data.parent === undefined) {
                    group_data.parent = null;
                }
                if (group_data.objs === undefined) {
                    group_data.objs = [];
                }
                if (group_data.points === undefined) {
                    group_data.points = [];
                }
                this._topos_trees.set(group_data.name, new topo_trees_1.TopoTree(group_data.topos));
                group_data.topos = undefined;
                this._groups.set(group_data.name, group_data);
            }
        }
    }
    //  Model General ------------------------------------------------------------------------------
    /**
     * Exports the model as json data.
     * @param
     * @return
     */
    modelToJSON() {
        const jsonData = {
            metadata: this._metadata,
            geom: {
                points: this._points,
                objs: this._objs,
            },
        };
        if (this._attribs !== undefined) {
            jsonData.attribs = {};
            if (this._attribs.get(enums_1.EGeomType.points) !== undefined) {
                jsonData.attribs.points = Array.from(this._attribs.get(enums_1.EGeomType.points).values());
            }
            if (this._attribs.get(enums_1.EGeomType.vertices) !== undefined) {
                jsonData.attribs.vertices = Array.from(this._attribs.get(enums_1.EGeomType.vertices).values());
            }
            if (this._attribs.get(enums_1.EGeomType.edges) !== undefined) {
                jsonData.attribs.edges = Array.from(this._attribs.get(enums_1.EGeomType.edges).values());
            }
            if (this._attribs.get(enums_1.EGeomType.wires) !== undefined) {
                jsonData.attribs.wires = Array.from(this._attribs.get(enums_1.EGeomType.wires).values());
            }
            if (this._attribs.get(enums_1.EGeomType.faces) !== undefined) {
                jsonData.attribs.faces = Array.from(this._attribs.get(enums_1.EGeomType.faces).values());
            }
            if (this._attribs.get(enums_1.EGeomType.objs) !== undefined) {
                jsonData.attribs.objs = Array.from(this._attribs.get(enums_1.EGeomType.objs).values());
            }
        }
        //TODO add topos to groups
        // In the IGroupData, groups data consists of the following:
        //     name: string;
        //     parent?: string;
        //     objs?: number[];
        //     topos?: TTreeData; <<< This is an array of 2 x TreeBranch2, and 4 x TreeBranch3
        //     points?: number[];
        //     props?: Array<[string, any]>;
        // This kernel maintains a this._groups Map of such data, group_name -> group_data
        // When saving, the evalues of teh map are saved
        if (this._groups !== undefined) {
            jsonData.groups = Array.from(this._groups.values());
            for (const group of jsonData.groups) {
                group.topos = []; //TODO add the topo data here
            }
        }
        return JSON.stringify(jsonData, null, 4);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    modelPurge() {
        this._purgeDelUnusedPoints();
        this._purgeDelUnusedPointValues();
    }
    /**
     * to be completed
     * @param
     * @return
     */
    modelValidate() {
        throw new Error("Method not implemented.");
    }
    //  The Model object ---------------------------------------------------------------------------
    /**
     * Get the Model object
     * @return The Model object
     */
    getModel() {
        return this._model;
    }
    /**
     * Get the Geom object
     * @return The Model object
     */
    getGeom() {
        return this._geom;
    }
    //  Model attributes ---------------------------------------------------------------------------
    /**
     * to be completed
     * @param
     * @return
     */
    modelFindAttribs(geom_type) {
        switch (geom_type) {
            case enums_1.EGeomType.points:
                return Array.from(this._attribs.get(geom_type).values());
            case enums_1.EGeomType.objs:
                return Array.from(this._attribs.get(geom_type).values());
            case enums_1.EGeomType.faces:
                return Array.from(this._attribs.get(geom_type).values());
            case enums_1.EGeomType.wires:
                return Array.from(this._attribs.get(geom_type).values());
            case enums_1.EGeomType.edges:
                return Array.from(this._attribs.get(geom_type).values());
            case enums_1.EGeomType.vertices:
                return Array.from(this._attribs.get(geom_type).values());
        }
    }
    /**
     * to be completed
     * @param
     * @return
     */
    modelGetAllAttribs() {
        return [
            ...this.modelFindAttribs(enums_1.EGeomType.points),
            ...this.modelFindAttribs(enums_1.EGeomType.vertices),
            ...this.modelFindAttribs(enums_1.EGeomType.edges),
            ...this.modelFindAttribs(enums_1.EGeomType.wires),
            ...this.modelFindAttribs(enums_1.EGeomType.faces),
            ...this.modelFindAttribs(enums_1.EGeomType.objs),
        ];
    }
    /**
     * to be completed
     * @param
     * @return
     */
    modelGetAllAttribsExcPoints() {
        return [
            ...this.modelFindAttribs(enums_1.EGeomType.vertices),
            ...this.modelFindAttribs(enums_1.EGeomType.edges),
            ...this.modelFindAttribs(enums_1.EGeomType.wires),
            ...this.modelFindAttribs(enums_1.EGeomType.faces),
            ...this.modelFindAttribs(enums_1.EGeomType.objs),
        ];
    }
    /**
     * to be completed
     * @param
     * @return
     */
    modelGetAllEntAttribs() {
        return [
            ...this.modelFindAttribs(enums_1.EGeomType.points),
            ...this.modelFindAttribs(enums_1.EGeomType.objs),
        ];
    }
    /**
     * to be completed
     * @param
     * @return
     */
    modelGetAllTopoAttribs() {
        return [
            ...this.modelFindAttribs(enums_1.EGeomType.vertices),
            ...this.modelFindAttribs(enums_1.EGeomType.edges),
            ...this.modelFindAttribs(enums_1.EGeomType.wires),
            ...this.modelFindAttribs(enums_1.EGeomType.faces),
        ];
    }
    /**
     * to be completed
     * @param
     * @return
     */
    modelGetAttrib(name, geom_type) {
        return this._attribs.get(geom_type).get(name);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    modelAddAttrib(name, geom_type, data_type) {
        if (this.modelHasAttrib(name, geom_type)) {
            return this.modelGetAttrib(name, geom_type);
        }
        // name = name.replace(/\s/g, "_");
        const data = {
            data_type: enums_1.mapDataTypeToString.get(data_type),
            geom_type: enums_1.mapGeomTypeToString.get(geom_type),
            name,
            values: [[], [null]]
        };
        // save and return data
        this._attribs.get(geom_type).set(name, data);
        // populate the attribute with indexes all pointing to the null value
        this._newAttribAddObjsAndPoints(name, geom_type);
        // return the new attribute
        return this._attribs.get(geom_type).get(name);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    modelDelAttrib(name, geom_type) {
        return this._attribs.get(geom_type).delete(name);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    modelHasAttrib(name, geom_type) {
        return this._attribs.get(geom_type).has(name);
    }
    //  Model Groups -------------------------------------------------------------------------------
    /**
     * to be completed
     * @param
     * @return
     */
    modelGetAllGroups() {
        return Array.from(this._groups.values());
    }
    /**
     * to be completed
     * @param
     * @return
     */
    modelGetGroup(name) {
        return this._groups.get(name);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    modelAddGroup(name, parent) {
        if (this.modelHasGroup(name)) {
            return this.modelGetGroup(name);
        }
        const data = { name, parent: null, objs: [], points: [] };
        if (parent !== undefined) {
            if (this._groups.has(parent)) {
                data.parent = parent;
            }
            else {
                throw new Error("Parent group does not exist.");
            }
        }
        this._groups.set(name, data);
        this._topos_trees.set(name, new topo_trees_1.TopoTree());
        return data;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    modelDelGroup(name) {
        const group = this._groups.delete(name);
        const tree = this._topos_trees.delete(name);
        return (group && tree);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    modelHasGroup(name) {
        return this._groups.has(name);
    }
    //  Geom Points --------------------------------------------------------------------------------
    /**
     * Check if the geometry has this point
     * @param
     * @return
     */
    geomHasPoint(id) {
        return this._points[0][id] !== undefined;
    }
    /**
     * Adds a new point to the model at position xyz.
     * @param cartesian xyz coordinates are required to create a point
     * @return a instance of type Point is returned
     */
    geomAddPoint(xyz) {
        const new_id = this._points[0].length; // next in sparse array
        // create the point
        this._points[0].push(0); // add a point to the points list
        this.pointSetPosition(new_id, xyz);
        // update point attributes
        this._newPointAddToAttribs(new_id);
        return new_id;
    }
    /**
     * Add a set of points to the model based on an array of xyz positions.
     * @param
     * @return
     */
    geomAddPoints(xyzs) {
        return xyzs.map((xyz) => this.geomAddPoint(xyz));
    }
    /**
     * Copy a point. The new point will have the same position as the original point.
     * If copy_attribs is true, then the copied point will have the same attributes as the original point.
     * @param id
     * @param copy_attribs
     * @return
     */
    geomCopyPoint(id, copy_attribs = true) {
        const new_id = this._points[0].length;
        // create the ray
        this._points[0].push(this._points[0][id]); // add the point, set same position
        // update all attributes
        this._copiedPointAddToAttribs(new_id, id, copy_attribs);
        // return the new id
        return new_id;
    }
    /**
     * Copy a set of points. The new points will have the same positions as the original points.
     * If copy_attribs is true, then the copied points will have the same attribute values as the original points.
     * @param ids
     * @param copy_attribs
     * @return
     */
    geomCopyPoints(ids, copy_attribs = true) {
        return ids.map((id) => this.geomCopyPoint(id, copy_attribs));
    }
    /**
     * to be completed
     * @param
     * @return
     */
    geomDelPoint(id) {
        // delete the point from the geometry array
        if (this._points[0][id] === undefined) {
            return false;
        }
        // delete the point
        delete this._points[0][id];
        // delete the point from any geometrc objects
        this._updateObjsForDelPoint(id);
        // delete the point from attribs
        this._updateAttribsForDelPoint(id);
        // delete the points from groups
        this._updateGroupsForDelPoint(id);
        // all seem ok
        return true;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    geomDelPoints(ids) {
        let ok = true;
        for (const id of ids) {
            if (this.geomHasPoint(id)) {
                if (!this.geomDelPoint(id)) {
                    ok = false;
                }
            }
        }
        return ok;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    geomNumPoints() {
        return this._points[0].filter((n) => n !== undefined).length; // ignores empty slots in spare array
    }
    /**
     * Creates a list if point IDs. The list does not include the empty slots.
     * @param
     * @return
     */
    geomGetPointIDs() {
        const point_ids = [];
        this._points[0].forEach((v, i) => (v !== undefined) && point_ids.push(i)); // ignores empty slots in spare array
        return point_ids;
    }
    /**
     * Calculates the centroid of a set of points, as the average of all point positions.
     * @param
     * @return
     */
    geomCalcPointsCentroid(ids) {
        if (ids.length === 1) {
            return [
                this._points[1][this._points[0][ids[0]]][0],
                this._points[1][this._points[0][ids[0]]][1],
                this._points[1][this._points[0][ids[0]]][2]
            ];
        }
        const centroid = [0, 0, 0];
        for (const id of ids) {
            centroid[0] += this._points[1][this._points[0][id]][0];
            centroid[1] += this._points[1][this._points[0][id]][1];
            centroid[2] += this._points[1][this._points[0][id]][2];
        }
        centroid[0] = centroid[0] / ids.length;
        centroid[1] = centroid[1] / ids.length;
        centroid[2] = centroid[2] / ids.length;
        return centroid;
    }
    /**
     * Merge points, replaces these points with a new point.
     * @param
     * @return
     */
    geomMergePoints(ids) {
        // calc the center point
        const centre = this.geomCalcPointsCentroid(ids);
        // replace old with new
        const new_point_id = this.geomAddPoint(centre);
        for (const id of ids) {
            this._swapAllObjsPoint(id, new_point_id);
        }
        this.geomDelPoints(ids);
        // return the new point, the centre of the old points
        return new_point_id;
    }
    /**
     * Merge points.
     * @param
     * @return
     */
    geomMergePointsByTol(ids, tolerance) {
        if (ids === undefined) {
            ids = this.geomGetPointIDs();
        }
        // get all the points that are closer than tolerance, store the data in some maps
        const dist_map = new Map();
        const cluster_map = new Map();
        for (let i = 0; i < ids.length - 1; i++) {
            for (let j = i + 1; j < ids.length; j++) {
                const id_i = ids[i];
                const id_j = ids[j];
                const pos_i = this._points[1][this._points[0][id_i]];
                const pos_j = this._points[1][this._points[0][id_j]];
                const dist_sq = this._distanceSquared(pos_i, pos_j, tolerance);
                if (dist_sq !== null) {
                    const id_pair = [id_i, id_j].sort();
                    // populate dist map
                    if (!dist_map.has(id_pair[0])) {
                        dist_map.set(id_pair[0], new Map());
                    }
                    dist_map.get(id_pair[0]).set(id_pair[1], dist_sq);
                    // populate cluster map
                    if (!cluster_map.has(id_i)) {
                        cluster_map.set(id_i, []);
                    }
                    cluster_map.get(id_i).push(id_j);
                    if (!cluster_map.has(id_j)) {
                        cluster_map.set(id_j, []);
                    }
                    cluster_map.get(id_j).push(id_i);
                }
            }
        }
        // create array, reverse sort, so that points with most neighbours end up at the top
        const cluster_arr = [];
        for (const [id, n] of cluster_map.entries()) {
            cluster_arr.push({ id, n });
        }
        cluster_arr.sort((a, b) => b.n.length - a.n.length);
        // create a cluster map, filter the clusters so that the center points do not overlap
        const consumed_ids = new Set();
        const cluster_no_overlap_map = new Map();
        for (const cluster of cluster_arr) {
            if (!consumed_ids.has(cluster.id)) {
                cluster_no_overlap_map.set(cluster.id, []);
                cluster.n.forEach((id) => consumed_ids.add(id));
            }
        }
        // put each point into the closest cluster
        for (const [id, n] of cluster_map.entries()) {
            if (cluster_no_overlap_map.has(id)) {
                cluster_no_overlap_map.get(id).push(id);
            }
            else {
                // create a list of options, where to put this id
                const options = [];
                for (const option of n) {
                    if (cluster_no_overlap_map.has(option)) {
                        options.push(option);
                    }
                }
                // choose an option
                if (options.length === 0) {
                    console.log("This looks like an error!!!");
                }
                else if (options.length === 1) {
                    cluster_no_overlap_map.get(options[0]).push(id);
                }
                else {
                    let closest = options[0];
                    let min_dist = tolerance;
                    for (const option of options) {
                        const id_pair = [id, option].sort();
                        const vec = dist_map.get(id_pair[0]).get(id_pair[1]);
                        const dist = vec[0] + vec[1] + vec[2];
                        if (dist < min_dist) {
                            closest = option;
                            min_dist = dist;
                        }
                    }
                    cluster_no_overlap_map.get(closest).push(id);
                }
            }
        }
        // now process the clusters
        const new_point_ids = [];
        const old_point_ids = [];
        for (const [cluster_id, cluster] of cluster_no_overlap_map.entries()) {
            // calc the center point
            const centre = this.geomCalcPointsCentroid(cluster);
            // replace old with new
            const new_point_id = this.geomAddPoint(centre);
            for (const old_point_id of cluster) {
                this._swapAllObjsPoint(old_point_id, new_point_id);
                old_point_ids.push(old_point_id);
            }
            new_point_ids.push(new_point_id);
        }
        this.geomDelPoints(old_point_ids);
        // return the new points, the centre of each cluster
        return new_point_ids;
    }
    /**
     * Merge all points in the model.
     * @param
     * @return
     */
    geomMergeAllPoints(tolerance) {
        return this.geomMergePointsByTol(this.geomGetPointIDs(), tolerance);
    }
    //  Geom Object Constructors------------------------------------------------------------------------------
    /**
     * Adds a new ray to the model that passes through a sequence of points.
     * @param origin The ray origin point.
     * @param dir The ray direction, as a vector.
     * @return ID of object.
     */
    geomAddRay(origin_id, ray_vec) {
        const new_id = this._objs.length;
        // create the ray
        this._objs.push([
            [[origin_id]],
            [],
            [1 /* ray */, ray_vec],
        ]); // add the obj
        // update all attributes
        this._newObjAddToAttribs(new_id);
        // return the new pline
        return new_id;
    }
    /**
     * Adds a new rayTwo to the model that passes through a sequence of points.
     * @param origin, a point that belongs to the line.
     * @param dir, the ray direction, as a vector.
     * @return ID of object.
     */
    geomAddRayTwo(origin_id, line_vec) {
        const new_id = this._objs.length;
        // create the line
        this._objs.push([
            [[origin_id]],
            [],
            [11 /* rayTwo */, line_vec],
        ]); // add the obj
        // update all attributes
        this._newObjAddToAttribs(new_id);
        // return the new pline
        return new_id;
    }
    /**
     * Adds a new plane to the model defined by an origin and two vectors.
     * @param origin_id The plane origin point.
     * @param axes Three orthogonal aaxes as XYZ vectors
     * @return ID of object.
     */
    geomAddPlane(origin_id, axes) {
        const new_id = this._objs.length;
        // add the obj
        this._objs.push([
            [[origin_id]],
            [],
            [2 /* plane */, axes[0], axes[1], axes[2]],
        ]); // add the obj
        // update all attributes
        this._newObjAddToAttribs(new_id);
        // return the new pline
        return new_id;
    }
    /**
     * Adds a new ellipse to the model defined by origin and two vectors for the x and y axes, and
     * two angles.
     * @param origin_id The origin point.
     * @param axes Three orthogonal axes as XYZ vectors
     * @param angles The angles, can be undefined, in which case a closed circle is generated.
     * @return ID of object.
     */
    geomAddCircle(origin_id, axes, angles) {
        const new_id = this._objs.length;
        // add the obj
        this._objs.push([
            [[origin_id]],
            [],
            [3 /* circle */, axes[0], axes[1], axes[2], angles],
        ]);
        // update all attributes
        this._newObjAddToAttribs(new_id);
        // return the new conic id
        return new_id;
    }
    /**
     * Adds a new ellipse to the model defined by origin and two vectors for the x and y axes, and
     * two angles.
     * @param origin_id The origin point.
     * @param axes Three orthogonal axes as XYZ vectors
     * @param angles The angles, can be undefined, in which case a ellipse is generated.
     * @return ID of object.
     */
    geomAddEllipse(origin_id, axes, angles) {
        const new_id = this._objs.length;
        // add the obj
        this._objs.push([
            [[origin_id]],
            [],
            [4 /* ellipse */, axes[0], axes[1], axes[2], angles],
        ]);
        // update all attributes
        this._newObjAddToAttribs(new_id);
        // return the new conic id
        return new_id;
    }
    /**
     * Adds a new Parabola to the model defined by origin and two vectors for the x and y axes, and
     * two angles.
     * @param origin_id The origin point.
     * @param axes Three orthogonal axes as XYZ vectors
     * @param angles The angles, can be undefined, in which case a Parabola is generated.
     * @return ID of object.
     */
    geomAddParabola(origin_id, axes, angles) {
        const new_id = this._objs.length;
        // add the obj
        this._objs.push([
            [[origin_id]],
            [],
            [5 /* parabola */, axes[0], axes[1], axes[2], angles],
        ]);
        // update all attributes
        this._newObjAddToAttribs(new_id);
        // return the new conic id
        return new_id;
    }
    /**
     * Adds a new Hyperbola to the model defined by origin and two vectors for the x and y axes, and
     * two angles.
     * @param origin_id The origin point.
     * @param axes Three orthogonal axes as XYZ vectors
     * @param angles The angles, can be undefined, in which case a Hyperbola is generated.
     * @return ID of object.
     */
    geomAddHyperbola(origin_id, axes, angles) {
        const new_id = this._objs.length;
        // add the obj
        this._objs.push([
            [[origin_id]],
            [],
            [6 /* hyperbola */, axes[0], axes[1], axes[2], angles],
        ]);
        // update all attributes
        this._newObjAddToAttribs(new_id);
        // return the new conic id
        return new_id;
    }
    /**
     * Adds a new polyline to the model that passes through a sequence of points.
     * @param points An array of Points.
     * @param is_closed Indicates whether the polyline is closed.
     * @return ID of object.
     */
    geomAddPolyline(point_ids, is_closed) {
        if (point_ids.length < 2) {
            throw new Error("Too few points for creating a polyline.");
        }
        const new_id = this._objs.length;
        // create the pline
        if (is_closed) {
            point_ids.push(-1);
        }
        this._objs.push([[point_ids], [], [100 /* polyline */]]); // add the obj
        // update all attributes
        this._newObjAddToAttribs(new_id);
        // return the new pline
        return new_id;
    }
    /**
     * to be completed
     * @param
     * @return ID of object.
     */
    geomAddPolymesh(face_points_ids) {
        for (const f of face_points_ids) {
            if (f.length < 3) {
                throw new Error("Too few points for creating a face.");
            }
        }
        const new_id = this._objs.length;
        const wire_points_ids = this._findPolymeshWires(face_points_ids);
        face_points_ids.forEach((f) => f.push(-1)); // close
        wire_points_ids.forEach((w) => w.push(-1)); // close
        this._objs.push([wire_points_ids, face_points_ids, [200 /* polymesh */]]); // add the obj
        // update all attributes
        this._newObjAddToAttribs(new_id);
        // return the new pline
        return new_id;
    }
    //  Geom Object Functions------------------------------------------------------------------------------
    /**
     * Returns true if an object with the specified ID exists.
     * @param
     * @return
     */
    geomHasObj(id) {
        return this._objs[id] !== undefined;
    }
    /**
     * Copy and object.
     * If copy_attribs is true, then the copied object will have the same attributes as the original object.
     * @param ids
     * @param copy_attribs
     * @return
     */
    geomCopyObj(id, copy_attribs = true) {
        const new_id = this._objs.length;
        // create the copy
        this._objs.push(arr_1.Arr.deepCopy(this._objs[id])); // add the obj
        // copy points
        const old_points = this.objGetAllPointIDs(new_id);
        const new_points = this.geomCopyPoints(old_points, copy_attribs);
        this._swapObjPoints(new_id, old_points, new_points);
        // update all attributes?
        this._copiedObjAddToAttribs(id, new_id, copy_attribs);
        // return the new pline
        return new_id;
    }
    /**
     * Copy a list of objects.
     * If copy_attribs is true, then the copied objects will have the same attributes as the original objects.
     * @param ids
     * @param copy_attribs
     * @return Array of new ids
     */
    geomCopyObjs(ids, copy_attribs = true) {
        return ids.map((id) => this.geomCopyObj(id, copy_attribs));
    }
    /**
     * to be completed
     * @param
     * @return Array of new ids
     */
    geomDelObj(id, keep_unused_points = true) {
        if (this._objs[id] === undefined) {
            return false;
        }
        // get the data
        const data = this._objs[id];
        // delete the obj from the geometry array
        delete this._objs[id];
        // delete attribute values for this object
        this._updateAttribsForDelObj(id);
        // delete this object from all groups
        this._updateGroupsForDelObj(id);
        // delete the points
        if (!keep_unused_points) {
            const unused_points = new Set();
            data[0].forEach((w, wi) => w.forEach((v, vi) => this.pointIsUnused(v) && unused_points.add(v)));
            data[1].forEach((f, fi) => f.forEach((v, vi) => this.pointIsUnused(v) && unused_points.add(v)));
            this.geomDelPoints(Array.from(unused_points));
        }
        return true;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    geomDelObjs(ids, keep_unused_points = true) {
        let ok = true;
        for (const id of ids) {
            if (!this.geomDelObj(id, keep_unused_points)) {
                ok = false;
            }
        }
        return ok;
    }
    /**
     * Does not count empty slots in sparse arrays.
     * @param
     * @return
     */
    geomNumObjs() {
        return this._objs.filter((v) => (v !== undefined)).length;
    }
    /**
     * Creates a list of object IDs. Skips empty slots in spare array.
     * @param
     * @return
     */
    geomGetObjIDs() {
        const obj_ids = [];
        this._objs.forEach((v, i) => (v !== undefined) && obj_ids.push(i));
        return obj_ids;
    }
    //  Geom Topo ----------------------------------------------------------------------------------
    /**
     * Returns true if a topo with the specified path exists.
     * @param
     * @return
     */
    geomHasTopo(path) {
        if (this._objs[path.id] === undefined) {
            return false;
        }
        if (this._objs[path.id][path.tt][path.ti] === undefined) {
            return false;
        }
        if (path.st !== undefined) {
            if (this._objs[path.id][path.tt][path.ti][path.si] === undefined) {
                return false;
            }
        }
        return true;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    geomGetTopoPaths(geom_type) {
        const objs_data = this._objsDense();
        switch (geom_type) {
            case enums_1.EGeomType.vertices:
                return this._getVEPathsFromObjsData(objs_data, 0);
            case enums_1.EGeomType.edges:
                return this._getVEPathsFromObjsData(objs_data, 1);
            case enums_1.EGeomType.wires:
                return this._getWFPathsFromObjsData(objs_data, 0);
            case enums_1.EGeomType.faces:
                return this._getWFPathsFromObjsData(objs_data, 1);
        }
    }
    /**
     * to be completed
     * @param
     * @return
     */
    geomNumTopos(geom_type) {
        // return this._getPaths(geom_type).length;
        switch (geom_type) {
            case enums_1.EGeomType.vertices:
                return this._objs.map((o) => [
                    ...o[0].map((w) => w.filter((wi) => (wi !== -1)).length),
                    ...o[1].map((f) => f.filter((fi) => (fi !== -1)).length),
                ].reduce((a, b) => a + b)).reduce((a, b) => a + b);
            case enums_1.EGeomType.edges:
                return this._objs.map((o) => [
                    ...o[0].map((w) => w.length - 1),
                    ...o[1].map((f) => f.length - 1),
                ].reduce((a, b) => a + b)).reduce((a, b) => a + b);
            case enums_1.EGeomType.wires:
                return this._objs.map((o) => o[0].length).reduce((a, b) => a + b);
            case enums_1.EGeomType.faces:
                return this._objs.map((o) => o[1].length).reduce((a, b) => a + b);
        }
    }
    /**
     * Within the parent object, find all vertices with the same point.
     * Returns an array containing two sub-arrays.
     * 1) The wire vertices, and 2) the face vertices.
     * @return An array containing the two sub-arrays of vertices.
     */
    geomFindVerticesSharedPoint(vertex_path) {
        const point_id = this.vertexGetPoint(vertex_path);
        // loop through all wires and extract verts that have same point_id
        const wire_vertices = [];
        this._objs[vertex_path.id][0].forEach((w, w_i) => w.forEach((v, v_i) => (v === point_id) // same point id
            && (!(w_i === vertex_path.ti && v_i === vertex_path.si)) // avoid dup
            && wire_vertices.push({ id: vertex_path.id, tt: 0, ti: w_i, st: vertex_path.st, si: v_i })));
        // loop through all faces and extract verts that have same point_id
        const face_vertices = [];
        this._objs[vertex_path.id][1].forEach((f, f_i) => f.forEach((v, v_i) => (v === point_id) // same point id
            && (!(f_i === vertex_path.ti && v_i === vertex_path.si)) // avoid dup
            && face_vertices.push({ id: vertex_path.id, tt: 1, ti: f_i, st: vertex_path.st, si: v_i })));
        return [wire_vertices, face_vertices];
    }
    /**
     * Within the parent object, find all edges with the same two points as this edge.
     * The order of the points is ignored.
     * Returns an array containing two sub-arrays.
     * 1) The wire edges, and 2) the face edges.
     * @return An array containing the two sub-arrays of edges.
     */
    geomFindEdgesSharedPoints(edge_path) {
        const point_id_0 = this.vertexGetPoint(edge_path);
        const wf_topos = this._objs[edge_path.id][edge_path.tt][edge_path.ti];
        const num_edges = this.topoNumEdges({ id: edge_path.id, tt: edge_path.tt, ti: edge_path.ti });
        let vertex_index = edge_path.si + 1;
        if (vertex_index > num_edges - 1) {
            vertex_index = 0;
        }
        const point_id_1 = this.vertexGetPoint({ id: edge_path.id, tt: edge_path.tt, ti: edge_path.ti, st: edge_path.st, si: vertex_index });
        const points = [point_id_0, point_id_1].sort();
        // loop through all wires and extract verts that have same point_id
        const wire_edges = [];
        this._objs[edge_path.id][0].forEach((w, w_i) => w.forEach((v, v_i) => arr_1.Arr.equal([v, w[v_i + 1]].sort(), points) && (w_i !== edge_path.ti)
            && wire_edges.push({ id: edge_path.id, tt: 0, ti: w_i, st: 1, si: v_i })));
        // loop through all faces and extract verts that have same point_id
        const face_edges = [];
        this._objs[edge_path.id][1].forEach((f, f_i) => f.forEach((v, v_i) => arr_1.Arr.equal([v, f[v_i + 1]].sort(), points) && (f_i !== edge_path.ti)
            && face_edges.push({ id: edge_path.id, tt: 1, ti: f_i, st: 1, si: v_i })));
        // return the doube list of edges
        return [wire_edges, face_edges]; // TODO I am avoiding all edges in same face or wire
    }
    /**
     * Within the parent object, find all faces or wires with shared points.
     * The order of the points is ignored.
     * Returns an array of topos.
     * If the input path is a wire, it returns wires.
     * If the input path is a face, it returns faces.
     * @return An array containing the two sub-arrays of edges.
     */
    geomFindTopoSharedPoints(path) {
        // Code Copied from topos.ts
        // if(num_shared_points === undefined){num_shared_points = 1;}
        // if( num_shared_points === 0){throw new Error("WARNING: num_shared point needs a non zero value") ;}
        // const faces:ifs.IFace[] = [];
        // const Obj:ifs.IObj = this.getGeom().getObj(this.getObjID());
        // for(const b of Obj.getFaces()){
        // let counter:number = 0;
        // for (const c of b.getVertices()){
        // for(const a of this.getGeom().getObjData(this.getTopoPath())){
        // if(!(a===-1)){if(!(this.getTopoPath().ti === c.getTopoPath().ti))
        // {if(a === c.getPoint().getID()){counter = counter + 1;}}}
        // };
        // var duplicate:boolean = false;
        // for(const k of faces){if( k.getTopoPath() === b.getTopoPath()){duplicate = true;}}
        // if(!duplicate){if(counter >= num_shared_points){faces.push(new Face(this.geom, b.getTopoPath()));}}
        // }
        // }
        // return faces;
        throw new Error("Method not implemented.");
    }
    /**
     * Within the parent object, find all vertices with the same point position.
     * Returns an array containing two sub-arrays.
     * 1) The wire vertices, and 2) the face vertices.
     * @return An array containing the two sub-arrays of vertices.
     */
    geomFindVerticesSamePosition(vertex_path) {
        const point_id = this.vertexGetPoint(vertex_path);
        // loop through all wires and extract verts that have same position
        const wire_vertices = [];
        this._objs[vertex_path.id][0].forEach((w, w_i) => w.forEach((v, v_i) => (this._points[0][v] === this._points[0][point_id]) // same pos
            && (!(w_i === vertex_path.ti && v_i === vertex_path.si)) // avoid dup
            && wire_vertices.push({ id: vertex_path.id, tt: 0, ti: w_i, st: vertex_path.st, si: v_i })));
        // loop through all faces and extract verts that have same position
        const face_vertices = [];
        this._objs[vertex_path.id][1].forEach((f, f_i) => f.forEach((v, v_i) => (this._points[0][v] === this._points[0][point_id]) // same pos
            && (!(f_i === vertex_path.ti && v_i === vertex_path.si)) // avoid dup
            && face_vertices.push({ id: vertex_path.id, tt: 1, ti: f_i, st: vertex_path.st, si: v_i })));
        return [wire_vertices, face_vertices];
    }
    //  Objects ------------------------------------------------------------------------------------
    /**
     * to be completed
     * @param
     * @return
     */
    objGetType(id) {
        return this._objs[id][2][0];
    }
    /**
     * Gets one point for this object. This is udeful for entities that are deifned by a single point.
     * @return One point ID.
     */
    objGetOnePoint(id) {
        if (this._objs[id][0][0] !== undefined) {
            return this._objs[id][0][0][0];
        }
        if (this._objs[id][1][0] !== undefined) {
            return this._objs[id][1][0][0];
        }
        return null;
    }
    /**
     * Get the points for this object. If the point_type is not specified, then
     * points for both wires and faces are returned.
     * @return A nested array of point ids.
     */
    objGetPointIDs(id, point_type) {
        let w_points = [];
        if (point_type === undefined || point_type === enums_1.EGeomType.wires) {
            w_points = this._objs[id][0].map((w) => w.filter((v) => (v !== -1)));
        }
        let f_points = [];
        if (point_type === undefined || point_type === enums_1.EGeomType.faces) {
            f_points = this._objs[id][1].map((f) => f.filter((v) => (v !== -1)));
        }
        return [w_points, f_points];
    }
    /**
     * Get the points for this object as a flat list of unique points.
     * @return A flat array of point ids.
     */
    objGetAllPointIDs(id) {
        const point_set = new Set();
        this._objs[id][0].forEach((w) => w.forEach((v) => (v !== -1) && point_set.add(v)));
        this._objs[id][1].forEach((f) => f.forEach((v) => (v !== -1) && point_set.add(v)));
        return Array.from(point_set);
    }
    /**
     * Get the vertices for this object. If the vertex_type is not specified, then
     * vertices for both wires and faces are returned.
     * @return The array of vertices.
     */
    objGetVertices(id, vertex_type) {
        const w_vertices = [];
        if (vertex_type === undefined || vertex_type === enums_1.EGeomType.wires) {
            for (let wi = 0; wi < this._objs[id][0].length; wi++) {
                const wire = this._objs[id][0][wi];
                const v_paths = [];
                for (let vi = 0; vi < wire.length; vi++) {
                    if (wire[vi] !== -1) {
                        v_paths.push({ id, tt: 0, ti: wi, st: 0, si: vi });
                    }
                }
                w_vertices.push(v_paths);
            }
        }
        const f_vertices = [];
        if (vertex_type === undefined || vertex_type === enums_1.EGeomType.faces) {
            for (let fi = 0; fi < this._objs[id][1].length; fi++) {
                const face = this._objs[id][1][fi];
                const v_paths = [];
                for (let vi = 0; vi < face.length; vi++) {
                    if (face[vi] !== -1) {
                        v_paths.push({ id, tt: 1, ti: fi, st: 0, si: vi });
                    }
                }
                w_vertices.push(v_paths);
            }
        }
        return [w_vertices, f_vertices];
    }
    /**
     * Get the edges for this object. If the edge_type is not specified, then
     * edges for both wires and faces are returned.
     * @return The array of edges.
     */
    objGetEdges(id, edge_type) {
        const w_edges = [];
        if (edge_type === undefined || edge_type === enums_1.EGeomType.wires) {
            for (let wi = 0; wi < this._objs[id][0].length; wi++) {
                const wire = this._objs[id][0][wi];
                const e_paths = [];
                for (let ei = 0; ei < wire.length - 1; ei++) {
                    e_paths.push({ id, tt: 0, ti: wi, st: 1, si: ei });
                }
                w_edges.push(e_paths);
            }
        }
        const f_edges = [];
        if (edge_type === undefined || edge_type === enums_1.EGeomType.faces) {
            for (let fi = 0; fi < this._objs[id][1].length; fi++) {
                const face = this._objs[id][1][fi];
                const e_paths = [];
                for (let ei = 0; ei < face.length - 1; ei++) {
                    e_paths.push({ id, tt: 1, ti: fi, st: 1, si: ei });
                }
                f_edges.push(e_paths);
            }
        }
        return [w_edges, f_edges];
    }
    /**
     * Get the wires for this object.
     * @return The array of wires.
     */
    objGetWires(id) {
        return this._objs[id][0].map((w, wi) => Object({ id, tt: 0, ti: wi }));
    }
    /**
     * Get the faces for this object.
     * @return The array of faces.
     */
    objGetFaces(id) {
        return this._objs[id][1].map((f, fi) => Object({ id, tt: 1, ti: fi }));
    }
    /**
     * Get the number of wires for this object.
     * @return The number of wires.
     */
    objNumWires(id) {
        return this._objs[id][0].length;
    }
    /**
     * Get the number of faces for this object.
     * @return The number of faces.
     */
    objNumFaces(id) {
        return this._objs[id][1].length;
    }
    /**
     * Get the parameters for this object.
     * @return The parameters array.
     */
    objGetParams(id) {
        return this._objs[id][2];
    }
    /**
     * Get the parameters for this object.
     * @return The parameters array.
     */
    objSetParams(id, params) {
        const old_params = this._objs[id][2];
        this._objs[id][2] = params;
        return old_params;
    }
    /**
     * Get all the groups for which this obj is a member.
     * @return The array of group names.
     */
    objGetGroups(id) {
        const names = [];
        this._groups.forEach((v, k) => (v.objs.indexOf(id) !== -1) && names.push(v.name));
        return names;
    }
    /**
     * Transform all the points for this object.
     */
    objXform(id, matrix) {
        this.pointsXform(this.objGetAllPointIDs(id), matrix);
        switch (this.objGetType(id)) {
            case 1 /* ray */:
            case 2 /* plane */:
            case 3 /* circle */:// cannot be streched
                // set position of matrix to 0 so no translation
                const matrix2 = matrix.clone();
                matrix2.setPosition(new three.Vector3());
                this._objs[id][2][1] = threex.multXYZMatrix(this._objs[id][2][1], matrix2); //TODO check this
                this._objs[id][2][1] = threex.multXYZMatrix(this._objs[id][2][2], matrix2);
                this._objs[id][2][1] = threex.multXYZMatrix(this._objs[id][2][3], matrix2);
                break;
            case 4 /* ellipse */:// can be streched
                // multiply by transpose of the inverse of that matrix
                const matrix3 = matrix.clone();
                matrix3.setPosition(new three.Vector3());
                matrix3.getInverse(matrix).transpose();
                this._objs[id][2][1] = threex.multXYZMatrix(this._objs[id][2][1], matrix3); //TODO check this
                this._objs[id][2][1] = threex.multXYZMatrix(this._objs[id][2][2], matrix3);
                this._objs[id][2][1] = threex.multXYZMatrix(this._objs[id][2][3], matrix3);
                break;
            case 100 /* polyline */:
            case 200 /* polymesh */:
                //no need to do anything
                break;
            default:
                throw new Error("Object type not found: " + this.objGetType(id));
        }
        // TODO what about attributes that are vectors, they should be transformed as well
        // matrix2.getInverse(matrix).transpose();
    }
    //  Points -------------------------------------------------------------------------------------
    /**
     * to be completed
     * @param
     * @return
     */
    pointSetPosition(id, xyz) {
        const old_xyz = this._points[1][this._points[0][id]];
        let value_index = arr_1.Arr.indexOf(this._points[1], xyz);
        if (value_index === -1) {
            value_index = this._points[1].length;
            this._points[1].push(xyz);
        }
        this._points[0][id] = value_index;
        return old_xyz;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    pointGetPosition(point_id) {
        return this._points[1][this._points[0][point_id]];
    }
    /**
     * Gets all the vertices that have this point id.
     * @param
     * @return
     */
    pointGetVertices(id) {
        const vertices = [];
        for (const [obj_id_str, obj] of this._objsDense().entries()) {
            obj[0].forEach((w, wi) => w.forEach((v, vi) => (v === id) && vertices.push(// Slow
            { id: Number(obj_id_str), tt: 0, ti: wi, st: 0, si: vi })));
            obj[1].forEach((f, fi) => f.forEach((v, vi) => (v === id) && vertices.push(// Slow
            { id: Number(obj_id_str), tt: 1, ti: fi, st: 0, si: vi })));
        }
        return vertices;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    pointIsUnused(point_id) {
        for (const obj of this._objsDense()) {
            if (arr_1.Arr.flatten(obj.slice(0, 3)).indexOf(point_id) !== -1) {
                return false;
            } // Slow
        }
        return true;
    }
    /**
     * Get all the groups for which this point is a member.
     * @return The array of group names.
     */
    pointGetGroups(id) {
        const names = [];
        this._groups.forEach((v, k) => (v.points.indexOf(id) !== -1) && names.push(v.name));
        return names;
    }
    /**
     * Transform the position of a point.
     * @param
     * @param
     */
    pointXform(id, matrix) {
        this.pointSetPosition(id, threex.multXYZMatrix(this.pointGetPosition(id), matrix));
    }
    /**
     * Transform the position of this point.
     * @param
     * @param
     */
    pointsXform(ids, matrix) {
        for (const id of ids) {
            this.pointSetPosition(id, threex.multXYZMatrix(this.pointGetPosition(id), matrix));
        }
    }
    //  Topo ---------------------------------------------------------------------------------
    /**
     * Get the number of vertices in this wire or face.
     * @return The number of vertices.
     */
    topoNumVertices(topo_path) {
        const vertices = this._objs[topo_path.id][topo_path.tt][topo_path.ti];
        if (vertices[vertices.length - 1] === -1) {
            return vertices.length - 1;
        }
        else {
            return vertices.length;
        }
    }
    /**
     * Get the number of edges in this wire or face.
     * @return The number of edges.
     */
    topoNumEdges(topo_path) {
        return this._objs[topo_path.id][topo_path.tt][topo_path.ti].length - 1;
    }
    /**
     * Get the vertices for this wire or face.
     * @return An array of vertices.
     */
    topoGetVertices(topo_path) {
        const vertices = [];
        for (let i = 0; i < this.topoNumVertices(topo_path); i++) {
            vertices.push({ id: topo_path.id, tt: topo_path.tt, ti: topo_path.ti, st: 0, si: i });
        }
        return vertices;
    }
    /**
     * Get the edges for this wire or face.
     * @return An array of edges.
     */
    topoGetEdges(topo_path) {
        const edges = [];
        for (let i = 0; i < this.topoNumEdges(topo_path); i++) {
            edges.push({ id: topo_path.id, tt: topo_path.tt, ti: topo_path.ti, st: 1, si: i });
        }
        return edges;
    }
    /**
     * Return true if this wire is closed. For faces, the result is always true.
     * @return boolean
     */
    topoIsClosed(topo_path) {
        const wf_topo = this._objs[topo_path.id][topo_path.tt][topo_path.ti];
        return (wf_topo[wf_topo.length - 1] === -1);
    }
    /**
     * Set if this wire is closed. For faces, the result is always true.
     * @return boolean
     */
    topoSetIsClosed(topo_path, is_closed) {
        if (topo_path.tt === 1) {
            return true;
        }
        const wf_topo = this._objs[topo_path.id][topo_path.tt][topo_path.ti];
        const was_closed = (wf_topo[wf_topo.length - 1] === -1);
        if (is_closed !== was_closed) {
            if (is_closed) {
                wf_topo.push(-1);
            }
            else {
                wf_topo.pop(); // removes -1 from end of list
            }
        }
        return was_closed;
    }
    /**
     * Within the parent object, find all faces or wires that share at least n points.
     * @return An array of faces.
     */
    topoFindSharedPoints(topo_path, num_shared_points) {
        // TODO trees
        throw new Error("Method not implemented.");
    }
    /**
     * Get the group names for all the groups for which this topological component is a member.
     * @return The array of group names.
     */
    topoGetGroups(path) {
        const group_names = [];
        this._topos_trees.forEach((tree, group_name) => tree.hasTopo(path) && group_names.push(group_name));
        return group_names;
    }
    /**
     * Add a vertex to this topo, either at start or end. Works for both wires and faces.
     * Vertex and edge attributes are also updated.
     * @return A path to the new vertex
     */
    topoAddVertex(path, point_id, to_start) {
        const vertices = this._objs[path.id][path.tt][path.ti];
        let new_vertex_index;
        let new_edge_index;
        if (to_start) {
            new_vertex_index = 0;
            new_edge_index = 0;
        }
        else {
            if (vertices[vertices.length - 1] === -1) {
                new_vertex_index = vertices.length - 1;
            }
            else {
                vertices.push(point_id);
                new_vertex_index = vertices.length;
            }
            new_edge_index = vertices.length - 1;
        }
        // insert the new vertex
        vertices.splice(new_vertex_index, 0, point_id);
        // update edge attributes
        for (const attrib of this._attribs.get(enums_1.EGeomType.edges)) {
            const edge_attribs = attrib.values[0][path.id][path.tt][path.ti];
            edge_attribs.splice(new_edge_index, 0, 0); // points to null
        }
        // update vertex attributes
        for (const attrib of this._attribs.get(enums_1.EGeomType.vertices)) {
            const vertex_attribs = attrib.values[0][path.id][path.tt][path.ti];
            vertex_attribs.splice(new_vertex_index, 0, 0); // points to null
        }
        // return a path to the new vertex
        return { id: path.id, tt: path.tt, ti: path.ti, st: 0, si: new_vertex_index };
    }
    /**
     * Delete a vertex to this topo. Works for both wires and faces.
     * @return True if successful.
     */
    topoDelVertex(path, vertex_path) {
        throw new Error("Method not implemented.");
    }
    //  Edges --------------------------------------------------------------------------------------
    /**
     * Get the two vertices for this edge.
     * @return An array of two edges.
     */
    edgeGetVertices(edge_path) {
        const wf_path = this.edgeGetTopo(edge_path);
        let vertex_index = edge_path.si + 1;
        if (vertex_index > this.topoNumVertices(wf_path) - 1) {
            vertex_index = 0;
        }
        return [
            { id: edge_path.id, tt: edge_path.tt, ti: edge_path.ti, st: 0, si: edge_path.si },
            { id: edge_path.id, tt: edge_path.tt, ti: edge_path.ti, st: 0, si: vertex_index },
        ];
    }
    /**
     * Get the wire or face to which this edge belongs.
     * @return The wire or face.
     */
    edgeGetTopo(edge_path) {
        return { id: edge_path.id, tt: edge_path.tt, ti: edge_path.ti };
    }
    /**
     * Find the next edge in the sequence of edges in the wire or face.
     * @return The next edge object.
     */
    edgeNext(edge_path) {
        let edge_index = edge_path.si + 1;
        const wf_path = this.edgeGetTopo(edge_path);
        if (edge_index === this.topoNumEdges(wf_path) - 1) {
            if (!this.topoIsClosed(wf_path)) {
                return null;
            }
            edge_index = 0;
        }
        else {
            edge_index += 1;
        }
        return { id: edge_path.id, tt: edge_path.tt, ti: edge_path.ti, st: edge_path.st, si: edge_index };
    }
    /**
     * Find the previous edge in the sequence of edges in the wire or face.
     * @return The previous edge object.
     */
    edgePrevious(edge_path) {
        let edge_index = edge_path.si - 1;
        const wf_path = this.edgeGetTopo(edge_path);
        if (edge_index === 0) {
            if (!this.topoIsClosed(wf_path)) {
                return null;
            }
            edge_index = this.topoNumEdges(wf_path) - 1;
        }
        else {
            edge_index -= 1;
        }
        return { id: edge_path.id, tt: edge_path.tt, ti: edge_path.ti, st: edge_path.st, si: edge_index };
    }
    /**
     * Inserts an extra point into an edge, thereby making two edges.
     * This requires all edge attributes to be updated.
     * @return The path to the new vertex.
     */
    edgeSplit(edge_path, point_id) {
        const edges = this._objs[edge_path.id][edge_path.tt][edge_path.ti];
        edges.splice(edge_path.si + 1, 0, point_id);
        // update edge attributes
        for (const attrib of this._attribs.get(enums_1.EGeomType.edges)) {
            const edge_attribs = attrib.values[0][edge_path.id][edge_path.tt][edge_path.ti];
            edge_attribs.splice(edge_path.si + 1, 0, 0); // points to null
        }
        // update vertex attributes
        for (const attrib of this._attribs.get(enums_1.EGeomType.vertices)) {
            const vertex_attribs = attrib.values[0][edge_path.id][edge_path.tt][edge_path.ti];
            vertex_attribs.splice(edge_path.si, 0, 0); // points to null
        }
        return { id: edge_path.id, tt: edge_path.tt, ti: edge_path.ti, st: 0, si: edge_path.si + 1 };
    }
    //  Vertices -----------------------------------------------------------------------------------
    /**
     * Get the point associated with this vertex.
     * @return The point object.
     */
    vertexGetPoint(vertex_path) {
        return this._objs[vertex_path.id][vertex_path.tt][vertex_path.ti][vertex_path.si];
    }
    /**
     * Get the edge for which this is the start vertex.
     * @return The edge object.
     */
    vertexGetEdge(vertex_path) {
        let edge_index = vertex_path.si;
        const wire_or_face = this.vertexGetTopo(vertex_path);
        if (edge_index > this.topoNumEdges(wire_or_face) - 1) {
            if (!this.topoIsClosed(wire_or_face)) {
                return null;
            }
            edge_index = 0;
        }
        return { id: vertex_path.id, tt: vertex_path.tt, ti: vertex_path.ti, st: 1, si: edge_index };
    }
    /**
     * Get the wire or face to which this vertex belongs.
     * @return The wire or face object.
     */
    vertexGetTopo(vertex_path) {
        return { id: vertex_path.id, tt: vertex_path.tt, ti: vertex_path.ti };
    }
    /**
     * Find the next vertex in the sequence of vertices in the wire or face.
     * @return The next vertex object.
     */
    vertexNext(vertex_path) {
        let vertex_index = vertex_path.si;
        const wf_topos = this.vertexGetTopo(vertex_path);
        if (vertex_index === this.topoNumVertices(wf_topos) - 1) {
            if (!this.topoIsClosed(wf_topos)) {
                return null;
            }
            vertex_index = 0;
        }
        else {
            vertex_index += 1;
        }
        return { id: vertex_path.id, tt: vertex_path.tt, ti: vertex_path.ti, st: 0, si: vertex_index };
    }
    /**
     * Find the previous vertex in the sequence of vertices in the wire or face.
     * @return The previous vertex object.
     */
    vertexPrevious(vertex_path) {
        let vertex_index = vertex_path.si;
        const wf_topos = this.vertexGetTopo(vertex_path);
        if (vertex_index === 0) {
            if (!this.topoIsClosed(wf_topos)) {
                return null;
            }
            vertex_index = this.topoNumVertices(wf_topos) - 1;
        }
        else {
            vertex_index -= 1;
        }
        return { id: vertex_path.id, tt: vertex_path.tt, ti: vertex_path.ti, st: 0, si: vertex_index };
    }
    //  Attributes ---------------------------------------------------------------------------------
    /**
     * to be completed
     * @param
     * @return
     */
    attribSetName(old_name, new_name, geom_type) {
        if (!this._attribs.get(geom_type).has(old_name)) {
            return false;
        }
        if (this._attribs.get(geom_type).has(new_name)) {
            return false;
        }
        this._attribs.get(geom_type).set(new_name, this._attribs.get(geom_type).get(old_name));
        this._attribs.get(geom_type).delete(old_name);
        return true;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    attribGetNames(geom_type) {
        const names = [];
        this._attribs.get(geom_type).forEach((a) => names.push(a.name));
        return names;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    attribGetDataType(name, geom_type) {
        const data_type_str = this._attribs.get(geom_type).get(name).data_type;
        return enums_1.mapStringToDataType.get(data_type_str);
    }
    /**
     * Get all the values for the attribute.
     * @return An array of values.
     */
    attribGetValues(name, geom_type) {
        const values = this._attribs.get(geom_type).get(name).values;
        const indexes = arr_1.Arr.flatten(values[0].filter((i) => i !== undefined));
        const unique_values = values[1];
        return indexes.map((i) => unique_values[i]);
    }
    /**
     * Get the number of attribute values. If the attribis an entAttrib, then this is equal to the
     * number of points or objects. If it is a topoAttrib, then this is equal to the number of topo
     * entities in the model of that type.
     * @return The numbe of attribute values.
     */
    attribCount(name, geom_type) {
        return this._attribs.get(geom_type).get(name).values[0].length;
    }
    //  Attribute values for Entities --------------------------------------------------------------
    /**
     * Get a single attribute value.
     * The data type of the attribute value can be found using the getDataType() method.
     * @param id The id of a geometric entity.
     * @return The value.
     */
    entAttribGetValue(name, geom_type, id) {
        const data = this._attribs.get(geom_type).get(name);
        return data.values[1][data.values[0][id]];
    }
    /**
     * Set a single attribute value.
     * The data type of the attribute value must match the getDataType() method.
     * @param id The id of a geometric entity.
     * @param value The new value.
     * @return The old value.
     */
    entAttribSetValue(name, geom_type, id, value) {
        const data = this._attribs.get(geom_type).get(name);
        let index = arr_1.Arr.indexOf(data.values[1], value);
        if (index === -1) {
            index = data.values[1].push(value) - 1;
        }
        let old_value;
        old_value = data.values[1][data.values[0][id]];
        data.values[0][id] = index;
        return old_value;
    }
    /**
     * Get all the labels for the attribute.
     * @return A sparse array of values.
     */
    entAttribGetIDs(name, geom_type) {
        switch (geom_type) {
            case enums_1.EGeomType.points:
                return this.geomGetPointIDs();
            case enums_1.EGeomType.objs:
                return this.geomGetObjIDs();
        }
        throw new Error("geom_type must be either points or objs");
    }
    //  Attributes Values for Topos ----------------------------------------------------------------
    /**
     * Get a single attribute value.
     * The data type of the attribute value can be found using the getDataType() method.
     * @param path The path to a topological component.
     * @return The value.
     */
    topoAttribGetValue(name, geom_type, path) {
        const data = this._attribs.get(geom_type).get(name);
        switch (geom_type) {
            case enums_1.EGeomType.wires:
            case enums_1.EGeomType.faces:
                return data.values[1][data.values[0][path.id][path.ti]];
            case enums_1.EGeomType.vertices:
            case enums_1.EGeomType.edges:
                return data.values[1][data.values[0][path.id][path.ti][path.si]];
        }
        throw new Error("geom_type must be either vertices, edges, wires, or faces");
    }
    /**
     * Set a single attribute value.
     * The data type of the attribute value can be found using the getDataType() method.
     * @param path The path to a topological component.
     * @param value The new value.
     * @return The old value.
     */
    topoAttribSetValue(name, geom_type, path, value) {
        const data = this._attribs.get(geom_type).get(name);
        let index = arr_1.Arr.indexOf(data.values[1], value);
        if (index === -1) {
            index = data.values[1].push(value) - 1;
        }
        let old_value;
        switch (geom_type) {
            case enums_1.EGeomType.wires:
            case enums_1.EGeomType.faces:
                old_value = data.values[1][data.values[0][path.id][path.ti]];
                data.values[0][path.id][path.ti] = index;
                return old_value;
            case enums_1.EGeomType.vertices:
            case enums_1.EGeomType.edges:
                old_value = data.values[1][data.values[0][path.id][path.tt][path.ti][path.si]];
                data.values[0][path.id][path.tt][path.ti][path.si] = index;
                return old_value;
        }
        throw new Error("geom_type must be either vertices, edges, wires, or faces");
    }
    /**
     * Get all the labels for the attribute.
     * @return A sparse array of values.
     */
    topoAttribGetPaths(name, geom_type) {
        switch (geom_type) {
            case enums_1.EGeomType.vertices:
                return arr_1.Arr.flatten(this.geomGetObjIDs().map((id) => this.objGetVertices(id)));
            case enums_1.EGeomType.edges:
                return arr_1.Arr.flatten(this.geomGetObjIDs().map((id) => this.objGetEdges(id)));
            case enums_1.EGeomType.wires:
                return arr_1.Arr.flatten(this.geomGetObjIDs().map((id) => this.objGetWires(id)));
            case enums_1.EGeomType.faces:
                return arr_1.Arr.flatten(this.geomGetObjIDs().map((id) => this.objGetFaces(id)));
        }
        throw new Error("geom_type must be either vertices, edges, wires, or faces");
    }
    //  Group manipulation methods -----------------------------------------------------------------
    /**
     * to be completed
     * @param
     * @return
     */
    groupSetName(old_name, new_name) {
        if (!this._groups.has(old_name)) {
            return false;
        }
        if (this._groups.has(new_name)) {
            return false;
        }
        this._groups.set(new_name, this._groups.get(old_name));
        this._groups.delete(old_name);
        return true;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetParent(name) {
        return this._groups.get(name).parent;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupSetParent(name, parent) {
        const old_parent_name = this._groups.get(name).parent;
        this._groups.get(name).parent = parent;
        return old_parent_name;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetChildren(name) {
        const children = [];
        this._groups.forEach((g) => (g.parent === name) && children.push(g.name));
        return children;
    }
    // Objs in group -------------------------------------------------------------------------------
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetNumObjs(name, obj_type) {
        const group = this._groups.get(name);
        if (obj_type === undefined) {
            return group.objs.length;
        }
        return group.objs.filter((oi) => this._objs[oi][2][0] === obj_type).length;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetObjIDs(name, obj_type) {
        const group = this._groups.get(name);
        if (obj_type === undefined) {
            return group.objs;
        }
        const ids = [];
        group.objs.forEach((oi) => (this._objs[oi][2][0] === obj_type) && ids.push(oi));
        return ids;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupAddObj(name, id) {
        const group = this._groups.get(name);
        if (id in group.objs) {
            return false;
        }
        else {
            group.objs.push(id);
        }
        return true;
    }
    /**
     * to be completed
     *
     * @param
     * @return Returns true if all obj IDs were added, false otherwise.
     */
    groupAddObjs(name, ids) {
        const group = this._groups.get(name);
        let ok = true;
        for (const id of ids) {
            if (!this.groupAddObj(name, id)) {
                ok = false;
            }
        }
        return ok;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupRemoveObj(name, id) {
        const group = this._groups.get(name);
        const index = group.objs.indexOf(id);
        if (index === -1) {
            return false;
        }
        group.objs.splice(index, 1);
        return true;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupRemoveObjs(name, ids) {
        const group = this._groups.get(name);
        let ok = true;
        for (const id of ids) {
            if (!this.groupRemoveObj(name, id)) {
                ok = false;
            }
        }
        return ok;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupHasObj(name, id) {
        const group = this._groups.get(name);
        const index = group.objs.indexOf(id);
        if (index === -1) {
            return false;
        }
        return true;
    }
    // Topos in group ------------------------------------------------------------------------------
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetNumTopos(name, geom_type) {
        return this._topos_trees.get(name).getNumTopos(geom_type);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetTopos(name, geom_type) {
        return this._topos_trees.get(name).getTopos(geom_type);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupAddTopo(name, topo) {
        return this._topos_trees.get(name).addTopo(topo);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupAddTopos(name, topos) {
        let ok = true;
        for (const topo of topos) {
            if (!this._topos_trees.get(name).addTopo(topo)) {
                ok = false;
            }
        }
        return ok;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupRemoveTopo(name, topo) {
        return this._topos_trees.get(name).removeTopo(topo);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupRemoveTopos(name, topos) {
        let ok = true;
        for (const topo of topos) {
            if (!this._topos_trees.get(name).removeTopo(topo)) {
                ok = false;
            }
        }
        return ok;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupHasTopo(name, topo) {
        return this._topos_trees.get(name).hasTopo(topo);
    }
    //  Points in group ----------------------------------------------------------------------------
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetNumPoints(name) {
        return this._groups.get(name).points.length;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetPointIDs(name) {
        return this._groups.get(name).points;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupAddPoint(name, id) {
        const group = this._groups.get(name);
        if (id in group.points) {
            return false;
        }
        else {
            group.points.push(id);
        }
        return true;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupAddPoints(name, ids) {
        const group = this._groups.get(name);
        let ok = true;
        for (const id of ids) {
            if (!this.groupAddPoint(name, id)) {
                ok = false;
            }
        }
        return ok;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupRemovePoint(name, id) {
        const group = this._groups.get(name);
        const index = group.points.indexOf(id);
        if (index === -1) {
            return false;
        }
        group.points.splice(index, 1);
        return true;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupRemovePoints(name, ids) {
        let ok = true;
        for (const id of ids) {
            if (!this.groupRemovePoint(name, id)) {
                ok = false;
            }
        }
        return ok;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupHasPoint(name, id) {
        const index = this._groups.get(name).points.indexOf(id);
        if (index === -1) {
            return false;
        }
        return true;
    }
    //  Group Properties ---------------------------------------------------------------------------
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetProps(name) {
        return this._groups.get(name).props;
    }
    /**
     * to be completed
     * @param
     * @return
     */
    groupSetProps(name, new_map) {
        const old_map = this._groups.get(name).props;
        this._groups.get(name).props = new_map;
        return old_map;
    }
    //  ======================================================================================================
    //  ======================================================================================================
    //  ======================================================================================================
    //  ======================================================================================================
    //  PRIVATE METHODS ======================================================================================
    //  ======================================================================================================
    //  ======================================================================================================
    //  ======================================================================================================
    //  ======================================================================================================
    /**
     * Returns an array of TObjData. Removes empty slots.
     * @param
     * @return
     */
    _objsDense() {
        return this._objs.filter((v) => (v !== undefined));
    }
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  CREATING ATTRIBUTES -----------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    /**
     * This method assumes that the attribute name is for a newly created attribute.
     * For ell existing point or object in the model, it assigns null values.
     * If the new attrib is a point attrib, then all points in the model will get a null value for this attrib.
     * If the new attrib is any other type of attribute (obj, vertex, edge, wire, face),
     * then also null values will be created for all those types.
     * Care has to be taken with sparse arrays. Points and objects are stored in sparse arrays.
     * The index into the array is the ID of the point or object.
     * The values[0] array for any attribute needs to have the exact same structure as the point or object arrays.
     * This means that empty slots need to be duplicated.
     * @param
     * @return
     */
    _newAttribAddObjsAndPoints(name, geom_type) {
        const values = this._attribs.get(geom_type).get(name).values;
        switch (geom_type) {
            case enums_1.EGeomType.points:
                values[0] = this._points[0].map((p, pi) => 0);
                break;
            case enums_1.EGeomType.vertices:
                values[0] = this._objs.map((o, oi) => [
                    o[0].map((w, wi) => arr_1.Arr.make(this.topoNumVertices({ id: oi, tt: 0, ti: wi }), 0)),
                    o[1].map((f, fi) => arr_1.Arr.make(this.topoNumVertices({ id: oi, tt: 1, ti: fi }), 0)),
                ]);
                break;
            case enums_1.EGeomType.edges:
                values[0] = this._objs.map((o, oi) => [
                    o[0].map((w, wi) => arr_1.Arr.make(this.topoNumEdges({ id: oi, tt: 0, ti: wi }), 0)),
                    o[1].map((f, fi) => arr_1.Arr.make(this.topoNumEdges({ id: oi, tt: 1, ti: fi }), 0)),
                ]);
                break;
            case enums_1.EGeomType.wires:
                values[0] = this._objs.map((o) => arr_1.Arr.make(o[0].length, 0));
                break;
            case enums_1.EGeomType.faces:
                values[0] = this._objs.map((o) => arr_1.Arr.make(o[1].length, 0));
                break;
            case enums_1.EGeomType.objs:
                values[0] = this._objs.map((o, oi) => 0);
                break;
        }
    }
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  CREATING OBJECTS AND POINTS  -------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    /**
     * This method assumes that the object id is for a newly created object.
     * It creates null attribute values for all attributes in the model.
     * @param
     * @return
     */
    _newObjAddToAttribs(new_id) {
        for (const attrib of this._attribs.get(enums_1.EGeomType.objs).values()) {
            attrib.values[0][new_id] = 0;
        }
        for (const attrib of this._attribs.get(enums_1.EGeomType.wires).values()) {
            attrib.values[0][new_id] = arr_1.Arr.make(this._objs[new_id][0].length, 0);
        }
        for (const attrib of this._attribs.get(enums_1.EGeomType.faces).values()) {
            attrib.values[0][new_id] = arr_1.Arr.make(this._objs[new_id][1].length, 0);
        }
        for (const attrib of this._attribs.get(enums_1.EGeomType.edges).values()) {
            attrib.values[0][new_id] =
                [
                    this._objs[new_id][0].map((w, wi) => arr_1.Arr.make(w.filter((v) => v !== -1).length, 0)),
                    this._objs[new_id][1].map((f, fi) => arr_1.Arr.make(f.filter((v) => v !== -1).length, 0)),
                ];
        }
        for (const attrib of this._attribs.get(enums_1.EGeomType.vertices).values()) {
            attrib.values[0][new_id] =
                [
                    this._objs[new_id][0].map((w, wi) => arr_1.Arr.make(w.filter((v) => v !== -1).length, 0)),
                    this._objs[new_id][1].map((f, fi) => arr_1.Arr.make(f.filter((v) => v !== -1).length, 0)),
                ];
        }
    }
    /**
     * This method assumes that the object id is for a copied object.
     * It populates attribute values for all attributes in the model.
     * @param
     * @return
     */
    _copiedObjAddToAttribs(old_id, new_id, copy_attribs) {
        for (const attrib of this.modelGetAllAttribsExcPoints()) {
            if (copy_attribs) {
                attrib.values[0][new_id] = arr_1.Arr.deepCopy(attrib.values[0][old_id]);
            }
            else {
                attrib.values[0][new_id] = arr_1.Arr.deepFill(arr_1.Arr.deepCopy(attrib.values[0][old_id]), 0);
            }
        }
    }
    /**
     * This method assumes that the point id is for a newly created point.
     * It creates null attribute values for all point attributes in the model.
     * @param
     * @return
     */
    _newPointAddToAttribs(id) {
        for (const attrib of this._attribs.get(enums_1.EGeomType.points).values()) {
            attrib.values[0][id] = 0;
        }
    }
    /**
     * This method assumes that the point id is for a copied point.
     * It populates attribute values for all point attributes in the model.
     * @param
     * @return
     */
    _copiedPointAddToAttribs(new_id, old_id, copy_attribs) {
        for (const attrib of this._attribs.get(enums_1.EGeomType.points).values()) {
            if (copy_attribs) {
                attrib.values[0][new_id] = arr_1.Arr.deepCopy(attrib.values[0][old_id]);
            }
            else {
                attrib.values[0][new_id] = arr_1.Arr.deepFill(arr_1.Arr.deepCopy(attrib.values[0][old_id]), 0);
            }
        }
    }
    /**
     * Swaps one point in obj.
     * @param
     * @return
     */
    _swapObjPoint(obj_id, old_id, new_id) {
        this._objs[obj_id][0].forEach((w) => arr_1.Arr.replace(w, old_id, new_id));
        this._objs[obj_id][1].forEach((f) => arr_1.Arr.replace(f, old_id, new_id));
    }
    /**
     * Swaps points in obj.
     * @param
     * @return
     */
    _swapObjPoints(obj_id, old_ids, new_ids) {
        if (old_ids.length !== new_ids.length) {
            throw new Error("ID arrays must be of same length.");
        }
        for (let i = 0; i < old_ids.length; i++) {
            this._objs[obj_id][0].forEach((w) => arr_1.Arr.replace(w, old_ids[i], new_ids[i]));
            this._objs[obj_id][1].forEach((f) => arr_1.Arr.replace(f, old_ids[i], new_ids[i]));
        }
    }
    /**
     * Swaps a point in all objs in the model.
     * @param
     * @return
     */
    _swapAllObjsPoint(old_id, new_id) {
        for (const obj of this._objsDense()) {
            obj[0].forEach((w) => arr_1.Arr.replace(w, old_id, new_id));
            obj[1].forEach((f) => arr_1.Arr.replace(f, old_id, new_id));
        }
    }
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  CREATING TOPOS  -----------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    /**
     * Adds this topo to attributes, it calls methods below
     * @param
     * @return
     */
    _updateAttribsForNewTopo(path) {
        if (path.st !== undefined) {
            this._updateAttribsForNewVertexOrEdge(path);
        }
        else {
            if (path.tt === 0) {
                this._updateAttribsForNewWire(path);
            }
            else {
                this._updateAttribsForNewFace(path);
            }
        }
    }
    /**
     * Adds this vertex or edge to vertex and edge attributes and sets the attrib value to null.
     * @param
     * @return
     */
    _updateAttribsSetToNull(value_indexes, path) {
        if (value_indexes[path.id] === undefined) {
            value_indexes[path.id] = [];
        }
        if (path.st !== undefined) {
            if (value_indexes[path.id][path.tt] === undefined) {
                value_indexes[path.id][path.tt] = [];
            }
            if (value_indexes[path.id][path.tt][path.ti] === undefined) {
                value_indexes[path.id][path.tt][path.ti] = [];
            }
            value_indexes[path.id][path.tt][path.ti][path.si] = 0;
        }
        else {
            if (value_indexes[path.id][path.ti] === undefined) {
                value_indexes[path.id][path.ti] = [];
            }
            value_indexes[0][path.id][path.ti] = 0;
        }
    }
    /**
     * Adds this vertex or edge to vertex and edge attributes and sets the attrib value to null.
     * @param
     * @return
     */
    _updateAttribsForNewVertexOrEdge(path) {
        for (const attrib of this._attribs.get(enums_1.EGeomType.vertices)) {
            this._updateAttribsSetToNull(attrib.values[0], path);
        }
        for (const attrib of this._attribs.get(enums_1.EGeomType.edges)) {
            this._updateAttribsSetToNull(attrib.values[0], path);
        }
    }
    /**
     * Adds this wire to all wire attributes and sets the attrib value to null.
     * @param
     * @return
     */
    _updateAttribsForNewWire(path) {
        for (const attrib of this._attribs.get(enums_1.EGeomType.wires)) {
            this._updateAttribsSetToNull(attrib.values[0], path);
        }
    }
    /**
     * Adds this face to all face attributes and sets the attrib value to null.
     * @param
     * @return
     */
    _updateAttribsForNewFace(path) {
        for (const attrib of this._attribs.get(enums_1.EGeomType.faces)) {
            this._updateAttribsSetToNull(attrib.values[0], path);
        }
    }
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  DELETING OBJECTS  ------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    /**
     * Deletes this obj from all attributes
     * @param
     * @return
     */
    _updateAttribsForDelObj(obj_id) {
        for (const [name, attrib] of this._attribs.get(enums_1.EGeomType.vertices).entries()) {
            delete attrib.values[0][obj_id];
        }
        for (const [name, attrib] of this._attribs.get(enums_1.EGeomType.edges).entries()) {
            delete attrib.values[0][obj_id];
        }
        for (const [name, attrib] of this._attribs.get(enums_1.EGeomType.wires).entries()) {
            delete attrib.values[0][obj_id];
        }
        for (const [name, attrib] of this._attribs.get(enums_1.EGeomType.faces).entries()) {
            delete attrib.values[0][obj_id];
        }
        for (const [name, attrib] of this._attribs.get(enums_1.EGeomType.objs).entries()) {
            delete attrib.values[0][obj_id];
        }
    }
    /**
     * Deletes this obj from all groups
     * @param
     * @return
     */
    _updateGroupsForDelObj(obj_id) {
        for (const [name, group] of this._groups.entries()) {
            // objects
            const oi = group.objs.indexOf(obj_id);
            if (oi !== -1) {
                group.objs.splice(oi, 1);
            }
            // topos
            this._topos_trees.get(name).removeObj(obj_id);
        }
    }
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  DELETING POINTS  -------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    /**
     * Delete this point from all point attribs
     * @param
     * @return
     */
    _updateAttribsForDelPoint(id) {
        for (const [name, attrib] of this._attribs.get(enums_1.EGeomType.points).entries()) {
            delete attrib.values[0][id];
        }
    }
    /**
     * Delete this point from all groups
     * @param
     * @return
     */
    _updateGroupsForDelPoint(id) {
        for (const [name, group] of this._groups.entries()) {
            const pi = group.points.indexOf(id);
            if (pi !== -1) {
                group.points.splice(pi, 1);
            }
        }
    }
    /**
     * Delete this point->vertex from all objs
     * @param
     * @return
     */
    _updateObjsForDelPoint(id) {
        for (const vertex_path of this.pointGetVertices(id)) {
            if (!this.geomHasTopo(vertex_path)) {
                this._delVertexFromObj(vertex_path);
            }
        }
    }
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  DELETING TOPOS  -------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    /**
     * When the vertex is deleted, all subsequent vertices get renumbered.
     * Deleting a vertex also result in two edges being merged,
     * and any subsequent edges being renumbered.
     * Deleting the vertex may result in either a wire or face being deleted,
     * or might even result in the whole object being deleted.
     * This method also updates the attributes in the model.
     * @param
     * @return
     */
    _delVertexFromObj(vertex_path) {
        // check if vertex_path exists
        if (!this.geomHasTopo(vertex_path)) {
            return;
        }
        // delete topo
        const obj = this._objs[vertex_path.id];
        switch (obj[2][0]) {
            // Ray
            case 1 /* ray */:
                this.geomDelObj(vertex_path.id);
            // Plane
            case 2 /* plane */:
                this.geomDelObj(vertex_path.id);
            // Ellipse
            case 4 /* ellipse */:
                this.geomDelObj(vertex_path.id);
            // Polyline
            case 100 /* polyline */:
                const w = obj[0][vertex_path.ti];
                let num_w_vertices = w.length;
                if (w[w.length - 1] === -1) {
                    num_w_vertices--;
                }
                if (num_w_vertices < 3) {
                    this.geomDelObj(vertex_path.id);
                    return;
                }
                w.splice(vertex_path.si, 1); // delete one vertex
                this._updateAttribsAndGroupsForDelTopo(vertex_path);
                return;
            // Polymesh
            case 200 /* polymesh */:
                if (vertex_path.tt === 0) {
                    return;
                }
                const f = obj[1][vertex_path.ti];
                const num_faces = obj[1].length;
                const num_f_vertices = f.length - 1;
                if (num_faces === 1 && num_f_vertices < 3) {
                    this.geomDelObj(vertex_path.id);
                    return;
                }
                if (num_f_vertices > 3) {
                    obj[1][vertex_path.ti].splice(vertex_path.si, 1); // delete one vertex
                    this._updateAttribsAndGroupsForDelTopo(vertex_path);
                }
                else {
                    obj[1].splice(vertex_path.ti, 1); // delete the whole face
                    this._updateAttribsAndGroupsForDelTopo({ id: vertex_path.id, tt: vertex_path.tt, ti: vertex_path.ti });
                }
                const new_wires = this._findPolymeshWires(obj[1]);
                this._updateAttribsAndGroupsChangedWiresOrFaces(vertex_path.id, 0, new_wires);
                return;
            // Not found
            default:
                throw new Error("Object type not found: " + obj[2][0]);
        }
    }
    /**
     * Deletes this topo from attributes and groups, it calls methods below
     * @param
     * @return
     */
    _updateAttribsAndGroupsForDelTopo(path) {
        if (path.st !== undefined) {
            this._updateAttribsForDelVertexOrEdge(path);
        }
        else {
            if (path.tt === 0) {
                this._updateAttribsForDelWire(path);
            }
            else {
                this._updateAttribsForDelFace(path);
            }
        }
        this._updateGroupsForDelTopo(path);
    }
    /**
     * Deletes this vertex or edge from vertex and edge attributes
     * @param
     * @return
     */
    _updateAttribsForDelVertexOrEdge(path) {
        for (const attrib of this._attribs.get(enums_1.EGeomType.vertices)) {
            attrib.values[0][path.id][path.tt][path.ti].splice(path.si, 1);
        }
        for (const attrib of this._attribs.get(enums_1.EGeomType.edges)) {
            attrib.values[0][path.id][path.tt][path.ti].splice(path.si, 1);
        }
    }
    /**
     * Deletes this wire from all wire attributes
     * @param
     * @return
     */
    _updateAttribsForDelWire(path) {
        for (const attrib of this._attribs.get(enums_1.EGeomType.wires)) {
            attrib.values[0][path.id].splice(path.ti, 1);
        }
    }
    /**
     * Deletes this face from all face attributes
     * @param
     * @return
     */
    _updateAttribsForDelFace(path) {
        for (const attrib of this._attribs.get(enums_1.EGeomType.faces)) {
            attrib.values[0][path.id].splice(path.ti, 1);
        }
    }
    /**
     * Deletes this topo from all groups
     * @param
     * @return
     */
    _updateGroupsForDelTopo(path) {
        for (const [name, group] of this._groups.entries()) {
            this._topos_trees.get(name).removeTopo(path);
        }
    }
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  CHANGED TOPOS ----------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    /**
     * Compares the existing topo of an obj to this new topo. If there are any differences, then
     * attribs and groups are all updated to relflect the changes.
     * Finally, the topo for this obj is set to new topo.
     * @param
     * @return
     */
    _updateAttribsAndGroupsChangedTopo(id, new_topo) {
        // update wires
        this._updateAttribsAndGroupsChangedWiresOrFaces(id, 0, new_topo[0]);
        // update faces
        this._updateAttribsAndGroupsChangedWiresOrFaces(id, 1, new_topo[1]);
    }
    /**
     * Compares the existing wires/faces of an obj to the new wires/faces.
     * If there are any differences, then
     * attribs and groups are all updated to relflect the new changes.
     * Finally, the wires/faces for this obj is set to new wires/faces.
     * @param
     * @return
     */
    _updateAttribsAndGroupsChangedWiresOrFaces(id, tt, new_topo) {
        const old_topo = this._objs[id][tt];
        // check for deleted wires / vertices / edges
        for (let wf = 0; wf < old_topo.length; wf++) {
            // check for deleted wires
            if (new_topo[wf] === undefined) {
                // a wire has been deleted, so delete from both attrbs and groups
                this._updateAttribsAndGroupsForDelTopo({ id, tt, ti: wf });
            }
            // check for deleted vertices
            for (let v = 0; v < old_topo[wf].length; v++) {
                if (v !== -1) {
                    // deleted vertex
                    if (new_topo[wf] === undefined || new_topo[wf][v] === undefined) {
                        this._updateAttribsAndGroupsForDelTopo({ id, tt, ti: wf, st: 0, si: v });
                    }
                }
            }
            // check for deleted edges
            for (let v = 0; v < old_topo[wf].length; v++) {
                // deleted edge
                if (new_topo[wf] === undefined || new_topo[wf][v] === undefined) {
                    this._updateAttribsAndGroupsForDelTopo({ id, tt, ti: wf, st: 0, si: v });
                }
            }
        }
        // check for new wires / vertices / edges
        for (let wf = 0; wf < new_topo.length; wf++) {
            // check for new wires
            if (old_topo[wf] === undefined) {
                // a new wire has been created, add to attribs
                this._updateAttribsForNewTopo({ id, tt, ti: wf });
            }
            // check for new vertices
            for (let v = 0; v < new_topo[wf].length; v++) {
                if (v !== -1) {
                    // new vertex
                    if (old_topo[wf] === undefined || old_topo[wf][v] === undefined) {
                        this._updateAttribsForNewTopo({ id, tt, ti: wf, st: 0, si: v });
                    }
                }
            }
            // check for new edges
            for (let v = 0; v < new_topo[wf].length; v++) {
                // new edge
                if (old_topo[wf] === undefined || old_topo[wf][v] === undefined) {
                    this._updateAttribsForNewTopo({ id, tt, ti: wf, st: 0, si: v });
                }
            }
        }
        this._objs[id][tt] = new_topo;
    }
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  UPDATE POLYMESH WIRES --------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    /**
     * Find all the wires in a polymesh
     * @param
     * @return Object of type Polymesh
     */
    _findPolymeshWires(face_ids) {
        const wire_ids = [];
        const edges = [];
        for (const f of face_ids) {
            for (let i = 0; i < f.length; i++) {
                const v1 = f[i];
                let i2 = i + 1;
                if (i2 === f.length) {
                    i2 = 0;
                }
                const v2 = f[i2];
                edges.push([v1, v2]);
            }
        }
        const naked_edges = [];
        for (const e of edges) {
            if (arr_1.Arr.indexOf(edges, [e[1], e[0]]) === -1) {
                naked_edges.push(e);
            }
        }
        if (naked_edges.length === 0) {
            return [];
        }
        const sorted_naked_edges = [[naked_edges[0]]];
        const already_used = [naked_edges[0]];
        for (const _ of naked_edges) {
            const current_wire_edges = sorted_naked_edges[sorted_naked_edges.length - 1];
            const start = current_wire_edges[0][0];
            const end = current_wire_edges[current_wire_edges.length - 1][1];
            if (start === end) {
                for (const e of naked_edges) {
                    if (arr_1.Arr.indexOf(already_used, e) === -1) {
                        sorted_naked_edges.push([e]);
                        already_used.push(e);
                        break;
                    }
                }
            }
            else {
                for (const e of naked_edges) {
                    if (e[0] === end) {
                        current_wire_edges.push(e);
                        already_used.push(e);
                        break;
                    }
                }
            }
        }
        const naked_wires = sorted_naked_edges.map((w) => arr_1.Arr.flatten(w.map((e) => e[0])));
        return naked_wires;
    }
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  GET TOPOS FROM OBJS ----------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    /**
     * Loop through all the objects, and create paths for wires or faces
     * Used in geomGetTopoPaths() method
     * @param
     * @return
     */
    _getWFPathsFromObjsData(objs_data, wf_topos) {
        const path_arr = [];
        for (const obj_id_str of objs_data.keys()) {
            const wf_data = objs_data[obj_id_str][wf_topos]; // wf_choice is 0 or 1, wires or faces
            for (let wf_index = 0; wf_index < wf_data.length; wf_index++) {
                path_arr.push({ id: Number(obj_id_str), tt: wf_topos, ti: wf_index });
            }
        }
        return path_arr;
    }
    /**
     * Loop through all the objects, and create paths for vertices and edges
     * Used in geomGetTopoPaths() method
     * @param
     * @return
     */
    _getVEPathsFromObjsData(objs_data, v_or_e) {
        const path_arr = [];
        for (const obj_id_str of objs_data.keys()) {
            const w_data = objs_data[obj_id_str][0];
            this._getVEPathsFromWF(path_arr, Number(obj_id_str), w_data, 0, v_or_e);
            const f_data = objs_data[obj_id_str][1];
            this._getVEPathsFromWF(path_arr, Number(obj_id_str), f_data, 1, v_or_e);
        }
        return path_arr;
    }
    /**
     * Used by _getVEPathsFromObjsData
     * @param
     * @return
     */
    _getVEPathsFromWF(path_arr, obj_id, wf_data, wf_topos, v_or_e) {
        // loop through all the wire or faces, and create paths for all the vertices or edges
        for (let wf_index = 0; wf_index < wf_data.length; wf_index++) {
            for (let ve_index = 0; ve_index < wf_data[wf_index].length - v_or_e; ve_index++) {
                if (wf_data[wf_index][ve_index] !== -1) {
                    path_arr.push({ id: Number(obj_id), tt: wf_topos, ti: wf_index, st: v_or_e, si: ve_index });
                }
            }
        }
    }
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  OTHER STUFF  -----------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    /**
     * to be completed
     * @param
     * @return
     */
    _distanceSquared(i_pos, j_pos, tolerance) {
        const bbx = Math.abs(i_pos[0] - j_pos[0]);
        if (bbx < tolerance) {
            return null;
        }
        const bby = Math.abs(i_pos[1] - j_pos[1]);
        if (bby < tolerance - bbx) {
            return null;
        }
        const bbz = Math.abs(i_pos[2] - j_pos[2]);
        if (bbz < tolerance - bbx - bby) {
            return null;
        }
        return [bbx, bby, bbz];
    }
    /**
     * to be completed
     * @param
     * @return
     */
    _purgeDelUnusedPoints() {
        // delete all unused points
        for (const point_id_str of this._points[0]) {
            if (this.pointIsUnused(point_id_str)) {
                delete this._points[0][point_id_str];
            }
        }
    }
    /**
     * to be completed
     * @param
     * @return
     */
    _purgeDelUnusedPointValues() {
        // find unused values in points[1]
        const val_idxs = [];
        this._points[1].forEach((p, pi) => (this._points[0].indexOf(pi) === -1) && val_idxs.push(pi));
        // delete unused values in points[1]
        for (const val_idx of val_idxs) {
            this._points.splice(val_idx, 1);
        }
        // shift pointers in points[0] to point to new values in points[1]
        let decrement = 0;
        for (let i = 0; i < this._points[0].length; i++) {
            if (this._points[0][i] !== undefined) {
                if (val_idxs.indexOf(i) !== -1) {
                    decrement++;
                }
                this._points[0][i] = this._points[0][i] - decrement;
            }
        }
    }
    /**
     * to be completed
     * @param
     * @return
     */
    _purgeDelSparsePoints() {
        // delete the sparse points
        const shift_map = new Map();
        let end = this._points[0].length - 1;
        for (let i = 0; i < this._points[0].length; i++) {
            if (this._points[0][i] === undefined) {
                for (let j = end; j > 0; j--) {
                    if (this._points[0][j] !== undefined) {
                        end = j - 1;
                        this._points[0][i] = j;
                        shift_map.set(j, i);
                        break;
                    }
                }
            }
        }
        this._points.splice(end + 1);
        // change the points in the objs
        for (const [oi, o] of this._objs.entries()) {
            for (const [fi, f] of o.entries()) {
                for (const [vi, v] of f.entries()) {
                    f[vi] = shift_map.get(vi);
                }
            }
        }
        throw new Error("Not implemented");
    }
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  DEPRECEATED  -----------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    //  ------------------------------------------------------------------------------------------------------
    /**
     * This method assumes that the id is for a point that is about to be deleted.
     * It deletes the attributs values for all attributes in the model.
     * @param
     * @return
     */
    _depreceated_delPointFromObjs(id) {
        for (const [obj_id_str, obj] of this._objsDense().entries()) {
            switch (obj[2][0]) {
                // Polyline
                case 100:
                    for (let wi = 0; wi < obj[0].length; wi++) {
                        const w = obj[0][wi];
                        const point_index = w.indexOf(id);
                        if (point_index !== -1) {
                            let num_vertices = w.length;
                            if (w[w.length - 1] === -1) {
                                num_vertices--;
                            }
                            if (num_vertices > 2) {
                                w.splice(point_index, 1); // delete one vertex
                            }
                            else {
                                obj[0].splice(wi, 1); // delete the whole wire
                            }
                        }
                    }
                    // check if no wires, delete whole oject
                    if (obj[0].length === 0) {
                        delete this._objs[obj_id_str];
                    }
                    break;
                // Polymesh
                case 200:
                    let changed = false;
                    for (let fi = 0; fi < obj[1].length; fi++) {
                        const f = obj[1][fi];
                        const point_index_f = f.indexOf(id);
                        if (point_index_f !== -1) {
                            changed = true;
                            const num_vertices = f.length - 1;
                            if (num_vertices > 2) {
                                obj[1][fi].splice(point_index_f, 1); // delete one vertex
                            }
                            else {
                                obj[1].splice(fi, 1); // delete the whole face
                            }
                        }
                    }
                    if (changed) {
                        if (obj[1].length === 0) {
                            delete this._objs[obj_id_str]; // if no faces, delete whole obj
                        }
                        else {
                            obj[0] = this._findPolymeshWires(obj[1]);
                        }
                    }
                    break;
                // Not found
                default:
                    throw new Error("Object type not found: " + obj[2][0]);
            }
        }
    }
    //  --------------------------------------------------------------------------------------------
    /**
     * Add an attributes value.
     * @param path The path to a geometric entity or topological component.
     * @return True if the path does not exist.
     */
    _depreceated_addTopoAttribValue(name, geom_type, path) {
        const data = this._attribs.get(geom_type).get(name);
        switch (geom_type) {
            case enums_1.EGeomType.wires:
            case enums_1.EGeomType.faces:
                if (data.values[0][path.id] === undefined) {
                    data.values[0][path.id] = [];
                }
                if (data.values[0][path.id][path.ti] !== undefined) {
                    return false;
                }
                data.values[0][path.id][path.ti] = 0;
                return true;
            case enums_1.EGeomType.vertices:
            case enums_1.EGeomType.edges:
                if (data.values[0][path.id] === undefined) {
                    data.values[0][path.id] = [];
                }
                if (data.values[0][path.id][path.ti] === undefined) {
                    data.values[0][path.id][path.ti] = [];
                }
                if (data.values[0][path.id][path.ti][path.si] !== undefined) {
                    return false;
                }
                data.values[0][path.id][path.ti][path.si] = 0;
                return true;
        }
    }
    /**
     * Delete an attribute value.
     * @param path The path to a geometric entity or topological component.
     * @return The attribute value.
     */
    _depreceated_delTopoAttribValue(name, geom_type, path) {
        const data = this._attribs.get(geom_type).get(name);
        let old_value;
        switch (geom_type) {
            case enums_1.EGeomType.wires:
            case enums_1.EGeomType.faces:
                old_value = data.values[1][data.values[0][path.id][path.ti]];
                delete data.values[0][path.id][path.ti];
                return old_value;
            case enums_1.EGeomType.vertices:
            case enums_1.EGeomType.edges:
                old_value = data.values[1][data.values[0][path.id][path.ti][path.si]];
                delete data.values[0][path.id][path.ti][path.si];
                return old_value;
        }
        return null;
    }
}
exports.Kernel = Kernel;
//# sourceMappingURL=kernel.js.map