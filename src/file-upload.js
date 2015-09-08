angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {
            var fileUpload = function (name, schema, options) {
                if (schema.type === 'string' && schema.format === 'file') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'fileUpload';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
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

angular.module('schemaForm').directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        require: ['ngModel'],
        scope: false,
        link: function (scope, element, attrs, ngModelCtrl) {
            element.on('change', function (onChangeEvent) {
                var reader = new FileReader();
                reader.onload = function (onLoadEvent) {
                    // put into ngModel the file content.
                    ngModelCtrl[0].$setViewValue(onLoadEvent.target.result);
                    console.log(onLoadEvent.target);
                };
                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});