const axios = require('axios').default;

const fileList = async (url, username, password, path) =>{

    if(typeof path != "string") {
        return
    }

    const requestPath = url + "/api/file_list"

    const req = await axios.get(requestPath, {
        auth: {
            username: username,
            password: password
        },
    });

    if(req.status === 404){
        console.error("Response: 404, Properly is your URL wrong or your dont have the api activated");
    }
    if(req.status === 500){
        console.error("Response: 500, Internal Server Error please check your Cloud Store logs")
    }
    if(req.status === 200){
        return req.data;
    }
    else {
        console.warn("An unexpected Error occurred")
    }

}

export {
    fileList
};