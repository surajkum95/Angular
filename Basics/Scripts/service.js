var myApp = angular.module("myModule");

myApp.factory('stringSpacifyService', () => {
    return {
        processMyString : (input) => {
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
            return outputValue;            
        }
    };
});