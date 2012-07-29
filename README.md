Webkit Notification API jQuery Wrapper
======================================

  - It requests permission when it required (do not distrubs user on the start) you just call `$.notification` and this plugin will do the rest for you.
  - It abstracts 2 type of notifications (createHTMLNotification, createNotification) in one simple interface.
  - It allows you to specify auto-hide notification inteval (`timeout` parameter). 
  - It closes notification on click by default (`autoclose` parameter). Default browser action: user must click small close button on the top right corner to do that. 
  - You also can specify `replaceId` parameter to replace existed notification with new one (prevents from notifications flooding when showing chat messages in notifications, for eaxmple).
  - You can pass `onclick`, `onclose`, `ondisplay`, `onerror` to watch Notification's events.

This plug-in now works in Yandex.Mail WebChat (in production) and it does not have a strong dependence on jQuery.

Usage
-----

```javascript
// Asynchronous usage. icon + text + title mode
var options = {
    icon: 'avatar.png',
    title: 'Title',
    content: 'Message',
    onclick: function () {
        console.log('Pewpew');
    }
};
var notification = $.notification(options, function (isNotificationsAllowed) {
    if (isNotificationsAllowed) {
        notification.show();
    }
});

// Synchronous usage. "iframe" mode
var options = {
    url: 'http://ya.ru',
    timeout: 10000, // close notification in 10 sec
    autoclose: false,
    onclick: function () {
        console.log('Pewpew');
    }
};
var notification = $.notification(options).show();
// notification will displayed as soon as user permit notifications
```

Note
----

Before the notification will occur the ***user must click on the page*** and allow the notifications.
But you can ask user beforehand:

```javascript
$(document).one('click', function () {
    window.webkitNotifications && window.webkitNotifications.requestPermission();
});
```

Read
----

http://www.chromium.org/developers/design-documents/desktop-notifications/api-specification

http://www.html5rocks.com/en/tutorials/notifications/quick/