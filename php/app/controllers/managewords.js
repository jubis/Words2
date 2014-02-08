"use strict";

var manageController = angular.module("manageController", ["firebase"]);

manageController.controller("ManageWords", ["$scope", "$firebase", function($scope, $firebase) {
	$scope.loadingData = true;
	var base = new Firebase("https://popping-fire-5673.firebaseio.com/");
	$scope.d = $firebase(base);
	$scope.d.$on("loaded", function() {
		$scope.loadingData = false;
	});

	$scope.word = "";
	$scope.answer = "";
	$scope.saving = false;
	$scope.save = function() {
		$scope.saving = true;
		$scope.d.words.push({word: $scope.word, answer: $scope.answer});
		$scope.d.$save().then(function() {
			$scope.word = "";
			$scope.answer = "";
			$scope.saving = false;
		});
	}

}]);