import * as gs from "../_export";
/**
 * Generates an empty model with nothing in it.
 */
export declare function genModelEmpty(): gs.IModel;
/**
 * Generates a model with 4 points. Two of the points have the same position.
 */
export declare function genModelPoints(): gs.IModel;
/**
 * Generates a model with 4 points. Two of the points have the same position.
 */
export declare function genModelPointsInclDel(): gs.IModel;
/**
 * Generates an open polyline with three points.
 */
export declare function genModelOpenPolyline(): gs.IModel;
/**
 * Generates a closed polyline with six points.
 */
export declare function genModelClosedPolyline(): gs.IModel;
/**
 * Generates a 10 x 10 x 10 box. The box is a single polymesh.
 */
export declare function genModelBox(): gs.IModel;
/**
 * Generates a 10 x 10 x 10 box. The box is a single polymesh.
 * The model includes the following attribs:
 * A points attribute called "height" with a number data type.
 * A face attribute called "face type" with a string data type.
 * An edge attribute called "horizontal" with a boolean data type.
 */
export declare function genModelBoxWithAttribs(): gs.IModel;
/**
 * Generates a 10 x 10 x 10 box with one open side. The box is a single polymesh.
 */
export declare function genModelBoxOpen1(): gs.IModel;
/**
 * Generates a 10 x 10 x 10 box with two open side. The box is a single polymesh.
 * The two open sides are adjacent to one another, so a single wire is generated.
 */
export declare function genModelBoxOpen2(): gs.IModel;
/**
 * Generates a 10 x 10 x 10 box with two disjoint open side. The box is a single polymesh.
 * The openings are disjoint, so two wires are generated.
 */
export declare function genModelBoxOpen2Disjoint(): gs.IModel;
/**
 * Generates two boxes. Each box is a single polymesh.
 */
export declare function genModelTwoBoxesOpen(): gs.IModel;
/**
 * Generates a 10 x 10 x 10 box at [200, 500, 100]. The box is a single polymesh.
 */
export declare function genModelBoxFarAway(): gs.IModel;
/**
 * Generates many boxes
 */
export declare function genModelManyBoxes(): gs.IModel;
/**
 * Generates a polymesh with a single polygon with difficult geometry.
 * Duplicate points.
 * Coliniear points.
 * Concave shape.
 */
export declare function genModelDifficultPolymesh(): gs.IModel;
/**
 * Generates an invalid polymesh with a single polygon that self intersects.
 */
export declare function genModelInvalidPolymesh(): gs.IModel;
/**
 * Generates a model with 6 polylines and two open boxes.
 */
export declare function genModelPolyinesBoxes(): gs.IModel;
/**
 * Generates a model with 6 polylines and two open boxes.
 */
export declare function genModelGrid(): gs.IModel;
/**
 * Generates a model of a torus with two holes in it.
 */
export declare function genModelTorus(): gs.IModel;
/**
 * Generates a model of 50 x torus.
 */
export declare function genModelManyTorus(): gs.IModel;
/**
 * Generates a model with some circles.
 */
export declare function genModelCircles(): gs.IModel;
/**
 * Generates a model with some circles.
 */
export declare function genModelGroups(): gs.IModel;
/**
 * Generates a model with some planes.
 */
export declare function genModelPlanes(): gs.IModel;
/**
 * Generates a model with del points.
 */
export declare function genModelDelPoints(): gs.IModel;
/**
 * Generates a model with del objs.
 */
export declare function genModelDelObjs(): gs.IModel;
/**
 * Generates a model with del points.
 */
export declare function genModelObjWithAttribs(): gs.IModel;
/**
 * Generates model with a 3D Polylined Ellipse.
 */
export declare function genModel_3DConic_Ellipse(): gs.IModel;
/**
 * Generates model with a 3D Polylined Parabola.
 */
export declare function genModel_3DConic_Parabola(): gs.IModel;
/**
 * Generates model with a 3D Polylined Hyperbola.
 */
export declare function genModel_3DConic_Hyperbola(): gs.IModel;
/**
 * Generates model with a 3D Polylined RayTwo.
 */
export declare function genModel_3DConic_RayTwo(): gs.IModel;
export declare function genModel_ellipse_ellipse(): gs.IModel;
export declare function genModel_plane3D_ellipse2D(): gs.IModel;
export declare function genModel_plane3D_circle2D(): gs.IModel;
export declare function genModel_plane3D_hyperbola(): gs.IModel;
export declare function genModel_plane3D_parabola(): gs.IModel;
export declare function genModel_3D_Ray2_ellipse_2D(): gs.IModel;
