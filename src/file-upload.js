angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

            var fileUpload = function (name, schema, options) {
                if (schema.type === 'object' && schema.format == 'file') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'fileUpload';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(fileUpload);

            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'colorpicker',
                'directives/decorators/bootstrap/fileUpload/file-upload.html');
            schemaFormDecoratorsProvider.createDirective('fileUpload',
                'directives/decorators/bootstrap/fileUpload/file-upload.html');
  }]);