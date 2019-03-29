let app = angular.module("syntaxModule",["ngRoute"])
                 .config(function($routeProvider,$locationProvider){

                    $routeProvider.caseInsensitiveMatch = true;

                     $routeProvider
                     .when('/home',{
                         templateUrl : "Templates/home.html",
                         controller : "homeController as homeCtrl",
                         caseInsensitiveMatch : true
                     })
                     .when('/students',{
                         templateUrl : "Templates/students.html",
                         controller : "studentsController as stdCtrl"
                     })
                     .when("/courses",{
                         templateUrl : "Templates/courses.html",
                         controller : "coursesController",
                         controllerAs : "courseCtrl"
                     })
                     .when("/inline",{
                        template : "<h1>Inline Template in Action</h1>"
                    })
                     .otherwise({
                         redirectTo : "/inline"
                     })
                     $locationProvider.html5Mode(true);
                 })
                 .controller('homeController', function(){
                     this.message = "Syntax Home Page";
                 })
                 .controller('studentsController', function($http, $route, $scope){
                     let vm = this;
                     vm.reloadStudentsDetails = () => {
                         $route.reload();
                     };
//whenver route navigation occurs in any angular application , then the following events are triggered :-
//$routeChangeStart
//$locationChangeStart
//$routeChangeSuccess
//$locationChangeSuccess
                     $scope.$on('$routeChangeStart', function(event, next, current){
                        if(!confirm('Are you sure to navigate to' + next.$$route.originalPath + ' ?')){
                            event.preventDefault();
                         }
                     });
                     //same can be done by $locationChangeStart . Diff is that next and current is different.
                     //It directly gives the route path in next and current.
                    //  $scope.$on('$locationChangeStart', function(event, next, current){
                    //     if(!confirm('Are you sure to navigate to' + next + ' ?')){
                    //         event.preventDefault();
                    //      }
                    //  });
                    $http.get('Scripts/dummyResponse.json')
                    .then((response) => {
                        vm.students = response.data.data;
                        //this.students = response.data.data;
                        //here if using directly this.students -> then this of then block will refer to the window
                        //object. This 'this' will not refer to the controller object. hence, to take the 
                        //controller object , we will initialize vm variable with this before the then method
                        // which at that time will be referring to controller object..(means before then call)
                    })
                 })

                 .controller('coursesController', function(){
                    var courses = [
                        {name : "Node JS"},
                        {name : "Angular"},
                        {name : "Javascript"},
                        {name : "Java"}
                    ];
                    this.courses = courses;
                 })
                 .controller('divController', function(){
                     this.message = "Syntax Made through as keyword in HTML controller"
                 })
                 .controller('withoutSyntaxControllerCountry', function($scope){
                     $scope.name = "India";
                 })
                 .controller('withoutSyntaxControllerState', function($scope){
                     $scope.name = "Bihar";
                 })
                 .controller('withoutSyntaxControllerCity', function($scope){
                     $scope.name = "Muzaffarpur";
                 })
                 .controller('syntaxControllerCountry', function(){
                    this.name = "India";
                })
                .controller('syntaxControllerState', function(){
                    this.name = "Bihar";
                })
                .controller('syntaxControllerCity', function(){
                    this.name = "Muzaffarpur";
                })
                .controller('rootScopeControllerRed', function($scope, $rootScope){
                    $scope.redColor  = "I am Red";
                    $rootScope.rootScopeColor = "Common RootScope Color";
                })
                .controller('rootScopeControllerGreen', function($scope){
                    $scope.greenColor = "I am Green";
                })