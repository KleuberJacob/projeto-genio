const {
    dialogflow,
    SimpleResponse,
    BasicCard,
    Button,
    Image,
    BrowseCarousel,
    BrowseCarouselItem,
    Suggestions,
    LinkOutSuggestion,
    MediaObject,
    Table,
    List,
    Carousel,
  } = require('actions-on-google');
  const functions = require('firebase-functions');
  
  const app = dialogflow({debug: true});

  app.intent('Basic Card', (conv) => {
    if (!conv.screen) {
      conv.ask('Sorry, try this on a screen device or select the ' +
        'phone surface in the simulator.');
      conv.ask('Which response would you like to see next?');
      return;
    }
  
    conv.ask(`Here's an example of a basic card.`);
    conv.ask(new BasicCard({
      text: `This is a basic card.  Text in a basic card can include "quotes" and
      most other unicode characters including emojis.  Basic cards also support
      some markdown formatting like *emphasis* or _italics_, **strong** or
      __bold__, and ***bold itallic*** or ___strong emphasis___ as well as other
      things like line  \nbreaks`, // Note the two spaces before '\n' required for
                                   // a line break to be rendered in the card.
      subtitle: 'This is a subtitle',
      title: 'Title: this is a title',
      buttons: new Button({
        title: 'This is a button',
        url: 'https://assistant.google.com/',
      }),
      image: new Image({
        url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
        alt: 'Image alternate text',
      }),
      display: 'CROPPED',
    }));
    conv.ask('Which response would you like to see next?');
  });

  exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);