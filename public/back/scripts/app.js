'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular
  .module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngStorage',
    //'ngStore',
    'ui.router',
    'ui.utils',
    'ui.bootstrap',
    'ui.load',
    'ui.jp',
    'pascalprecht.translate',
    'oc.lazyLoad',
    'angular-loading-bar'
  ]);
'use strict';

/**
 * @ngdoc function
 * @name app.controller:AppCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */

angular.module('app')
    .factory('mainapp', ['$http', function ($http) {
        return {
            getusession: function () {
                return $http({
                    method: 'get',
                    url: '/api/v1/get-session-user',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest'}
                });
            }
        }
    }]);
angular.module('app')
    .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', '$document', '$location', '$rootScope', '$timeout', '$mdSidenav', '$mdColorPalette','mainapp', '$anchorScroll',
        function ($scope, $translate, $localStorage, $window, $document, $location, $rootScope, $timeout, $mdSidenav, $mdColorPalette,mainapp, $anchorScroll) {
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
            $rootScope.convertToRupiah = function (angka) {
                if (angka == null || angka == '') {
                    angka = 0;
                }
                var rupiah = '';
                var angkarev = angka.toString().split('').reverse().join('');
                for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
                return 'Rp ' + rupiah.split('', rupiah.length - 1).reverse().join('');
            };
            $rootScope.NoService = function (angka) {

                var angkarev = angka.toString()
                if (angkarev.length==1){
                    var no = "MDS00000" + angkarev;
                }
                if (angkarev.length==2){
                    var no = "MDS0000" + angkarev;
                }
                if (angkarev.length==3){
                    var no = "MDS000" + angkarev;
                }
                if (angkarev.length==4){
                    var no = "MDS00" + angkarev;
                }
                if (angkarev.length==5){
                    var no = "MDS0" + angkarev;
                }
                if (angkarev.length>=6){
                    var no = "MDS" + angkarev;
                }
                return no;
            };
            $rootScope.NoNota = function (angka) {
                var angkarev = angka.toString()
                if (angkarev.length==1){
                    var no = "MSP000" + angkarev;
                }
                if (angkarev.length==2){
                    var no = "MSP00" + angkarev;
                }
                if (angkarev.length==3){
                    var no = "MSP0" + angkarev;
                }
                if (angkarev.length>=4){
                    var no = "MSP" + angkarev;
                }
                return no;
            };
            $rootScope.daysFrom = function (date_in,date_out,status) {

                if (status == "CLOSE") {
                    var tanggal_masuk = date_in.split("-");
                    var tanggal_keluar = date_out.split("-");
                    var masuk = new Date(tanggal_masuk[0],tanggal_masuk[1]-1,tanggal_masuk[2]);
                    var keluar = new Date(tanggal_keluar[0],tanggal_keluar[1]-1,tanggal_keluar[2]);

                    return (Date.parse(keluar.toGMTString()) - Date.parse(masuk.toGMTString()))/(1000 * 60 * 60 * 24);

                }else{
                    var tanggal_masuk = date_in.split("-");
                    var sekarang = new Date();
                    var masuk = new Date(tanggal_masuk[0],tanggal_masuk[1]-1,tanggal_masuk[2]);

                    return Math.ceil((Date.parse(sekarang.toGMTString()) - Date.parse(masuk.toGMTString()))/(1000 * 60 * 60 * 24));

                }

            };

            // config
            $scope.app = {
                name: 'MDS',
                version: '1.0.2',
                // for chart colors
                color: {
                    primary: '#3f51b5',
                    info: '#2196f3',
                    success: '#4caf50',
                    warning: '#ffc107',
                    danger: '#f44336',
                    accent: '#7e57c2',
                    white: '#ffffff',
                    light: '#f1f2f3',
                    dark: '#475069'
                },
                setting: {
                    theme: {
                        primary: 'indigo',
                        accent: 'purple',
                        warn: 'amber'
                    },
                    asideFolded: false
                },
                search: {
                    content: '',
                    show: false
                }
            }
            $scope.dataUser = '';
            mainapp.getusession()
                .success(function (data) {
                    $scope.dataUser = data.result;
                })
                .error(function (data, status) {
                    if (status === 401) {
                        $scope.redirect();
                    }
                    console.log(data)
                });
            $scope.setTheme = function (theme) {
                $scope.app.setting.theme = theme;
            }

            // save settings to local storage
            if (angular.isDefined($localStorage.appSetting)) {
                $scope.app.setting = $localStorage.appSetting;
            } else {
                $localStorage.appSetting = $scope.app.setting;
            }
            $scope.$watch('app.setting', function () {
                $localStorage.appSetting = $scope.app.setting;
            }, true);

            // angular translate
            $scope.langs = {en: 'English', zh_CN: '中文'};
            $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
            $scope.setLang = function (langKey) {
                // set the current lang
                $scope.selectLang = $scope.langs[langKey];
                // You can change the language during runtime
                $translate.use(langKey);
            };

            function isSmartDevice($window) {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            };

            $scope.getColor = function (color, hue) {
                if (color == "bg-dark" || color == "bg-white") return $scope.app.color[color.substr(3, color.length)];
                return rgb2hex($mdColorPalette[color][hue]['value']);
            }

            //Function to convert hex format to a rgb color
            function rgb2hex(rgb) {
                return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
            }

            function hex(x) {
                var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
                return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
            }

            $rootScope.$on('$stateChangeSuccess', openPage);

            function openPage() {
                $scope.app.search.content = '';
                $scope.app.search.show = false;
                $scope.closeAside();
                // goto top
                $location.hash('view');
                $anchorScroll();
                $location.hash('');
            }

            $scope.goBack = function () {
                $window.history.back();
            }

            $scope.openAside = function () {
                $timeout(function () {
                    $mdSidenav('aside').open();
                });
            }

            $scope.closeAside = function () {
                $timeout(function () {
                    $document.find('#aside').length && $mdSidenav('aside').close();
                });
            }
            // redirect if unauthorized
            $scope.redirect = function () {
                window.location = "/api/v1/logout";
            };
            $scope.sup = function () {
                $("div, .ng-scope").animate({
                    scrollTop: 0
                }, "slow");
            };

// Set Error
            $scope.setErrors = function (data, status) {
                $scope.alertset = {
                    show: 'hide',
                    class: 'green',
                    msg: ''
                };

                $scope.showToast = function (warna, msg) {
                    $mdToast.show({
                        //controller: 'AkunToastCtrl',
                        template: "<md-toast class='" + warna + "-500'><span flex> " + msg + "</span></md-toast> ",
                        //templateUrl: 'views/ui/material/toast.tmpl.html',
                        hideDelay: 3000,
                        parent: '#toast',
                        position: 'top right'
                    });
                };
            };


        }
    ])

    .directive('ngFocus', function ($timeout) {
        return {
            link: function (scope, element, attrs) {
                scope.$watch(attrs.ngFocus, function (val) {
                    if (angular.isDefined(val) && val) {
                        $timeout(function () {
                            element[0].focus();
                        });
                    }
                }, true);

                element.bind('blur', function () {
                    if (angular.isDefined(attrs.ngFocusLost)) {
                        scope.$apply(attrs.ngFocusLost);

                    }
                });
            }
        };
    })
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
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
// lazyload config

