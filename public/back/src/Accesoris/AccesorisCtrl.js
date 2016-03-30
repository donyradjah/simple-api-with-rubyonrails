/**
 * Created by Dony on 12/15/2015.
 */
app.controller('AccesorisToastCtrl', function ($scope, $mdToast) {
    $scope.closeToast = function () {
        $mdToast.hide();
    };

});
app.controller('AccesorisCtrl', ['$scope', 'Accesoris', '$mdDialog', '$mdToast', '$http', '$timeout', function ($scope, Accesoris, $mdDialog, $mdToast) {
    $scope.main = {
        page: 1,
        term: ''
    };

    $scope.isLoading = true;
    $scope.isLoaded = false;

    $scope.setLoader = function (status) {
        if (status == true) {
            $scope.isLoading = true;
            $scope.isLoaded = false;
        } else {
            $scope.isLoading = false;
            $scope.isLoaded = true;
        }
    };

    //Init Alert status
    $scope.alertset = {
        show: 'hide',
        class: 'green',
        msg: ''
    };

    //refreshData
    $scope.refreshData = function () {
        $scope.main.page = 1;
        $scope.main.term = '';
        $scope.getData();
    };

    //Init dataService
    $scope.dataService = '';

    // init get data
    Accesoris.get($scope.main.page, $scope.main.term)
        .success(function (data) {

            //Change Loading status
            $scope.setLoader(false);

            // result data
            $scope.dataHargaService = data.data;
            // set the current page
            $scope.current_page = data.current_page;

            // set the last page
            $scope.last_page = data.last_page;

            // set the data from
            $scope.from = data.from;

            // set the data until to
            $scope.to = data.to;

            // set the total result data
            $scope.total = data.total;
        })
        .error(function (data, status) {
            // unauthorized
            if (status === 401) {
                //redirect to login
                $scope.redirect();
            }
            console.log(data);
        });

    // get data
    $scope.getData = function () {

        //Start loading
        $scope.setLoader(true);

        Accesoris.get($scope.main.page, $scope.main.term)
            .success(function (data) {

                //Stop loading
                $scope.setLoader(false);

                // result data
                $scope.dataHargaService = data.data;

                // set the current page
                $scope.current_page = data.current_page;

                // set the last page
                $scope.last_page = data.last_page;

                // set the data from
                $scope.from = data.from;

                // set the data until to
                $scope.to = data.to;

                // set the total result data
                $scope.total = data.total;
            })
            .error(function (data, status) {
                // unauthorized
                if (status === 401) {
                    //redirect to login
                    $scope.redirect();
                }
                console.log(data);
            });
    };

    // Navigasi halaman terakhir
    $scope.lastPage = function () {
        //Disable All Controller
        $scope.main.page = $scope.last_page;
        $scope.getData();
    };

    // Navigasi halaman selanjutnya
    $scope.nextPage = function () {
        // jika page = 1 < halaman terakhir
        if ($scope.main.page < $scope.last_page) {
            // halaman saat ini ditambah increment++
            $scope.main.page++
        }
        // panggil ajax data
        $scope.getData();
    };

    // Navigasi halaman sebelumnya
    $scope.previousPage = function () {
        //Disable All Controller

        // jika page = 1 > 1
        if ($scope.main.page > 1) {
            // page dikurangi decrement --
            $scope.main.page--
        }
        // panggil ajax data
        $scope.getData();
    };

    // Navigasi halaman pertama
    $scope.firstPage = function () {
        //Disable All Controller

        $scope.main.page = 1;

        $scope.getData()
    };


    $scope.hapus = function (id) {
        var confirm = $mdDialog.confirm()
            .title('Konfirmasi')
            .content('Apakah Anda yakin ingin menghapus data?')
            .ok('Hapus')
            .cancel('Batal')
            .targetEvent(id);
        //
        $mdDialog.show(confirm).then(function () {
            Accesoris.destroy(id)
                .success(function (data) {
                    if (data.success == true) {
                        $scope.showToast('green', 'Data Berhasil Dihapus');
                    } else {
                        $scope.showToast('red', 'Data Gagal Dihapus');
                    }
                    $scope.getData();
                })

        }, function () {

        });
    };

    //Alert
    $scope.showToast = function (warna, msg) {
        $mdToast.show({
            //controller: 'KelompokToastCtrl',
            template: "<md-toast class='" + warna + "-500'><span flex> " + msg + "</span></md-toast> ",
            //templateUrl: 'views/ui/material/toast.tmpl.html',
            hideDelay: 3000,
            parent: '#toast',
            position: 'top right'
        });
    };


}]);
app.controller('AccesorisCreateCtrl', ['$state', '$scope', 'Accesoris', '$mdToast', '$http', function ($state, $scope, Accesoris, $mdToast) {
    //Init input form variable
    $scope.isFocused = true;
    $scope.input = {};
    $scope.loadUptd = true;
    //Set process status to false
    $scope.process = false;

    $scope.isLoading = true;
    $scope.isLoaded = false;

    $scope.setLoader = function (status) {
        if (status == true) {
            $scope.isLoading = true;
            $scope.isLoaded = false;
        } else {
            $scope.isLoading = false;
            $scope.isLoaded = true;
        }
    };

    $scope.setLoader(false);

    //Init Alert status
    $scope.alertset = {
        show: 'hide',
        class: 'green',
        msg: ''
    };

    //Function to clear input
    $scope.clearInput = function () {
        $scope.input.name = '';


    };


    //Submit Data
    $scope.submitData = function (isBack) {

        //Set process status
        $scope.process = true;

        //Close Alert
        $scope.alertset.show = 'hide';

        //Check validation status
        if ($scope.addForm.$valid) {
            //run Ajax
            Accesoris.store($scope.input)
                .success(function (data) {
                    if (data.success == true) {
                        //If back to list after submitting
                        if (isBack == true) {
                            //$scope.alertset.class = 'green';
                            //Redirect to akun
                            $state.go('app.accesoris');
                            $scope.showToast('green', 'Data Berhasil Disimpan');
                        } else {
                            $scope.sup();
                            $scope.alertset.msg = 'Data Berhasil Disimpan';
                            $scope.alertset.show = 'show';
                            $scope.alertset.class = 'green';
                            $scope.process = false;
                            $scope.showToast('green', 'Data Berhasil Disimpan');
                        }
                        //Clear Input
                        $scope.clearInput();
                    } else {
                        $scope.process = false;
                        //$scope.alertset.class = 'orange';
                        $scope.showToast('red', 'Data Gagal Disimpan');
                        $scope.alertset.class = 'red';
                    }
                    //Set Alert message
                    $scope.alertset.show = 'show';
                    $scope.alertset.msg = data.result;

                })
                .error(function (data, status) {
                    // unauthorized
                    if (status === 401) {
                        //redirect to login
                        $scope.redirect();
                    }
                    $scope.sup();
                    // Stop Loading
                    $scope.process = false;
                    $scope.alertset.msg = data.validation;
                    $scope.alertset.show = 'show';
                    $scope.showToast('red', 'Data Gagal Disimpan');
                    $scope.alertset.class = 'red';
                });
        }
    };

    //Alert
    $scope.showToast = function (warna, msg) {
        $mdToast.show({
            //controller: 'AkunToastCtrl',
            template: "<md-toast class='" + warna + "-500'><span flex> " + msg + "</span></md-toast> ",
            //templateUrl: 'views/ui/material/toast.tmpl.html',
            hideDelay: 6000,
            parent: '#toast',
            position: 'top right'
        });
    };


}]);
app.controller('AccesorisEditCtrl', ['$state', '$scope', 'Accesoris', '$mdToast', '$stateParams', function ($state, $scope, Accesoris, $mdToast, $stateParams) {
    $scope.id = $scope.$stateParams.id;
    //If Id is empty, then redirected
    if ($scope.id == null || $scope.id == '') {
        $state.go("app.teknisi")
    }

    $scope.isLoading = true;
    $scope.isLoaded = false;
    $scope.loadKoderekening = true;

    $scope.setLoader = function (status) {
        if (status == true) {
            $scope.isLoading = true;
            $scope.isLoaded = false;
        } else {
            $scope.isLoading = false;
            $scope.isLoaded = true;
        }
    };

    //Init input form variable
    $scope.input = {};
    $scope.loadUptd = true;
    //Set process status to false
    $scope.process = false;

    //Init Alert status
    $scope.alertset = {
        show: 'hide',
        class: 'green',
        msg: ''
    };
    //Run Ajax
    Accesoris.show($scope.id)
        .success(function (data) {
            $scope.setLoader(false);
            $scope.input.id = data.id;
            $scope.input.name = data.name;

        })
        .error(function (data, status) {
            // unauthorized
            if (status === 401) {
                //redirect to login
                $scope.redirect();
            }
            // Stop Loading
            console.log(data);

        });

    $scope.showToast = function (warna, msg) {
        $mdToast.show({
            //controller: 'AkunToastCtrl',
            template: "<md-toast class='" + warna + "-500'><span flex> " + msg + "</span></md-toast> ",
            //templateUrl: 'views/ui/material/toast.tmpl.html',
            hideDelay: 6000,
            parent: '#toast',
            position: 'top right'
        });
    };
    //Submit Data
    $scope.updateData = function () {

        //Set process status
        $scope.process = true;

        //Close Alert
        $scope.alertset.show = 'hide';

        //Check validation status
        if ($scope.editForm.$valid) {

            //run Ajax
            Accesoris.update($scope.input)
                .success(function (data) {
                    if (data.success == true) {
                        //If back to list after submitting
                        if (isBack = true) {
                            //Redirect to akun
                            $state.go('app.accesoris');
                            $scope.showToast('green', 'Data Berhasil Di Edit');
                        }
                    } else {
                        $scope.process = false;
                        //$scope.alertset.class = 'orange';
                        $scope.showToast('red', 'Data Gagal Di Edit');
                        $scope.alertset.class = 'red';
                    }
                    //Set Alert message
                    $scope.alertset.show = '';
                    $scope.alertset.msg = data.result;

                })
                .error(function (data, status) {
                    // unauthorized
                    if (status === 401) {
                        //redirect to login
                        $scope.redirect();
                    }
                    $scope.sup();
                    // Stop Loading
                    $scope.process = false;
                    $scope.alertset.msg = data.validation;
                    $scope.alertset.show = 'show';
                    $scope.showToast('red', 'Data Gagal Disimpan');
                    $scope.alertset.class = 'red';
                });
        }
    };
    function findWithAttr(array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
    }
}]);