const {fileList} = require("./API_v1/fileList");
const {getFile, uploadFile, deleteFile} = require("./API_v1/file");
const {createFolder} = require("./API_v1/folder");


module.exports = {
    fileList,
    getFile,
    uploadFile,
    deleteFile,
    createFolder
}