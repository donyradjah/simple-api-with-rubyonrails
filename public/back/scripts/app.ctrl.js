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