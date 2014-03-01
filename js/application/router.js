/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/underscore/underscore.d.ts" />
/// <reference path="../typings/backbone/backbone.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="views/page.ts" />
var Application;
(function (Application) {
    var $ = jQuery;

    var Router = (function (_super) {
        __extends(Router, _super);
        function Router() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(Router.prototype, "routes", {
            get: function () {
                return {
                    '': 'home',
                    '!/': 'home',
                    '!/home': 'home',
                    '*path': 'notFound'
                };
            },
            enumerable: true,
            configurable: true
        });

        Router.prototype.home = function () {
            var homeView = new Application.Views.PageView({
                templateName: 'home',
                model: new Backbone.Model({
                    title: 'Hello, world!',
                    content: 'This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.'
                })
            });

            $('#container').html('').append(homeView.render().$el);
        };

        Router.prototype.notFound = function () {
            var notFoundView = new Application.Views.PageView({
                templateName: 'notFound',
                model: new Backbone.Model({
                    title: '404',
                    content: 'Not Found.'
                })
            });

            $('#container').html('').append(notFoundView.render().$el);
        };
        return Router;
    })(Backbone.Router);
    Application.Router = Router;
})(Application || (Application = {}));
