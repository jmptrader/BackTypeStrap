/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/underscore/underscore.d.ts" />
/// <reference path="../typings/backbone/backbone.d.ts" />

/// <reference path="router.ts" />

module Application {
    export var clientUrlPrefix: string = '/#!';
    export var router: Router = null;

    export var templates = {};

    function hasClientUrl() {
        var hash = window.location.hash;

        if (hash.length > clientUrlPrefix.length) {
            return true;
        }

        if (clientUrlPrefix.indexOf(hash) === 0) {
            return false;
        }

        return true;
    }

    function redirectToDefault() {
        router.navigate(clientUrl('/'), { trigger: true });
    }

    export function getTemplate(templateName, callback) {
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

    export function clientUrl(...segments: string[]) {
        var path = segments.join('/');
        if (path.length && path.indexOf('/') === 0) {
            path = path.substring(1);
        }
        return clientUrlPrefix + path;
    }

    export function start(options?) {
        router = new Router;
        Backbone.history.start();
        if (!hasClientUrl()) {
            redirectToDefault();
        }
    }
}