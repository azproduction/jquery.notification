/**
 * @fileOverview Webkit Notification API jQuery Wrapper
 *
 * @see http://www.chromium.org/developers/design-documents/desktop-notifications/api-specification
 * @see http://www.html5rocks.com/en/tutorials/notifications/quick/
 *
 * @author azproduction
 * @licence MIT (c) azproduction 2011
 */
jQuery.notification = (function ($, window) {

/**
 * Notification
 *
 * @constructor
 *
 * @param {Object}   options                  if url passed -> HTML page mode else icon & title & content mode
 * @param {String}   [options.url]
 * @param {String}   [options.icon]
 * @param {String}   [options.title]
 * @param {String}   [options.content]
 * @param {String}   [options.replaceId]      acts as window.name in window.open
 * @param {Function} [options.onclick]
 * @param {Function} [options.onclose]
 * @param {Function} [options.ondisplay]
 * @param {Function} [options.onerror]
 * @param {Boolean}  [options.autoclose=true] close block on click? close button is to small so its enable by default
 * @param {Number}   [options.timeout=Infinity] notification auto-close timeout
 * @param {Function} [callback]
 *
 * @example
 *      // Acync
 *      var options = {
 *          icon: 'avatar.png',
 *          title: 'Title',
 *          content: 'Message',
 *          onclick: function () {
 *              console.log('Pewpew');
 *          }
 *      };
 *      var message = $.notification(options, function (isNotificationsAllowed) {
 *          if (isNotificationsAllowed) {
 *              message.show();
 *          }
 *      });
 *
 *      // Synchronous
 *      var message = $.notification(options).show();
 *      // messge will displayed as soon as user permit notifications
 */
var Notification = function (options, callback) {
    if (!(this instanceof Notification)) {
        return new Notification(options, callback);
    }
    options = options || {};
    options.autoclose = options.autoclose || true;
    callback = callback || $.noop;
    var self = this;

    // is supported
    if (!window.webkitNotifications) {
        return callback(false);
    }

    // ask for permission
    // 1 undefined
    // 2 forbidden
    // 0 allowed
    this.notificationStatus = window.webkitNotifications.checkPermission();
    this.requestPermission(function (isNotificationsAllowed) {
        if (!isNotificationsAllowed) { // forbidden
            return callback(isNotificationsAllowed);
        }

        // allowed
        self.instance = options.url ?
                        self.create(options.url) :
                        self.create(options.icon, options.title, options.content);

        options.onclick && self.instance.addEventListener('click', options.onclick, false);
        if (options.autoclose) {
            self.instance.addEventListener('click', function(){
                self.cancel();
            }, false);
        }
        options.onclose && self.instance.addEventListener('close', options.onclose, false);
        options.ondisplay && self.instance.addEventListener('display', options.ondisplay, false);
        options.onerror && self.instance.addEventListener('error', options.onerror, false);

        self.instance.replaceId = options.replaceId || "";
        self.timeout = options.timeout || Infinity;
        // show already called
        if (self.isShowCalled) {
            self.show();
        }
        callback(isNotificationsAllowed);
    });
};

Notification.queue = [];
Notification.isAccessRequested = false;
Notification.callQueue = function (isNotificationsAllowed) {
    for (var i = 0, c = Notification.queue.length; i < c; i++) {
        Notification.queue[i](isNotificationsAllowed);
    }
    Notification.queue = [];
};

Notification.prototype = {
    constructor: Notification,

    notificationStatus: 1,
    isShowCalled: false,
    timeout: Infinity,
    instance: null,

    /**
     * displays notification
     */
    show: function () {
        var self = this;
        if (this.instance) {
            this.instance.show();
            if (isFinite(this.timeout)) {
                window.setTimeout(function () {
                    self.cancel();
                }, this.timeout);
            }
        } else {
            this.isShowCalled = true;
        }

        return this;
    },

    /**
     * hides notification
     */
    cancel: function () {
        if (this.instance) {
            this.instance.cancel();
        }

        return this;
    },

    /**
     * Creates instance
     *
     * @param {String} page_url_or_icon
     * @param {String} [title]
     * @param {String} [content]
     */
    create: function (page_url_or_icon, title, content) {
        var instance;

        // create instance
        if (arguments.length === 1) {
            instance = window.webkitNotifications.createHTMLNotification(page_url_or_icon);
        } else {
            instance = window.webkitNotifications.createNotification(page_url_or_icon, title, content);
        }

        return instance;
    },

    /**
     * Acync wrapper over window.webkitNotifications.requestPermission()
     *
     * @param {Function} callback(isNotificationsAllowed)
     */
    requestPermission: function(callback) {
        var self = this;

        if (this.notificationStatus === 1) { // User deciding or not requested
            Notification.queue.push(callback); // add callback to queue
            if (Notification.isAccessRequested) { // already requested
                return;
            }
        } else { // пользователь уже решил
            callback(this.notificationStatus === 0);
            return;
        }

        Notification.isAccessRequested = true;

        // requestPermission() must be called in user event listener!
        $(document).one('click', function () {
            window.webkitNotifications.requestPermission();
        });

        var checkPermissionInterval = window.setInterval(function () {
            self.notificationStatus = window.webkitNotifications.checkPermission();
            if (self.notificationStatus === 1) {
                return; // still not decided
            }
            window.clearInterval(checkPermissionInterval);
            Notification.callQueue(self.notificationStatus === 0); // 2 forbidden, 0 allowed
        }, 200);
    }
};

return Notification;

}(jQuery, window));