angular.module('app')
    .constant('MODULE_CONFIG', [
            {
                name: 'ui.select',
                module: true,
                files: [
                    '../back/libs/angular/angular-ui-select/dist/select.min.js',
                    '../back/libs/angular/angular-ui-select/dist/select.min.css'
                ]
            },
            {
                name: 'textAngular',
                module: true,
                files: [
                    '../back/libs/angular/textAngular/dist/textAngular-sanitize.min.js',
                    '../back/libs/angular/textAngular/dist/textAngular.min.js'
                ]
            },
            {
                name: 'vr.directives.slider',
                module: true,
                files: [
                    '../back/libs/angular/venturocket-angular-slider/build/angular-slider.min.js',
                    '../back/libs/angular/venturocket-angular-slider/angular-slider.css'
                ]
            },
            {
                name: 'angularBootstrapNavTree',
                module: true,
                files: [
                    '../back/libs/angular/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                    '../back/libs/angular/angular-bootstrap-nav-tree/dist/abn_tree.css'
                ]
            },
            {
                name: 'angularFileUpload',
                module: true,
                files: [
                    '../back/libs/angular/angular-file-upload/angular-file-upload.js'
                ]
            },
            {
                name: 'ngImgCrop',
                module: true,
                files: [
                    '../back/libs/angular/ngImgCrop/compile/minified/ng-img-crop.js',
                    '../back/libs/angular/ngImgCrop/compile/minified/ng-img-crop.css'
                ]
            },
            {
                name: 'smart-table',
                module: true,
                files: [
                    '../back/libs/angular/angular-smart-table/dist/smart-table.min.js'
                ]
            },
            {
                name: 'ui.map',
                module: true,
                files: [
                    '../back/libs/angular/angular-ui-map/ui-map.js'
                ]
            },
            {
                name: 'ngGrid',
                module: true,
                files: [
                    '../back/libs/angular/ng-grid/build/ng-grid.min.js',
                    '../back/libs/angular/ng-grid/ng-grid.min.css',
                    '../back/libs/angular/ng-grid/ng-grid.bootstrap.css'
                ]
            },
            {
                name: 'ui.grid',
                module: true,
                files: [
                    '../back/libs/angular/angular-ui-grid/ui-grid.min.js',
                    '../back/libs/angular/angular-ui-grid/ui-grid.min.css',
                    '../back/libs/angular/angular-ui-grid/ui-grid.bootstrap.css'
                ]
            },
            {
                name: 'xeditable',
                module: true,
                files: [
                    '../back/libs/angular/angular-xeditable/dist/js/xeditable.min.js',
                    '../back/libs/angular/angular-xeditable/dist/css/xeditable.css'
                ]
            },
            {
                name: 'smart-table',
                module: true,
                files: [
                    '../back/libs/angular/angular-smart-table/dist/smart-table.min.js'
                ]
            },
            {
                name: 'dataTable',
                module: false,
                files: [
                    '../back/libs/jquery/datatables/media/js/jquery.dataTables.min.js',
                    '../back/libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
                    '../back/libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.css'
                ]
            },
            {
                name: 'footable',
                module: false,
                files: [
                    '../back/libs/jquery/footable/dist/footable.all.min.js',
                    '../back/libs/jquery/footable/css/footable.core.css'
                ]
            },
            {
                name: 'easyPieChart',
                module: false,
                files: [
                    '../back/libs/jquery/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'
                ]
            },
            {
                name: 'sparkline',
                module: false,
                files: [
                    '../back/libs/jquery/jquery.sparkline/dist/jquery.sparkline.retina.js'
                ]
            },
            {
                name: 'plot',
                module: false,
                files: [
                    '../back/libs/jquery/flot/jquery.flot.js',
                    '../back/libs/jquery/flot/jquery.flot.resize.js',
                    '../back/libs/jquery/flot/jquery.flot.pie.js',
                    '../back/libs/jquery/flot.tooltip/js/jquery.flot.tooltip.min.js',
                    '../back/libs/jquery/flot-spline/js/jquery.flot.spline.min.js',
                    '../back/libs/jquery/flot.orderbars/js/jquery.flot.orderBars.js'
                ]
            },
            {
                name: 'vectorMap',
                module: false,
                files: [
                    '../back/libs/jquery/bower-jvectormap/jquery-jvectormap-1.2.2.min.js',
                    '../back/libs/jquery/bower-jvectormap/jquery-jvectormap.css',
                    '../back/libs/jquery/bower-jvectormap/jquery-jvectormap-world-mill-.env.js',
                    '../back/libs/jquery/bower-jvectormap/jquery-jvectormap-us-aea-.env.js'
                ]
            },
            {
                name: 'moment',
                module: false,
                files: [
                    '../back/libs/jquery/moment/moment.js'
                ]
            }
        ]
    )
    .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: false,
            modules: MODULE_CONFIG
        });
    }]);
