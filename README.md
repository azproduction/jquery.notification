# Webkit Notification API jQuery Wrapper

  - It requests permission when it required (do not distrubs user on the start) you just call `$.notification` and this plugin will do the rest for you.
  - It abstracts 2 type of notifications (createHTMLNotification, createNotification) in one simple interface.
  - It allows you to specify auto-hide notification inteval (`timeout` parameter). 
  - It closes notification on click by default (`autoclose` parameter). Default browser action: user must click small close button on the top right corner to do that. 
  - You also can specify `replaceId` parameter to replace existed notification with new one (prevents from notifications flooding when showing chat messages in notifications, for eaxmple).
  - You can pass `onclick`, `onclose`, `onshow`, `onerror` to watch Notification's events.

This plug-in now works in Yandex.Mail WebChat (in production) and it does not have a strong dependence on jQuery.

## Usage

```javascript
// icon + text + title

var options = {
    iconUrl: 'avatar.png',
    title: 'Title',
    body: 'Message',
    onclick: function () {
        console.log('Pewpew');
    }
};

$.notification(options);
// notification will displayed as soon as user permit notifications
```

```javascript
// just text
$.notification("Message");
// notification will displayed as soon as user permit notifications
```

```javascript
// $.notification returns Deferred

$.notification("Hello from jQuery.notifications!")
.then(function (notification) {
    setTimeout(function () {
        notification.close();
    }, 2000);
}, function () {
    console.error('Rejected!');
});
```

## Note

Before the notification will occur the ***user must click on the page*** and allow the notifications.
But you can ask user beforehand:

```javascript
$.notification.requestPermission(function () {
    console.log($.notification.permissionLevel());
});
```

## Read

http://www.chromium.org/developers/design-documents/desktop-notifications/api-specification

http://www.html5rocks.com/en/tutorials/notifications/quick/

## Licence

(The MIT License)

Copyright (c) 2011 Mikhail Davydov &lt;azazel.private@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.