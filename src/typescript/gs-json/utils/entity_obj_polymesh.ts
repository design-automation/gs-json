import {Arr} from "./arr";
import {IPoint, IVertex, IEdge, IWire, IFace, IPolymesh} from "./ifaces_gs";
import {EGeomType, EObjType} from "./enums";
import {Obj} from "./entity_obj";

/**
 * Class Polymesh.
 * A polymesh is defined by a set of polygonal faces.
 * These faces may have arbitrary number of vertices,
 * may be concave or convex, and may be planar or non-planar.
 * All faces are expected to be connected to one anoter, so that there are no disjoint parts.
 * The polymesh will have closed wires along all its naked edges.
 * The polymesh may include one or more holes.
 * The holes will result in additional naked edges, each with their own wire.
 * A polymesh may be part of a group and may have attributes.
 */
export class Polymesh extends Obj implements IPolymesh {

    /**
     * Get the object type: "polymesh".
     * @return The polymesh object type.
     */
    public getObjType(): EObjType {
        return EObjType.polymesh;
    }

    /**
     * Checks if the polymesh is closed.
     * @return Return true if the polymesh is closed.
     */
    public isClosed(): boolean {
        return this.numWires() === 0;
    }

    /**
     * Returns the number of vertices in this polymesh wires.
     * @return Return the number of vertices.
     */
    public numWireVertices(): number {
        let count: number = 0;
        for (const wire of this.getWires()) {count += wire.numVertices();}
        return count;
    }

    /**
     * Returns the number of vertices in this polymesh faces.
     * @return Return the number of vertices.
     */
    public numFaceVertices(): number {
        let count: number = 0;
        for (const face of this.getFaces()) {count += face.numVertices();}
        return count;
    }

    /**
     * Returns the number of edges in this polymesh wires.
     * @return Return the number of edges.
     */
    public numWireEdges(): number {
        let count: number = 0;
        for (const wire of this.getWires()) {count += wire.numEdges();}
        return count;
    }

    /**
     * Returns the number of edges in this polymesh faces.
     * @return Return the number of edges.
     */
    public numFaceEdges(): number {
        let count: number = 0;
        for (const face of this.getFaces()) {count += face.numEdges();}
        return count;
    }

    /**
     *
     * @return
     */
    public getWireVertices(): IVertex[] {
        const vertices: IVertex[] = [];
        for (const wire of this.getWires()) {vertices.push(...wire.getVertices());}
        return vertices;
    }

    /**
     *
     * @return
     */
    public getFaceVertices(): IVertex[] {
        const vertices: IVertex[] = [];
        for (const face of this.getFaces()) {vertices.push(...face.getVertices());}
        return vertices;
    }

    /**
     *
     * @return
     */
    public getWireEdges(): IEdge[] {
        const edges: IEdge[] = [];
        for (const wire of this.getWires()) {edges.push(...wire.getEdges());}
        return edges;
    }

    /**
     *
     * @return
     */
    public getFaceEdges(): IEdge[] {
        const edges: IEdge[] = [];
        for (const face of this.getFaces()) {edges.push(...face.getEdges());}
        return edges;
    }

    /**
     *
     * @return
     */
    public getWirePoints(): IPoint[] {
        const points: IPoint[] = [];
        for (const wire of this.getWires()) {points.push(...wire.getVertices().map((v) => v.getPoint()));}
        return points;
    }

    /**
     *
     * @return
     */
    public getFacePoints(): IPoint[] {
        const points: IPoint[] = [];
        for (const face of this.getFaces()) {points.push(...face.getVertices().map((v) => v.getPoint()));}
        return points;
    }

}