'use strict';

/**
 * 0.1.1
 * Deferred load js/css file, used for ui-jq.js and Lazy Loading.
 *
 * @ flatfull.com All Rights Reserved.
 * Author url: http://themeforest.net/user/flatfull
 */

angular.module('ui.load', [])
    .service('uiLoad', ['$document', '$q', '$timeout', function ($document, $q, $timeout) {

        var loaded = [];
        var promise = false;
        var deferred = $q.defer();

        /**
         * Chain loads the given sources
         * @param srcs array, script or css
         * @returns {*} Promise that will be resolved once the sources has been loaded.
         */
        this.load = function (srcs) {
            srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
            var self = this;
            if(!promise){
                promise = deferred.promise;
            }
            angular.forEach(srcs, function(src) {
                promise = promise.then( function(){
                    return src.indexOf('.css') >=0 ? self.loadCSS(src) : self.loadScript(src);
                } );
            });
            deferred.resolve();
            return promise;
        }

        /**
         * Dynamically loads the given script
         * @param src The url of the script to load dynamically
         * @returns {*} Promise that will be resolved once the script has been loaded.
         */
        this.loadScript = function (src) {
            if(loaded[src]) return loaded[src].promise;

            var deferred = $q.defer();
            var script = $document[0].createElement('script');
            script.src = src;
            script.onload = function (e) {
                $timeout(function () {
                    deferred.resolve(e);
                });
            };
            script.onerror = function (e) {
                $timeout(function () {
                    deferred.reject(e);
                });
            };
            $document[0].body.appendChild(script);
            loaded[src] = deferred;

            return deferred.promise;
        };

        /**
         * Dynamically loads the given CSS file
         * @param href The url of the CSS to load dynamically
         * @returns {*} Promise that will be resolved once the CSS file has been loaded.
         */
        this.loadCSS = function (href) {
            if(loaded[href]) return loaded[href].promise;

            var deferred = $q.defer();
            var style = $document[0].createElement('link');
            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = href;
            style.onload = function (e) {
                $timeout(function () {
                    deferred.resolve(e);
                });
            };
            style.onerror = function (e) {
                $timeout(function () {
                    deferred.reject(e);
                });
            };
            $document[0].head.appendChild(style);
            loaded[href] = deferred;

            return deferred.promise;
        };
    }]);
