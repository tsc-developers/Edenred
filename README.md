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


---

## **CSS Customizations**
- Based on Edenred figma project we did some css customization.

```
<link rel="stylesheet" href="resources/style.css">
```

---

## **Rating plugin**
- It's thumbUp and thumbDown new feature. You need to load the plugin on HTML page to display it in webchat.

```
<script src="https://cognigy-bucket.s3.eu-west-3.amazonaws.com/prod/webchat/Edenred/rating-plugin.js"></script>
```

---

## **Custom Script**
- Custom initialization for Edenred project

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