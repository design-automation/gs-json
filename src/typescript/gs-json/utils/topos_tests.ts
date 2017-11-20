import * as gsj from "./gs-json";

export function test_Topo_constructor():boolean{
	return true;
}

export function test_Topo_getObjID():boolean{
	return true;
}

export function test_Topo_getGeom():boolean{
	return true;
}

export function test_Topo_getModel():boolean{
	return true;
}

// export function test_Topo_getGeomType():boolean{ //This method cannot be tested.
// 	return true;
// }

export function test_Topo_getAttribNames():boolean{
	return true;
}

export function test_Topo_getAttribValue():boolean{
	return true;
}

export function test_Topo_setAttribValue():boolean{
	return true;
}

export function test_Topo_getGroupNames():boolean{
	return true;
}


// Vertex
export function test_Vertex_getGeomType():boolean{
	return true;
}
export function test_Vertex_getPoint():boolean{
	return true;
}
export function test_Vertex_next():boolean{
	return true;
}
export function test_Vertex_previous():boolean{
	return true;
}
export function test_Vertex_getEdge():boolean{
	return true;
}
export function test_Vertex_getParent():boolean{
	return true;
}


// Edge
export function test_Edge_getGeomType():boolean{
	return true;
}
export function test_Edge_getVertices():boolean{
	return true;
}
export function test_Edge_next():boolean{
	return true;
}
export function test_Edge_previous():boolean{
	return true;
}	
export function test_Edge_getParent():boolean{
	return true;
}
export function test_Edge_neighbours():boolean{
	return true;
}


// Wire
export function test_Wire_getGeomType():boolean{
	return true;
}
export function test_Wire_getVertices():boolean{
	return true;
}
export function test_Wire_getEdges():boolean{
	return true;
}
export function test_Wire_numVertices():boolean{
	return true;
}
export function test_Wire_numEdges():boolean{
	return true;
}
export function test_Wire_isClosed():boolean{
	return true;
}


// Face
export function test_Face_getGeomType():boolean{
	return true;
}
export function test_Face_getVertices():boolean{
	return true;
}
export function test_Face_getEdges():boolean{
	return true;
}
export function test_Face_numVertices():boolean{
	return true;
}
export function test_Face_numEdges():boolean{
	return true;
}
export function test_Face_isClosed():boolean{
	return true;
}
export function test_Face_neighbours():boolean{
	return true;
}
