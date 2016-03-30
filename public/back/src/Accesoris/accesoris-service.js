/**
 * Created by Dony on 12/15/2015.
 */
app.factory('Accesoris', ['$http', function ($http) {

    return {

        // get data dengan pagination dan pencarian data
        get: function (page, term) {
            return $http({
                method: 'get',
                url: '/api/v1/accesoris?page=' + page + '&term=' + term
            });
        },
        //Simpan data
        store: function (inputData) {
            return $http({
                method: 'POST',
                url: '/api/v1/accesoris',
                data: $.param(inputData)
            });
        },
        show: function (id) {
            return $http({
                method: 'get',
                url: '/api/v1/accesoris/' + id
            });
        },
        destroy: function (id) {
            return $http({
                method: 'delete',
                url: '/api/v1/accesoris/' + id
            });
        },
        update: function (inputData) {
            return $http({
                method: 'PUT',
                url: '/api/v1/accesoris/' + inputData.id,
                data: $.param(inputData)
            });
        },

    }
}]);
