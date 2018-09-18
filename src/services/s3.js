'use strict';

var config = require('../config/config.json');
var AWS = require('aws-sdk');

const BUCKET_NAME = 'thiagossegatto-library';

exports.uploadToS3 = async (file, name, ContentType) => {
    let s3bucket = new AWS.S3(
        {accessKeyId: config.IAM_USER_KEY, secretAccessKey: config.IAM_USER_SECRET, Bucket: BUCKET_NAME}
    );
    var buf = new Buffer(file.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    s3bucket.createBucket(function () {
        var params = {
            Bucket: BUCKET_NAME,
            Key: name,
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: ContentType
        };
        s3bucket.upload(params, function (err, data) {
            if (err) {
                console.log('error in callback');
                console.log(err);
            }
        });
    });
}