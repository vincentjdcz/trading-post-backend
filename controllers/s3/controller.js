
const s3 = require("../../s3.js");
const gets3UrlHandler = async (req, res) => {
    const url = await s3.generateUploadURL();
    console.log("SENDING URL: " + url);
    res.send({url});
}

module.exports = {gets3UrlHandler}