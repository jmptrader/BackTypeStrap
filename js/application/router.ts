/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/underscore/underscore.d.ts" />
/// <reference path="../typings/backbone/backbone.d.ts" />

/// <reference path="views/page.ts" />

module Application {
    var $ = jQuery;

    export class Router extends Backbone.Router {
        get routes() {
            return {
                '': 'home',
                '!/': 'home',
                '!/home': 'home',
                '*path': 'notFound'
            }
        }

        home() {
            var homeView = new Application.Views.PageView({
                templateName: 'home',
                model: new Backbone.Model({
                    title: 'Hello, world!',
                    content: 'This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.'
                })
            });

            $('#container').html('').append(homeView.render().$el);
        }

        notFound() {
            var notFoundView = new Application.Views.PageView({
                templateName: 'notFound',
                model: new Backbone.Model({
                    title: '404',
                    content: 'Not Found.'
                })
            });

            $('#container').html('').append(notFoundView.render().$el);
        }
    }
}