'use strict';

/* Filters */
// need load the moment.js to use this filter.
angular.module('app')
    .filter('fromNow', function() {
        return function(date) {
            return moment(date).fromNow();
        }
    });
'use strict';

/**
 * @ngdoc function
 * @name app.directive:uiFullscreen
 * @description
 * # uiFullscreen
 * Directive of the app
 */
angular.module('app')
    .directive('uiFullscreen', ['$ocLazyLoad', '$document', function($ocLazyLoad, $document) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {
                el.addClass('hide');
                $ocLazyLoad.load('../back/libs/jquery/screenfull/dist/screenfull.min.js').then(function(){
                    if (screenfull.enabled) {
                        el.removeClass('hide');
                    } else{
                        return;
                    }
                    el.bind('click', function(){
                        var target;
                        attr.target && ( target = angular.element(attr.target)[0] );
                        screenfull.toggle(target);
                    });

                    var body = angular.element($document[0].body);
                    $document.on(screenfull.raw.fullscreenchange, function () {
                        if(screenfull.isFullscreen){
                            body.addClass('fullscreen');
                        }else{
                            body.removeClass('fullscreen');
                        }
                    });
                });
            }
        };
    }]);
'use strict';

angular.module('ui.jp', ['oc.lazyLoad', 'ui.load']).
value('uiJpConfig', {}).
directive('uiJp', ['uiJpConfig', 'MODULE_CONFIG', 'uiLoad', '$timeout', function uiJpInjectingFunction(uiJpConfig, MODULE_CONFIG, uiLoad, $timeout) {

    return {
        restrict: 'A',
        compile: function uiJpCompilingFunction(tElm, tAttrs) {

            var options = uiJpConfig && uiJpConfig[tAttrs.uiJp];

            return function uiJpLinkingFunction(scope, elm, attrs) {

                function getOptions(){
                    var linkOptions = [];

                    // If ui-options are passed, merge (or override) them onto global defaults and pass to the jQuery method
                    if (attrs.uiOptions) {
                        linkOptions = scope.$eval('[' + attrs.uiOptions + ']');
                        if (angular.isObject(options) && angular.isObject(linkOptions[0])) {
                            linkOptions[0] = angular.extend({}, options, linkOptions[0]);
                        }
                    } else if (options) {
                        linkOptions = [options];
                    }
                    return linkOptions;
                }

                // If change compatibility is enabled, the form input's "change" event will trigger an "input" event
                if (attrs.ngModel && elm.is('select,input,textarea')) {
                    elm.bind('change', function() {
                        elm.trigger('input');
                    });
                }

                // Call jQuery method and pass relevant options
                function callPlugin() {
                    $timeout(function() {
                        $(elm)[attrs.uiJp].apply($(elm), getOptions());
                    }, 0, false);
                }

                function refresh(){
                    // If ui-refresh is used, re-fire the the method upon every change
                    if (attrs.uiRefresh) {
                        scope.$watch(attrs.uiRefresh, function() {
                            callPlugin();
                        });
                    }
                }

                var jp = false;
                angular.forEach(MODULE_CONFIG, function(module) {
                    if( module.name == attrs.uiJp){
                        jp = module.files;
                    }
                });

                if ( jp ) {
                    uiLoad.load(jp).then(function() {
                        callPlugin();
                        refresh();
                    }).catch(function() {

                    });
                } else {
                    callPlugin();
                    refresh();
                }
            };
        }
    };
}]);
'use strict';

