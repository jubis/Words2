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
		var newWord = {word: $scope.word, answer: $scope.answer};
		newWord.id = getNextId();
		$scope.d.words.push(newWord);
		$scope.d.$save().then(function() {
			$scope.word = "";
			$scope.answer = "";
			$scope.saving = false;
		});
	}

	function getNextId() {
		var last = $scope.d.words[$scope.d.words.length - 1];
		return Number(last.id) + 1;
	}

}]);