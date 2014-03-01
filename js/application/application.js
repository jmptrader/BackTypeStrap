/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/underscore/underscore.d.ts" />
/// <reference path="../typings/backbone/backbone.d.ts" />
/// <reference path="router.ts" />
var Application;
(function (Application) {
    Application.clientUrlPrefix = '/#!';
    Application.router = null;

    Application.templates = {};

    function hasClientUrl() {
        var hash = window.location.hash;

        if (hash.length > Application.clientUrlPrefix.length) {
            return true;
        }

        if (Application.clientUrlPrefix.indexOf(hash) === 0) {
            return false;
        }

        return true;
    }

    function redirectToDefault() {
        Application.router.navigate(clientUrl('/'), { trigger: true });
    }

    function getTemplate(templateName, callback) {
        var template = this.templates[templateName];
        if (template) {
            callback(_.template(template), template);
            return;
        }
        var self = this;
        $.ajax({
            url: "/templates/" + templateName + ".html",
            async: false,
            success: function (template) {
                self.templates[templateName] = template;
                callback(_.template(template), template);
            }
        });
    }
    Application.getTemplate = getTemplate;

    function clientUrl() {
        var segments = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            segments[_i] = arguments[_i + 0];
        }
        var path = segments.join('/');
        if (path.length && path.indexOf('/') === 0) {
            path = path.substring(1);
        }
        return Application.clientUrlPrefix + path;
    }
    Application.clientUrl = clientUrl;

    function start(options) {
        Application.router = new Application.Router;
        Backbone.history.start();
        if (!hasClientUrl()) {
            redirectToDefault();
        }
    }
    Application.start = start;
})(Application || (Application = {}));
