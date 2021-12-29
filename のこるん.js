"use strict";

const express = require("express");
const line = require("@line/bot-sdk");
const PORT = process.env.PORT || 5000;

const config = {
  channelSecret: "26edefbe0a1f0605c8cb67c713b8c079", 
  channelAccessToken: "UWVFuJi63z+uvypgoDQK3iMTdNtY6uk6XrNe/zsMqRuh1VW+2vjJrKJNVG04PhJHsmVrpPd2W9GzWJtGJTsBBbNzH+gIt+k2I1MXVQCpYte8L8SVZQqIk6M7LVmHqH8KhirIu65vrtHevulGU3mQRgdB04t89/1O/w1cDnyilFU="
};

const app = express();

app.post("/webhook", line.middleware(config), (req, res) => {
  console.log(req.body.events);

  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

const client = new line.Client(config);

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

async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  };

  let mes = { type: "text", text: event.message.text };
  return client.replyMessage(event.replyToken, mes);
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);