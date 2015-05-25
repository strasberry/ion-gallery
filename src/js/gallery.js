(function(){
  'use strict';
  
  angular
    .module('ion-gallery', ['templates'])
    .directive('ionGallery',ionGallery);
  
  ionGallery.$inject = ['$ionicPlatform','ionGalleryData'];
  
  function ionGallery($ionicPlatform,ionGalleryData) {
    return {
      restrict: 'AE',
      scope:{
        ionGalleryItems: '=ionGalleryItems',
        ionGalleryRow: '=ionGalleryRow',
      },
      controller: controller,
      replace:true,
      templateUrl:'gallery.html'
    };
    
    function controller($scope){
      
      ionGalleryData.setGalleryLength($scope.ionGalleryItems.length);
      ionGalleryData.setRowSize(parseInt($scope.ionGalleryRow));
      
      var items = $scope.ionGalleryItems,
          gallery = [],
          rowSize = ionGalleryData.getRowSize(),
          row = -1,
          col = 0;
            
      for(var i=0;i<items.length;i++){
        
        if(i % rowSize === 0){
          row++;
          gallery[row] = [];
          col = 0;
        }
        
        gallery[row][col] = items[i];
        col++;
      }
      
      $scope.items = gallery;
      $scope.responsiveGrid = parseInt((1/rowSize)* 100);
    }
  }
})();