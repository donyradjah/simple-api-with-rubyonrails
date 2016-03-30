'use strict';

/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
angular.module('app')
    .run(
        [           '$rootScope', '$state', '$stateParams',
          function ( $rootScope,   $state,   $stateParams ) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
          }
        ]
    )
    .config(
        [          '$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG',
          function ( $stateProvider,   $urlRouterProvider,  MODULE_CONFIG ) {
            $urlRouterProvider
                .otherwise('/app/dashboard');
            $stateProvider
                .state('app', {
                  abstract: true,
                  url: '/app',
                  views: {
                    '': {
                      templateUrl: 'back/views/layout.html'
                    },
                    'aside': {
                      templateUrl: 'back/views/aside.html'
                    },
                    'content': {
                      templateUrl: 'back/views/content.html'
                    }
                  }
                })
                .state('app.dashboard', {
                  url: '/dashboard',
                  templateUrl: 'back/views/pages/dashboard.html',
                  data : { title: 'Dashboard', folded: true },
                  resolve: load(['back/scripts/controllers/chart.js','back/scripts/controllers/vectormap.js'])
                })
                .state('app.analysis', {
                  url: '/analysis',
                  templateUrl: 'back/views/pages/dashboard.analysis.html',
                  data : { title: 'Analysis' },
                  resolve: load(['back/scripts/controllers/chart.js','back/scripts/controllers/vectormap.js'])
                })
                // service
                .state('app.service', {
                  url: '/service',
                  templateUrl: 'back/src/Service/service-list.html',
                  data : { title: 'Service' },
                  controller: 'ServiceCtrl',
                  resolve: load(['back/src/Service/service-service.js', 'back/src/Service/ServiceCtrl.js'])
                })
                .state('app.service-admin', {
                  url: '/service-admin',
                  templateUrl: 'back/src/Service/service-list-admin.html',
                  data : { title: 'Service' },
                  controller: 'ServiceCtrl',
                  resolve: load(['back/src/Service/service-service.js', 'back/src/Service/ServiceCtrl.js'])
                })

                .state('app.service-create', {
                  url: '/service-create',
                  templateUrl: 'back/src/Service/service-create.html',
                  data : { title: 'Create Service' },
                  controller: 'ServiceCreateCtrl',
                  resolve: load(['back/src/Service/service-service.js', 'back/src/Service/ServiceCtrl.js'])
                })
                .state('app.service-pending-create', {
                  url: '/service-pending-create',
                  templateUrl: 'back/src/Service/service-pending-create.html',
                  data : { title: 'Create Service' },
                  controller: 'ServicePendingCreateCtrl',
                  resolve: load(['ui.select' ,'back/src/Service/service-service.js', 'back/src/Service/ServiceCtrl.js'])
                })
                .state('app.service-edit', {
                  url: '/service-edit/:id',
                  templateUrl: 'back/src/Service/service-edit.html',
                  data : { title: 'Edit Service' },
                  controller: 'ServiceEditCtrl',
                  resolve: load(['ui.select' ,'back/src/Service/service-service.js', 'back/src/Service/ServiceCtrl.js'])
                })
                .state('app.teknisi', {
                  url: '/teknisi',
                  templateUrl: 'back/src/Teknisi/teknisi-list.html',
                  data : { title: 'Teknisi' },
                  controller: 'TeknisiCtrl',
                  resolve: load(['back/src/Teknisi/teknisi-service.js', 'back/src/Teknisi/TeknisiCtrl.js'])
                })

                .state('app.teknisi-create', {
                  url: '/teknisi-create',
                  templateUrl: 'back/src/Teknisi/teknisi-create.html',
                  data : { title: 'Create Teknisi' },
                  controller: 'TeknisiCreateCtrl',
                  resolve: load(['back/src/Teknisi/teknisi-service.js', 'back/src/Teknisi/TeknisiCtrl.js'])
                })
                .state('app.teknisi-edit', {
                  url: '/teknisi-edit/:id',
                  templateUrl: 'back/src/Teknisi/teknisi-edit.html',
                  data : { title: 'Edit Teknisi' },
                  controller: 'TeknisiEditCtrl',
                  resolve: load(['back/src/Teknisi/teknisi-service.js', 'back/src/Teknisi/TeknisiCtrl.js'])
                })
                .state('app.accesoris', {
                  url: '/accesoris',
                  templateUrl: 'back/src/Accesoris/accesoris-list.html',
                  data : { title: 'Accesoris' },
                  controller: 'AccesorisCtrl',
                  resolve: load(['back/src/Accesoris/accesoris-service.js', 'back/src/Accesoris/AccesorisCtrl.js'])
                })

                .state('app.accesoris-create', {
                  url: '/accesoris-create',
                  templateUrl: 'back/src/Accesoris/accesoris-create.html',
                  data : { title: 'Create Accesoris' },
                  controller: 'AccesorisCreateCtrl',
                  resolve: load(['back/src/Accesoris/accesoris-service.js', 'back/src/Accesoris/AccesorisCtrl.js'])
                })
                .state('app.accesoris-edit', {
                  url: '/accesoris-edit/:id',
                  templateUrl: 'back/src/Accesoris/accesoris-edit.html',
                  data : { title: 'Edit Accesoris' },
                  controller: 'AccesorisEditCtrl',
                  resolve: load(['back/src/Accesoris/accesoris-service.js', 'back/src/Accesoris/AccesorisCtrl.js'])
                })
                .state('app.nota', {
                  url: '/nota',
                  templateUrl: 'back/src/Nota/nota-list.html',
                  data : { title: 'Nota' },
                  controller: 'NotaCtrl',
                  resolve: load(['back/src/Nota/nota-service.js', 'back/src/Nota/NotaCtrl.js'])
                })
                .state('app.sparepart-nota', {
                  url: '/sparepart-nota/:id',
                  templateUrl: 'back/src/Nota/sparepart-list.html',
                  data : { title: 'Nota' },
                  controller: 'NotaSparepartCtrl',
                  resolve: load(['back/src/Nota/nota-service.js', 'back/src/Nota/NotaCtrl.js'])
                })
                .state('app.sparepart-create-nota', {
                  url: '/sparepart-create-nota/:id',
                  templateUrl: 'back/src/Nota/sparepart-create.html',
                  data : { title: 'Nota' },
                  controller: 'NotaSparepartCreateCtrl',
                  resolve: load(['back/src/Nota/nota-service.js', 'back/src/Nota/NotaCtrl.js'])
                })

                .state('app.nota-create', {
                  url: '/nota-create',
                  templateUrl: 'back/src/Nota/nota-create.html',
                  data : { title: 'Create Nota' },
                  controller: 'NotaCreateCtrl',
                  resolve: load(['back/src/Nota/nota-service.js', 'back/src/Nota/NotaCtrl.js'])
                })
                .state('app.nota-edit', {
                  url: '/nota-edit/:id',
                  templateUrl: 'back/src/Nota/nota-edit.html',
                  data : { title: 'Edit Nota' },
                  controller: 'NotaEditCtrl',
                  resolve: load(['back/src/Nota/nota-service.js', 'back/src/Nota/NotaCtrl.js'])
                })
                .state('app.merk', {
                  url: '/merk',
                  templateUrl: 'back/src/Merk/merk-list.html',
                  data : { title: 'merk' },
                  controller: 'MerkCtrl',
                  resolve: load(['back/src/Merk/merk-service.js', 'back/src/Merk/MerkCtrl.js'])
                })

                .state('app.merk-create', {
                  url: '/merk-create',
                  templateUrl: 'back/src/Merk/merk-create.html',
                  data : { title: 'Create Merk' },
                  controller: 'MerkCreateCtrl',
                  resolve: load(['back/src/Merk/merk-service.js', 'back/src/Merk/MerkCtrl.js'])
                })
                .state('app.merk-edit', {
                  url: '/merk-edit/:id',
                  templateUrl: 'back/src/Merk/merk-edit.html',
                  data : { title: 'Edit Merk' },
                  controller: 'MerkEditCtrl',
                  resolve: load(['back/src/Merk/merk-service.js', 'back/src/Merk/MerkCtrl.js'])
                })
                .state('app.office', {
                  url: '/office',
                  templateUrl: 'back/src/Office/office-list.html',
                  data : { title: 'Office' },
                  controller: 'OfficeCtrl',
                  resolve: load(['back/src/Office/office-service.js', 'back/src/Office/OfficeCtrl.js'])
                })

                .state('app.office-create', {
                  url: '/office-create',
                  templateUrl: 'back/src/Office/office-create.html',
                  data : { title: 'Create Office' },
                  controller: 'OfficeCreateCtrl',
                  resolve: load(['back/src/Office/office-service.js', 'back/src/Office/OfficeCtrl.js'])
                })
                .state('app.office-edit', {
                  url: '/office-edit/:id',
                  templateUrl: 'back/src/Office/office-edit.html',
                  data : { title: 'Edit Office' },
                  controller: 'OfficeEditCtrl',
                  resolve: load(['back/src/Office/office-service.js', 'back/src/Office/OfficeCtrl.js'])
                })
                //laporan keuangan
                .state('app.laporan-keuangan', {
                  url: '/laporan-keuangan',
                  templateUrl: 'back/src/LaporanKeuangan/laporan-keuangan-list.html',
                  data : { title: 'Laporan Keuangan' },
                  controller: 'LaporanKeuanganCtrl',
                  resolve: load(['back/src/LaporanKeuangan/laporan-keuangan-service.js', 'back/src/LaporanKeuangan/LaporanKeuanganCtrl.js'])
                })
                // haragaservice
                .state('app.harga-service', {
                  url: '/harga-service',
                  templateUrl: 'back/src/HargaService/harga-service-list.html',
                  data : { title: 'Harga Service' },
                  controller: 'HargaServiceCtrl',
                  resolve: load(['back/src/HargaService/harga-service-service.js', 'back/src/HargaService/HargaServiceCtrl.js'])
                })
                .state('app.harga-service-create', {
                  url: '/harga-service-create',
                  templateUrl: 'back/src/HargaService/harga-service-create.html',
                  data : { title: 'Harga Service' },
                  controller: 'HargaServiceCreateCtrl',
                  resolve: load(['back/src/HargaService/harga-service-service.js', 'back/src/HargaService/HargaServiceCtrl.js'])
                })
                .state('app.harga-service-edit', {
                  url: '/harga-service-edit/:id',
                  templateUrl: 'back/src/HargaService/harga-service-edit.html',
                  data : { title: 'Harga Service' },
                  controller: 'HargaServiceEditCtrl',
                  resolve: load(['back/src/HargaService/harga-service-service.js', 'back/src/HargaService/HargaServiceCtrl.js'])
                })
                //Sparepart
                .state('app.sparepart', {
                  url: '/sparepart',
                  templateUrl: 'back/src/Sparepart/sparepart-list.html',
                  data : { title: 'Sparepart' },
                  controller: 'SparepartCtrl',
                  resolve: load(['back/src/Sparepart/sparepart-service.js', 'back/src/Sparepart/SparepartCtrl.js'])
                })
                .state('app.sparepart-create', {
                  url: '/sparepart-create',
                  templateUrl: 'back/src/Sparepart/sparepart-create.html',
                  data : { title: 'Sparepart Create' },
                  controller: 'SparepartCreateCtrl',
                  resolve: load(['back/src/Sparepart/sparepart-service.js', 'back/src/Sparepart/SparepartCtrl.js'])
                })
                .state('app.sparepart-edit', {
                  url: '/sparepart-edit/:id',
                  templateUrl: 'back/src/Sparepart/sparepart-edit.html',
                  data : { title: 'Sparepart Edit' },
                  controller: 'SparepartEditCtrl',
                  resolve: load(['back/src/Sparepart/sparepart-service.js', 'back/src/Sparepart/SparepartCtrl.js'])
                })
                //User
                .state('app.user', {
                  url: '/user',
                  templateUrl: 'back/src/Master/user-list.html',
                  data : { title: 'Data User' },
                  controller: 'UserCtrl',
                  resolve: load(['back/src/Master/user-service.js', 'back/src/Master/UserCtrl.js'])
                })
                .state('app.user-create', {
                  url: '/user-create',
                  templateUrl: 'back/src/Master/user-create.html',
                  data : { title: 'Create User' },
                  controller: 'UserCreateCtrl',
                  resolve: load(['back/src/Master/user-service.js', 'back/src/Master/UserCtrl.js'])
                })
                .state('app.user-edit', {
                  url: '/user-edit/:id',
                  templateUrl: 'back/src/Master/user-edit.html',
                  data : { title: 'Edit User' },
                  controller: 'UserEditCtrl',
                  resolve: load(['back/src/Master/user-service.js', 'back/src/Master/UserCtrl.js'])
                })
                //Users Edit Password
                .state('app.user-ganti-password', {
                  url: '/user-edit-password',
                  templateUrl: 'back/src/Master/user-ganti-password.html',
                  data: {title: 'Edit Ganti Password'},
                  controller: 'UserGantipasswordCtrl',
                  resolve: load(['back/src/Master/user-service.js', 'back/src/Master/UserCtrl.js'])
                })

                .state('app.wall', {
                  url: '/wall',
                  templateUrl: 'back/views/pages/dashboard.wall.html',
                  data : { title: 'Wall', folded: true }
                })
                .state('app.todo', {
                  url: '/todo',
                  templateUrl: 'apps/todo/todo.html',
                  data : { title: 'Todo', theme: { primary: 'indigo-800'} },
                  controller: 'TodoCtrl',
                  resolve: load('apps/todo/todo.js')
                })
                .state('app.todo.list', {
                  url: '/{fold}'
                })
                .state('app.note', {
                  url: '/note',
                  templateUrl: 'apps/note/main.html',
                  data : { theme: { primary: 'blue-grey'} }
                })
                .state('app.note.list', {
                  url: '/list',
                  templateUrl: 'apps/note/list.html',
                  data : { title: 'Note'},
                  controller: 'NoteCtrl',
                  resolve: load(['apps/note/note.js', 'moment'])
                })
                .state('app.note.item', {
                  url: '/{id}',
                  views: {
                    '': {
                      templateUrl: 'apps/note/item.html',
                      controller: 'NoteItemCtrl',
                      resolve: load(['apps/note/note.js', 'moment'])
                    },
                    'navbar@': {
                      templateUrl: 'apps/note/navbar.html',
                      controller: 'NoteItemCtrl'
                    }
                  },
                  data : { title: '', child: true }
                })
                .state('app.inbox', {
                  url: '/inbox',
                  templateUrl: 'apps/inbox/inbox.html',
                  data : { title: 'Inbox', folded: true },
                  resolve: load( ['apps/inbox/inbox.js','moment'] )
                })
                .state('app.inbox.list', {
                  url: '/inbox/{fold}',
                  templateUrl: 'apps/inbox/list.html'
                })
                .state('app.inbox.detail', {
                  url: '/{id:[0-9]{1,4}}',
                  templateUrl: 'apps/inbox/detail.html'
                })
                .state('app.inbox.compose', {
                  url: '/compose',
                  templateUrl: 'apps/inbox/new.html',
                  resolve: load( ['textAngular', 'ui.select'] )
                })
                .state('ui', {
                  url: '/ui',
                  abstract: true,
                  views: {
                    '': {
                      templateUrl: 'back/views/layout.html'
                    },
                    'aside': {
                      templateUrl: 'back/views/aside.html'
                    },
                    'content': {
                      templateUrl: 'back/views/content.html'
                    }
                  }
                })
                // components router
                .state('ui.component', {
                  url: '/component',
                  abstract: true,
                  template: '<div ui-view></div>'
                })
                .state('ui.component.arrow', {
                  url: '/arrow',
                  templateUrl: 'back/views/ui/component/arrow.html',
                  data : { title: 'Arrows' }
                })
                .state('ui.component.badge-label', {
                  url: '/badge-label',
                  templateUrl: 'back/views/ui/component/badge-label.html',
                  data : { title: 'Badges & Labels' }
                })
                .state('ui.component.button', {
                  url: '/button',
                  templateUrl: 'back/views/ui/component/button.html',
                  data : { title: 'Buttons' }
                })
                .state('ui.component.color', {
                  url: '/color',
                  templateUrl: 'back/views/ui/component/color.html',
                  data : { title: 'Colors' }
                })
                .state('ui.component.grid', {
                  url: '/grid',
                  templateUrl: 'back/views/ui/component/grid.html',
                  data : { title: 'Grids' }
                })
                .state('ui.component.icon', {
                  url: '/icons',
                  templateUrl: 'back/views/ui/component/icon.html',
                  data : { title: 'Icons' }
                })
                .state('ui.component.list', {
                  url: '/list',
                  templateUrl: 'back/views/ui/component/list.html',
                  data : { title: 'Lists' }
                })
                .state('ui.component.nav', {
                  url: '/nav',
                  templateUrl: 'back/views/ui/component/nav.html',
                  data : { title: 'Navs' }
                })
                .state('ui.component.progressbar', {
                  url: '/progressbar',
                  templateUrl: 'back/views/ui/component/progressbar.html',
                  data : { title: 'Progressbars' }
                })
                .state('ui.component.streamline', {
                  url: '/streamline',
                  templateUrl: 'back/views/ui/component/streamline.html',
                  data : { title: 'Streamlines' }
                })
                .state('ui.component.timeline', {
                  url: '/timeline',
                  templateUrl: 'back/views/ui/component/timeline.html',
                  data : { title: 'Timelines' }
                })
                .state('ui.component.uibootstrap', {
                  url: '/uibootstrap',
                  templateUrl: 'back/views/ui/component/uibootstrap.html',
                  resolve: load('back/scripts/controllers/bootstrap.js'),
                  data : { title: 'UI Bootstrap' }
                })
                // material routers
                .state('ui.material', {
                  url: '/material',
                  template: '<div ui-view></div>',
                  resolve: load('back/scripts/controllers/material.js')
                })
                .state('ui.material.button', {
                  url: '/button',
                  templateUrl: 'back/views/ui/material/button.html',
                  data : { title: 'Buttons' }
                })
                .state('ui.material.color', {
                  url: '/color',
                  templateUrl: 'back/views/ui/material/color.html',
                  data : { title: 'Colors' }
                })
                .state('ui.material.icon', {
                  url: '/icon',
                  templateUrl: 'back/views/ui/material/icon.html',
                  data : { title: 'Icons' }
                })
                .state('ui.material.card', {
                  url: '/card',
                  templateUrl: 'back/views/ui/material/card.html',
                  data : { title: 'Card' }
                })
                .state('ui.material.form', {
                  url: '/form',
                  templateUrl: 'back/views/ui/material/form.html',
                  data : { title: 'Form' }
                })
                .state('ui.material.list', {
                  url: '/list',
                  templateUrl: 'back/views/ui/material/list.html',
                  data : { title: 'List' }
                })
                .state('ui.material.ngmaterial', {
                  url: '/ngmaterial',
                  templateUrl: 'back/views/ui/material/ngmaterial.html',
                  data : { title: 'NG Material' }
                })
                // form routers
                .state('ui.form', {
                  url: '/form',
                  template: '<div ui-view></div>'
                })
                .state('ui.form.layout', {
                  url: '/layout',
                  templateUrl: 'back/views/ui/form/layout.html',
                  data : { title: 'Layouts' }
                })
                .state('ui.form.element', {
                  url: '/element',
                  templateUrl: 'back/views/ui/form/element.html',
                  data : { title: 'Elements' }
                })
                .state('ui.form.validation', {
                  url: '/validation',
                  templateUrl: 'back/views/ui/form/validation.html',
                  data : { title: 'Validations' }
                })
                .state('ui.form.select', {
                  url: '/select',
                  templateUrl: 'back/views/ui/form/select.html',
                  data : { title: 'Selects' },
                  controller: 'SelectCtrl',
                  resolve: load(['ui.select','back/scripts/controllers/select.js'])
                })
                .state('ui.form.editor', {
                  url: '/editor',
                  templateUrl: 'back/views/ui/form/editor.html',
                  data : { title: 'Editor' },
                  controller: 'EditorCtrl',
                  resolve: load(['textAngular','back/scripts/controllers/editor.js'])
                })
                .state('ui.form.slider', {
                  url: '/slider',
                  templateUrl: 'back/views/ui/form/slider.html',
                  data : { title: 'Slider' },
                  controller: 'SliderCtrl',
                  resolve: load('back/scripts/controllers/slider.js')
                })
                .state('ui.form.tree', {
                  url: '/tree',
                  templateUrl: 'back/views/ui/form/tree.html',
                  data : { title: 'Tree' },
                  controller: 'TreeCtrl',
                  resolve: load('back/scripts/controllers/tree.js')
                })
                .state('ui.form.file-upload', {
                  url: '/file-upload',
                  templateUrl: 'back/views/ui/form/file-upload.html',
                  data : { title: 'File upload' },
                  controller: 'UploadCtrl',
                  resolve: load(['angularFileUpload', 'back/scripts/controllers/upload.js'])
                })
                .state('ui.form.image-crop', {
                  url: '/image-crop',
                  templateUrl: 'back/views/ui/form/image-crop.html',
                  data : { title: 'Image Crop' },
                  controller: 'ImgCropCtrl',
                  resolve: load(['ngImgCrop','back/scripts/controllers/imgcrop.js'])
                })
                .state('ui.form.editable', {
                  url: '/editable',
                  templateUrl: 'back/views/ui/form/xeditable.html',
                  data : { title: 'Xeditable' },
                  controller: 'XeditableCtrl',
                  resolve: load(['xeditable','back/scripts/controllers/xeditable.js'])
                })
                // table routers
                .state('ui.table', {
                  url: '/table',
                  template: '<div ui-view></div>'
                })
                .state('ui.table.static', {
                  url: '/static',
                  templateUrl: 'back/views/ui/table/static.html',
                  data : { title: 'Static', theme: { primary: 'blue'} }
                })
                .state('ui.table.smart', {
                  url: '/smart',
                  templateUrl: 'back/views/ui/table/smart.html',
                  data : { title: 'Smart' },
                  controller: 'TableCtrl',
                  resolve: load(['smart-table', 'back/scripts/controllers/table.js'])
                })
                .state('ui.table.datatable', {
                  url: '/datatable',
                  data : { title: 'Datatable' },
                  templateUrl: 'back/views/ui/table/datatable.html'
                })
                .state('ui.table.footable', {
                  url: '/footable',
                  data : { title: 'Footable' },
                  templateUrl: 'back/views/ui/table/footable.html'
                })
                .state('ui.table.nggrid', {
                  url: '/nggrid',
                  templateUrl: 'back/views/ui/table/nggrid.html',
                  data : { title: 'NG Grid' },
                  controller: 'NGGridCtrl',
                  resolve: load(['ngGrid','back/scripts/controllers/nggrid.js'])
                })
                .state('ui.table.uigrid', {
                  url: '/uigrid',
                  templateUrl: 'back/views/ui/table/uigrid.html',
                  data : { title: 'UI Grid' },
                  controller: "UiGridCtrl",
                  resolve: load(['ui.grid', 'back/scripts/controllers/uigrid.js'])
                })
                .state('ui.table.editable', {
                  url: '/editable',
                  templateUrl: 'back/views/ui/table/editable.html',
                  data : { title: 'Editable' },
                  controller: 'XeditableCtrl',
                  resolve: load(['xeditable','back/scripts/controllers/xeditable.js'])
                })
                // chart
                .state('ui.chart', {
                  url: '/chart',
                  templateUrl: 'back/views/ui/chart/chart.html',
                  data : { title: 'Charts' },
                  resolve: load('back/scripts/controllers/chart.js')
                })
                // map routers
                .state('ui.map', {
                  url: '/map',
                  template: '<div ui-view></div>'
                })
                .state('ui.map.google', {
                  url: '/google',
                  templateUrl: 'back/views/ui/map/google.html',
                  data : { title: 'Gmap' },
                  controller: 'GoogleMapCtrl',
                  resolve: load(['ui.map', 'back/scripts/controllers/load-google-maps.js', 'back/scripts/controllers/googlemap.js'], function(){ return loadGoogleMaps(); })
                })
                .state('ui.map.vector', {
                  url: '/vector',
                  templateUrl: 'back/views/ui/map/vector.html',
                  data : { title: 'Vector' },
                  controller: 'VectorMapCtrl',
                  resolve: load('back/scripts/controllers/vectormap.js')
                })

                .state('page', {
                  url: '/page',
                  views: {
                    '': {
                      templateUrl: 'back/views/layout.html'
                    },
                    'aside': {
                      templateUrl: 'back/views/aside.html'
                    },
                    'content': {
                      templateUrl: 'back/views/content.html'
                    }
                  }
                })
                .state('page.profile', {
                  url: '/profile',
                  templateUrl: 'back/views/pages/profile.html',
                  data : { title: 'Profile', theme: { primary: 'green'} }
                })
                .state('page.settings', {
                  url: '/settings',
                  templateUrl: 'back/views/pages/settings.html',
                  data : { title: 'Settings' }
                })
                .state('page.blank', {
                  url: '/blank',
                  templateUrl: 'back/views/pages/blank.html',
                  data : { title: 'Blank' }
                })
                .state('page.document', {
                  url: '/document',
                  templateUrl: 'back/views/pages/document.html',
                  data : { title: 'Document' }
                })
                .state('404', {
                  url: '/404',
                  templateUrl: 'back/views/pages/404.html'
                })
                .state('505', {
                  url: '/505',
                  templateUrl: 'back/views/pages/505.html'
                })
                .state('access', {
                  url: '/access',
                  template: '<div class="indigo bg-big"><div ui-view class="fade-in-down smooth"></div></div>'
                })
                .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'back/views/pages/signin.html'
                })
                .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'back/views/pages/signup.html'
                })
                .state('access.forgot-password', {
                  url: '/forgot-password',
                  templateUrl: 'back/views/pages/forgot-password.html'
                })
                .state('access.lockme', {
                  url: '/lockme',
                  templateUrl: 'back/views/pages/lockme.html'
                })
            ;


            function load(srcs, callback) {
              return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                      promise = promise.then( function(){
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            if(!module.module){
                              name = module.files;
                            }else{
                              name = module.name;
                            }
                          }else{
                            name = src;
                          }
                        });
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                  }]
              }
            }
          }
        ]
    );