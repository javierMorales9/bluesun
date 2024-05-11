const { S3, UploadPartCommand } = require("@aws-sdk/client-s3");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function ls() {
  console.log('the env', process.env);

  const { stdout, stderr } = await exec('ffmpeg -version');

  const s3 = new S3({
    region: process.env.AWS_REGION,
  });

  try {
    const data = await s3.getObject({
      Bucket: process.env.INPUT_BUCKET,
      Key: process.env.INPUT_KEY
    });

    await s3.send(new UploadPartCommand({
      Bucket: process.env.OUTPUT_BUCKET,
      Key: process.env.OUTPUT_KEY,
      PartNumber: 1,
      UploadId: process.env.UPLOAD_ID,
      Body: data.Body
    }));

  }
  catch (err) {
    console.log('error', err);
  }

}

ls();