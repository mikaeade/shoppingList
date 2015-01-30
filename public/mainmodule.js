var mainMod = angular.module('MiniMarket',['ngRoute','mvModule', 'ngResource']);

//main configuration for our angular application
mainMod.config(function($routeProvider,$locationProvider){
    
    $locationProvider.html5Mode(true);
    
    $routeProvider.when('/',{
        templateUrl:'products.html',
        controller:'ProductController'
    });
    
    $routeProvider.when('/add',{
        templateUrl:'userproduct.html',
        controller:'UserProduct'
    });  
    
    $routeProvider.when('/modify',{
        templateUrl:'modifyproduct.html',
        controller:'ModifyProduct', 
    }); 
});

mainMod.controller('ModifyProduct',['$scope','$location','ProductFactory', function($scope,$location, ProductFactory){

    //Define your scope attributes always in object literal.
    // web: understanding scopes  
    
    var data = ProductFactory.getProductData();
    var index = ProductFactory.getCurrentIndex();
    
    console.log(data[index].name);
    console.log("ModifyProduct Data");
    console.log(data);
    
    $scope.product = {  
        name: data[index].name,  // tähän arvot jostain
        price: data[index].price
    };
        //NEXT
    $scope.next=function(){
        console.log("scope.next()");
        if($location.url()==='/')
        {
            // Modify sivulle->
            $location.path('/modify');        
        }
    }
        //PUT
    $scope.saveProductChanges=function(){
            
        // call factory function
        console.log(index);
        console.log($scope.product.name);
        
        //ProductFactory.setProductData($scope.product);
        
        // then(xxx) callback functio
        ProductFactory.putProduct(ProductFactory.getCurrentIndex(),$scope.product).then(function(data){
            //$route.reload(); 
            $location.path('/');
        });
    }
}]);


mainMod.controller('UserProduct',['$scope','$location','ProductFactory', function($scope,$location, ProductFactory){

    //Define your scope attributes always in object literal.
    // web: understanding scopes    
    
    
    $scope.product = {  
        name:'',
        price:'',
        post_product:function(){
            
            console.log($scope.product);
            
            // call factory function
            var promise = ProductFactory.postProduct($scope.product);
            promise.then(function(data){
            console.log($location.url());
            $location.path('/');
            });
        }
    }
}]);

mainMod.controller('ProductController',function($scope,$location,$route,ProductFactory){
    
    console.log("GET PRODUCT DATA");
    ProductFactory.getProductData();
    
    
    $scope.lokaatio = function(){
        console.log("Lokaatio funktio");
        console.log($scope.testLocation);
        $scope.testLocation = 'ilmajoki';    
    };
    
    $scope.deleteProduct = function(index){
        console.log(index);
        // then(xxx) callback functio
        ProductFactory.deleteItem(index).then(function(data){
            $scope.products.splice(index,1); // remove items
            //$route.reload();      
        });
    }
    
    $scope.next = function(){
        $location.path('/add');        
    }

    
    $scope.modifyProduct=function(index){  
        console.log("modifyProduct()");
        // save the index
        ProductFactory.setCurrentIndex(index);
        $location.path('/modify');    
    }
    
    ProductFactory.getProducts().then(function(data){
        $scope.products = data;
    });
    
});

mainMod.factory('ProductFactory',function($http,$q,$resource){
    
    var factory = {};
    
    var productInfo = {
        productData:'',
        productIndex:''
    };
    
    factory.getProductData = function(){       
        return productInfo.productData;
    };
    
    factory.setProductData = function(data){
        console.log("factory.setProductData");
        console.log(data);
        productInfo.productData=data;
    };
    
    factory.getProducts = function(scope){
        
        var deferred = $q.defer();
          
        $http.get('/data').
          success(function(data, status, headers, config) {
             productInfo.productData = data;
             deferred.resolve(data);
          }).
          error(function(data, status, headers, config) {
            console.log('error loading data');
          });
        
        return deferred.promise;    
    }
    
    factory.postProduct = function(data){
        // url, attributes (not this time), actions ( omalla post määrittelyllä
        // eli luo post methodin resurssille, ja sitä sitten kutsutaan ja laitetaan data mukaan
        
        console.log("factory.postProduct");
        var x = $resource('/data', {}, {'post':{method:'POST'}}).post(data).$promise;
        return x;
    }
    
    factory.putProduct = function(index, product){
        // url, attributes (not this time), actions ( omalla post määrittelyllä
        // eli luo post methodin resurssille, ja sitä sitten kutsutaan ja laitetaan data mukaan
        
        console.log("factory.putProduct");
        
        var x = $resource('/data', {}, {'put':{method:'PUT'}}).put([index,product]).$promise;
        return x;
    }
    
    factory.setCurrentIndex = function(index){  
        console.log("factory.currentIndex");
        productInfo.productIndex = index;
            
    }
    factory.getCurrentIndex = function(){  
        console.log("factory.currentIndex");
        return productInfo.productIndex;       
    }
    
    factory.deleteItem = function(index){    
        console.log("factory.delete");
        var req = $resource('/data/',{id:index}, {'delete':{method:'DELETE'}});           
        return req.delete().$promise;
    }
    return factory;
});



