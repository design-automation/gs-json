import { XYZ, IModel, IGeom } from "./ifaces_gs";
import { IModelData, IAttribData, IGroupData, ITopoPathData } from "./ifaces_json";
import { EGeomType, EDataType, EObjType } from "./enums";
import * as three from "three";
/**
 * Kernel Class
 * This class controls all acces to the data and ensures that the data remains consistent.
 * No other class should have any direct access to this data.
 */
export declare class Kernel {
    private _model;
    private _geom;
    private _metadata;
    private _points;
    private _objs;
    private _attribs;
    private _groups;
    private _topos_trees;
    /**
     * Construct a new model. If data is provided, the model will be populated with this data.
     * @param
     * @return
     */
    constructor(model: IModel, data?: IModelData);
    /**
     * Exports the model as json data.
     * @param
     * @return
     */
    modelToJSON(): string;
    /**
     * to be completed
     * @param
     * @return
     */
    modelPurge(): void;
    /**
     * to be completed
     * @param
     * @return
     */
    modelValidate(): boolean;
    /**
     * Get the Model object
     * @return The Model object
     */
    getModel(): IModel;
    /**
     * Get the Geom object
     * @return The Model object
     */
    getGeom(): IGeom;
    /**
     * to be completed
     * @param
     * @return
     */
    modelFindAttribs(geom_type: EGeomType): IAttribData[];
    /**
     * to be completed
     * @param
     * @return
     */
    modelGetAllAttribs(): IAttribData[];
    /**
     * to be completed
     * @param
     * @return
     */
    modelGetAllAttribsExcPoints(): IAttribData[];
    /**
     * to be completed
     * @param
     * @return
     */
    modelGetAllEntAttribs(): IAttribData[];
    /**
     * to be completed
     * @param
     * @return
     */
    modelGetAllTopoAttribs(): IAttribData[];
    /**
     * to be completed
     * @param
     * @return
     */
    modelGetAttrib(name: string, geom_type: EGeomType): IAttribData;
    /**
     * to be completed
     * @param
     * @return
     */
    modelAddAttrib(name: string, geom_type: EGeomType, data_type: EDataType): IAttribData;
    /**
     * to be completed
     * @param
     * @return
     */
    modelDelAttrib(name: string, geom_type: EGeomType): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    modelHasAttrib(name: string, geom_type: EGeomType): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    modelGetAllGroups(): IGroupData[];
    /**
     * to be completed
     * @param
     * @return
     */
    modelGetGroup(name: string): IGroupData;
    /**
     * to be completed
     * @param
     * @return
     */
    modelAddGroup(name: string, parent?: string): IGroupData;
    /**
     * to be completed
     * @param
     * @return
     */
    modelDelGroup(name: string): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    modelHasGroup(name: string): boolean;
    /**
     * Check if the geometry has this point
     * @param
     * @return
     */
    geomHasPoint(id: number): boolean;
    /**
     * Adds a new point to the model at position xyz.
     * @param cartesian xyz coordinates are required to create a point
     * @return a instance of type Point is returned
     */
    geomAddPoint(xyz: XYZ): number;
    /**
     * Add a set of points to the model based on an array of xyz positions.
     * @param
     * @return
     */
    geomAddPoints(xyzs: XYZ[]): number[];
    /**
     * Copy a point. The new point will have the same position as the original point.
     * If copy_attribs is true, then the copied point will have the same attributes as the original point.
     * @param id
     * @param copy_attribs
     * @return
     */
    geomCopyPoint(id: number, copy_attribs?: boolean): number;
    /**
     * Copy a set of points. The new points will have the same positions as the original points.
     * If copy_attribs is true, then the copied points will have the same attribute values as the original points.
     * @param ids
     * @param copy_attribs
     * @return
     */
    geomCopyPoints(ids: number[], copy_attribs?: boolean): number[];
    /**
     * to be completed
     * @param
     * @return
     */
    geomDelPoint(id: number): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    geomDelPoints(ids: number[]): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    geomNumPoints(): number;
    /**
     * Creates a list if point IDs. The list does not include the empty slots.
     * @param
     * @return
     */
    geomGetPointIDs(): number[];
    /**
     * Calculates the centroid of a set of points, as the average of all point positions.
     * @param
     * @return
     */
    geomCalcPointsCentroid(ids: number[]): XYZ;
    /**
     * Merge points, replaces these points with a new point.
     * @param
     * @return
     */
    geomMergePoints(ids: number[]): number;
    /**
     * Merge points.
     * @param
     * @return
     */
    geomMergePointsByTol(ids: number[], tolerance: number): number[];
    /**
     * Merge all points in the model.
     * @param
     * @return
     */
    geomMergeAllPoints(tolerance: number): number[];
    /**
     * Adds a new ray to the model that passes through a sequence of points.
     * @param origin The ray origin point.
     * @param dir The ray direction, as a vector.
     * @return ID of object.
     */
    geomAddRay(origin_id: number, ray_vec: XYZ): number;
    /**
     * Adds a new rayTwo to the model that passes through a sequence of points.
     * @param origin, a point that belongs to the line.
     * @param dir, the ray direction, as a vector.
     * @return ID of object.
     */
    geomAddRayTwo(origin_id: number, line_vec: XYZ): number;
    /**
     * Adds a new plane to the model defined by an origin and two vectors.
     * @param origin_id The plane origin point.
     * @param axes Three orthogonal aaxes as XYZ vectors
     * @return ID of object.
     */
    geomAddPlane(origin_id: number, axes: [XYZ, XYZ, XYZ]): number;
    /**
     * Adds a new ellipse to the model defined by origin and two vectors for the x and y axes, and
     * two angles.
     * @param origin_id The origin point.
     * @param axes Three orthogonal axes as XYZ vectors
     * @param angles The angles, can be undefined, in which case a closed circle is generated.
     * @return ID of object.
     */
    geomAddCircle(origin_id: number, axes: [XYZ, XYZ, XYZ], angles?: [number, number]): number;
    /**
     * Adds a new ellipse to the model defined by origin and two vectors for the x and y axes, and
     * two angles.
     * @param origin_id The origin point.
     * @param axes Three orthogonal axes as XYZ vectors
     * @param angles The angles, can be undefined, in which case a ellipse is generated.
     * @return ID of object.
     */
    geomAddEllipse(origin_id: number, axes: [XYZ, XYZ, XYZ], angles?: [number, number]): number;
    /**
     * Adds a new Parabola to the model defined by origin and two vectors for the x and y axes, and
     * two angles.
     * @param origin_id The origin point.
     * @param axes Three orthogonal axes as XYZ vectors
     * @param angles The angles, can be undefined, in which case a Parabola is generated.
     * @return ID of object.
     */
    geomAddParabola(origin_id: number, axes: [XYZ, XYZ, XYZ], angles?: [number, number]): number;
    /**
     * Adds a new Hyperbola to the model defined by origin and two vectors for the x and y axes, and
     * two angles.
     * @param origin_id The origin point.
     * @param axes Three orthogonal axes as XYZ vectors
     * @param angles The angles, can be undefined, in which case a Hyperbola is generated.
     * @return ID of object.
     */
    geomAddHyperbola(origin_id: number, axes: [XYZ, XYZ, XYZ], angles?: [number, number]): number;
    /**
     * Adds a new polyline to the model that passes through a sequence of points.
     * @param points An array of Points.
     * @param is_closed Indicates whether the polyline is closed.
     * @return ID of object.
     */
    geomAddPolyline(point_ids: number[], is_closed: boolean): number;
    /**
     * to be completed
     * @param
     * @return ID of object.
     */
    geomAddPolymesh(face_points_ids: number[][]): number;
    /**
     * Returns true if an object with the specified ID exists.
     * @param
     * @return
     */
    geomHasObj(id: number): boolean;
    /**
     * Copy and object.
     * If copy_attribs is true, then the copied object will have the same attributes as the original object.
     * @param ids
     * @param copy_attribs
     * @return
     */
    geomCopyObj(id: number, copy_attribs?: boolean): number;
    /**
     * Copy a list of objects.
     * If copy_attribs is true, then the copied objects will have the same attributes as the original objects.
     * @param ids
     * @param copy_attribs
     * @return Array of new ids
     */
    geomCopyObjs(ids: number[], copy_attribs?: boolean): number[];
    /**
     * to be completed
     * @param
     * @return Array of new ids
     */
    geomDelObj(id: number, keep_unused_points?: boolean): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    geomDelObjs(ids: number[], keep_unused_points?: boolean): boolean;
    /**
     * Does not count empty slots in sparse arrays.
     * @param
     * @return
     */
    geomNumObjs(): number;
    /**
     * Creates a list of object IDs. Skips empty slots in spare array.
     * @param
     * @return
     */
    geomGetObjIDs(): number[];
    /**
     * Returns true if a topo with the specified path exists.
     * @param
     * @return
     */
    geomHasTopo(path: ITopoPathData): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    geomGetTopoPaths(geom_type: EGeomType): ITopoPathData[];
    /**
     * to be completed
     * @param
     * @return
     */
    geomNumTopos(geom_type: EGeomType): number;
    /**
     * Within the parent object, find all vertices with the same point.
     * Returns an array containing two sub-arrays.
     * 1) The wire vertices, and 2) the face vertices.
     * @return An array containing the two sub-arrays of vertices.
     */
    geomFindVerticesSharedPoint(vertex_path: ITopoPathData): ITopoPathData[][];
    /**
     * Within the parent object, find all edges with the same two points as this edge.
     * The order of the points is ignored.
     * Returns an array containing two sub-arrays.
     * 1) The wire edges, and 2) the face edges.
     * @return An array containing the two sub-arrays of edges.
     */
    geomFindEdgesSharedPoints(edge_path: ITopoPathData): ITopoPathData[][];
    /**
     * Within the parent object, find all faces or wires with shared points.
     * The order of the points is ignored.
     * Returns an array of topos.
     * If the input path is a wire, it returns wires.
     * If the input path is a face, it returns faces.
     * @return An array containing the two sub-arrays of edges.
     */
    geomFindTopoSharedPoints(path: ITopoPathData): ITopoPathData[];
    /**
     * Within the parent object, find all vertices with the same point position.
     * Returns an array containing two sub-arrays.
     * 1) The wire vertices, and 2) the face vertices.
     * @return An array containing the two sub-arrays of vertices.
     */
    geomFindVerticesSamePosition(vertex_path: ITopoPathData): ITopoPathData[][];
    /**
     * to be completed
     * @param
     * @return
     */
    objGetType(id: number): number;
    /**
     * Gets one point for this object. This is udeful for entities that are deifned by a single point.
     * @return One point ID.
     */
    objGetOnePoint(id: number): number;
    /**
     * Get the points for this object. If the point_type is not specified, then
     * points for both wires and faces are returned.
     * @return A nested array of point ids.
     */
    objGetPointIDs(id: number, point_type?: EGeomType.wires | EGeomType.faces): number[][][];
    /**
     * Get the points for this object as a flat list of unique points.
     * @return A flat array of point ids.
     */
    objGetAllPointIDs(id: number): number[];
    /**
     * Get the vertices for this object. If the vertex_type is not specified, then
     * vertices for both wires and faces are returned.
     * @return The array of vertices.
     */
    objGetVertices(id: number, vertex_type?: EGeomType.wires | EGeomType.faces): ITopoPathData[][][];
    /**
     * Get the edges for this object. If the edge_type is not specified, then
     * edges for both wires and faces are returned.
     * @return The array of edges.
     */
    objGetEdges(id: number, edge_type?: EGeomType.wires | EGeomType.faces): ITopoPathData[][][];
    /**
     * Get the wires for this object.
     * @return The array of wires.
     */
    objGetWires(id: number): ITopoPathData[];
    /**
     * Get the faces for this object.
     * @return The array of faces.
     */
    objGetFaces(id: number): ITopoPathData[];
    /**
     * Get the number of wires for this object.
     * @return The number of wires.
     */
    objNumWires(id: number): number;
    /**
     * Get the number of faces for this object.
     * @return The number of faces.
     */
    objNumFaces(id: number): number;
    /**
     * Get the parameters for this object.
     * @return The parameters array.
     */
    objGetParams(id: number): any;
    /**
     * Get the parameters for this object.
     * @return The parameters array.
     */
    objSetParams(id: number, params: any[]): any[];
    /**
     * Get all the groups for which this obj is a member.
     * @return The array of group names.
     */
    objGetGroups(id: number): string[];
    /**
     * Transform all the points for this object.
     */
    objXform(id: number, matrix: three.Matrix4): void;
    /**
     * to be completed
     * @param
     * @return
     */
    pointSetPosition(id: number, xyz: XYZ): XYZ;
    /**
     * to be completed
     * @param
     * @return
     */
    pointGetPosition(point_id: number): XYZ;
    /**
     * Gets all the vertices that have this point id.
     * @param
     * @return
     */
    pointGetVertices(id: number): ITopoPathData[];
    /**
     * to be completed
     * @param
     * @return
     */
    pointIsUnused(point_id: number): boolean;
    /**
     * Get all the groups for which this point is a member.
     * @return The array of group names.
     */
    pointGetGroups(id: number): string[];
    /**
     * Transform the position of a point.
     * @param
     * @param
     */
    pointXform(id: number, matrix: three.Matrix4): void;
    /**
     * Transform the position of this point.
     * @param
     * @param
     */
    pointsXform(ids: number[], matrix: three.Matrix4): void;
    /**
     * Get the number of vertices in this wire or face.
     * @return The number of vertices.
     */
    topoNumVertices(topo_path: ITopoPathData): number;
    /**
     * Get the number of edges in this wire or face.
     * @return The number of edges.
     */
    topoNumEdges(topo_path: ITopoPathData): number;
    /**
     * Get the vertices for this wire or face.
     * @return An array of vertices.
     */
    topoGetVertices(topo_path: ITopoPathData): ITopoPathData[];
    /**
     * Get the edges for this wire or face.
     * @return An array of edges.
     */
    topoGetEdges(topo_path: ITopoPathData): ITopoPathData[];
    /**
     * Return true if this wire is closed. For faces, the result is always true.
     * @return boolean
     */
    topoIsClosed(topo_path: ITopoPathData): boolean;
    /**
     * Set if this wire is closed. For faces, the result is always true.
     * @return boolean
     */
    topoSetIsClosed(topo_path: ITopoPathData, is_closed: boolean): boolean;
    /**
     * Within the parent object, find all faces or wires that share at least n points.
     * @return An array of faces.
     */
    topoFindSharedPoints(topo_path: ITopoPathData, num_shared_points?: number): ITopoPathData[];
    /**
     * Get the group names for all the groups for which this topological component is a member.
     * @return The array of group names.
     */
    topoGetGroups(path: ITopoPathData): string[];
    /**
     * Add a vertex to this topo, either at start or end. Works for both wires and faces.
     * Vertex and edge attributes are also updated.
     * @return A path to the new vertex
     */
    topoAddVertex(path: ITopoPathData, point_id: number, to_start: boolean): ITopoPathData;
    /**
     * Delete a vertex to this topo. Works for both wires and faces.
     * @return True if successful.
     */
    topoDelVertex(path: ITopoPathData, vertex_path: ITopoPathData): boolean;
    /**
     * Get the two vertices for this edge.
     * @return An array of two edges.
     */
    edgeGetVertices(edge_path: ITopoPathData): ITopoPathData[];
    /**
     * Get the wire or face to which this edge belongs.
     * @return The wire or face.
     */
    edgeGetTopo(edge_path: ITopoPathData): ITopoPathData;
    /**
     * Find the next edge in the sequence of edges in the wire or face.
     * @return The next edge object.
     */
    edgeNext(edge_path: ITopoPathData): ITopoPathData;
    /**
     * Find the previous edge in the sequence of edges in the wire or face.
     * @return The previous edge object.
     */
    edgePrevious(edge_path: ITopoPathData): ITopoPathData;
    /**
     * Inserts an extra point into an edge, thereby making two edges.
     * This requires all edge attributes to be updated.
     * @return The path to the new vertex.
     */
    edgeSplit(edge_path: ITopoPathData, point_id: number): ITopoPathData;
    /**
     * Get the point associated with this vertex.
     * @return The point object.
     */
    vertexGetPoint(vertex_path: ITopoPathData): number;
    /**
     * Get the edge for which this is the start vertex.
     * @return The edge object.
     */
    vertexGetEdge(vertex_path: ITopoPathData): ITopoPathData;
    /**
     * Get the wire or face to which this vertex belongs.
     * @return The wire or face object.
     */
    vertexGetTopo(vertex_path: ITopoPathData): ITopoPathData;
    /**
     * Find the next vertex in the sequence of vertices in the wire or face.
     * @return The next vertex object.
     */
    vertexNext(vertex_path: ITopoPathData): ITopoPathData;
    /**
     * Find the previous vertex in the sequence of vertices in the wire or face.
     * @return The previous vertex object.
     */
    vertexPrevious(vertex_path: ITopoPathData): ITopoPathData;
    /**
     * to be completed
     * @param
     * @return
     */
    attribSetName(old_name: any, new_name: any, geom_type: EGeomType): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    attribGetNames(geom_type: EGeomType): string[];
    /**
     * to be completed
     * @param
     * @return
     */
    attribGetDataType(name: string, geom_type: EGeomType): EDataType;
    /**
     * Get all the values for the attribute.
     * @return An array of values.
     */
    attribGetValues(name: string, geom_type: EGeomType): any[];
    /**
     * Get the number of attribute values. If the attribis an entAttrib, then this is equal to the
     * number of points or objects. If it is a topoAttrib, then this is equal to the number of topo
     * entities in the model of that type.
     * @return The numbe of attribute values.
     */
    attribCount(name: string, geom_type: EGeomType): number;
    /**
     * Get a single attribute value.
     * The data type of the attribute value can be found using the getDataType() method.
     * @param id The id of a geometric entity.
     * @return The value.
     */
    entAttribGetValue(name: string, geom_type: EGeomType, id: number): any;
    /**
     * Set a single attribute value.
     * The data type of the attribute value must match the getDataType() method.
     * @param id The id of a geometric entity.
     * @param value The new value.
     * @return The old value.
     */
    entAttribSetValue(name: string, geom_type: EGeomType, id: number, value: any): any;
    /**
     * Get all the labels for the attribute.
     * @return A sparse array of values.
     */
    entAttribGetIDs(name: string, geom_type: EGeomType): number[];
    /**
     * Get a single attribute value.
     * The data type of the attribute value can be found using the getDataType() method.
     * @param path The path to a topological component.
     * @return The value.
     */
    topoAttribGetValue(name: string, geom_type: EGeomType, path: ITopoPathData): any;
    /**
     * Set a single attribute value.
     * The data type of the attribute value can be found using the getDataType() method.
     * @param path The path to a topological component.
     * @param value The new value.
     * @return The old value.
     */
    topoAttribSetValue(name: string, geom_type: EGeomType, path: ITopoPathData, value: any): any;
    /**
     * Get all the labels for the attribute.
     * @return A sparse array of values.
     */
    topoAttribGetPaths(name: string, geom_type: EGeomType): ITopoPathData[];
    /**
     * to be completed
     * @param
     * @return
     */
    groupSetName(old_name: any, new_name: any): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetParent(name: string): string;
    /**
     * to be completed
     * @param
     * @return
     */
    groupSetParent(name: string, parent: string): string;
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetChildren(name: string): string[];
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetNumObjs(name: string, obj_type?: EObjType): number;
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetObjIDs(name: string, obj_type?: EObjType): number[];
    /**
     * to be completed
     * @param
     * @return
     */
    groupAddObj(name: string, id: number): boolean;
    /**
     * to be completed
     *
     * @param
     * @return Returns true if all obj IDs were added, false otherwise.
     */
    groupAddObjs(name: string, ids: number[]): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    groupRemoveObj(name: string, id: number): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    groupRemoveObjs(name: string, ids: number[]): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    groupHasObj(name: string, id: number): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetNumTopos(name: string, geom_type?: EGeomType): number;
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetTopos(name: string, geom_type?: EGeomType): ITopoPathData[];
    /**
     * to be completed
     * @param
     * @return
     */
    groupAddTopo(name: string, topo: ITopoPathData): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    groupAddTopos(name: string, topos: ITopoPathData[]): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    groupRemoveTopo(name: string, topo: ITopoPathData): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    groupRemoveTopos(name: string, topos: ITopoPathData[]): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    groupHasTopo(name: string, topo: ITopoPathData): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetNumPoints(name: string): number;
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetPointIDs(name: string): number[];
    /**
     * to be completed
     * @param
     * @return
     */
    groupAddPoint(name: string, id: number): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    groupAddPoints(name: string, ids: number[]): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    groupRemovePoint(name: string, id: number): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    groupRemovePoints(name: string, ids: number[]): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    groupHasPoint(name: string, id: number): boolean;
    /**
     * to be completed
     * @param
     * @return
     */
    groupGetProps(name: string): Array<[string, any]>;
    /**
     * to be completed
     * @param
     * @return
     */
    groupSetProps(name: string, new_map: Array<[string, any]>): Array<[string, any]>;
    /**
     * Returns an array of TObjData. Removes empty slots.
     * @param
     * @return
     */
    private _objsDense();
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
    private _newAttribAddObjsAndPoints(name, geom_type);
    /**
     * This method assumes that the object id is for a newly created object.
     * It creates null attribute values for all attributes in the model.
     * @param
     * @return
     */
    private _newObjAddToAttribs(new_id);
    /**
     * This method assumes that the object id is for a copied object.
     * It populates attribute values for all attributes in the model.
     * @param
     * @return
     */
    private _copiedObjAddToAttribs(old_id, new_id, copy_attribs);
    /**
     * This method assumes that the point id is for a newly created point.
     * It creates null attribute values for all point attributes in the model.
     * @param
     * @return
     */
    private _newPointAddToAttribs(id);
    /**
     * This method assumes that the point id is for a copied point.
     * It populates attribute values for all point attributes in the model.
     * @param
     * @return
     */
    private _copiedPointAddToAttribs(new_id, old_id, copy_attribs);
    /**
     * Swaps one point in obj.
     * @param
     * @return
     */
    private _swapObjPoint(obj_id, old_id, new_id);
    /**
     * Swaps points in obj.
     * @param
     * @return
     */
    private _swapObjPoints(obj_id, old_ids, new_ids);
    /**
     * Swaps a point in all objs in the model.
     * @param
     * @return
     */
    private _swapAllObjsPoint(old_id, new_id);
    /**
     * Adds this topo to attributes, it calls methods below
     * @param
     * @return
     */
    private _updateAttribsForNewTopo(path);
    /**
     * Adds this vertex or edge to vertex and edge attributes and sets the attrib value to null.
     * @param
     * @return
     */
    private _updateAttribsSetToNull(value_indexes, path);
    /**
     * Adds this vertex or edge to vertex and edge attributes and sets the attrib value to null.
     * @param
     * @return
     */
    private _updateAttribsForNewVertexOrEdge(path);
    /**
     * Adds this wire to all wire attributes and sets the attrib value to null.
     * @param
     * @return
     */
    private _updateAttribsForNewWire(path);
    /**
     * Adds this face to all face attributes and sets the attrib value to null.
     * @param
     * @return
     */
    private _updateAttribsForNewFace(path);
    /**
     * Deletes this obj from all attributes
     * @param
     * @return
     */
    private _updateAttribsForDelObj(obj_id);
    /**
     * Deletes this obj from all groups
     * @param
     * @return
     */
    private _updateGroupsForDelObj(obj_id);
    /**
     * Delete this point from all point attribs
     * @param
     * @return
     */
    private _updateAttribsForDelPoint(id);
    /**
     * Delete this point from all groups
     * @param
     * @return
     */
    private _updateGroupsForDelPoint(id);
    /**
     * Delete this point->vertex from all objs
     * @param
     * @return
     */
    private _updateObjsForDelPoint(id);
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
    private _delVertexFromObj(vertex_path);
    /**
     * Deletes this topo from attributes and groups, it calls methods below
     * @param
     * @return
     */
    private _updateAttribsAndGroupsForDelTopo(path);
    /**
     * Deletes this vertex or edge from vertex and edge attributes
     * @param
     * @return
     */
    private _updateAttribsForDelVertexOrEdge(path);
    /**
     * Deletes this wire from all wire attributes
     * @param
     * @return
     */
    private _updateAttribsForDelWire(path);
    /**
     * Deletes this face from all face attributes
     * @param
     * @return
     */
    private _updateAttribsForDelFace(path);
    /**
     * Deletes this topo from all groups
     * @param
     * @return
     */
    private _updateGroupsForDelTopo(path);
    /**
     * Compares the existing topo of an obj to this new topo. If there are any differences, then
     * attribs and groups are all updated to relflect the changes.
     * Finally, the topo for this obj is set to new topo.
     * @param
     * @return
     */
    private _updateAttribsAndGroupsChangedTopo(id, new_topo);
    /**
     * Compares the existing wires/faces of an obj to the new wires/faces.
     * If there are any differences, then
     * attribs and groups are all updated to relflect the new changes.
     * Finally, the wires/faces for this obj is set to new wires/faces.
     * @param
     * @return
     */
    private _updateAttribsAndGroupsChangedWiresOrFaces(id, tt, new_topo);
    /**
     * Find all the wires in a polymesh
     * @param
     * @return Object of type Polymesh
     */
    private _findPolymeshWires(face_ids);
    /**
     * Loop through all the objects, and create paths for wires or faces
     * Used in geomGetTopoPaths() method
     * @param
     * @return
     */
    private _getWFPathsFromObjsData(objs_data, wf_topos);
    /**
     * Loop through all the objects, and create paths for vertices and edges
     * Used in geomGetTopoPaths() method
     * @param
     * @return
     */
    private _getVEPathsFromObjsData(objs_data, v_or_e);
    /**
     * Used by _getVEPathsFromObjsData
     * @param
     * @return
     */
    private _getVEPathsFromWF(path_arr, obj_id, wf_data, wf_topos, v_or_e);
    /**
     * to be completed
     * @param
     * @return
     */
    private _distanceSquared(i_pos, j_pos, tolerance);
    /**
     * to be completed
     * @param
     * @return
     */
    private _purgeDelUnusedPoints();
    /**
     * to be completed
     * @param
     * @return
     */
    private _purgeDelUnusedPointValues();
    /**
     * to be completed
     * @param
     * @return
     */
    private _purgeDelSparsePoints();
    /**
     * This method assumes that the id is for a point that is about to be deleted.
     * It deletes the attributs values for all attributes in the model.
     * @param
     * @return
     */
    private _depreceated_delPointFromObjs(id);
    /**
     * Add an attributes value.
     * @param path The path to a geometric entity or topological component.
     * @return True if the path does not exist.
     */
    private _depreceated_addTopoAttribValue(name, geom_type, path);
    /**
     * Delete an attribute value.
     * @param path The path to a geometric entity or topological component.
     * @return The attribute value.
     */
    private _depreceated_delTopoAttribValue(name, geom_type, path);
}
