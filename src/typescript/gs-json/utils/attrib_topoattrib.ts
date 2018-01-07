import {ITopoAttrib, IVertex, IEdge, IWire, IFace} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType, EDataType} from "./enums";
import {Attrib} from "./attrib";
import {Vertex, Edge, Wire, Face} from "./topo_sub";

/**
 * TopoAttrib class for topos (vertices, edges, wires, and faces).
 * Semantic attributes that are attached to points or objects.
 * An instance of this class stores a list of attributes values.
 */
export class TopoAttrib extends Attrib implements ITopoAttrib {

    /**
     * Get all paths for this attribute.
     * @return An array of paths.
     */
    public getPaths(): ITopoPathData[] {
        return this._kernel.topoAttribGetPaths(this._name, this._geom_type);
    }

    /**
     * Get all topos for this attribute.
     * @return An array of paths.
     */
    public getTopos(): IVertex[]|IEdge[]|IWire[]|IFace[] {
        const paths: ITopoPathData[] = this._kernel.topoAttribGetPaths(this._name, this._geom_type);
        switch (this._geom_type) {
            case EGeomType.vertices:
                return paths.map((path) => new Vertex(this._kernel, path));
            case EGeomType.edges:
                return paths.map((path) => new Edge(this._kernel, path));
            case EGeomType.wires:
                return paths.map((path) => new Wire(this._kernel, path));
            case EGeomType.faces:
                return paths.map((path) => new Face(this._kernel, path));
        }
    }

    /**
     * Get all labels for this attribute.
     * @return An array of labels.
     */
    public getLabels(): string[] {
        switch (this._geom_type) {
            case EGeomType.vertices:
                return this.getPaths().map(
                    (path) => "o" + path.id + ":" + ["w","f"][path.tt] + path.ti + ":v" + path.si);
            case EGeomType.edges:
                return this.getPaths().map(
                    (path) => "o" + path.id + ":" + ["w","f"][path.tt] + path.ti + ":e" + path.si);
            case EGeomType.wires:
                return this.getPaths().map(
                    (path) => "o" + path.id + ":w" + path.ti);
            case EGeomType.faces:
                return this.getPaths().map(
                    (path) => "o" + path.id + ":f" + path.ti);
        }
    }
}
