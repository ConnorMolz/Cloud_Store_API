const {fileList} = require("./fileList");
const {getFile, uploadFile, deleteFile} = require("./file");
const {createFolder} = require("./folder");

class cloudStoreApi {

    constructor(url, username, password) {
        this.url = url;
        this.username = username;
        this.password = password;
    }

    async pullFileList(path) {
        return await fileList(this.url, this.username, this.password, path)
    }

}

export default cloudStoreApi;