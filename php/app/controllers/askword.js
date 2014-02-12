"use strict";

var wordsCtrl = angular.module("wordsController", ["firebase"]);

wordsCtrl.controller("AskWord", ["$scope", "$firebase", function($scope, $firebase) {
	
	$scope.loadingData = true;
	$scope.d = null;

	$scope.userAnswer = "";

	$scope.error = "";
	$scope.success = "";

	$scope.tip = "t_p";
	$scope.tipUsed = false;
	$scope.revealed = false;

	$scope.scores = 0;
	$scope.topScores = 0;
	var scoresForRound = 1;

	var base = new Firebase("https://popping-fire-5673.firebaseio.com/");
	$scope.d = $firebase(base);
	$scope.d.$on("loaded", function() {
		$scope.question = {};
		randomQuestion();
		$scope.loadingData = false;
	});

	function randomQuestion() {
		do {
			var random = Math.floor(Math.random()*($scope.d.words.length));
			var newQuestion = $scope.d.words[random];
		} while(newQuestion.id == $scope.question.id && newQuestion.word && newQuestion.answer);

		if(Math.random() > 0.5) {
			$scope.question.word = newQuestion.word;
			$scope.question.answer = newQuestion.answer;
		}
		else {
			$scope.question.word = newQuestion.answer;
			$scope.question.answer = newQuestion.word;
		}
		$scope.question.id = newQuestion.id;

		reinit();
	}

	function reinit() {
		$scope.userAnswer = "";
		emptyValidationIndicators();
		reinitTip();
		$scope.revealed = false;
		scoresForRound = 1;
	}

	
	function emptyValidationIndicators() { 
		$scope.error = "";
		$scope.success = ""; 
	}
	$scope.$watch("userAnswer", emptyValidationIndicators);

	
	function validate() {
		if($scope.userAnswer.toUpperCase() == $scope.question.answer.toUpperCase()) {
			$scope.success = "Oikein";
			score();
			randomQuestion();
		}
		else {
			$scope.error = "Väärin";
		}
	}
	$scope.validate = validate;

	function score() {
		$scope.scores += scoresForRound;
		scoresForRound = 1;
		$scope.scores = Math.max($scope.scores, 0);

		if($scope.scores > $scope.topScores) {
			$scope.topScores = $scope.scores;
		}
	}
	
	$scope.keyPress = function($event) {
		if($event.keyCode == 13) validate();
	}


	$scope.showTip = function() {
		if($scope.tipUsed) return;
		else $scope.tipUsed = true;

		scoresForRound = 0.5;

		var answer = $scope.question.answer;
		$scope.tip = answer.split("").map(function(char) {
			if(char == " " || Math.random() < 0.4) {
				return char;
			}
			else {
				return "_";
			}
		}).join(""); 
	}

	function reinitTip() {
		$scope.tipUsed = false;
		$scope.tip = "";
	}

	$scope.showAnswer = function() {
		$scope.tip = $scope.question.answer;
		scoresForRound = -1;
		$scope.revealed = true;
	}


	/*$scope.next = function() {
		randomQuestion();
		$scope.scores -= 1;
		$scope.scores = Math.max($scope.scores, 0);
	}*/
}]);