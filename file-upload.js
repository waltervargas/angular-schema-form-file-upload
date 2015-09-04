angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/fileUpload/file-upload.html","<div class=\"form-group\" ng-class=\"{\'has-error\': hasError()}\">\n    <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n    <div>\n        \n        <input ng-model=\"$$value$$\" \n               type=\"file\"\n               on-read-file=\"{{ form.options.onReadFn }}\" />\n        \n        <span ng-show=\"$$value$$\" class=\"title\">{{ $$value$$ }}</span>\n    </div>\n    <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n</div>");}]);
angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {
            var fileUpload = function (name, schema, options) {
                if (schema.type === 'string' && schema.format === 'file') {
                    console.log('type is file :)');
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'fileUpload';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    console.log(f);
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(fileUpload);

            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'fileUpload',
                'directives/decorators/bootstrap/fileUpload/file-upload.html'
            );
            
            schemaFormDecoratorsProvider.createDirective(
                'fileUpload',
                'directives/decorators/bootstrap/fileUpload/file-upload.html'
            );
  }]);