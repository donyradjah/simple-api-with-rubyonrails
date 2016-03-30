// config

var app =
    angular.module('app')
        .config(
            ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
                function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

                    // lazy controller, directive and service
                    app.controller = $controllerProvider.register;
                    app.directive = $compileProvider.directive;
                    app.filter = $filterProvider.register;
                    app.factory = $provide.factory;
                    app.service = $provide.service;
                    app.constant = $provide.constant;
                    app.value = $provide.value;
                }
            ])
        .config(function ($httpProvider) {
            $httpProvider.defaults.headers.post = {
                "X-Requested-With": "XMLHttpRequest",
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-XSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            };
            $httpProvider.defaults.headers.put = {
                "X-Requested-With": "XMLHttpRequest",
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-XSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            };
            $httpProvider.defaults.headers.get = {
                "X-Requested-With": "XMLHttpRequest",
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            $httpProvider.defaults.headers.delete = {
                "X-Requested-With": "XMLHttpRequest",
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-XSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            };
        })
        .config(['$translateProvider', function ($translateProvider) {
            // Register a loader for the static files
            // So, the module will search missing translation tables under the specified urls.
            // Those urls are [prefix][langKey][suffix].
            $translateProvider.useStaticFilesLoader({
                prefix: 'back/i18n/',
                suffix: '.js'
            });
            // Tell the module what language to use by default
            $translateProvider.preferredLanguage('en');
            // Tell the module to store the language in the local storage
            $translateProvider.useLocalStorage();
        }]);
