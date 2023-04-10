const aws = require("aws-sdk");

aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1",
});

let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        let s3 = new aws.S3({ apiVersion: "2006-03-01" });

        var uploadParams = {
            ACL: "public-read", //Access Control Locator
            Bucket: "classroom-training-bucket",
            Key: "abc/" + file.originalname,
            Body: file.buffer,
        };

        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ error: err });
            }
            console.log("file uploaded succesfully");
            return resolve(data.Location);
        });
    });

}


const awsLink = async (req, res, next) => {
    try {
        let data = req.body;
        let resume = req.files;
        console.log(data.role)
        if(!data.role){
            return res.status(400).send({status: false, message: "Please provide role"})
        }
        if(data.role == 'job-seeker' && resume){
            let resumeFile = req.files;

            console.log(req.files)
            if (resumeFile) {
                if (Object.keys(resumeFile).length == 0) return res.status(400).send({ status: false, message: "Please upload resumeFile" });
                let image = await uploadFile(resumeFile[0]);
                req.image = image;
                console.log("hello")
                next()
            }
        }
        else if(data.role != 'job-seeker' || !(resume)){
            return next()
        }
        else if(data.role == 'job-seeker' && !(resume)){
            return res.status(400).send({status: false, message: "Please provide resume details"})
        }
        
        else {
            return res.status(400).send({ status: false, message: "Please upload resume" });
        }
        }
        
    
    catch (err) { return res.status(500).send({ status: false, error: err.message }) }
}

const awsUpdate = async (req, res, next) => {
    try {

        let profileImage = req.files;
        if (profileImage) {
            if (!profileImage || Object.keys(profileImage).length == 0) return next()

            let image = await uploadFile(profileImage[0]);
            req.image = image;
            next()
        }
        else {
            return res.status(400).send({ status: false, message: "Please upload Some data" });
        }
    }
    catch (err) { return res.status(500).send({ status: false, error: err.message }) }
}


module.exports = {awsLink,awsUpdate}