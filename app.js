/*global angular */

/**
 * The main app module
 * @name app
 * @type {angular.Module}
 */
var app = angular.module('app', ['schemaForm'])
    .controller('UploadController', function ($scope, $rootScope) {
        'use strict';
        $scope.schema = {
            type: 'object',
            title: 'Upload',
            properties: {
                "name": {
                    title: 'Nombre',
                    type: 'string'
                },
                "archivo": {
                    "title": 'Archivo',
                    "type": 'string',
                    "format": 'file',
                    "description": 'This is a upload element'
                }
            }
        };
        $scope.model = {};
        $scope.form = [
            "name",
            {
                "key": "archivo",
                "type": "fileUpload",
                "options": {
                    onReadFn: "showContent"
                }
            },
            {
                type: "submit",
                title: "Save"
            }
        ];

        $scope.onSubmit = function (form){
            console.log(form);
        };
        
        $scope.showContent = function (fileContent) {
            $scope.model['archivo'] = fileContent;
            console.log($scope.model);
        };

    });