/**
 * @ngdoc function
 * @name app.directive:uiNav
 * @description
 * # uiScroll
 * Directive of the app
 */
angular.module('app')
    .directive('uiNav', ['$timeout', function($timeout) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {
                el.find('a').bind('click', function(e) {
                    var li = angular.element(this).parent();
                    var active = li.parent()[0].querySelectorAll('.active');
                    li.toggleClass('active');
                    angular.element(active).removeClass('active');
                });
            }
        };
    }]);
'use strict';

/**
 * @ngdoc function
 * @name app.directive:uiScroll
 * @description
 * # uiScroll
 * Directive of the app
 */
angular.module('app')
    .directive('uiScroll', ['$location', '$anchorScroll', function($location, $anchorScroll) {
        return {
            restrict: 'AC',
            replace: true,
            link: function(scope, el, attr) {
                el.bind('click', function(e) {
                    $location.hash(attr.uiScroll);
                    $anchorScroll();
                });
            }
        };
    }]);
angular.module('app')
    .directive('uiToggleClass', ['$timeout', '$document', function($timeout, $document) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {
                el.on('click', function(e) {
                    e.preventDefault();
                    var classes = attr.uiToggleClass.split(','),
                        targets = (attr.target && attr.target.split(',')) || Array(el),
                        key = 0;
                    angular.forEach(classes, function( _class ) {
                        var target = targets[(targets.length && key)];
                        $( target ).toggleClass(_class);
                        key ++;
                    });
                    el.toggleClass('active');

                });
            }
        };
    }]);
'use strict';

/* Controllers */

