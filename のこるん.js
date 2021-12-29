"use strict";

const { google } = require("googleapis");
const privatekey = require("./MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvgv002/8PR6Hv\nDmAJEHfTHpcENwN6LNmwH0diYzaHVFh7R02R96eXSep2hzbSOLjBxxICiWcNsh+S\nXCewmqodcrszUrLiyfy3UqkLWsYBOLpU3f77EV3VHd8OZZheKZPtUd7shKZpQycu\nakqIGbiiTO/RHlowdyMz2pBXiKHV2HwA/BJhHzWKHauq5fcHiooW4xYsIbpGnSsw\nB8sHnuK+HgNJ0YfPDU1Jo31Jjt62pvI6U3Faz0eGozPX7836i70DAzbL6oC8TR0G\nmx8RI1ynXbhv70sCQkCoQrGkGyxXDogUqFM31C3wJ2f5SSDH/xnutu+Sq5rgpIrM\nTkqIplg3AgMBAAECggEAMZWNGWjppxRysEncYdMwNwnWWk98gQC4w2Qi06350sPG\nd5WOWaWgyEIOpkvO9hcmQ0CNWwAciCcBemTkpaUcWFN4hahgd2ffKJ+GuHl9pQy0\nv5M0HRQr8TCOOtAC+t8+NnbBxwo2xVg+coN+6PJzUg7wVaEAk96kqFqgGsq0Bei5\nj6s5Gze8Ujx6E+j6rK+Idz+MYu4vOdxL/Sk1Y6GlahPtTaZzGcAChLqdmvzuC88Q\nZQpMX9QWC7xsQ49Kc8P6/C7HtJjp9m8RjiWaVsC5CagVkT1vPJDu4L1z3C8z6jZe\nSbg5Mq/HAZq/FcmvMd88mkMhtcUJVhkaTatTVPCWEQKBgQDuV6GOGM5cinurkSsh\njqC79rdgWo01Dy0uYUWcrSC/EdHEg2AGlTDUmEtMOu/bwcXGMjbtlwIvvh9a3ojX\nlsELv0agXR1cSBJSYBNRG1cJj4Czsz/AmHZL6LpBRHCtMSFx2kxqhdsvty9hjcQo\nJUCSSWBHo2OcjFBL1POTNO4+3wKBgQC8g7hxsYLPQ9eks361JnngZMc8t+yCyE49\nIvlJUU+1eof1B6AhsfGmb1IMSKTjLDnd84ccvatpuOmAPDRtDJTMuNZuXzJDOi9e\n9zv8hfewEnEOnl0nsO6usXPwiagW50mfHEBah/QvhePJhSg8fTZ7rc3Xhv2QMs6p\nT1omMvcJqQKBgGQEpikpQ8AV5Rv0SXNFlTILsJxgo402lzE1ZK8BABLueWbL8soQ\nZXNxjXep6+n+gO5RODev/Rzn3eSWKjq+arhxRkQZjy6gl/+1jaWloXrDm7DNcd1y\nnYHxYeftvpMPYQeUIik5jueRKfL4OO7X4ycAX8TwTebuAuwvqx+FQM1lAoGAU3da\nvfQjf9OA8iqLKnfLtJ/KW0bwEAPSKF2I1H6M9UQ4WDQ1IVYhMVjOkiPD5dWaFXyS\n0RXlhFzb/ewqJjJQ28fnIV1C6uMjQD/lLmy+exXfOuLBSiabt3tYYyL/6owjW7Bt\niefyJOx6K6qqYwXpjp8oqYnaUPM971b0Cj+8g2kCgYEAivuT2QayFZNITZFrXq71\n6QCjdhjnHM+QErIVuL6FWvY9pyHBO2C9vfvyIA7oNrjVqGLZfatTqDzVBH2QM370\noLyLoFdbMu/xxjKgCWXN5XNTg16YftQ+ycv8rlaXCOANPM7IrbphW8BTsl3k/tB5\nu3A8ZXMqDc8HIcCQ1HxAoDk=");
exports.handler = async (event) => {
  const res = await Promise.resolve()
    .then(function () {
      return new Promise(function (resolve, reject) {
        //JWT auth clientの設定
        const jwtClient = new google.auth.JWT(
          privatekey.client_email,
          null,
          privatekey.private_key,
          ["https://www.googleapis.com/auth/drive"]
        );
        //authenticate request
        jwtClient.authorize(function (err, tokens) {
          if (err) {
            reject(err);
          } else {
            //認証成功
            resolve(jwtClient);
          }
        });
      });
    })
    .then(function (jwtClient) {
      return new Promise(async function (resolve, reject) {
        const drive = google.drive({ version: "v3", auth: jwtClient });
        drive.files.list(
          {
            pageSize: 10,
            fields: "nextPageToken, files(id, name)",
          },
          (err, res) => {
            if (err) reject(err);
            const files = res.data.files;
            if (files.length) {
              resolve(files);
            } else {
              resolve("No files found.");
            }
          }
        );
      });
    });
    console.log(res)
};












const express = require("express");
const line = require("@line/bot-sdk");
const PORT = process.env.PORT || 5000;

const config = {
  channelSecret: "26edefbe0a1f0605c8cb67c713b8c079", 
  channelAccessToken: "90IEKFKNcPXaDPsHvgSIYgOQs+G5y+e9hn+fL4SQlnk6+KB3xVlEzmiRVEoSTuszsmVrpPd2W9GzWJtGJTsBBbNzH+gIt+k2I1MXVQCpYtdRLoBUGAJS2lvVxDt3hBxSYKiJwJ4c/XcqsRyrDhzQNgdB04t89/1O/w1cDnyilFU="
};

const app = express();

app.post("/webhook", line.middleware(config), (req, res) => {
  console.log(req.body.events);

  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

const client = new line.Client(config);

async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  };

  client.getMessageContent('<messageId>')
  .then((stream) => {
    stream.on('data', (chunk) => {
      
    });
    stream.on('error', (err) => {
      // error handling
    });
  });

  const drive = google.drive({ version: "v3", auth: jwtClient });

  //アップロードする画像のデータを取得
  const imageStream = await client.getMessageContent(event.message.id);
  
  var fileMetadata = {
    //nameはDriveに保存する時のファイル名になります
    name: `photo.jpg`,
    parents: ["17cZxQSh_uAVHm2mlku4Ja4hnNgOp2tpg"],
  };
  var media = {
    mimeType: "image/jpeg",
    body: imageStream,
  };
  await drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: "id",
    },
    function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        //file.data.idをアップロードされたファイルID
        resolve(file.data.id);
      }
    }
  );

  const message = {
    type: 'text',
    text: '保存に成功したよ！https://drive.google.com/uc?id=1T4QABnxnU_gNt6ORxNvnKU9EiiFxn795'
  };
  
  client.replyMessage('<replyToken>', message)
    .then(() => {
      
    })
    .catch((err) => {
      // error handling
    });

  let mes = { type: "text", text: event.message.text };
  return client.replyMessage(event.replyToken, mes);
}
app.listen(PORT);
console.log(`Server running at ${PORT}`);