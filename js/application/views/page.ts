/// <reference path="../../typings/underscore/underscore.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../application.ts" />

module Application.Views {
    export interface PageOptions extends Backbone.ViewOptions {
        templateName: string;
    }

    export class PageView extends Backbone.View {
        template: (model: Object) => string;
        templateName: string;

        constructor (options: PageOptions) {
            super(options);
            var self = this;
            Application.getTemplate(options.templateName, function (tmp) {
                self.template = tmp;
            });
        }

        render() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    }
}
