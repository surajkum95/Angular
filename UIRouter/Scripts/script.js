//for UI Routing, 3 steps we need to follow:-
//include CDN link in html as dependency for UI Routing
//instead of using ngRoute, now use ui.router
//instead of using ng-view tag in html , now use ui-view tag
//use $stateProvider service instead of $routeProvider service
//instead of when , use state
//now name should also be given in the state function
//url property should also be included in the object literal of state
//instead of $route in controller ,  now use $state
//instead of using href , now use ui-sref
var app = angular.module('routingApp', ["ui.router"])
                 .config(function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider){
                     
                    $urlMatcherFactoryProvider.caseInsensitive(true);

                    $urlRouterProvider.otherwise("/home") //for default routing

                    $locationProvider.html5Mode(true);

                     $stateProvider
                     .state("home",{
                         url: "/home",
                         templateUrl: 'Templates/home.html',
                         controller: 'homeController',
                         data: {
                             customData1: 'Home Custom Data 1',
                             customData2: 'Home Custom Data 2'
                         }
                     })
                     .state("courses",{
                        url: "/courses",
                        templateUrl: "Templates/courses.html",
                        controller: 'coursesController',
                        data: {
                            customData1: 'Courses Custom Data 1',
                            customData2: 'Courses Custom Data 2'
                        }
                    })
                    // .state("students",{
                    //     url: "/students",
                    //     templateUrl: 'Templates/students.html',
                    //     controller: 'studentsController',
                    //     resolve : {
                    //         studentList : function($http){
                    //                return  $http.get('Scripts/dummyData.json')
                    //                     .then((response) => {
                    //                          return response.data.data;
                    //                     })
                    //         }
                    //     }
                    // })
                    // .state("studentById",{
                    //     url: '/students/:getId',
                    //     templateUrl: "Templates/studentDetails.html",
                    //     controller: "studentDetailsController"
                    // })
                    .state('studentByName', { 
                        url: '/studentsSearch/:stdName',//in UI Route, By default all the parameters are optional.so need to use ? for giving optional tag
                        templateUrl : 'Templates/studentSearch.html',
                        controller : 'studentSearchController'
                    })
                    .state('studentParent',{
                        url: '/students',
                        controller: 'studentParentController',
                        templateUrl: 'Templates/studentParent.html',
                        resolve: {
                            studentTotals : function($http){
                                return $http.get('Scripts/nestedData.json')
                                        .then(function(response){
                                            return response.data;
                                        })
                            }
                        },
                        abstract : true
                    })
                    .state("studentParent.students",{
                        url: "/",
                        templateUrl: 'Templates/students.html',
                        controller: 'studentsController',
                        resolve : {
                            studentList : function($http){
                                   return  $http.get('Scripts/dummyData.json')
                                        .then((response) => {
                                             return response.data.data;
                                        })
                            }
                        }
                    })
                    .state("studentParent.studentById",{
                        url: '/:getId',
                        templateUrl: "Templates/studentDetails.html",
                        controller: "studentDetailsController"
                    })
                 })
                 .controller("homeController", function($scope, $state) {
                    $scope.message = "Home Page";

                    $scope.homeCustomData1 = $state.current.data.customData1;
                    $scope.homeCustomData2 = $state.current.data.customData2;

                    $scope.coursesCustomData1  = $state.get("courses").data.customData1;
                    $scope.coursesCustomData2  = $state.get("courses").data.customData2;
// here we have to use get , because courseCustomData is not in home state, it is in courses state , but here we are using it in homeController
//so, we have to use $state.get('courses') to get the data content available in courses state.
//But the data which is already available in home state, we have directly used with $state.current which will 
//give me data object. Because, we are already using homeController here

//Summarizing it :-
//TO access state custom Data from its own controller: - $state.current.data.customPropertyName
//TO access state custom Data from a different controller: - $state.get('statename').data.customPropertyName

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
                //  .controller("studentsController", function($scope, studentList, $http, $state, $location) {
                //     $scope.searchStudent = function() {
                //         $state.go('studentByName', {stdName : $scope.studentName });
                //     };
                //     $scope.refreshStudentDetails = ()=> {
                //         $state.reload();
                //     };
                //     $scope.students =  studentList;
                // })
                .controller('studentDetailsController', function($scope, $http, $stateParams, $log) {
                    $http({
                        url: "Scripts/data.json",
                        params: { id : $stateParams.getId },
                        method  : "get"
                    })
                    .then((response) => {
                        let temp = null;
                        let boolean = false;
                        for(let value in response.data.data){
                            if(response.data.data[value].id.toString() === $stateParams.getId){
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
                 .controller('studentSearchController', function($scope, $http, $stateParams){
                    if($stateParams.stdName){
                        $http({
                            url : "Scripts/data.json",
                            params : {name : $stateParams.stdName},
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
                 .controller('studentParentController', function($scope, studentTotals){
                     $scope.male = studentTotals.male;
                     $scope.female = studentTotals.female;
                     $scope.total = studentTotals.total;
                 })
                 .controller("studentsController", function($scope, studentList, $http, $state, $location, studentTotals) {
                    $scope.searchStudent = function() {
                        $state.go('studentByName', {stdName : $scope.studentName });
                    };
                    $scope.refreshStudentDetails = ()=> {
                        $state.reload();
                    };
                    $scope.students =  studentList;

                    $scope.studentTotals = studentTotals.total;
                })