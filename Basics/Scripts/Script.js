var myApp = angular.module("myModule", []);

    myApp.controller('myController', function ($scope) {
        $scope.message = "Suraj Kumar";
    });

    myApp.controller('myController2', function($scope){
        var employees = [
                {name : "ABC", title : "DEF"},
                {name: "GHI", title: "JKL" }
        ];
        $scope.employeeList = employees;
    });
    myApp.controller('imageController', function($scope){
        var country = {
            name : "India",
            capital : "New Delhi",
            flag : "Images/india_flag.png"
        }
        $scope.countryDetails = country;
    });
    myApp.controller('dataBindingController', function($scope){
        $scope.inputtext = "Welcome to Angular"
        //console.log($scope.inputValue);
        var employees = [
            {name : "ABC", title : "DEF"}
        ];
        $scope.inputValue = employees;        
    });
    myApp.controller('ngRepeatController', function($scope){
        var countries = [
            { name: "India", cities: [{name : "Delhi"},{name : "Bangalore"}] },
            { name: "Australia", cities: [{ name: "Sydney" }, { name: "Brisbane" }] }
        ];
        $scope.countryList = countries;
    });
    myApp.controller('eventhandlerController', function($scope){
        var technologies = [
            { name : "JavaScript", likes : 0, dislikes : 0},
            { name: "Node JS", likes: 0, dislikes: 0 },
            { name: "Angular JS", likes: 0, dislikes: 0 },
            { name: "HTML", likes: 0, dislikes: 0 }
        ];

        $scope.technolgiesList = technologies;

        $scope.incremenentLikes = function(technology){
            technology.likes++;
        }
        $scope.incremenentDisLikes = function (technology) {
            technology.dislikes++;
        }
    });
    myApp.controller('filterController', function($scope){
        var employeesData = [
            { name : "Abc", dateOfBirth : new Date("2/11/2000"), gender : "Male", salary : 5000.12 },
            { name: "Def", dateOfBirth: new Date("12/01/1998"), gender: "Male", salary: 4000.96 },
            { name: "Ghi", dateOfBirth: new Date("2/11/2000"), gender: "Female", salary: 7895.50 },
            { name: "Jkl", dateOfBirth: new Date("2/11/2000"), gender: "Male", salary: 8965.48 },
            { name: "Mno", dateOfBirth: new Date("12/01/1998"), gender: "Female", salary: 1523.68 }
        ];
        $scope.employeesDataList = employeesData;
        $scope.rowlimit = 3;
    });
    myApp.controller('filterSortController', function ($scope) {
        var employeeList = [
            { name: "Abc", dateOfBirth: new Date("2/11/2000"), gender: "Male", salary: 5000.12 },
            { name: "Def", dateOfBirth: new Date("12/01/1998"), gender: "Male", salary: 4000.96 },
            { name: "Ghi", dateOfBirth: new Date("2/11/2000"), gender: "Female", salary: 7895.50 },
            { name: "Jkl", dateOfBirth: new Date("2/11/2000"), gender: "Male", salary: 8965.48 },
            { name: "Mno", dateOfBirth: new Date("12/01/1998"), gender: "Female", salary: 1523.68 }
        ];
        $scope.employeesListforSorting = employeeList;
        $scope.sortColumnProperty = '-salary';
    });
    myApp.controller('sortByHeaderController', function($scope){
        var employeeHeaderList = [
            { name: "Abc", dateOfBirth: new Date("2/11/2000"), gender: "Male", salary: 5000.12 },
            { name: "Def", dateOfBirth: new Date("12/01/1998"), gender: "Male", salary: 4000.96 },
            { name: "Ghi", dateOfBirth: new Date("2/11/2000"), gender: "Female", salary: 7895.50 },
            { name: "Jkl", dateOfBirth: new Date("2/11/2000"), gender: "Male", salary: 8965.48 },
            { name: "Mno", dateOfBirth: new Date("12/01/1998"), gender: "Female", salary: 1523.68 }
        ];
        $scope.employeeHeaderList = employeeHeaderList;
        $scope.sortColumn = 'name';
        $scope.reverseSort = false;
        $scope.sortData = function(column){
            $scope.reverseSort = $scope.sortColumn===column ? !$scope.reverseSort : $scope.reverseSort;
            $scope.sortColumn = column;
        }
        $scope.getSortClass = function(column){
            if($scope.sortColumn === column){
                return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
            }
            return '';
        }
    });
    myApp.controller('searchFilterController', function($scope){
        var employeeSearchList = [
            { name: "Abc", gender: "Male", salary: 5000.12, city: "Muzaffarpur" },
            { name: "Def", gender: "Female", salary: 4000.96, city: "Bengaluru" },
            { name: "Ghi", gender: "Female", salary: 7895.50, city: "Patna" },
            { name: "Jkl", gender: "Male", salary: 8965.48, city: "Mumbai" },
            { name: "Mno", gender: "Female", salary: 1523.68, city: "Delhi" }
        ]; 

        $scope.employeeSearch = employeeSearchList;
    });
    myApp.controller('customFilterController', function($scope){
        var customEmployee = [
            { name: "Abc", gender: 1, salary: 5000.12, city: "Muzaffarpur" },
            { name: "Def", gender: 2, salary: 4000.96, city: "Bengaluru" },
            { name: "Ghi", gender: 2, salary: 7895.50, city: "Patna" },
            { name: "Jkl", gender: 1, salary: 8965.48, city: "Mumbai" },
            { name: "Mno", gender: 3, salary: 1523.68, city: "Delhi" }
        ]; 

        $scope.customEmployeeList = customEmployee;
        $scope.gender = function(genderValue){
            if(genderValue === 1){
                return "Male";
            }
            else if(genderValue === 2){
                return "Female";
            }
            return "Not Disclosed"
        }
    });
    myApp.controller('hideshowController', function($scope){
        var hideShowEmployee = [
            { name: "Abc", gender: 1, salary: 5000.12, city: "Muzaffarpur" },
            { name: "Def", gender: 2, salary: 4000.96, city: "Bengaluru" },
            { name: "Ghi", gender: 2, salary: 7895.50, city: "Patna" },
            { name: "Jkl", gender: 1, salary: 8965.48, city: "Mumbai" },
            { name: "Mno", gender: 3, salary: 1523.68, city: "Delhi" }
        ];
        $scope.hideShowEmployeeList = hideShowEmployee;
    });
    myApp.controller('ngIncludeController', function($scope){
        var employeeInc = [
            {name : "Suraj", gender: "Male", salary: "100"},
            {name : "Kumar", gender: "Male", salary: "123"},
            {name : "Real", gender: "Female", salary: "2342"},
            {name : "Madrid", gender: "Male", salary: "50000"},
            {name : "Abc", gender: "Female", salary: "000"}
        ];
        $scope.employeeIncL = employeeInc;
        $scope.selectView = "table";
        $scope.tableShow=true;
        $scope.selectoptions = function(item){
            console.log(item);
            if(item==='table'){
                $scope.tableShow=true;
                $scope.listShow=false;
            }
            else if(item==='list'){
                $scope.listShow=true;
                $scope.tableShow=false;
            }
        };
    });
    myApp.controller('httpServiceController', function($scope, $http, $log){
        $scope.employeeHttpService = $http.get("Scripts/Service.json")
        .then(function(response){
            $scope.employeeHttpService = response.data;
            $log.info(response);
        })
        .catch(function(error){
            console.log("error aa rha hai");
            $scope.error = error;
             throw error;
        });
    });
    myApp.controller('customServiceController', ($scope) => {
        $scope.transformString = (input) => {
            if(!input){
                return input;
            }
            let outputValue = "";
            for(let i=0;i<input.length; i++){
                if(i>0 && input[i] === input[i].toUpperCase()){
                    outputValue = outputValue + " ";
                }
                outputValue = outputValue + input[i];
            }
            $scope.output = outputValue;
        }
    });
//In the above controller, we are writing the whole logic & made
//our code dirty. Also, this is not reusable. If other controllers
//have to use it, then again at that place , we have to write the 
//same code . Hence, for reusability & cleanliness of the code
//we are separating the main logic and putting it in the service.    
    myApp.controller('dependencyInjectionController', ($scope, stringSpacifyService) => {
        $scope.transformStringX = (input) => {
            $scope.output1 = stringSpacifyService.processMyString(input);
        }
    });
    myApp.controller('anchorScrollController', ($scope, $location, $anchorScroll) => {
        $scope.scrollTo = (id) => {
            $location.hash(id);
            $anchorScroll.yOffset = 20;
            $anchorScroll();
        }
    });