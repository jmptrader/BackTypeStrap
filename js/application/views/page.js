/// <reference path="../../typings/underscore/underscore.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../application.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Application;
(function (Application) {
    (function (Views) {
        var PageView = (function (_super) {
            __extends(PageView, _super);
            function PageView(options) {
                _super.call(this, options);
                var self = this;
                Application.getTemplate(options.templateName, function (tmp) {
                    self.template = tmp;
                });
            }
            PageView.prototype.render = function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            };
            return PageView;
        })(Backbone.View);
        Views.PageView = PageView;
    })(Application.Views || (Application.Views = {}));
    var Views = Application.Views;
})(Application || (Application = {}));
