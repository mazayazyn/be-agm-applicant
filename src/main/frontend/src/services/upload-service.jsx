import S3 from "react-aws-s3/dist/react-aws-s3";
import {Buffer} from "buffer";

const uploadFile = (file) => {
    let newFileName = file.name.replace(/\..+$/, "");
    window.Buffer = Buffer;
    const config = {
        bucketName: "propensib07",
        dirName: "cv",
        region: "ap-southeast-1",
        accessKeyId: "AKIAYGYB7BJBWNOFICNB",
        secretAccessKey: "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",
    };
    const ReactS3Client = new S3(config);
    return new Promise((resolve, reject) => {
        // console.log(file)
        ReactS3Client.uploadFile(file, newFileName).then((data) => {
            if (data.status >= 200 && data.status < 300) {
                resolve({
                    data:
                        {
                            fileName: data.location,
                            fileDownloadUrl: data.location,
                            fileType: file.type,
                            size: file.size,
                            fileNameOriginal: file.name
                        }
                })
            } else {
                reject(new Error("invalid data"))
            }
        })
    })
}

const uploadUrl = (file) => {
    return file
}

const viewFile = (fileName) => {
    window.open(fileName, '_blank')
};

export default {uploadFile, viewFile, uploadUrl};