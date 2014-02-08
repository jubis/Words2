"use strict";

var wordsCtrl = angular.module("wordsController", ["firebase"]);

wordsCtrl.controller("AskWord", ["$scope", "$firebase", function($scope, $firebase) {
	$scope.loadingData = true;
	var base = new Firebase("https://popping-fire-5673.firebaseio.com/");
	$scope.d = $firebase(base);
	$scope.d.$on("loaded", function() {
		$scope.question = $scope.d.words[0];
		$scope.loadingData = false;
	});

	function randomQuestion() {
		do {
			var random = Math.floor(Math.random()*($scope.d.words.length));
			var newQuestion = $scope.d.words[random];
		} while(newQuestion.word == $scope.question.word);
		if(Math.random() > 0.5) {
			$scope.question.word = newQuestion.word;
			$scope.question.answer = newQuestion.answer;
		}
		else {
			$scope.question.word = newQuestion.answer;
			$scope.question.answer = newQuestion.word;
		}
		$scope.userAnswer = "";
	}
	$scope.$watch("question", emptyValidationIndicators);

	$scope.userAnswer = "";
	function emptyValidationIndicators() { 
		$scope.error = "";
		$scope.success = ""; 
	}
	$scope.$watch("userAnswer", emptyValidationIndicators);

	$scope.error = "";
	$scope.success = "";
	function validate() {
		if($scope.userAnswer == $scope.question.answer) {
			$scope.success = "Oikein";
			randomQuestion();
		}
		else {
			$scope.error = "Väärin";
		}
	}
	$scope.validate = validate;
	$scope.keyPress = function($event) {
		if($event.keyCode == 13) validate();
	}
}]);