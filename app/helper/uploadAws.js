  const config = require("../../config/configJs")
  const aws = require('aws-sdk');
  let uploadImgOnAWS=   (base64) => {
      return new Promise(function (resolve, reject) {
    const {
      accessKeyId,
      secretAccessKey,
      region,
      ACL,
      bucket,
    } = config.awsS3;
    aws.config.update({
      accessKeyId,
      secretAccessKey,
      region,
      ACL
    });
    const s3Bucket = new aws.S3({
      params: {
        Bucket: bucket,
        ACL
      },
    });
    
      const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let randomString = '';
      for (let i = 0; i < 16; i++) {
        const randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
      }
      buf = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      const data = {
        Key: randomString,
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
      };
       s3Bucket.upload(data, (err, data) => {
        if (err) {
          reject(err);
        } else {
            resolve(data.Location);
        }
      });
  });
  };
  module.exports = {
      uploadImgOnAWS
  }