// bootstrap controller
app.controller('AccordionDemoCtrl', ['$scope', function($scope) {
    $scope.oneAtATime = true;

    $scope.groups = [
        {
            title: 'Accordion group header - #1',
            content: 'Dynamic group body - #1'
        },
        {
            title: 'Accordion group header - #2',
            content: 'Dynamic group body - #2'
        }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
}])
;
app.controller('AlertDemoCtrl', ['$scope', function($scope) {
    $scope.alerts = [
        { type: 'success', msg: 'Well done! You successfully read this important alert message.' },
        { type: 'info', msg: 'Heads up! This alert needs your attention, but it is not super important.' },
        { type: 'warning', msg: 'Warning! Best check yo self, you are not looking too good...' }
    ];

    $scope.addAlert = function() {
        $scope.alerts.push({type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
}])
;
app.controller('ButtonsDemoCtrl', ['$scope', function($scope) {
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
        left: false,
        middle: true,
        right: false
    };
}])
;
app.controller('CarouselDemoCtrl', ['$scope', function($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
        slides.push({
            image: 'images/c' + slides.length + '.jpg',
            text: ['Carousel text #0','Carousel text #1','Carousel text #2','Carousel text #3'][slides.length % 4]
        });
    };
    for (var i=0; i<4; i++) {
        $scope.addSlide();
    }
}])
;
app.controller('DropdownDemoCtrl', ['$scope', function($scope) {
    $scope.items = [
        'The first choice!',
        'And another choice for you.',
        'but wait! A third!'
    ];

    $scope.status = {
        isopen: false
    };

    $scope.toggled = function(open) {
        //console.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
}])
;
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}])
;
app.controller('ModalDemoCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}])
;
app.controller('PaginationDemoCtrl', ['$scope', '$log', function($scope, $log) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        $log.info('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
}])
;
app.controller('PopoverDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicPopover = 'Hello, World!';
    $scope.dynamicPopoverTitle = 'Title';
}])
;
app.controller('ProgressDemoCtrl', ['$scope', function($scope) {
    $scope.max = 200;

    $scope.random = function() {
        var value = Math.floor((Math.random() * 100) + 1);
        var type;

        if (value < 25) {
            type = 'success';
        } else if (value < 50) {
            type = 'info';
        } else if (value < 75) {
            type = 'warning';
        } else {
            type = 'danger';
        }

        $scope.showWarning = (type === 'danger' || type === 'warning');

        $scope.dynamic = value;
        $scope.type = type;
    };
    $scope.random();

    $scope.randomStacked = function() {
        $scope.stacked = [];
        var types = ['success', 'info', 'warning', 'danger'];

        for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
            var index = Math.floor((Math.random() * 4));
            $scope.stacked.push({
                value: Math.floor((Math.random() * 30) + 1),
                type: types[index]
            });
        }
    };
    $scope.randomStacked();
}])
;
app.controller('TabsDemoCtrl', ['$scope', function($scope) {
    $scope.tabs = [
        { title:'Dynamic Title 1', content:'Dynamic content 1' },
        { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];
}])
;
app.controller('RatingDemoCtrl', ['$scope', function($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };
}])
;
app.controller('TooltipDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
}])
;
app.controller('TypeaheadDemoCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function(val) {
        return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false
            }
        }).then(function(res){
            var addresses = [];
            angular.forEach(res.data.results, function(item){
                addresses.push(item.formatted_address);
            });
            return addresses;
        });
    };
}])
;
app.controller('DatepickerDemoCtrl', ['$scope', function($scope) {
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
}])
;
app.controller('TimepickerDemoCtrl', ['$scope', function($scope) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
    };

    $scope.changed = function () {
        //console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
        $scope.mytime = null;
    };
}]);

app.directive('setNgAnimate', ['$animate', function ($animate) {
    return {
        link: function ($scope, $element, $attrs) {
            $scope.$watch( function() {
                return $scope.$eval($attrs.setNgAnimate, $scope);
            }, function(valnew, valold){
                $animate.enabled(!!valnew, $element);
            });
        }
    };
}]);



