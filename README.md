Webkit Notification API jQuery Wrapper
======================================

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