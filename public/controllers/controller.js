(function() {
angular.module('app',[])
.controller('appCtrl',['$scope','$http',function($scope,$http){


	var refresh = function(){

	$http.get('/contactList').success(function(response){
		console.log(" got data from server");

	$scope.contactList = response;
	$scope.contact = {};
	})
}
refresh();
	console.log("appCtrl");

	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/contactList',$scope.contact).success(function(response){
			//$scope.contactList = response;
			refresh();
		})
	}


	$scope.remove = function(id){

		console.log(id);

$http.delete('/contactList/' + id).success(function(response){
	refresh();
})

	}

	$scope.edit = function(id){

		console.log(id);

$http.get('/contactList/' + id).success(function(response){
	//refresh();

	$scope.contact = response;

})

	}

$scope.update = function(){

		console.log($scope.contact._id);

$http.put('/contactList/' + $scope.contact._id,$scope.contact).success(function(response){
	refresh();
})

	}



$scope.clear = function(){

	
	$scope.contact = {};



	}



}

	])
 
})();