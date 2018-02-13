import * as gs from "./_export";
/**
 * A box with one side open.
 */
export declare function open_box(): gs.IModelData;
/**
 * A box with one side open, with some attributes:
 * "test1" is a point attribute of type "number".
 * "test2" is a vertex attribute of type "string".
 * "shell_id" is a faces attribute of type "number".
 * "test3" is a faces attribute of type "number".
 */
export declare function box_with_attribs(): gs.IModelData;
/**
 * A box with one side open, with some groups.
 */
export declare function box_with_groups(): gs.IModelData;
/**
 * A box with one side open, with some groups.
 */
export declare function Unclosed_with_groups(): gs.IModelData;
export declare function Random_Closed(): gs.IModelData;
export declare function mixed(): gs.IModelData;
