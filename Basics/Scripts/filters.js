/// <reference path="Script.js" />

var myApp = angular.module("myModule");

myApp.filter('genderCustomFilter', function(){
    return function(gender){
        switch(gender){
            case 1 :
            return "Male";
            case 2:
            return "Female"
            case 3:
            return "Not disclosed"
            default:
            break;
        }
    }
});