const express = require('express');
const sheetService = require('./services/googlesheets');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
    await sheetService.getProducts('1W0uf4FFoQ9z4ol4jeYyTCCFLSfpvAuonVE9TFV9pw6o',0, 'adulto', 'caro', 'eletronico');
});

app.post('/', async (req, res, next) => {

    console.log(req.query);
    
    console.log(req.body);
    let parameters = req.body.queryResult.parameters;

    let products = await sheetService.getProducts('1W0uf4FFoQ9z4ol4jeYyTCCFLSfpvAuonVE9TFV9pw6o',0, parameters.quem[0], parameters.valor, parameters.assunto);

    let cards = products.map(product => {
        return {
            "title": product.name,
            "description": product.name,
            "footer": product.price,
            "image": {
                "url": product.photo,
                "accessibilityText": "Foto do produto"
            }
        };
    });

    let response = {
        "payload": {
          "google": {
            "expectUserResponse": false,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": "Fraga só..."
                  }
                },
                {
                    "carouselBrowse": {
                        "items": cards
                      }
                },
                {
                    "simpleResponse": {
                        "textToSpeech": "Qualquer coisa é só me chamar de novo. Fui!"
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