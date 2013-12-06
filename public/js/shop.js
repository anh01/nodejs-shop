var shopApp = angular.module('shopApp', []);

//requires Angular 1.2.0 previously imported into the page
shopApp.controller('cartCtrl', 
  function($scope, $http) {
    $http.get('/cart/').success(function(data) {
      $scope.cart = data;
      $scope.done = true;
      $scope.hasItems = data.items && data.items.length > 0;
    });  
  }
);
shopApp.controller('addToCartCtrl',
  function($scope) {
    
  }
);
shopApp.controller('searchCtrl',
  function($scope, $http) {
    
  }
);
