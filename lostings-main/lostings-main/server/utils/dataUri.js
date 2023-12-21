const DataUriParser = require("datauri/parser.js");
const path = require("path");
exports.getDataUri=(file)=>{
    const parser = new DataUriParser();
    const extName = path.extName(file.originalName).toString();
    console.log(extName);
    return parser.format(extName,file.buffer);
}
