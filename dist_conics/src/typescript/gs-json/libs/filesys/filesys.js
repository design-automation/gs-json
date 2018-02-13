"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
/**
 * Write a file.
 */
function writeThreeToJSONFile(data, filename) {
    fs.writeFile(filename, JSON.stringify(data, null, 4), (err) => {
        if (err) {
            console.log("Error writing file: " + filename);
            console.error(err);
            return false;
        }
        console.log("File has been created: " + filename);
    });
    return true;
}
exports.writeThreeToJSONFile = writeThreeToJSONFile;
/**
 * Write a file.
 */
function writeGsToJSONFile(model, filename) {
    fs.writeFile(filename, model.toJSON(), (err) => {
        if (err) {
            console.log("Error writing file: " + filename);
            console.error(err);
            return false;
        }
        console.log("File has been created: " + filename);
    });
    return true;
}
exports.writeGsToJSONFile = writeGsToJSONFile;
//# sourceMappingURL=filesys.js.map