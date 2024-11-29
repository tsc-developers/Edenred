# **Edenred Webchat**

**Short project description:**  
Here you'll find some modifications for Edenred project.

---

## **Table of Contents**
- [**Edenred Webchat**](#edenred-webchat)
  - [**Table of Contents**](#table-of-contents)
  - [**CSS Customizations**](#css-customizations)
  - [**Rating plugin**](#rating-plugin)
  - [**Custom Script**](#custom-script)
    - [**Usage:**](#usage)
  - [**Complete usage example**](#complete-usage-example)

---

## **CSS Customizations**
- Based on the Edenred Figma project we did some CSS customization.
- Cognigy documentation: [https://github.com/Cognigy/WebchatWidget/blob/master/docs/css-customization.md](https://github.com/Cognigy/WebchatWidget/blob/master/docs/css-customization.md)
- Cognigy CSS example: [https://codesandbox.io/p/sandbox/css-customization-gv35e?file=%2Fwebchat-style.css](https://codesandbox.io/p/sandbox/css-customization-gv35e?file=%2Fwebchat-style.css)
- File: [style.css](resources/style.css)

```
<link rel="stylesheet" href="resources/style.css">
```

---

## **Rating plugin**
- It's thumbUp and thumbDown new feature. You need to load the plugin on HTML page to display it in webchat.
- Cognigy documentation: [https://docs.cognigy.com/webchat/plugins/](https://docs.cognigy.com/webchat/plugins/)

```
<script src="https://cognigy-bucket.s3.eu-west-3.amazonaws.com/prod/webchat/Edenred/rating-plugin.js"></script>
```

---

## **Custom Script**
- This is the custom initialization for the Edenred project. The objective with it is create different behaviors for the webchat.
- Behaviors:
  - Keep the scroll position after receiving the bot message, and display the "new message" alert.
  - Remove the "new message" alert after the scroll hit on the bottom.
  - Fix the IOS mobile issue when the keyboard appears, it was not resizing the webchat height and hiding contents. Now the height resizing on the keyboard displays.
- File: [EdenredWebchat.js](resources/javascripts/EdenredWebchat.js)

### **Usage:**
- Load cognigy webchat and our custom code.
```
  <script src="https://github.com/Cognigy/Webchat/releases/latest/download/webchat.js"></script>
  <script src="resources/javascripts/EdenredWebchat.js"></script>
```
- Create a new instance of EdenredWebchat and call initEdenredWebchat.
  - endpoint-url: The endpoint URL provided on the cognigy endpoint.
  - params: cognigy params for webchat
    - Documents: [doc1 - about webchat script](https://github.com/Cognigy/Webchat/blob/main/docs/webchat-api.md), [doc2 - params key options](https://github.com/Cognigy/Webchat/blob/main/docs/embedding.md#endpoint-settings)
  - auto-open: boolean value. If you want to auto-open the webchat and start a conversation, use `true`
```
   <script>
        const cognigy = new EdenredWebchat(
          {{endpoint-url}},
          {{params}}
        ).initEdenredWebchat({{auto-open}});
    </script>
```

---

## **Complete usage example**

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="apple-mobile-web-app-capable" content="yes" />

    <title>Document</title>
    <link rel="stylesheet" href="resources/style.css">
  </head>
  <body></body>
    <script src="https://github.com/Cognigy/Webchat/releases/latest/download/webchat.js"></script>
    <script src="https://cognigy-bucket.s3.eu-west-3.amazonaws.com/prod/webchat/Edenred/rating-plugin.js"></script>
    <script src="resources/javascripts/EdenredWebchat.js"></script>
    <script>
        const cognigy = new EdenredWebchat(
            "https://endpoint-foundever.cognigy.cloud/5641fb8fcd70dffe2d090d03a478a86305825ef831ad17f8259b612ce179a616",
            {
                settings: {
                    teaserMessage: {
                        text: "Comment puis-je t'aider?",
                        teaserMessageDelay: 1000 // in ms. 1sec in this case
                    }
                }
            }
        ).initEdenredWebchat(false);
    </script>
</html>
```
