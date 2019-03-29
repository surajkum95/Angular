var app = angular.module('routingApp', ["ngRoute"])
                 .config(function($routeProvider, $locationProvider){
                     $routeProvider
                     .when("/home",{
                         templateUrl: 'Templates/home.html',
                         controller: 'homeController'
                     })
                     .when("/courses",{
                        templateUrl: "Templates/courses.html",
                        controller: 'coursesController'
                    })
                    .when("/students",{
                        templateUrl: 'Templates/students.html',
                        controller: 'studentsController',
                        resolve : {
                            studentList : function($http){
                                 //setTimeout(function(){
                                   return  $http.get('Scripts/dummyData.json')
                                        .then((response) => {
                                            //$scope.students = response.data.data;//no need . we need to only return that value we got from response.
                                            return response.data.data;
                                        })
                                //},3000);
                            }
                        }
                    })
                    .when("/students/:getId",{
                        templateUrl: "Templates/studentDetails.html",
                        controller: "studentDetailsController"
                    })
                    .when('/studentsSearch/:stdName?', { //? denotes that stdName will be optional Parameter
                        templateUrl : 'Templates/studentSearch.html',
                        controller : 'studentSearchController'
                    })
                    .otherwise({
                        // redirectTo: "/home"
                        templateUrl: 'Templates/home.html',
                        controller: 'homeController'
                    })
                    $locationProvider.html5Mode(true);//to remove # from the url
                 })
                 .controller("homeController", function($scope) {
                    $scope.message = "Home Page";
                 })
                 .controller("coursesController", function($scope) {
                    var courses = [
                        {name : "Node JS"},
                        {name : "Angular"},
                        {name : "Javascript"},
                        {name : "Java"}
                    ];
                    $scope.courses = courses;
                 })
                 .controller("studentsController", function($scope, studentList, $http, $log, $location) {
                    // var students = [
                    //     {name : "Suraj", id: 1},
                    //     {name : "Kumar", id: 2},
                    //     {name : "Real", id: 3},
                    //     {name : "Madrid", id: 4}
                    // ];
                    // $scope.students = students;
                    $scope.searchStudent = function() {
                        // $http.get('Scripts/dummyData.json')
                        // .then((response) => {
                        //     $log.info(response.data);
                        //     for(let x in response.data.data){
                        //         if(response.data.data[x].name.toUpperCase() === studentName.toUpperCase()){
                        //            $scope.students = response.data.data[x];
                        //         }
                        //      }                            
                        // })
                        if($scope.studentName){
                            $location.url('/studentsSearch/' + $scope.studentName);
                        }
                        else{
                            $location.url('/studentsSearch');
                        }
                    };
//Now , Suppose i have put $http.get service in setTimeout intentionally so that the data we will get on the screen
//will get delayed by 3 sec. But the problem here is tha even though the student list is delayed for 3 sec & not
//coming on the screen , but the input text which contains search option for student name is still appearing
//even though student list is not available. Hence , we should avoid this condition and try to have sync between
//this. So, what we will do is that we will launch the student screen only when the student details is available
//to us (after 3 sec). For that, we will use ROUTE RESOLVE property. (in the config of route..see above)
                    
                // Now i will comment down the below code so that we can use Resolve property in router.
                    // setTimeout(function(){
                    //     $http.get('Scripts/dummyData.json')
                    // .then((response) => {
                    //     //$log.info(response.data);
                    //     $scope.students = response.data.data;
                    // })
                    // },3000);

                    //After using Resolve property in router , we will use now :-
                    setTimeout(function(){
                    $scope.students =  studentList;
                    },3000);
                     //this studentList we need to include in the controller callback parameter 
                    //Now , we can also remove $http service from this controller parameter. this is now optional & of no use here in this controller.-
                 })
                 .controller('studentDetailsController', function($scope, $http, $routeParams, $log) {
                    //$log.info($routeParams.getId);
                    $http({
                        url: "Scripts/data.json",
                        params: { id : $routeParams.getId },
                        method  : "get"
                    })
                    .then((response) => {
                        let temp = null;
                        let boolean = false;
                        //$log.info(response.data.data);
                        // let filteredArray = response.data.data.filter((value) => {
                        //     return value.id === $routeParams.getId;
                        // });
                        // $log.info(filteredArray);
                        for(let value in response.data.data){
                            if(response.data.data[value].id.toString() === $routeParams.getId){
                                //$log.info(x);
                                boolean = true;
                                temp = response.data.data[value];
                                break;
                            }
                        }
                        if(boolean){
                        $scope.student = temp;
                        }
                    })
                 })
                 .controller('studentSearchController', function($scope, $http, $routeParams){
                    if($routeParams.stdName){
                        $http({
                            url : "Scripts/data.json",
                            params : {name : $routeParams.stdName},
                            method : 'get'
                        })
                        .then(function(response){
                            $scope.searchDetails = response.data.data;
                        })
                    }
                    else{
                        $http.get('Scripts/dummyData.json')
                        .then((response) => {
                        $scope.searchDetails = response.data.data;
                    })
                    }
                 })