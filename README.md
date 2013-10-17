# Congress Searcher

Add congress search capability to your website.

## Requirements

* [jQuery](http://jquery.com/)

## Useage

* Obtain a Sunlight Foundation API Key: [Sunlight Foundation API](http://sunlightfoundation.com/api/).
* Add the value of the API key to congress-searcher.js

```javascript
this.apiKey = 'YOUR SUNLIGHT API KEY';
```

* After including jquery and congress-searcher.js on your page, simply add the following markup wherever you want to inject a searcher:

```html
<div data-action="congress-search"></div>
```

## Full Example

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Congressional Search</title>
    </head>
    <body>
        <h1>Search for your Congress Members</h1>
        <p>Enter your Zip Below and Click Search</p>

        <h2>First Search</h2>
        <div data-action="congress-search"></div>

        <h2>Second Search</h2>
        <div data-action="congress-search"></div>

        <h2>Third Search</h2>
        <div data-action="congress-search"></div>

        <script src="js/jquery.min.js"></script>
        <script src="js/congress-searcher.js"></script>
    </body>
</html>
```
