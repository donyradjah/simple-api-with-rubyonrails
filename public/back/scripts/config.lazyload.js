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
