//here is some data
//2 shells with a total of 11 faces, 1 wire, 48 edges, and 48 vertices
//6 wires with a total of 70 edges and 76 vertices
//total wires = 7, total edges = 118 edges, total vertices = 124
let geometry_data: any = [
    [100, [], [[0, 1, 2, 3, 4, 5]]],
    [100, [], [[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]]],
    [100, [], [[24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]]],
    [100, [], [[37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]]],
    [100, [], [[52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62]]],
    [100, [], [[63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]]],
    [200, [[77, 81, 80, 76], [78, 82, 81, 77], [79, 83, 82, 78], [76, 80, 83, 79], [78, 77, 76, 79]], [[81, 80, 83, 82, 81]]],
    [200, [[85, 89, 88, 84], [86, 90, 89, 85], [87, 91, 90, 86], [84, 88, 91, 87], [86, 85, 84, 87], [89, 90, 91, 88]], []],
];
//function to creat a map to link global indices to local indices
class IndexMap {
    points: Set<number> = new Set();
    verts: number[][] = [];
    edges: number[][] = [];
    wires: number[][] = [];
    faces: number[][] = [];
    shells: number[] = [];
    //constructor creates the map
    constructor(data: any) {
        //iterate through entities one at a time
        //processes faces (i.e. ent[1]), then wires (i.e. ent[2])
        for (let i_ent: number = 0; i_ent < data.length; i_ent++) {
            //shell entities, i.e. any 200 entities
            if (data[i_ent][1].length > 0) {
                this.shells.push(i_ent);
            }
            //faces, which are stored in ent[1], always assumed to be closed
            for (let i_face: number = 0; i_face < data[i_ent][1].length; i_face++) {
                this.faces.push([i_ent, 1, i_face]);
                let face: number[] = data[i_ent][1][i_face];
                for (let i: number = 0; i < face.length; i++) {
                    this.edges.push([i_ent, 1, i_face, i]);
                    this.verts.push([i_ent, 1, i_face, i]);
                    this.points.add(face[i]);
                }
            }
            //wires, which are stored in ent[2], if closed then must have an extra vert
            for (let i_wire: number = 0; i_wire < data[i_ent][2].length; i_wire++) {
                this.wires.push([i_ent, 2, i_wire]);
                let wire: number[] = data[i_ent][2][i_wire];
                let num_edges: number = wire.length - 1;
                let num_verts: number = wire.length;
                if (wire[0] == wire[wire.length - 1]) {
                    num_verts--;
                }
                for (let i: number = 0; i < num_verts; i++) {
                    this.verts.push([i_ent, 2, i_wire, i]);
                    this.points.add(wire[i]);
                    if (i < num_edges) {
                        this.edges.push([i_ent, 2, i_wire, i]);
                    }
                }
            }
        }
    }
    //points
    numPoints(): number {
        return this.points.size;
    }

    //vertices
    numVerts(): number {
        return this.verts.length;
    }
    getLocalVert(i: number): number[] {
        return this.verts[i];
    }
    //entity index, sub entity index (faces or wires), face or wire index, vertex index
    getGlobalVert(i_arr: number[]): number {
        return this.verts.indexOf(i_arr);
    }

    //edges
    numEdges(): number {
        return this.edges.length;
    }
    getLocalEdge(i: number): number[] {
        return this.edges[i];
    }
    //entity index, sub entity index (faces or wires), face or wire index, edge index
    getGlobalEdge(i_arr: number[]): number {
        return this.edges.indexOf(i_arr);
    }

    //wires
    numWires(): number {
        return this.wires.length;
    }
    getLocalWire(i: number): number[] {
        return this.wires[i];
    }
    //entity index, wire index
    getGlobalWire(i_ent: number, i_wire): number {
        return this.wires.indexOf([i_ent, 2, i_wire]);
    }

    //faces
    numFaces(): number {
        return this.faces.length;
    }
    getLocalFace(i: number): number[] {
        return this.faces[i];
    }
    //entity index, face index
    getGlobalFace(i_ent: number, i_face): number {
        return this.faces.indexOf([i_ent, 1, i_face]);
    }

    //shells
    numShells(): number {
        return this.shells.length;
    }
    getLocalShell(i: number): number {
        return this.shells[i];
    }
    getGlobalShell(i: number): number {
        return this.shells.indexOf(i);
    }
}
let map: IndexMap = new IndexMap(geometry_data);
console.log(map);

console.log("num points = " + map.numPoints());
console.log("num verts = " + map.numVerts());
console.log("num edges = " + map.numEdges());
console.log("num faces = " + map.numFaces());
console.log("num wires = " + map.numWires());
console.log("num shells = " + map.numShells());

console.log("global vertex 25 = " + map.getLocalVert(25));
console.log("global edge 25 = " + map.getLocalEdge(25));
console.log("global face 5 = " + map.getLocalFace(5));

console.log("entity 1 > wires > wire 0 > edge 3 = " + map.getGlobalEdge([1,2,0,3]))