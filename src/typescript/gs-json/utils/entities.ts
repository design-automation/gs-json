export interface IPoint {
	x: number;
	y: number;
	z: number;
}
export interface IPolyline {
	points: IPoint[];
}
export interface IPolygon {
	points: IPoint[];
}