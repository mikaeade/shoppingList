var module = angular.module('mvModule',['ngResource']);

module.directive('myDirective',function(){
    
    return {     
        restrict:'AE',
        scope:{
            temp:'@',
            city:'@',
            location:'='
        },
        templateUrl:'my_directive.html',
        controller:'DirectiveController'
    }
});

module.controller('DirectiveController',function($scope,$resource, $q/*,weatherfactory*/){

    console.log("hep");
    var kaupunki = $scope.location;
    console.log(kaupunki);

    var data = $resource('http://api.openweathermap.org/data/2.5/weather?q='+$scope.location).get(function(){
    console.log(data);
    console.log(data.base);  
    $scope.temp = data.main.temp;
    $scope.city = data.name;
    console.log($scope.location);
    
});
});
