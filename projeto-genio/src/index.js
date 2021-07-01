const express = require('express');
const app = express();
const port = 3000;

app.post('/', (req, res) => {
    let response = {
        "payload": {
          "google": {
            "expectUserResponse": false,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": "this is a Google Assistant response"
                  }
                }
              ]
            }
          }
        }
      };
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});